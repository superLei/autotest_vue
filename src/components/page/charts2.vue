<template>
     <div>
    <ve-ring :data="chartData" :settings="chartSettings" :colors="chartColors" legend-position="bottom" tooltip-visible="false"></ve-ring>
  </div>
</template>
<!--https://elemefe.github.io/v-charts/#/pie-->
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
