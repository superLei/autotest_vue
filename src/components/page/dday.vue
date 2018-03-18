<template>
    <div class="today">
    <div class="func">
    <el-input placeholder="请输入用例名称" suffix-icon="el-icon-search" v-model="input21" style="width: 13%; float:left" clearable>
    </el-input>&nbsp;&nbsp;
      <el-button type="primary" icon="el-icon-search" @click="searchCase()">查询</el-button>
      <el-button type="primary" icon="el-icon-plus" @click="increase()">添加用例</el-button>
      </div><br>
      <div class="case-table">
        <el-table :data="caseList"   stripe  style="width: 100%">
          <el-table-column label="功能模块">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.fields.case_func }}</span>
            </template>
          </el-table-column>
          <el-table-column label="用例名称"  style="text-align: center">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.fields.case_name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="请求数据"  style="text-align: center">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.fields.case_input }}</span>
            </template>
          </el-table-column>
          <el-table-column label="期望结果"  style="text-align: center">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.fields.case_result }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="small"  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="small" type="danger" @click="delCase(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
        <div>
          <el-dialog title="用例详情" :visible.sync="dialogFormVisible" width="30%">
            <el-form :model="inputList"  ref="inputList" :label-width="formLabelWidth">
              <!-- <el-form-item label="日期" :label-width="formLabelWidth">
                <el-date-picker  v-model="newdata.date"   type="date"  placeholder="选择日期"></el-date-picker>
              </el-form-item> -->
                <el-form-item label="用例序号"  prop ='case_id'>
                <el-input v-model="inputList.case_id" auto-complete="off"></el-input>
              </el-form-item>
                <el-form-item label="用例功能"  prop ='case_func'>
                <el-input v-model="inputList.case_func" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="用例名称"  prop ='case_name'>
                <el-input  v-model="inputList.case_name" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="请求数据"  prop ='case_input'>
                <el-input v-model="inputList.case_input" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="期望结果" prop ='case_result'>
                <el-input v-model="inputList.case_result" auto-complete="off"></el-input>
              </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="handlecancel('inputList')">取 消</el-button>
              <el-button type="primary" @click="addCase()">确 定</el-button>
            </div>
          </el-dialog>
        </div>
    </div>
</template>

<script>
export default {
  data: function () {
    return {
      input21: '',
      formLabelWidth: '80px',
      inputList: {
        case_id: '',
        case_func: '',
        case_name: '',
        case_input: '',
        case_result: '',
        case_time: ''
      },
      caseList: [],
      showUrl: 'http://127.0.0.1:8000/api/show_cases',
      addUrl: 'http://127.0.0.1:8000/api/add_case',
      delUrl: 'http://127.0.0.1:8000/api/del_case',
      editUrl: 'http://127.0.0.1:8000/api/edit_case',
      searchUrl: 'http://127.0.0.1:8000/api/search_case',
      dialogTableVisible: false,
      dialogFormVisible: false
    }
  },
  mounted: function () {
    this.getCase()
  },
  methods: {
    getCase () {
      // 获取
      this.$http.get(this.showUrl).then(response => {
        var res = JSON.parse(response.bodyText)
        if (res.code === '000') {
          this.caseList = res['caseList']
        } else {
          this.$message.error('查询用例失败')
          console.log(res['message'])
        }
      })
    },
    addCase () {
      // 添加
      // debugger
      this.$http
        .post(this.addUrl, JSON.stringify(this.inputList))
        .then(response => {
          var res = JSON.parse(response.bodyText)
          if (res.code == '000') {
            this.getCase()
            this.dialogFormVisible = false
            this.$refs['inputList'].resetFields()
          } else {
            this.$message.error('添加用例失败')
            console.log(res['message'])
          }
        })
      // this.newdata = "";
      // this.dialogFormVisible = true;
    },
    increase () {
      // 添加
      this.dialogFormVisible = true
    },
    handlecancel (formName) {
      // 取消
      this.dialogFormVisible = false
      this.$data = this.$refs[formName].resetFields()
    },

    caseEdit (index, row) {
      // 编辑
      this.dialogFormVisible = true
      // this.$data = this.$refs[formName].resetFields();
      this.inputList = row // 把当行的值赋给InputList
      this.$http
        .post(this.editUrl, JSON.stringify(this.inputList))
        .then(response => {
          var res = JSON.parse(response.bodyText)
          if (res.code == '000') {
            this.getCase()
            this.dialogFormVisible = false
            // this.$refs['inputList'].resetFields()
          } else {
            this.$message.error('更新用例失败')
            console.log(res['message'])
          }
        })
    },
    handleEdit: function (index, row) {
      // 编辑数据
      debugger
      this.inputList = row
      // this.inputList = Object.assign({}, row);
      // this.inputList.case_id = "case_id";
      this.dialogFormVisible = true
      console.log(this.inputList.case_id)
    },
    searchCase () {
      if (this.input21 == '') {
        return
      }
      const case_name = this.input21
      this.$http.post(this.searchUrl, { case_name }).then(response => {
        var res = JSON.parse(response.bodyText)
        if (res.code == '000') {
          // this.caseList.splice(index, 1); // 1就是删除一行
          this.caseList = res['caseList']
          // this.dialogFormVisible = false;
        } else {
          this.$message.error('没有找到' + this.input21)
          console.log(res['message'])
        }
      })
    },
    delCase (index) {
      const case_name = this.caseList[index].fields.case_name
      this.$http.post(this.delUrl, { case_name }).then(response => {
        var res = JSON.parse(response.bodyText)
        if (res.code == '000') {
          // this.caseList.splice(index, 1); // 1就是删除一行
          this.getCase()
          // this.dialogFormVisible = false;
        } else {
          this.$message.error('删除失败')
          console.log(res['message'])
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
