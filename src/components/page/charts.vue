<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="集团ID">
      <el-input class="input-groupID" v-model="groupID" placeholder="请输入集团ID" style="display:inline-table; width: 30%; float:left"></el-input>
    </el-form-item>
    <el-form-item label="会员信息">
      <el-input class="input-cardNo" v-model="cardno" placeholder="请输入手机号或卡号" style="width: 30%; float:left">
        <el-select v-model="flag"  slot="prepend" placeholder="请选择" style="width: 60px;">
          <el-option
            v-for="item in flags"
            :key="item.flag"
            :label="item.label"
            :value="item.flag">
          </el-option>
        </el-select>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="queryCard()" style="float:left; margin: 2px;">查询</el-button>
      <el-button type="warning" @click="delCard()" style="float:left; margin: 2px;">删除会员</el-button>
    </el-form-item>
  </el-form>

</template>

<script>
export default {
  data () {
    return {
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
      cardno: '',
      form: {}
    }
  },
  methods: {
    queryCard () {
      this.$http
        .get('api/index/findCard2?groupID=' + this.groupID + '&cardNO=' + this.cardno + '&flag=' + this.flag)
        .then(response => {
          try {
            var res = JSON.parse(response.bodyText)
            if (res.length > 0) {
              if (res[0].action === 2) {
                this.$message({
                  message: '会员人已被删除',
                  type: 'warning'
                })
              } else {
                this.$message({
                  message: '会员存在',
                  type: 'success'
                })
              }
            } else {
              this.$message.error('无会员卡信息')
            }
          } catch (e) {
            console.log('捕获到异常：', e)
          }
        })
    },
    delCard () {
      this.$http
        .get('api/index/delCard?groupID=' + this.groupID + '&cardNO=' + this.cardno + '&flag=' + this.flag)
        .then(response => {
          try {
            var res = JSON.parse(response.bodyText)
            console.log(res)
          } catch (e) {
            this.$message.error('删除失败')
            console.log('捕获到异常：', e)
          }
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
<style>
  .el-select .el-input {
    width: 30px;
  }
  .el-input-group__prepend {
    width: auto;
    background-color: #fff;
  }
</style>
