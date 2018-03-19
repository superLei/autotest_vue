import Vue from 'vue'
import Router from 'vue-router'
import charts from '@/components/page/charts'
import charts2 from '@/components/page/charts2'
import charts3 from '@/components/page/charts3'
import dday from '@/components/page/dday'
import Test1 from '@/components/public/Test1'
import tday from '@/components/page/tday'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/charts2',
      name: 'charts2',
      component: charts2
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
      path: '/Test1',
      component: Test1
    },
    {
      path: '/tday',
      component: tday
    }
  ]
})
