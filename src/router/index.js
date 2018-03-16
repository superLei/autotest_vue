import Vue from 'vue'
import Router from 'vue-router'
import sidebar from '@/components/public/sidebar'
import navmenu from '@/components/public/navmenu'
import dday from '@/components/page/dday'
import Test1 from '@/components/public/Test1'
import tday from '@/components/page/tday'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'sidebar',
      component: sidebar
    },
    // {
    //   path: '/',
    //   name: 'navmenu',
    //   component: navmenu
    // },
    {
      path: '/dday',
      component: dday
    },
    {
      path: '/Test1',
      component: Test1
    },
    {
      path: '/tday',
      component: tday
    }
  ]
})
