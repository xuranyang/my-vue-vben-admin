import type { AppRouteModule } from '/@/router/types'

import { LAYOUT } from '/@/router/constant'
import { t } from '/@/hooks/web/useI18n'

const dataStandard: AppRouteModule = {
  path: '/dataStandard',
  name: 'DataStandard',
  component: LAYOUT,
  redirect: '/dataStandard/index',
  meta: {
    hideChildrenInMenu: false, // 不隐藏
    icon: 'ion:grid-outline',
    title: t('routes.dataStandard.dataStandardManagement'),
    orderNo: 12,
  },
  children: [
    {
      path: 'index',
      name: 'NameRules',
      component: () => import('/@/views/data-standard/name-rules/index.vue'),
      meta: {
        title: t('routes.dataStandard.nameRules'),
        icon: 'ion:grid-outline',
        hideMenu: false, // 不隐藏
      },
    },
  ],
}

export default dataStandard
