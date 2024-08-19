import type {AppRouteModule} from '/@/router/types'

import {LAYOUT} from '/@/router/constant'
import {t} from '/@/hooks/web/useI18n'
import {RoleEnum} from "/@/enums/roleEnum";

const dataSecurity: AppRouteModule = {
  path: '/data-security',
  name: 'DataSecurity',
  component: LAYOUT,
  redirect: '/data-security/data-access-approval/kafka',
  meta: {
    roles: [RoleEnum.SUPER],
    hideChildrenInMenu: false, // 不隐藏
    icon: 'ion:grid-outline',
    title: t('routes.dataSecurity.dataSecurityManagement'),
    orderNo: 11,
  },
  children: [
    {
      path: 'data-access-approval',
      name: 'DataAccessApproval',
      component: LAYOUT,
      redirect: '/data-security/data-access-approval/kafka',
      meta: {
        hideChildrenInMenu: false, // 不隐藏
        icon: 'ion:grid-outline',
        title: '数据接入审批',
      },
      children: [
        {
          path: 'kafka',
          name: 'KafkaAccessApproval',
          component: () => import('/@/views/data-security/data-access-approval/kafka/index.vue'),
          meta: {
            title: 'Kafka接入审批',
            icon: 'ion:grid-outline',
            hideMenu: false, // 不隐藏
          },
        }
      ]
    }
  ],
}

export default dataSecurity
