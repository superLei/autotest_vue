<template>
  <div class="top">
    <div class="func">
      <el-row display="margin-top:10px">
        <el-input v-model="usernameSearch" placeholder="请输入用户名"
                  style="display:inline-table; width: 30%; float:left"></el-input>
        <el-button type="primary" style="float:left; margin: 2px;">查询</el-button>
        <el-button type="primary" @click="increase()" style="float:left; margin: 2px;">新增</el-button>
      </el-row>
    </div>
    <div class="case-table">
      <el-table :data="infoList" stripe style="width: 100%">
        <el-table-column label="商户号">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.fields.login_groupId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户名" style="text-align: center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.fields.login_userId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="密码" style="text-align: center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.fields.login_password }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" style="text-align: center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.fields.createtime }}</span>
        </template>
      </el-table-column>
        <el-table-column label="创建人" style="text-align: center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.fields.login_who }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="delCase(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="func2">
      <el-dialog title="登录信息" :visible.sync="dialogFormVisible" width="30%">
        <el-form :model="inputList" ref="inputList" :label-width="formLabelWidth">
          <!-- <el-form-item label="日期" :label-width="formLabelWidth">
            <el-date-picker  v-model="newdata.date"   type="date"  placeholder="选择日期"></el-date-picker>
          </el-form-item> -->
          <el-form-item label="集团号" prop='login_groupId'>
            <el-input v-model="inputList.login_groupId" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="用户名" prop='login_userId'>
            <el-input v-model="inputList.login_userId" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop='login_password'>
            <el-input v-model="inputList.login_password" auto-complete="off"></el-input>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handlecancel('inputList')">取 消</el-button>
          <el-button type="primary" @click="addLoginInfo()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      usernameSearch: '',
      formLabelWidth: '80px',
      inputList: {
        login_id: '',
        login_groupId: '',
        login_userId: '',
        login_password: '',
        login_who: '',
        createtime: ''
      },
      infoList: [],
      showUrl: 'http://127.0.0.1:8000/api/get_login',
      addInfo: 'http://127.0.0.1:8000/api/login_info',
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
    increase () {
      // 添加
      this.dialogFormVisible = true
    },
    handlecancel (formName) {
      // 页面关闭
      this.dialogFormVisible = false
      // 重置输入框数据
      this.$data = this.$refs[formName].resetFields()
    },
    handleEdit: function (index, row) {
      // 编辑数据
      this.inputList = row.fields
      this.isUpdate = true
      // this.inputList = Object.assign({}, row);
      // this.inputList.login_groupId = "login_groupId";
      this.dialogFormVisible = true
      console.log(this.inputList.login_groupId)
    },
    getCase () {
      // 获取
      this.$http.get(this.showUrl).then(response => {
        var res = JSON.parse(response.bodyText)
        if (res.code === '000') {
          this.infoList = res['infoList']
        } else {
          this.$message.error('查询用例失败')
          console.log(res['message'])
        }
      })
    },
    addLoginInfo () {
      this.$http
        .post(
          this.isUpdate ? this.editUrl : this.addInfo,
          JSON.stringify(this.inputList)
        )
        .then(response => {
          var res = JSON.parse(response.bodyText)
          if (res.code === '000') {
            // this.getCase()
            this.dialogFormVisible = false
            this.$refs['inputList'].resetFields()
            this.$message.info('添加成功')
          } else {
            this.$message.error(
              this.isUpdate ? 'update用户失败' : '添加用户失败'
            )
            console.log(res['message'])
          }
        })
    },
    delCase (index) {
      const caseName = this.caseList[index].fields.login_password
      this.$http.post(this.delUrl, { case_name: caseName }).then(response => {
        var res = JSON.parse(response.bodyText)
        if (res.code === '000') {
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
