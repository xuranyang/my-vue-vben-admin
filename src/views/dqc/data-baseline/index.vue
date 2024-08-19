<template>
  <div>
    <PageWrapper title="数据基线">
      <template #headerContent>
        <div>{{ searchInfoContent }}</div>
        <div>{{ currentDateRange }}</div>
      </template>
    </PageWrapper>

    <a-layout-content
      :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
    >
      <div>
        <a-input v-model:value="searchInfo.projectName" placeholder="请输入项目名"
                 class="my-input"/>
        <a-input v-model:value="searchInfo.jobName" placeholder="请输入任务名" class="my-input"/>

        <span style="margin-left: 10px;margin-right: 5px">请选择基线时间范围:</span>
        <a-time-range-picker
          v-model:value="rangeTime"
          :placeholder="['开始基线时间', '结束基线时间']"
          @change="onRangeChange"
          @ok="onRangeOk">
        </a-time-range-picker>

        <a-button type="primary" style="margin-right: 5px">
          <template #icon>
            <SearchOutlined/>
          </template>
          搜索
        </a-button>
        <a-button type="danger" @click="clickClear(searchInfo)">清空</a-button>

        <br><br>
        <a-table :dataSource="dataList" :columns="columns"/>
      </div>
    </a-layout-content>
  </div>
</template>

<script setup lang="ts">
import {PageWrapper} from '/@/components/Page'
import {SearchOutlined} from '@ant-design/icons-vue';
import {reactive, ref, computed, watch, defineComponent, Ref, toRef} from 'vue'

// const projectName = ref('')
// const jobName = ref('')

const searchInfo = reactive({
  projectName: ref(''),
  jobName: ref(''),
})

// const projectNameRef: Ref<string> = toRef(searchInfo, 'projectName')
// const jobNameRef: Ref<string> = toRef(searchInfo, 'jobName')

const columns = [
  {
    title: '项目名',
    dataIndex: 'projectName',
    key: 'projectName',
  },
  {
    title: '任务名',
    dataIndex: 'jobName',
    key: 'jobName',
  },
  {
    title: '重要等级',
    dataIndex: 'jobLevel',
    key: 'jobLevel',
  },
  {
    title: '基线时间',
    dataIndex: 'mustEndTime',
    key: 'mustEndTime',
  },
  {
    title: '破线时间',
    dataIndex: 'outEndTime',
    key: 'outEndTime',
  },
  {
    title: '预警类型',
    dataIndex: 'warnType',
    key: 'warnType',
  },
]

const dataList = reactive([
  {
    key: '1',
    projectName: '项目1',
    jobName: 'ods任务1',
    jobLevel: 1,
    mustEndTime: '06:30:00',
    outEndTime: '07:30:00',
    warnType: 'phone'
  },
  {
    key: '2',
    projectName: '项目1',
    jobName: 'ods任务2',
    jobLevel: 1,
    mustEndTime: '07:00:00',
    outEndTime: '08:00:00',
    warnType: 'dingtalk'
  }
])


// ======================= methods =======================
const clickClear = (obj) => {
  Object.keys(obj).forEach((key: string) => {
    obj[key] = ref('')
  })
}

import {Dayjs} from 'dayjs';
import dayjs from 'dayjs';


const rangeTime = ref<[Dayjs, Dayjs]>([
  dayjs('06:30:00', 'HH:mm:ss'),
  dayjs('08:30:00', 'HH:mm:ss'),
])

const currentDateRange: Ref<any> = ref([
  rangeTime.value[0].format('HH:mm:ss'),
  rangeTime.value[1].format('HH:mm:ss')
])


// function onRangeChange(value: [Dayjs, Dayjs], dateString: [string, string]){...}
const onRangeChange = (value: [Dayjs, Dayjs], dateString: [string, string]) => {
  console.log('Selected Time: ', value);
  console.log('Formatted Selected Time: ', dateString);
  currentDateRange.value = dateString
};

const onRangeOk = (value: [Dayjs, Dayjs]) => {
  console.log('onOk: ', value);
};

// ======================= watch =======================
// watch(searchInfo, (newValue, oldValue) => {
//   // 对于reactive来说,新的可以获取,老的获取不了
//   console.log("我是旧的:" + JSON.stringify(oldValue));
//   console.log("我是新的:" + JSON.stringify(newValue));
//   // newValue可以获取,但是old获取不了
// }, {immediate: true, deep: false});

// ======================= computed =======================
const searchInfoContent = computed(() => {
  return `项目名:${searchInfo.projectName} - 任务名:${searchInfo.jobName} | 时间范围:${currentDateRange.value[0]}~${currentDateRange.value[1]}`
});

</script>

<style lang="less" scoped>
&.my-input {
  width: 15%;
  margin-right: 5px;
}
</style>
