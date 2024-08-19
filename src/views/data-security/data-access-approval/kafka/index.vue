<template>
  <div>
    <PageWrapper title="Kafka接入审批" content="Kafka接入核心流程:1.开始;2.审核;3.开发;4.完成">
    </PageWrapper>

    <!-- 步骤条 -->
    <a-layout-content class="my-layout-content">
      <a-steps :current="0">
        <a-step>
          <template #title>开始</template>
          <template #description>
            <span>需求人员填写需求文档</span>
          </template>
        </a-step>
        <a-step title="审核" sub-title="待确认" description="数据开发人员审核需求文档"/>
        <a-step title="开发" description="数据开发人员进行开发"/>
        <a-step title="完成" description="完成信息同步到需求人员"/>
      </a-steps>
    </a-layout-content>

    <!-- 表单 -->
    <a-layout-content class="my-layout-content">
      <a-form
        ref=""
        :model="formBaseData"
        name="basic"
        :label-col="{ span: 2 }"
        :wrapper-col="{ span: 8 }"
        autocomplete="off"
        @finish=""
        @finishFailed=""
      >

        <a-form-item label="审批名称" name="title">
          <a-input v-model:value="formBaseData.title" allow-clear
                   placeholder="如：TikTok-2.1.1埋点Kafka数据接入"/>
        </a-form-item>
        <a-form-item label="项目" name="project">
          <a-input v-model:value="formBaseData.project" allow-clear placeholder="如：TikTok"/>
        </a-form-item>
        <a-form-item label="项目版本" name="version">
          <a-input v-model:value="formBaseData.version" allow-clear placeholder="如：TikTok-2.1.1"/>
        </a-form-item>
        <a-form-item label="预发日期" name="pre_date">
          <a-input v-model:value="formBaseData.pre_date" allow-clear placeholder="如：2024-01-01"/>
        </a-form-item>
        <a-form-item label="上线日期" name="pro_date">
          <a-input v-model:value="formBaseData.pro_date" allow-clear placeholder="如：2024-02-01"/>
        </a-form-item>
        <a-form-item label="Kafka地址" name="kafka_addr">
          <a-textarea v-model:value="formBaseData.kafka_addr" allow-clear
                      :placeholder="KAFKA_PLACE_HOLDER" :rows="5"/>
        </a-form-item>
      </a-form>
    </a-layout-content>


    <!-- 动态KafkaTopic表单 -->
    <a-card
      class="my-layout-content"
      v-for="(kafkaTopicObj, index) in dynamicKafkaTopicFrom.forms"
      :key="index"
      :title="getTitle(index)"
    >
      <template #extra>
        <a-button ghost type="warning" size="small" @click="clearForm(index)"
                  style="margin-right: 2px">
          清空
        </a-button>
        <a-button ghost type="danger" size="small" @click="removeForm(index)">删除</a-button>
      </template>

      <a-form name="dynamic_form_item"
              :label-col="{ span: 2 }"
              :wrapper-col="{ span: 8 }"
              @finish="">
        <a-form-item label="Kafka Topic" name="kafkaTopic" :rules="[]">
          <a-input v-model:value="kafkaTopicObj.kafkaTopic" allow-clear placeholder=""/>
        </a-form-item>

        <a-form-item label="需求对接人" name="user">
          <a-input v-model:value="kafkaTopicObj.user" allow-clear placeholder=""/>
        </a-form-item>

        <a-form-item label="需求类型" name="type">
          <a-input v-model:value="kafkaTopicObj.type" allow-clear placeholder=""/>
        </a-form-item>

        <a-form-item label="接入至" name="targetSink">
          <a-input v-model:value="kafkaTopicObj.targetSink" allow-clear placeholder=""/>
        </a-form-item>

        <a-form-item label="数据格式" name="dataFormat">
          <a-input v-model:value="kafkaTopicObj.dataFormat" allow-clear placeholder=""/>
        </a-form-item>

        <a-form-item label="业务名称" name="description">
          <a-input v-model:value="kafkaTopicObj.description" allow-clear placeholder=""/>
        </a-form-item>

        <a-form-item label="数据样例" name="dataExample">
          <a-input v-model:value="kafkaTopicObj.dataExample" allow-clear placeholder=""/>
        </a-form-item>

        <a-form-item label="数据结构" name="dataStruct">
          <a-input v-model:value="kafkaTopicObj.dataStruct" allow-clear placeholder=""/>
        </a-form-item>
      </a-form>
    </a-card>

    <!-- 新增按钮 -->
    <a-button type="dashed" block style="width: 100%" @click="addForm">
      <PlusOutlined/>新增
    </a-button>

    <!-- 分割线 -->
    <a-divider></a-divider>
    <!-- 居中 -->
    <div style="display:flex;justify-content: center">
      <a-button type="primary" size="large" style="margin: 5px" @click="submitForm">提交</a-button>
      <a-button type="danger" size="large" style="margin: 5px" @click="clearAllForm">全部清空
      </a-button>
    </div>
  </div>

