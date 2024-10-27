<template>
  <div>
    <PageWrapper title="数据探查">
      <template #headerContent>
        <div>根据总线矩阵，探查数据域及相关信息</div>
      </template>

      <!-- 搜索 -->
      <a-input-search
        style="width: 20%; margin-bottom: 8px; margin-right: 5px"
        v-model:value="searchInfo"
        placeholder="请输入搜索内容..."
        enter-button="搜索"
        @search="onSearch"
      />

      <!-- 表格信息 -->
      <a-table
        :dataSource="dataListFilter"
        :columns="columns"
        :row-key="(record) => record.origin_datasource"
      >
        <template #expandedRowRender="{ record }">
          <div
            ><span style="font-weight: bolder; color: gray">具体说明：</span
            ><span>{{ record.desc_detail }}</span></div
          >
          <div
            ><span style="font-weight: bolder; color: gray">当前ODS表：</span
            ><span>{{ record.ods_tables }}</span></div
          >
          <div
            ><span style="font-weight: bolder; color: gray">相关DWD表：</span
            ><span>{{ record.dwd_tables }}</span></div
          >
        </template>
      </a-table>
    </PageWrapper>
  </div>
</template>

<script setup lang="ts">
  import { PageWrapper } from '/@/components/Page'
  import { computed, reactive, ref } from 'vue'

  enum DATASOURCE_TYPE {
    MYSQL = 'MySQL',
    TIDB = 'TiDB',
    KAFKA = 'Kafka',
    HTTP = 'Http',
  }

  const columns = reactive([
    {
      title: '数据域',
      dataIndex: 'data_domain',
      key: 'data_domain',
    },
    {
      title: '二级数据域',
      dataIndex: 'data_domain_lv2',
      key: 'data_domain_lv2',
    },
    {
      title: '三级数据域',
      dataIndex: 'data_domain_lv3',
      key: 'data_domain_lv3',
    },
    {
      title: '功能模块',
      dataIndex: 'func_model',
      key: 'func_model',
    },
    {
      title: '原始数据源',
      dataIndex: 'origin_datasource',
      key: 'origin_datasource',
    },
    {
      title: '功能描述',
      dataIndex: 'func_desc',
      key: 'func_desc',
    },
    {
      title: '数据源类型',
      dataIndex: 'datasource_type',
      key: 'datasource_type',
    },
  ])

  interface DataExploreRowModel {
    data_domain: string //数据域
    data_domain_lv2: string | null //二级数据域
    data_domain_lv3: string | null //三级数据域
    func_model: string //功能模块
    origin_datasource: string // 原始数据源
    func_desc: string // 功能描述
    datasource_type: string // 数据源类型
    desc_detail: string | null //具体说明
    ods_tables: string // ods表
    dwd_tables: string // 相关dwd表
  }

  const dataList = reactive<DataExploreRowModel[]>([
    {
      data_domain: '交易域',
      data_domain_lv2: '充值',
      data_domain_lv3: null,
      func_model: '充值',
      origin_datasource: 't_recharge_log',
      func_desc: '充值记录',
      datasource_type: DATASOURCE_TYPE.MYSQL,
      desc_detail: '用户常规充值明细',
      ods_tables: 'ods_t_recharge_log_di',
      dwd_tables: 'dwd_trd_recharge_pay_di',
    },
    {
      data_domain: '交易域',
      data_domain_lv2: '退款',
      data_domain_lv3: null,
      func_model: '退款',
      origin_datasource: 't_refund_log',
      func_desc: '退款记录',
      datasource_type: DATASOURCE_TYPE.MYSQL,
      desc_detail: '用户常规退款明细',
      ods_tables: 'ods_t_refund_log_di',
      dwd_tables: 'dwd_trd_refund_detail_di',
    },
  ])

  // =================== 搜索 ===================
  const searchInfo = ref('')

  function onSearch() {
    // 实现搜索逻辑(后端过滤)
  }

  // 通过 computed 实现前端实时过滤
  const dataListFilter = computed(() => {
    if (!searchInfo.value) return dataList
    return dataList.filter((item) =>
      Object.values(item).some((value) =>
        value === null
          ? false
          : value.toString().toLowerCase().includes(searchInfo.value.toLowerCase()),
      ),
    )
  })
</script>

<style scoped></style>
