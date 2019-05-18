<template>
  <div>
    <el-row>
      <el-col :span="12">
        <div class="grid-content bg-purple-dark">
          <el-button type="primary"  @click="posttext" class="btnCss">提交</el-button>
          <el-input
            type="textarea"
            :rows="38"
            placeholder="请输入内容"
            v-model="textarea">
          </el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-dark showText">
          <p>查看结果：</p>
          <p>{{result}}</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: '',
  data: function () {
    return {
      textarea: '',
      result: '',
      url: '/api/index/tojson'
    }
  },
  created () {

  },
  methods: {
    save () {
      this.result = '我是苏大强！天下无敌~'
    },
    posttext () {
      console.log('pppppp')
      this.$http
        .post(
          this.url,
          this.textarea,
          {credentials: true}
        )
        .then(response => {
          // var res = JSON.parse(response.bodyText)
          this.result = response.bodyText
        })
    }
  }
}
</script>

<style scoped>
  .grid-content{
    height: 100vh;
    margin-left: 20px;
  }
  .showText{
    border-left: 1px solid #cccccc;
    padding-left: 20px;
    overflow: hidden;
    word-wrap: break-word;
  }
  .btnCss{
    margin-bottom: 10px;
  }
</style>
