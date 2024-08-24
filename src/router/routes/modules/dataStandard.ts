import type { AppRouteModule } from '/@/router/types'

import { LAYOUT } from '/@/router/constant'
import { t } from '/@/hooks/web/useI18n'

const dataStandard: AppRouteModule = {
  path: '/dataStandard',
  name: 'DataStandard',
  component: LAYOUT,
  redirect: '/dataStandard/name-rules',
  meta: {
    hideChildrenInMenu: false, // 不隐藏
    icon: 'ion:grid-outline',
    title: t('routes.dataStandard.dataStandardManagement'),
    orderNo: 12,
  },
  children: [
    {
      path: 'name-rules',
      name: 'NameRules',
      component: () => import('/@/views/data-standard/name-rules/index.vue'),
      meta: {
        title: t('routes.dataStandard.nameRules'),
        icon: 'ion:grid-outline',
        hideMenu: false, // 不隐藏
      },
    },

    {
      path: 'data-explore',
      name: 'DataExplore',
      component: () => import('/@/views/data-standard/data-explore/index.vue'),
      meta: {
        title: t('routes.dataStandard.dataExplore'),
        icon: 'ion:grid-outline',
        hideMenu: false, // 不隐藏
      },
    },

    {
      path: 'indicator-center',
      name: 'IndicatorCenter',
      component: () => import('/@/views/data-standard/indicator-center/index.vue'),
      meta: {
        title: t('routes.dataStandard.indicatorCenter'),
        icon: 'ion:grid-outline',
        hideMenu: false, // 不隐藏
      },
    },
  ],
}

export default dataStandard
