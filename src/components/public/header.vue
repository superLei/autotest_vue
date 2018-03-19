<template>
   <div class="header">
      <div class="billlogo">自动化测试平台</div>
      <div class="userimgbox">
          <el-dropdown>
      <span class="el-dropdown-link">
             <img class="userimg" src="../../assets/logo.png">
      </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>账号设置</el-dropdown-item>
              <el-dropdown-item>我的主页</el-dropdown-item>
              <el-dropdown-item>安全退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
      </div>
   </div>
</template>

<script>
export default {
  name: '',
  data: function () {
    return {}
  }
}
</script>

<style scoped>
   .header{
      position:relative;
      top: 0;
      left: 0;
      width:100%;
      height:60px;
      line-height: 60px;
     color: white;
      background-color: #475669;
   }
  .billlogo{
    text-align: left;
    margin-left: 20px;
    float: left;
  }
  .userimgbox{
    float: right;
    height:60px;
  }
  .userimg{
    width: 50px;
    height: 50px;
    border-radius: 100%;
    margin-right: 40px;
    vertical-align:middle
  }
</style>
