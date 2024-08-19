import type { AppRouteModule } from '/@/router/types'

import { LAYOUT } from '/@/router/constant'
import { t } from '/@/hooks/web/useI18n'

const dqc: AppRouteModule = {
  path: '/dqc',
  name: 'DQC',
  component: LAYOUT,
  redirect: '/dqc/index',
  meta: {
    hideChildrenInMenu: false, // 不隐藏
    icon: 'ion:grid-outline',
    title: t('routes.dqc.dataQualityCenter'),
    orderNo: 10,
  },
  children: [
    {
      path: 'index',
      name: 'DqcDashboard',
      component: () => import('/@/views/dqc/dqc-dashboard/index.vue'),
      meta: {
        title: t('routes.dqc.dqcDashboard'),
        icon: 'ion:grid-outline',
        hideMenu: false, // 不隐藏
      },
    },
    {
      path: 'data-baseline',
      name: 'DataBaseline',
      component: () => import('/@/views/dqc/data-baseline/index.vue'),
      meta: {
        title: t('routes.dqc.dataBaseline'),
        icon: 'ion:grid-outline',
        hideMenu: false, // 不隐藏
      },
    },
    {
      path: 'data-schedule',
      name: 'DataSchedule',
      component: () => import('/@/views/dqc/data-schedule/index.vue'),
      meta: {
        title: t('routes.dqc.dataSchedule'),
        icon: 'ion:grid-outline',
        hideMenu: false, // 不隐藏
      },
    },
  ],
}

export default dqc
