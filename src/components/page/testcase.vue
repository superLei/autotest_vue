<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-button style="float: right;" type="primary" size="medium" @click="showDialogForm()">添加用例</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%" >
      <el-table-column label="功能模块" width="220">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.fields.funDescription }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用例名称" style="text-align: center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.fields.caseDescription }}</span>
        </template>
      </el-table-column>
      <el-table-column label="请求路径" style="text-align: center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.fields.requestPath }}</span>
        </template>
      </el-table-column>
      <el-table-column label="请求数据" style="text-align: center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.fields.requestJson }}</span>
        </template>
      </el-table-column>
      <el-table-column label="期望结果" style="text-align: center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.fields.desiredResult }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="220">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="delCase(scope.$index)">删除</el-button>
          <el-button size="small" type="success" @click="executeCase(scope.$index)">执行</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="用例信息" :visible.sync="dialogFormVisible" width="45%" @close="handlecancel('inputList')">
      <el-form :model="inputList" ref="inputList" label-width="80px">
        <el-form-item label="功能模块">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in optionData1"
              :key="item.fields.functionID"
              :label="item.fields.funDescription"
              :value="item.fields.functionID">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="测试环境" prop='envComments'>
          <el-radio-group v-model="inputList.case_list.envID">
            <el-radio :label=1>pre</el-radio>
            <el-radio :label=2>dohko</el-radio>
            <el-radio :label=3>线上</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="请求路径" prop='requestPath'>
          <el-input v-model="inputList.case_list.requestPath" ></el-input>
        </el-form-item>
        <el-form-item label="登录接口">
          <el-switch v-model="inputList.case_list.isLogin"></el-switch>
        </el-form-item>
        <el-form-item label="请求方式">
          <el-radio-group v-model="inputList.case_list.requestMethod">
            <el-radio :label=0>post</el-radio>
            <el-radio :label=1>get</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="内容Type">
          <el-radio-group v-model="inputList.case_list.headerID">
            <el-radio :label=1>application/json</el-radio>
            <el-radio :label=0>application/x-www-form-urlencoded</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="请求数据" prop='requestJson'>
          <el-input v-model="inputList.case_list.requestJson" ></el-input>
        </el-form-item>

        <el-form-item label="期望结果" prop='desiredResult'>
          <el-input v-model="inputList.case_list.desiredResult" ></el-input>
        </el-form-item>
        <el-form-item label="用例描述" prop='caseDescription'>
          <el-input v-model="inputList.case_list.caseDescription" type="textarea"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handlecancel('inputList')">取 消</el-button>
        <el-button type="primary" @click="addCase()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  name: 'testcase',
  data () {
    return {
      dialogFormVisible: false,
      case_url: 'http://127.0.0.1:8000/api/query_case',
      case_env_url: 'http://127.0.0.1:8000/api/query_case_env',
      case_func_url: 'http://127.0.0.1:8000/api/case_func',
      execute_case_url: 'http://127.0.0.1:8000/api/execute_case',
      value: '',
      optionData1: [],
      inputList: {
        operation: 'add',
        case_list: {
          caseDescription: '',
          functionID: 0,
          funDescription: '',
          envID: 0,
          envUrl: '',
          requestJson: '',
          requestPath: '',
          desiredResult: '',
          requestMethod: 0,
          creator: '',
          headerID: 1,
          isLogin: 0
        }
      },
      tableData: [],
      tag: {
        operation: 'query',
        caseID: ''
      }
    }
  },
  mounted: function () {
    this.showFunc()
    this.showCase()
  },
  methods: {
    addCase () {
      this.inputList.case_list.functionID = this.value
      // this.inputList.case_list.funDescription = this.label
      this.$http
        .post(this.case_url, this.inputList)
        .then(response => {
          var res = JSON.parse(response.bodyText)
          if (res.code === '000') {
            // 关闭新建窗口
            this.dialogFormVisible = false
            // 显示数据
            this.showCase()
          } else {
            // 关闭新建窗口
            this.dialogFormVisible = false
            this.$message.error('添加失败，请重试')
            console.log(res['msg'])
          }
        })
    },
    showCase () {
      this.$http
        .post(this.case_url, this.tag)
        .then(response => {
          var res = JSON.parse(response.bodyText)
          if (res.code === '000') {
            // 绑定返回数据到组合的list中
            this.tableData = res['case']
          } else {
            this.$message.error('查询失败')
            console.log(res['msg'])
          }
        })
    },
    executeCase (index) {
      this.$http
        .post(this.execute_case_url, this.tableData[index].fields)
        .then(response => {
          var res = JSON.parse(response.bodyText)
          if (res.code === '000') {
            // 123
            this.$notify({
              title: '成功',
              message: '执行成功',
              type: 'success'
            })
          } else {
            this.$message.error('失败')
            console.log(res['msg'])
          }
        })
    },
    showFunc () {
      this.$http
        .post(this.case_func_url, this.tag)
        .then(response => {
          var res = JSON.parse(response.bodyText)
          if (res.code === '000') {
            // 绑定返回数据到组合的list中
            this.optionData1 = JSON.parse(JSON.stringify(res['func']))
          } else {
            this.$message.error('查询失败')
            console.log(res['msg'])
          }
        })
    },
    showDialogForm () {
      this.dialogFormVisible = true
    },
    handlecancel (formName) {
      this.$refs[formName].resetFields()
      this.inputList = {
        operation: 'add',
        case_list: {
          caseDescription: '',
          functionID: 0,
          funDescription: '',
          envID: 0,
          envUrl: '',
          requestJson: '',
          requestPath: '',
          desiredResult: '',
          requestMethod: 0,
          creator: '',
          headerID: 1,
          isLogin: 0
        }
      }
      // 取消
      this.dialogFormVisible = false
      // this.data = this.inputList[formName].resetFields()
    },
    handleEdit: function (index, row) {
      // 将行数据赋值到case_list中
      this.inputList.case_list = row.fields
      this.value = row.fields
      // 显示编辑窗口
      this.dialogFormVisible = true
      // debugger
      // console.log(this.inputList.case_func)
    }
  }
}
</script>

<style scoped>
  .box-card {
    box-shadow: 9px 2px 19px #cbd7ef;
  }

  .clearfix:after {
    clear: both
  }

</style>
