<template>
    <div class="today">
      <el-button type="primary" icon="search">查询</el-button>
      <el-button type="primary" icon="plus" @click="increase()">添加用例</el-button>
      <div class="billtable">
        <el-table :data="caseList"   stripe fit>
          <el-table-column label="功能模块">
            <template scope="scope">
              <span style="margin-left: 10px">{{ scope.row.fields.case_func }}</span>
            </template>
          </el-table-column>
          <el-table-column label="用例名称"  style="text-align: center">
            <template scope="scope">
              <span style="margin-left: 10px">{{ scope.row.fields.case_name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="请求数据"  style="text-align: center">
            <template scope="scope">
              <span style="margin-left: 10px">{{ scope.row.fields.case_input }}</span>
            </template>
          </el-table-column>
          <el-table-column label="期望结果"  style="text-align: center">
            <template scope="scope">
              <span style="margin-left: 10px">{{ scope.row.fields.case_result }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template scope="scope">
              <el-button size="small"  @click="caseEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="small" type="danger" @click="delCase(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
        <div>
          <el-dialog title="用例详情" :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <!-- <el-form-item label="日期" :label-width="formLabelWidth">
                <el-date-picker  v-model="newdata.date"   type="date"  placeholder="选择日期"></el-date-picker>
              </el-form-item> -->
                <el-form-item label="用例序号" :label-width="formLabelWidth">
                <el-input v-model="inputList.case_id" auto-complete="off"></el-input>
              </el-form-item>
                <el-form-item label="用例功能" :label-width="formLabelWidth">
                <el-input v-model="inputList.case_func" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="用例名称" :label-width="formLabelWidth">
                <el-input  v-model="inputList.case_name" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="请求数据" :label-width="formLabelWidth">
                <el-input v-model="inputList.case_input" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="期望结果" :label-width="formLabelWidth">
                <el-input v-model="inputList.case_result" auto-complete="off"></el-input>
              </el-form-item>
              
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="addCase()">确 定</el-button>
            </div>
          </el-dialog>
        </div>
    </div>
</template>

<script>
    import querytime from '../public/time'
    export default {
        
       
        data: function () {
            return {
              inputList: {},
              caseList: [],
              showUrl: 'http://127.0.0.1:8000/api/show_cases',
              addUrl: 'http://127.0.0.1:8000/api/add_case',
              delUrl: 'http://127.0.0.1:8000/api/del_case',
              dialogTableVisible: false,
              dialogFormVisible: false,
            }
        },
        mounted: function() {
            this.getCase()
           },
        methods:{
          getCase (){  // 获取
            this.$http.get(this.showUrl).then(
              (response) => {
                var res = JSON.parse(response.bodyText)
                if(res.code == '000') {
                  this.caseList = res['caseList']
                } else {
                  this.$message.console.error('查询用例失败');
                  console.log(res['message'])
                }
              }
            )
          },
          addCase (){  //添加
          // debugger
            this.$http.post(this.addUrl, JSON.stringify(this.inputList)).then(
              (response) => {
                var res = JSON.parse(response.bodyText)
                if(res.code == '000') {
                  this.getCase()
                  this.dialogFormVisible = false;
                } else {
                  this.$message.console.error('添加用例失败')
                  console.log(res['message'])
                }
              }
              
            )
            this.newdata="";
            this.dialogFormVisible = true;
          },
          increase (){  //添加
            this.dialogFormVisible = true;
          },
          caseEdit (index,row){
            this.caseList = row // 把数据赋给row实例
            this.caseList.case_id = 'case_id'
            this.dialogFormVisible = true
            
          },
          delCase (index){
            this.caseList.splice(index,1) // 1就是删除一行
             this.$http.post(this.delUrl, JSON.stringify(this.inputList)).then(
              (response) => {
                var res = JSON.parse(response.bodyText)
                if(res.code == '000') {
                  this.getCase()
                  // this.dialogFormVisible = false;
                } else {
                  this.$message.console.error('添加用例失败')
                  console.log(res['message'])
                }
              }
              
            )
          }
            
        }
        
    }
</script>

<style scoped>

</style>
