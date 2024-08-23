import type { AppRouteModule } from '/@/router/types'

import { LAYOUT } from '/@/router/constant'
import { t } from '/@/hooks/web/useI18n'

const about: AppRouteModule = {
  path: '/about',
  name: 'About',
  component: LAYOUT,
  redirect: '/about/index',
  meta: {
    // hideChildrenInMenu: true,
    icon: 'simple-icons:about-dot-me',
    title: t('routes.dashboard.about'),
    orderNo: 100000,
  },
  children: [
    {
      path: 'index',
      name: 'AboutPage',
      component: () => import('/@/views/sys/about/index.vue'),
      meta: {
        title: t('routes.dashboard.about'),
        icon: 'simple-icons:about-dot-me',
        hideMenu: true,
      },
    },
    {
      path: 'https://doc.vvbin.cn/guide/introduction.html',
      name: 'DocExternal',
      // component: () => import('/@/views/sys/iframe/FrameBlank.vue'),
      meta: {
        title: t('routes.dashboard.documentExternal'),
        icon: 'logos:vitejs',
      },
    },
    {
      path: 'doc',
      name: 'Doc',
      component: () => import('/@/views/sys/iframe/index.vue'),
      meta: {
        frameSrc: 'https://doc.vvbin.cn/guide/introduction.html',
        title: t('routes.dashboard.documentInternal'),
        icon: 'devicon:github',
      },
    },
  ],
}

export default about
