<template>
  <PageWrapper title="命名标准-词根管理">
    <template #headerContent>
      <div>实现统一的词根命名标准</div>
    </template>

    <a-layout-content
      :style="{ margin: '0px 16px 0px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
    >
      <a-input-search
        style="width: 20%; margin-bottom: 8px; margin-right: 5px"
        v-model:value="searchInfo"
        placeholder="请输入搜索内容..."
        enter-button="搜索"
        @search="onSearch"
      />

      <!-- 刷新按钮  -->
      <a-button @click="refreshPage" type="primary" ghost>刷新</a-button>
      <!-- 新增按钮-居右显示 -->
      <a-button
        type="primary"
        shape="round"
        class="green-button"
        style="float: right; margin-right: 5%"
      >新增
      </a-button>

      <a-table :dataSource="nameRulesFilter" :columns="nameRulesColumns">
        <!-- bodyCell表格主体部分 -->
        <template #bodyCell="{ column, record }">
          <template v-if="column.key !== 'op'">
            <span>{{ record[column.key] }}</span>
          </template>

          <template v-if="column.key === 'op'">
            <a-button type="warning" style="margin-right: 5px">编辑</a-button>
            <a-button type="primary" danger>删除</a-button>
          </template>
        </template>
      </a-table>
    </a-layout-content>
  </PageWrapper>
</template>

<script setup lang="ts">
  import { PageWrapper } from '/@/components/Page'
  import { computed, ref } from 'vue'

  const searchInfo = ref('')

  function onSearch() {
    // 实现搜索逻辑(后端过滤)
  }

  // 通过 computed 实现前端实时过滤
  const nameRulesFilter = computed(() => {
    if (!searchInfo.value) return nameRules
    return nameRules.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchInfo.value.toLowerCase()),
      ),
    )
  })

  const nameRulesColumns = [
    {
      title: '标准编号',
      dataIndex: 'rule_id',
      key: 'rule_id',
    },
    {
      title: '标准英文',
      dataIndex: 'name_en',
      key: 'name_en',
    },
    {
      title: '标准英文缩写',
      dataIndex: 'name_en_abbr',
      key: 'name_en_abbr',
    },
    {
      title: '标准中文',
      dataIndex: 'name_zh',
      key: 'name_zh',
    },
    {
      title: '备注说明',
      dataIndex: 'notes',
      key: 'notes',
    },
    {
      title: '是否启用',
      dataIndex: 'is_use',
      key: 'is_use',
    },
    {
      title: '更新时间',
      dataIndex: 'update_time',
      key: 'update_time',
    },
    {
      title: '操作',
      dataIndex: 'op',
      key: 'op',
    },
  ]

  const nameRules = [
    {
      rule_id: '001',
      name_en: 'amount',
      name_en_abbr: 'amt',
      name_zh: '金额',
      notes: '与金钱等相关,如:消费金额',
      is_use: '是',
      update_time: '2024-08-25 03:53:55',
    },
    {
      rule_id: '002',
      name_en: 'count',
      name_en_abbr: 'cnt',
      name_zh: '次数',
      notes: '与数量等相关,如:充值次数',
      is_use: '是',
      update_time: '2024-08-25 03:53:56',
    },
    {
      rule_id: '003',
      name_en: 'first',
      name_en_abbr: 'first',
      name_zh: '首次',
      notes: '指第一次',
      is_use: '是',
      update_time: '2024-08-25 03:53:57',
    },
    {
      rule_id: '003',
      name_en: 'last',
      name_en_abbr: 'last',
      name_zh: '末次',
      notes: '指最后一次',
      is_use: '是',
      update_time: '2024-08-25 03:53:58',
    },
  ]

  function refreshPage() {
    window.location.reload()
  }
</script>

<style lang="less" scoped>
  .green-button {
    background-color: #52c41a !important;
    border-color: #52c41a !important;
  }

  .green-button:hover,
  .green-button:focus {
    background-color: #73d13d !important;
    border-color: #73d13d !important;
  }
</style>