</template>

<script setup lang="ts">
import {PageWrapper} from '/@/components/Page'
import {onBeforeMount, reactive, ref} from 'vue'
// import type {FormInstance} from 'ant-design-vue';
import { PlusOutlined } from '@ant-design/icons-vue';

const KAFKA_PLACE_HOLDER = "如：\n开发：dev-kafka:9092\n测试：fat-kafka:9092\n预发：pre-kafka:9092\n生产：pro-kafka-01:9092,pro-kafka-02:9092,pro-kafka-03:9092"

const getTitle = (idx) => {
  return `${idx + 1}.Kafka Topic接入信息`
}

interface FormBaseModel {
  title: string;
  project: string;
  version: string;
  pre_date: string;
  pro_date: string;
  kafka_addr: string;
}

// 公共部分信息
const formBaseData = reactive<FormBaseModel>({
  title: '',
  project: '',
  version: '',
  pre_date: '',
  pro_date: '',
  kafka_addr: ''
});


interface KafkaTopicModel {
  kafkaTopic: string;
  user: string;
  type: string;
  targetSink: string;
  dataFormat: string;
  description: string;
  dataExample: string;
  dataStruct: string;
}

// 动态表单
const dynamicKafkaTopicFrom = reactive<{ forms: KafkaTopicModel[] }>({
  forms: []
});

// const formRef = ref<FormInstance>();
// formRef.value?.resetFields();

// 新增表单方法
const addForm = () => {
  dynamicKafkaTopicFrom.forms.push({
    kafkaTopic: '',
    user: '',
    type: '',
    targetSink: '',
    dataFormat: '',
    description: '',
    dataExample: '',
    dataStruct: '',
  })
}

const removeArrElementByIndex = (arr: Array<any>, index: number) => {
  arr.splice(index - 1, 1);
  return arr;
}

// 表单相关操作
// 删除某个表单
const removeForm = (index) => {
  removeArrElementByIndex(dynamicKafkaTopicFrom.forms, index);
}

// 清空重置某个表单
// 可以通过 ref 直接清空
const clearForm = (index) => {
  dynamicKafkaTopicFrom.forms[index] = {
    kafkaTopic: '',
    user: '',
    type: '',
    targetSink: '',
    dataFormat: '',
    description: '',
    dataExample: '',
    dataStruct: '',
  }
}

// 清空所有表单
const clearAllForm = () => {
  // Part1 Clear
  for (let k in formBaseData) {
    formBaseData[k] = ''
  }

  // Part2 Clear
  for (let i = 0; i < dynamicKafkaTopicFrom.forms.length; i++) {
    dynamicKafkaTopicFrom.forms[i] = {
      kafkaTopic: '',
      user: '',
      type: '',
      targetSink: '',
      dataFormat: '',
      description: '',
      dataExample: '',
      dataStruct: '',
    }
  }
}

// 提交所有表单
const submitForm = () => {
  const jsonArgs = {
    base: formBaseData,
    data: dynamicKafkaTopicFrom.forms
  }
  alert(JSON.stringify(jsonArgs))
  console.log(JSON.stringify(jsonArgs))
}

// ====================== onBeforeMount ======================
onBeforeMount(() => {
  // 初始化调用一次
  addForm();
})


</script>

<style lang="less" scoped>
&.my-layout-content {
  margin: 5px 5px;
  padding: 24px;
  background: #fff;
  minHeight: 280px;
}
</style>
