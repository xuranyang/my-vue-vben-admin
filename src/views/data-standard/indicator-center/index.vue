<template>
  <div>
    <PageWrapper title="指标中心">
      <template #headerContent>
        <div>根据数据指标体系构建</div>
      </template>

      <!-- scroll 随页面滚动的固定表头和滚动条  -->
      <a-table :dataSource="dataList" :columns="columns" :scroll="{ x: 2000 }"></a-table>
<!--  sticky 设置粘性头部和滚动条  -->
<!--  <a-table sticky :dataSource="dataList" :columns="columns" :scroll="{ x: 2000 }"></a-table>  -->
    </PageWrapper>
  </div>
</template>

<script setup lang="ts">
import {PageWrapper} from '/@/components/Page'
import {reactive, ref} from "vue";

interface DataIndexModel {
  theme_domain: string;
  theme_domain_lv2: string;
  theme_domain_lv3: string;
  atomic_indicator: string;
  where_dt: string;
  where: string;
  group_by: string;
  paisheng_indicator: string; // where_dt + group_by + where + atomic_indicator
  en_abbr: string;
  biz: string;
  opt_table: string;
  calc_func: string;
  data_unit: string;
  user: string;
  comment: string;
}

const dataList = reactive<DataIndexModel []>([
  {
    theme_domain: '房间域',
    theme_domain_lv2: '房间上下麦',
    theme_domain_lv3: '',
    atomic_indicator: '上麦时间',
    where_dt: '近1天',
    where: '首次',
    group_by: '用户',
    paisheng_indicator: '近1天用户首次上麦时间',
    en_abbr: 'first_upmic_time',
    biz: 'Gali',
    opt_table: 'dwm.dwm_room_user_upmic_di',
    calc_func: 'min(upmic_time)',
    data_unit: 'timestamp',
    user: '咖喱',
    comment: '用户当日首次上麦时间',
  },
]);

const columns = reactive([
  {
    title: '主题域',
    dataIndex: 'theme_domain',
    key: 'theme_domain',
    // width: 100,
  },
  {
    title: '二级主题',
    dataIndex: 'theme_domain_lv2',
    key: 'theme_domain_lv2',
    // width: 100,
  },
  {
    title: '三级主题',
    dataIndex: 'theme_domain_lv3',
    key: 'theme_domain_lv3',
    // width: 100,
  },
  {
    title: '原子指标',
    dataIndex: 'atomic_indicator',
    key: 'atomic_indicator',
    // width: 100,
  },
  {
    title: '时间周期',
    dataIndex: 'where_dt',
    key: 'where_dt',
    // width: 100,
  },
  {
    title: '修饰词',
    dataIndex: 'where',
    key: 'where',
    // width: 100,
  },
  {
    title: '维度',
    dataIndex: 'group_by',
    key: 'group_by',
    // width: 100,
  },
  {
    title: '派生指标',
    dataIndex: 'paisheng_indicator',
    key: 'paisheng_indicator',
    // width: 100,
  },
  {
    title: '英文缩写',
    dataIndex: 'en_abbr',
    key: 'en_abbr',
    // width: 100,
  },
  {
    title: '业务分类',
    dataIndex: 'biz',
    key: 'biz',
    // width: 100,
  },
  {
    title: '目标表',
    dataIndex: 'opt_table',
    key: 'opt_table',
    // width: 100,
  },
  {
    title: '计算函数',
    dataIndex: 'calc_func',
    key: 'calc_func',
    // width: 100,
  },
  {
    title: '数据单位',
    dataIndex: 'data_unit',
    key: 'data_unit',
    // width: 100,
  },
  {
    title: '负责人',
    dataIndex: 'user',
    key: 'user',
    // width: 100,
  },
  {
    title: '描述',
    dataIndex: 'comment',
    key: 'comment',
    // width: 100,
  },
])
</script>

<style scoped></style>
