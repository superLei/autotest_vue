import Vue from 'vue'
import Router from 'vue-router'
import charts from '@/components/page/charts'
import charts2 from '@/components/page/charts2'
import charts3 from '@/components/page/charts3'
import caseEnv from '@/components/page/caseEnv'
import testcase from '@/components/page/testcase'
import dday from '@/components/page/dday'
import clear from '@/components/page/clear'
import Test1 from '@/components/public/Test1'
import tday from '@/components/page/tday'
import test2 from '@/components/page/test2'
import test from '@/components/page/test'
import login from '@/components/page/login'
import chrometojson from '@/components/page/chrometojson'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(Router)
Vue.use(BootstrapVue)

export default new Router({
  // 去除地址中的#号
  mode: 'history',
  routes: [
    {
      path: '/charts2',
      name: 'charts2',
      component: charts2
    },
    {
      path: '/testcase',
      name: 'testcase',
      component: testcase
    },
    {
      path: '/caseEnv',
      name: 'caseEnv',
      component: caseEnv
    },
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '/test2',
      name: 'test2',
      component: test2
    },
    {
      path: '/charts',
      name: 'charts',
      component: charts
    },
    {
      path: '/charts3',
      name: 'charts3',
      component: charts3
    },
    {
      path: '/dday',
      component: dday
    },
    {
      path: '/clear',
      component: clear
    },
    {
      path: '/Test1',
      component: Test1
    },
    {
      path: '/tday',
      component: tday
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/chrometojson',
      component: chrometojson
    }
  ]
})
