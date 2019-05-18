<template>
  <el-row display="margin-top:10px">
    <el-input v-model="input" placeholder="请输入集团ID" style="display:inline-table; width: 30%; float:left"></el-input>
    <el-input v-model="cardno" placeholder="请输入会员卡号" style="display:inline-table; width: 30%; float:left"></el-input>
    <el-button type="primary" @click="queryCard()" style="float:left; margin: 2px;">查询</el-button>
    <el-button type="primary" @click="delCard()" style="float:left; margin: 2px;">删除会员</el-button>
  </el-row>

</template>

<script>
export default {
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
