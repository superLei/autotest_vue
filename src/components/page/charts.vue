<template>
  <el-row  class="row-01">
    <el-select v-model="value" filterable placeholder="请选择" class="sel-groupid">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <!--<el-input v-model="input" placeholder="请输入集团ID" style="display:inline-table; width: 30%; float:left"></el-input>-->
    <el-input v-model="cardno" placeholder="请输入会员卡号" style="display:inline-table; width: 30%; float:left"></el-input>
    <el-button type="primary" @click="queryCard()" style="float:left; margin: 2px;">查询</el-button>
    <el-button type="primary" @click="delCard()" style="float:left; margin: 2px;">删除会员</el-button>
  </el-row>

</template>

<script>
export default {
  data () {
    return {
      options: [{
        value: '1155',
        label: '集团1155'
      }, {
        value: '11157',
        label: '集团11157'
      }],
      value: ''
    }
  },
  mounted: function () {
    // this.drawRing(100, 100, 80)
  },
  methods: {
    queryCard () {
      this.$http
        .get('http://127.0.0.1:8088/index/findCard2?groupID=' + this.input + '&cardNO=' + this.cardno)
        .then(response => {
          var res = JSON.parse(response.bodyText)
          if (res[0].cardid >= 0) {
            this.$message.info('ok')
          } else {
            this.$message.error((res[0].cardid).toString())
          }
        })
    },
    delCard () {
      this.$http
        .get('http://127.0.0.1:8088/index/delCard?groupID=' + this.input + '&cardNO=' + this.cardno)
        .then(response => {
          var res = JSON.parse(response.bodyText)
          if (res.cardNO >= 0) {
            this.$message.info('卡号' + (res.cardNO).toString() + '删除成功')
          } else {
            this.$message.error((res.cardNO).toString() + '删除失败')
          }
        })
    }
  }

}
</script>
<style scoped>
  .row-01{
    margin-top:10px;
  }
  .sel-groupid{
    width: 30%;
    float:left
  }
</style>
