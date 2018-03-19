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
      columns: [ '成功','失败'],
      rows: [
        {'成功': 99, '失败': 1 },
        {'成功': 1, '失败': 99 },
 
      ]
    }
    this.chartSettings = {
      limitShowNum: 1
    }
    this.chartColors = ['#67C23A', '#F56C6C',]
  },
  
  components: { VeRing }

}
</script>

<style scoped>

</style>
