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
      <el-form ref="accountForm" :model="account_condition" class="account-form" label-width="80px" :rules="accountRules" size="small">
        <el-form-item label="账号" prop="account" label-width="60px">
          <el-input v-model="account_condition.account"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="account_condition.phone"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="nickName" label-width="60px" >
          <el-input v-model="account_condition.nickName"></el-input>
        </el-form-item>
        <el-form-item label="部门" prop="branch" label-width="60px">
          <el-select v-model="account_condition.branch" placeholder="请选择部门">
            <el-option label="全部" value="999"></el-option>
            <el-option label="运营" value="0"></el-option>
            <el-option label="产品" value="1"></el-option>
            <el-option label="测试" value="2"></el-option>
            <el-option label="开发" value="3"></el-option>
            <el-option label="商务" value="4"></el-option>
          </el-select>
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
          <el-col class="line" style="width:20px;text-align:center">至</el-col>
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
            <el-option label="全部" value="999"></el-option>
            <el-option label="正常" value="0"></el-option>
            <el-option label="禁用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="float: right;">
          <el-button type="primary" @click="clearData">清空</el-button>
          <el-button type="primary" @click="getAccountLists">查找</el-button>
          <el-button type="primary">开设账号</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" style="width:100%;"
                :default-sort = "{prop: 'createTime', order: 'descending'}"
                stripe border
                @sort-change='sortChange'>
        <el-table-column label="序号" width="80" align="center">
          <template slot-scope="scope">
            <span>{{scope.$index+(pageNo - 1) * pageSize + 1}} </span>
          </template>
        </el-table-column>
        <el-table-column prop="account" label="账号" width="180" align="center"></el-table-column>
        <el-table-column prop="phone" label="手机号" width="180" align="center"></el-table-column>
        <el-table-column prop="realName" label="真实姓名" width="180" align="center"></el-table-column>
        <el-table-column prop="branch" label="部门" width="180" align="center"></el-table-column>
        <el-table-column sortable='custom' :sort-orders="['ascending', 'descending']"
                         prop="createTime" label="创建时间" width="180" align="center"></el-table-column>
        <el-table-column prop="status" label="账号状态" width="180" align="center"></el-table-column>
        <el-table-column label="操作" min-width="250" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button v-if="scope.row.status=='正常'" size="mini" type="warning" @click="handleForbid(scope.$index, scope.row)">禁用</el-button>
            <el-button v-if="scope.row.status=='禁用'" size="mini" type="warning" @click="handleForbid(scope.$index, scope.row)">启用</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10,20, 50, 100, 150]"
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
        <el-dialog title="编辑权限" :visible.sync="editDialog" width="50%" center>
          <el-form ref="accountInfoForm" :model="accountInfoForm" :rules="accountInfoRules" label-width="100px" size="small" class="account-info-form" label-position="left">
            <el-row>
              <el-col :span="12">
                <el-form-item label="账号" class="accountInfoForm-item">
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
                <el-form-item label="手机号" prop="phone" class="accountInfoForm-item">
                  <el-input v-model="accountInfoForm.phone" :disabled="phone_status"></el-input>
                </el-form-item>
              </el-col>
              <!--<el-col :span="8">
                <el-form-item label="（请输入手机号）" label-width="300px"></el-form-item>
              </el-col>-->
              <el-col :span="12">
                <el-button type="success" size="small" @click="setPhoneInput">更改手机号</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="部门" class="accountInfoForm-item">
                  <el-select v-model="accountInfoForm.branch" placeholder="请选择部门">
                    <el-option label="全部" value="999"></el-option>
                    <el-option label="运营" value="0"></el-option>
                    <el-option label="产品" value="1"></el-option>
                    <el-option label="测试" value="2"></el-option>
                    <el-option label="开发" value="3"></el-option>
                    <el-option label="商务" value="4"></el-option>
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
                <el-checkbox-group v-model="accountInfoForm.power">
                  <el-checkbox label="account">权限管理</el-checkbox>
                  <el-checkbox label="user">用户管理</el-checkbox>
                  <el-checkbox label="bookCity">书城管理</el-checkbox>
                  <el-checkbox label="book">书籍管理</el-checkbox>
                  <el-checkbox label="recommend">推荐管理</el-checkbox>
                  <el-checkbox label="bannerManger">banner管理</el-checkbox>
                  <el-checkbox label="adver">广告管理</el-checkbox>
                  <el-checkbox label="help">帮助与反馈</el-checkbox>
                  <el-checkbox label="activity">活动管理</el-checkbox>
                  <el-checkbox label="userData">用户数据</el-checkbox>
                  <el-checkbox label="message">消息管理</el-checkbox>
                  <el-checkbox label="recharge">充值记录</el-checkbox>
                </el-checkbox-group>
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
      var checkPhone = (rule, value, callback) => {
        const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
        // const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
        if (!value) {
          // return callback(new Error('手机号不能为空'));
          callback()
        }else {
          setTimeout(() => {
            if (!phoneReg.test(value)) {
              callback(new Error('手机号格式不正确'))
            } else {
              callback()
            }
          }, 1000);
        }
      }
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
          phone: '',
          nickName: '',
          branch: '999',
          create_start_time: '',
          create_end_time: '',
          status: '999',
        },
        accountInfoForm: {
          id: '',
          account: '',
          phone: '',
          realName: '',
          branch: '',
          password: '',
          power: [],
        },
        accountInfoRules: {
          phone: [{ validator: checkPhone, trigger: 'blur' }],
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
          phone: [],
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
        forbid: {account:'',id:''},
        use: {account:'',id:''},
        editDialog:false,
        phone_status: true,
        psw_status: true,
        sort_prop: 'createTime',
        sort_order: 'desc',
        pwd_placeholder: '******'
      }
    },
    created() {
      this.fetch.getAccountList('',res=>{
        console.log(res)
      })
    },
    methods: {
      operatAccount(status,id) {
        var _this = this
        var params = {
          token: sessionStorage.getItem('token'),
          ids: [id],
          act: status,
        }
        orgModuleApi.operatAccount(params).then(res=>{
          if(res.code == 0){
            if(status == 'jinyong'){
              _this.forbidDialog = false
            }else if(status == 'qiyong'){
              _this.useDialog = false
            }
            _this.getAccountLists()
          }else {
            this.$message.success('服务出错，请重试')
          }
        })
      },
      setPhoneInput() {
        this.phone_status = false
      },
      setPswInput() {
        this.psw_status = false
        this.pwd_placeholder = ''
      },
      getAccountLists() {
        var params = {
          token: sessionStorage.getItem('token'),
          page: this.pageNo,
          size: this.pageSize,
          account	: this.account_condition.account,
          nickname: this.account_condition.nickName,
          mobile: this.account_condition.phone,
          department: this.account_condition.branch,
          status: this.account_condition.status,
          order: this.sort_order,
          sort: this.sort_prop
        }
        var _this = this
        _this.tableData = []
        orgModuleApi.getAccountList(params).then((res)=>{
          if(res.code == 0){
            res.data.list.map((item,index)=>{
              _this.tableData.push({
                id: item.id,
                account: item.account,
                phone: item.mobile,
                realName: item.nickname,
                branch: item.department,
                createTime: _this.common.getDate(item.createTime),
                status: item.status==1?'正常':'禁用',
              })
            })
            _this.totalSize = parseInt(res.data.page.all_count)
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
      handleEdit(idx,row) {
        var _this = this
        var params = {
          token: sessionStorage.getItem('token'),
          id: row.id
        }
        orgModuleApi.getAccountInfo(params).then(res=>{
          if(res.code == 0){
            _this.accountInfoForm = {
              id: row.id,
              account: row.account,
              phone: row.phone,
              realName: row.realName,
              branch: row.branch,
              password: '',
              power: res.data.role,
            }
            _this.editDialog = true
            _this.phone_status = true
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
      sortChange: function(column, prop, order) {
        this.sort_prop = column.prop
        this.sort_order = column.order.replace('ending','')
        this.getAccountLists()
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
          mobile: _this.accountInfoForm.phone,
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
