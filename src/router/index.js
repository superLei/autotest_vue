import Vue from 'vue'
import Router from 'vue-router'
import sidebar from '@/components/public/sidebar'
//const Dday = resolve => require(['@/components/page/dday'], resolve)   //懒加载
import dday from '@/components/page/dday'
import Test1 from '@/components/public/Test1'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'sidebar',
      component: sidebar
    },
    {
      path: '/dday',
      component: dday
    },
    {
      path: '/Test1',
      component: Test1
    }
  ]
})
