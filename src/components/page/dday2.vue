<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item><a href="/dday">活动管理</a></el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: '/dday'}" >活动列表</el-breadcrumb-item>
    <el-breadcrumb-item>活动详情</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
import VeRing from 'v-charts/lib/ring'
export default {
  created: function () {
    this.chartData = {
      columns: ['成功', '失败'],
      rows: [
        { '成功': 99, '失败': 1 }
        // { 1: '成功', 99: '失败' }
      ]
    }
    this.chartSettings = {
      limitShowNum: 3,
      hoverAnimation: false,
      dataType: 'percent',

      dimension: '成功',
      // metrics: ['成功', '失败'],
      labelLine: {
        show: false,
        length: 1
      },
      label: {
        // formatter: '{b}{d}',
        // color: '#303133'
      }
    }
    this.chartColors = ['#67C23A', '#F56C6C']
  },

  components: { VeRing }

}
</script>

<style scoped>

</style>
