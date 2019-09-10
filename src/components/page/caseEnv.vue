<template>
  <div class="home" >
    <el-breadcrumb separator="/"  separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/caseEnv">添加环境</a></el-breadcrumb-item>
      <!--<el-breadcrumb-item :to="{ path: '/dday'}" >添加用例</el-breadcrumb-item>-->
      <el-breadcrumb-item>环境详情</el-breadcrumb-item>
    </el-breadcrumb>
    <!--换行-->
    <div><Br/></div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>~_~---></span>
        <el-button style="float: right; padding: 10px 15px" @click="showWindow()" type="primary">添加</el-button>
      </div>
      <el-row>
        <el-table :data="inputList.tableData" style="width: 100%" border @expand-change="see">

          <el-table-column type="expand" >
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="商品名称">
                  <span>{{ props.row.fields.run }}</span>
                </el-form-item>
                <el-form-item label="商品名称2">
                  <span>{{ props.row.fields.run2 }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <!--<el-table-column prop="id" label="功能描述" min-width="100">-->
          <!--<template scope="scope"> {{ scope.row.pk }} </template>-->
          <!--</el-table-column>-->
          <el-table-column prop="funDescription" label="测试地址" min-width="100">
            <template scope="scope"> {{ scope.row.fields.envUrl }} </template>
          </el-table-column>
          <el-table-column prop="creator" label="描述信息" min-width="100">
            <template scope="scope"> {{ scope.row.fields.envComments }} </template>
          </el-table-column>

        </el-table>
      </el-row>
      <el-dialog title="功能详情" :visible.sync="dialogFormVisible" width="30%">
        <el-form :model="inputList" ref="inputList" :label-width="formLabelWidth">
          <!-- <el-form-item label="日期" :label-width="formLabelWidth">
            <el-date-picker  v-model="newdata.date"   type="date"  placeholder="选择日期"></el-date-picker>
          </el-form-item> -->
          <el-form-item label="测试地址" prop='envUrl'>
            <el-input v-model="inputList.env_list.envUrl" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="描述信息" prop='envComments'>
            <el-input v-model="inputList.env_list.envComments" auto-complete="off"></el-input>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handlecancel('inputList')">取 消</el-button>
          <el-button type="primary" @click="addCaseFunc()">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      input: '',
      dialogFormVisible: false,
      bookList: [],
      add_func_url: 'http://127.0.0.1:8000/api/query_case_env',
      get_func_url: 'http://127.0.0.1:8000/api/query_case_env',
      inputList: {
        operation: 'add',
        env_list: {
          envUrl: '',
          envComments: ''
        },
        tableData: []
      },
      tag: {
        operation: 'query',
        functionID: ''
      }
    }
  },
  mounted: function () {
    this.showBooks()
  },
  methods: {
    addCaseFunc () {
      this.$http
        .post(this.add_func_url, this.inputList)
        .then(response => {
          var res = JSON.parse(response.bodyText)
          if (res.code === '000') {
            // 关闭新建窗口
            this.dialogFormVisible = false
            // 显示数据
            this.showBooks()
          } else {
            // 关闭新建窗口
            this.dialogFormVisible = false
            this.$message.error('功能添加失败，请重试')
            console.log(res['msg'])
          }
        })
    },
    showBooks () {
      this.$http
        .post(this.add_func_url, this.tag)
        .then(response => {
          var res = JSON.parse(response.bodyText)
          console.log(res)
          if (res.code === '000') {
            // 绑定返回数据到组合的list中
            this.inputList.tableData = res['case_env']
          } else {
            this.$message.error('查询失败')
            console.log(res['msg'])
          }
        })
    },
    see (row, expandedRows) {
      var arr = []
      this.bookList.forEach(book => {
        book.fields.run = 456
        book.fields.run2 = 4567
        arr.push(book)
      })
      this.bookList = arr
    },
    showWindow () {
      this.dialogFormVisible = true
    },
    handlecancel (formName) {
      // 取消
      this.dialogFormVisible = false
      this.$data = this.$refs[formName].resetFields()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .text {
    font-size: 14px;
  }

  .box-card {
    box-shadow: 9px 2px 19px #cbd7ef;
  }

  .clearfix:after {
    clear: both
  }
</style>
