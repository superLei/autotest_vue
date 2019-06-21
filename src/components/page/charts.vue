<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="会员">
      <el-input class="input-cardNo" v-model="cardno" placeholder="请输入手机号或卡号" style="display:inline-table; width: 30%; float:left"></el-input>
    </el-form-item>
    <el-form-item label="方式">
      <el-select v-model="flag" filterable placeholder="请选择" class="sel-groupid">
        <el-option
          v-for="item in flags"
          :key="item.flag"
          :label="item.label"
          :value="item.flag">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="集团">
      <el-select v-model="groupID" filterable placeholder="请选择" class="sel-groupid">
        <el-option
          v-for="item in options"
          :key="item.groupID"
          :label="item.label"
          :value="item.groupID">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="queryCard()" style="float:left; margin: 2px;">查询</el-button>
      <el-button type="primary" @click="delCard()" style="float:left; margin: 2px;">删除会员</el-button>
    </el-form-item>
  </el-form>

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
      }],
      flags: [{
        flag: 'mobile',
        label: '手机号'
      }, {
        flag: 'card',
        label: '会员卡号'
      }
      ],
      flag: 'mobile',
      groupID: '11157',
      // 默认值必须有
      cardno: ''
    }
  },
  methods: {
    queryCard () {
      this.$http
        .get('api/index/findCard2?groupID=' + this.groupID + '&cardNO=' + this.cardno + '&flag=' + this.flag)
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
        .get('api/index/delCard?groupID=' + this.groupID + '&cardNO=' + this.cardno + '&flag=' + this.flag)
        .then(response => {
          var res = JSON.parse(response.bodyText)
          console.log(res)
          if (res.status === true) {
            this.$message({
              message: this.flag + ': ' + res.cardNO + '\n删除成功',
              type: 'success'
            })
          } else {
            this.$message.error(res.cardNO + '\n删除失败')
          }
        })
    }
  }

}
</script>
<style scoped>
  .sel-groupid{
    width: 30%;
    float:left
  }
</style>
