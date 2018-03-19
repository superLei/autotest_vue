<template>
     <div>
    <ve-line :data="chartData" :settings="chartSettings"></ve-line>
  </div>
</template>
<!--https://elemefe.github.io/v-charts/#/pie-->
<script>
import VeLine from 'v-charts/lib/line'
export default {
  created: function () {
    this.chartData = {
      columns: ['成功', '失败'],
      rows: [
        { '成功': 99, '失败': 1, '日期': '1月1日' },
        { '成功': 88, '失败': 12, '日期': '1月2日' },
        { '成功': 77, '失败': 23, '日期': '1月3日' },
        { '成功': 66, '失败': 34, '日期': '1月4日' },
        { '成功': 1, '失败': 99, '日期': '1月5日' }
      ]
    }
    this.chartSettings = {
      limitShowNum: 1,
      metrics: ['成功', '失败'],
      dimension: ['日期']
      // lineStyle: {
      //   color: ['#61a0a8']
      // },
      // itemStyle: {
      //   color: ['#d48265']
      // }
    }
  },
  components: { VeLine }

}
</script>

<style scoped>

</style>
