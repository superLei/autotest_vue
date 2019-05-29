<template>
  <el-row  class="row-01">
    <el-select v-model="groupID" filterable placeholder="请选择" class="sel-groupid">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-input class="input-cardNo" v-model="cardno" placeholder="请输入会员卡号" style="display:inline-table; width: 30%; float:left"></el-input>
    <el-button type="primary" @click="queryCard()" style="float:left; margin: 2px;">查询</el-button>
    <el-button type="primary" @click="delCard()" style="float:left; margin: 2px;">删除会员</el-button>
  </el-row>

</template>

<script>
export default {
  data () {
    return {
      options: [{
        groupID: '1155',
        label: '集团1155'
      }, {
        groupID: '11157',
        label: '集团11157'
      }]
    }
  },
  mounted: function () {
    // this.drawRing(100, 100, 80)
  },
  methods: {
    queryCard () {
      this.$http
        .get('/api/index/findCard2?groupID=' + this.value + '&cardNO=' + this.cardno)
        .then(response => {
          try {
            var res = JSON.parse(response.bodyText)
            var cardId0 = (res[0] != null) ? res[0].cardid : -1
            var cardId1 = (res[1] != null) ? res[1].cardid : -1
          } catch (e) {
            console.log('捕获到异常：', e)
          }
          if (cardId0 >= 0 || cardId1 >= 0) {
            this.$message({
              message: '查询到有此会员',
              type: 'success'
            })
          } else {
            this.$message.error('错了哦，没有查询到~_~')
          }
        })
    },
    delCard () {
      this.$http
        .get('/api/index/delCard?groupID=' + this.groupID + '&cardNO=' + this.cardno)
        .then(response => {
          var res = JSON.parse(response.bodyText)
          if (res.cardNO >= 0) {
            this.$message('卡号' + (res.cardNO).toString() + '删除成功')
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
