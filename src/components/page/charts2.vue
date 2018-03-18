<template>
     <div>
    <ve-ring :data="chartData" :settings="chartSettings"></ve-ring>
  </div>
</template>
<!--https://elemefe.github.io/v-charts/#/pie-->
<script>
import VeRing from 'v-charts/lib/ring'
export default {
  created: function () {
    this.chartData = {
      columns: ['日期', '成本', '利润'],
      rows: [
        { '日期': '1月1号', '成本': 123, '利润': 3 },
        { '日期': '1月2号', '成本': 1223, '利润': 6 },
        { '日期': '1月3号', '成本': 2123, '利润': 9 },
        { '日期': '1月4号', '成本': 4123, '利润': 12 },
        { '日期': '1月5号', '成本': 3123, '利润': 15 },
        { '日期': '1月6号', '成本': 7123, '利润': 20 },
        { '日期': '1月7号', '成本': 4123, '利润': 20 },
        { '日期': '1月8号', '成本': 1123, '利润': 20 },
        { '日期': '1月9号', '成本': 5223, '利润': 20 },
        { '日期': '1月1号0', '成本': 9123, '利润': 20 },
        { '日期': '1月1号1', '成本': 4123, '利润': 20 }
      ]
    }
    this.chartSettings = {
      limitShowNum: 1
    }
  },
  components: { VeRing }

}
</script>

<style scoped>

</style>
