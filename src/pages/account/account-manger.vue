<template>
  <div class="account-page">
    <div class="account-header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item >权限管理</el-breadcrumb-item>
        <el-breadcrumb-item >账号管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="account-body">
      <el-form ref="accountForm" :model="account_condition" class="account-form" label-width="77px" :rules="accountRules" size="small">
        <el-form-item label="邮箱" prop="account" label-width="50px">
          <el-input v-model="account_condition.account"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="nickName" label-width="50px" >
          <el-input v-model="account_condition.nickName"></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-col :span="10" class="startTime">
            <el-form-item  prop="create_start_time">
              <el-date-picker
                type="date"
                format="yyyy-MM-dd"
                placeholder="起始时间"
                v-model="account_condition.create_start_time"
                :picker-options="pickerBeginDateBefore"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col style="width:20px;text-align:center">至</el-col>
          <el-col :span="10" class="endTime">
            <el-form-item prop="create_end_time">
              <el-date-picker
                type="date"
                format="yyyy-MM-dd"
                placeholder="结束时间"
                v-model="account_condition.create_end_time"
                :picker-options="pickerBeginDateAfter"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="账号状态" prop="status">
          <el-select v-model="account_condition.status" placeholder="请选择账号状态">
            <el-option label="全部" value=""></el-option>
            <el-option label="正常" value="false"></el-option>
            <el-option label="禁用" value="true"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门" prop="branch" label-width="50px">
          <el-select v-model="account_condition.branch" placeholder="请选择部门">
            <el-option label="请选择部门" value=""></el-option>
            <el-option label="运营" value="运营"></el-option>
            <el-option label="产品" value="产品"></el-option>
            <el-option label="测试" value="测试"></el-option>
            <el-option label="开发" value="开发"></el-option>
            <el-option label="商务" value="商务"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="float: right;">
          <el-button type="primary" @click="clearData">清空</el-button>
          <el-button type="primary" @click="getAccountLists">查找</el-button>
          <el-button type="primary" @click="openAccountPage">开设账号</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" style="width:100%;" stripe border>
        <el-table-column label="序号" min-width="30" align="center">
          <template slot-scope="scope">
            <span>{{scope.$index+(pageNo-1) * pageSize + 1}} </span>
          </template>
        </el-table-column>
        <el-table-column prop="account" label="邮箱" min-width="30" align="center"></el-table-column>
        <el-table-column prop="realName" label="真实姓名" min-width="30" align="center"></el-table-column>
        <el-table-column prop="branch" label="部门" min-width="30" align="center"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" min-width="30" align="center"></el-table-column>
        <el-table-column prop="status" label="账号状态" min-width="30" align="center"></el-table-column>
        <el-table-column label="操作" min-width="80" align="center">
          <template slot-scope="scope">
            <el-button v-show="false" size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button v-show="false" v-if="scope.row.status=='正常'" size="mini" type="warning" @click="handleForbid(scope.$index, scope.row)">禁用</el-button>
            <el-button v-show="false" v-if="scope.row.status=='禁用'" size="mini" type="warning" @click="handleForbid(scope.$index, scope.row)">启用</el-button>
            <el-button v-show="false" size="mini" type="danger" @click="handleDel(scope.$index, scope.row)">删除</el-button>
            <el-button size="mini" type="primary" @click="handleInfo(scope.$index, scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10,20, 50, 100]"
        background
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalSize">
      </el-pagination>
      <div class="dialog-div">
        <el-dialog title="" :visible.sync="forbidDialog" width="300px" center>
          <span>你确定要【禁用】</span>
          <span>账号：{{forbid.account}}</span>
          <span>禁用后此账号将不能再进行相关操作。</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="forbidDialog = false">取 消</el-button>
            <el-button type="primary" @click="operatAccount('jinyong',forbid.id)">禁 用</el-button>
          </span>
        </el-dialog>
        <el-dialog title="" :visible.sync="useDialog" width="300px" center>
          <span>你确定要【启用】</span>
          <span>账号：{{use.account}}</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="useDialog = false">取 消</el-button>
            <el-button type="primary" @click="operatAccount('qiyong',use.id)">启 用</el-button>
          </span>
        </el-dialog>
        <el-dialog title="" :visible.sync="delDialog" width="300px" center>
          <span>你确定要【删除】</span>
          <span>账号：{{del.account}}</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="delDialog = false">取 消</el-button>
            <el-button type="primary" @click="delAccount(del.id)">删 除</el-button>
          </span>
        </el-dialog>
        <el-dialog title="编辑权限" :visible.sync="editDialog" width="50%" center>
          <el-form ref="accountInfoForm" :model="accountInfoForm" :rules="accountInfoRules" label-width="100px" size="small" class="account-info-form" label-position="left">
            <el-row>
              <el-col :span="12">
                <el-form-item label="邮箱" class="accountInfoForm-item">
                  <el-input v-model="accountInfoForm.account" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="真实姓名" class="accountInfoForm-item">
                  <el-input v-model="accountInfoForm.realName" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="部门" class="accountInfoForm-item">
                  <el-select v-model="accountInfoForm.branch" placeholder="请选择部门">
                    <el-option label="请选择部门" value=""></el-option>
                    <el-option label="运营" value="运营"></el-option>
                    <el-option label="产品" value="产品"></el-option>
                    <el-option label="测试" value="测试"></el-option>
                    <el-option label="开发" value="开发"></el-option>
                    <el-option label="商务" value="商务"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="（请选择部门）" label-width="300px"></el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="密码" prop="password" class="accountInfoForm-item">
                  <el-input v-model="accountInfoForm.password" :disabled="psw_status" show-password :placeholder="pwd_placeholder"></el-input>
                  <el-button type="success" size="small" @click="setPswInput">重置密码</el-button>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="（数字或字母，6—12个字符）" label-width="300px"></el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-form-item label="权限选择（可多选）" label-width="300px">
              </el-form-item>
              <el-form-item prop="power" label-width="0px" class="accountInfoForm-check">

              </el-form-item>
            </el-row>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm('accountInfoForm')">保存</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
  import {orgModuleApi} from '../../api/main'
  export default {
    name: 'account',
    data() {
      var checkPassword = (rule, value, callback) => {
        const pswReg = /^[a-zA-Z0-9]{6,12}$/
          if (!value) {
            // return callback(new Error('密码不能为空'));
            callback()
          }else if (value.toString().length < 6 || value.toString().length > 12) {
            callback(new Error('密码长度为6 - 12个字符'))
          }else if(!pswReg.test(value)){
            callback(new Error('密码格式不正确'))
          } else {
            callback()
          }
      }
      return {
        account_condition: {
          account: '',
          nickName: '',
          branch: '',
          create_start_time: '',
          create_end_time: '',
          status: '',
        },
        accountInfoForm: {
          id: '',
          account: '',
          realName: '',
          branch: '',
          password: '',
          power: [],
        },
        accountInfoRules: {
          password: [{ validator: checkPassword, trigger: 'blur' }],
          power: [{ type: 'array', required: true, message: '请至少选择一个权限', trigger: 'change' }],
        },
        pickerBeginDateBefore:{
          disabledDate: (time) => {
            let beginDateVal = this.account_condition.create_end_time;
            if (beginDateVal) {
              return time.getTime() > beginDateVal;
            }
          }
        },
        pickerBeginDateAfter:{
          disabledDate: (time) => {
            let beginDateVal = this.account_condition.create_start_time;
            if (beginDateVal) {
              return time.getTime() < beginDateVal;
            }
          }
        },
        accountRules: {
          account: [/*{ validator: validateAccount, trigger: 'blur' }*/],
          nickName:[],
          branch: [],
          create_start_time: [],
          create_end_time: [],
          status: [],
        },
        tableData: [],
        pageNo: 1,
        pageSize: 10,
        currentPage: 1,
        totalSize: 0,
        forbidDialog:false,
        useDialog:false,
        delDialog:false,
        forbid: {account:'',id:''},
        use: {account:'',id:''},
        del: {account:'',id:''},
        editDialog: false,
        psw_status: true,
        pwd_placeholder: '******',
      }
    },
    created() {
      this.getAccountLists()
    },
    methods: {
      openAccountPage() {
        this.$router.push({
          name:'openAccount',
        })
      },
      delAccount(id) {
        this.delDialog = false
      },
      operatAccount(status,id) {

      },
      setPswInput() {
        this.psw_status = false
        this.pwd_placeholder = ''
      },
      getAccountLists() {
        var params = {
          page: this.pageNo - 1,
          size: this.pageSize,
          username	: this.account_condition.account,
          name: this.account_condition.nickName,
          dept: this.account_condition.branch,
          lock: this.account_condition.status,
          registDate_s: this.account_condition.create_start_time,
          registDate_e: this.account_condition.create_end_time,
        }
        var _this = this
        _this.tableData = []
        orgModuleApi.getAccountList(params).then((res)=>{
          if(res.success){
            res.data.data.map((item,index)=>{
              _this.tableData.push({
                id: item.id,
                account: item.username,
                realName: item.name,
                branch: item.dept,
                createTime: _this.common.getDate(item.registDate),
                status: item.lock?'禁用':'正常',
              })
            })
            _this.totalSize = parseInt(res.data.total)
          }
        })
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.getAccountLists()
      },
      handleCurrentChange(val) {
        this.pageNo = val
        this.getAccountLists()
      },
      handleForbid(idx,row) {
        if(row.status=='正常'){
          this.forbidDialog = true
          this.forbid = {
            account: row.account,
            id: row.id
          }
        }else if(row.status=='禁用'){
          this.useDialog = true
          this.use = {
            account: row.account,
            id: row.id
          }
        }
      },
      handleDel(idx,row) {
        this.delDialog = true
        this.del = {
          account: row.account,
          id: row.id
        }
      },
      handleInfo(idx,row) {
        this.$router.push({
          name:'accountInfo',
          params:{
            id: row.id
          }
        })
      },
      handleEdit(idx,row) {
        var _this = this
        var params = {
          uid: row.id
        }
        orgModuleApi.getAccountInfo(params).then(res=>{
          if(res.success){
            _this.accountInfoForm = {
              id: row.id,
              account: row.account,
              realName: row.realName,
              branch: row.branch,
              password: '',
              power: res.data.role,
            }
            _this.editDialog = true
            _this.psw_status = true
            _this.pwd_placeholder = '******'
          }else {
            this.$message.success('查询失败')
          }
        })
      },
      clearData() {
        this.$refs.accountForm.resetFields()
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.saveInfo();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      saveInfo() {
        var _this = this
        var params = {
          token: sessionStorage.getItem('token'),
          id: _this.accountInfoForm.id,
          nickname: _this.accountInfoForm.realName,
          password: _this.accountInfoForm.password,
          department: _this.accountInfoForm.branch,
          auths: _this.accountInfoForm.power.join('-'),
        }
        orgModuleApi.editAccountInfo(params).then(res=>{
          console.log(res)
          if(res.code == 0) {
            this.$message.success('保存成功')
            _this.editDialog = false
            _this.getAccountLists()
          }
        })
      },
    }
  }
</script>
<style lang="scss">
  .account-page{
    .account-header{
      height: 50px;
      padding-left: 15px;
      .el-breadcrumb{
        font-size: 16px;
        margin-top: 15px;
      }
    }
    .account-body{
      margin-left: 15px;
      margin-right: 15px;
      .account-form{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
      }
    }
    .el-dialog__body{
      span{
        display: block;
        text-align: center;
      }
    }
    .account-info-form{
      .accountInfoForm-item{
        .el-form-item__label{
          text-align: justify;
        }
        .el-form-item__label:after{
          content: " ";
          display: inline-block;
          width: 100%;
        }
      }
      .el-form-item{
        margin-bottom: 0;
      }
      .accountInfoForm-check{
        span{
          display: inline-block;
        }
      }
    }
  }
</style>
