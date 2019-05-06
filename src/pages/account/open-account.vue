<template>
  <div class="accountInfo-page">
    <div class="accountInfo-header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item >权限管理</el-breadcrumb-item>
        <el-breadcrumb-item >开设账号</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="accountInfo-body">
      <el-form ref="accountInfoForm" :model="accountInfoForm" :rules="accountInfoRules" label-width="100px" size="small" class="account-info-form" label-position="left">
        <el-form-item label="账号" required prop="account">
          <el-input v-model="accountInfoForm.account" maxlength="20"></el-input>
          <span>（20个英文字符以内）</span>
        </el-form-item>
        <el-form-item label="真实姓名" required prop="realName">
          <el-input v-model="accountInfoForm.realName"></el-input>
        </el-form-item>
        <el-form-item label="手机号" required prop="phone">
          <el-input v-model="accountInfoForm.phone" maxlength="11"></el-input>
          <span>（请输入手机号）</span>
        </el-form-item>
        <el-form-item label="部门" prop="branch" required>
          <el-select v-model="accountInfoForm.branch" placeholder="请选择部门">
            <el-option label="全部" value="999"></el-option>
            <el-option label="运营" value="0"></el-option>
            <el-option label="产品" value="1"></el-option>
            <el-option label="测试" value="2"></el-option>
            <el-option label="商务" value="3"></el-option>
            <el-option label="开发" value="4"></el-option>
            <el-option label="其它" value="5"></el-option>
          </el-select>
          <span>（请选择部门）</span>
        </el-form-item>
        <el-form-item label="密码" required prop="password">
          <el-input v-model="accountInfoForm.password" show-password></el-input>
          <span>（数字或字母，6—12个字符）</span>
        </el-form-item>
        <el-form-item label="权限选择*（可多选）" label-width="300px">
        </el-form-item>
        <el-form-item label-width="0px" prop="power">
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
        <el-form-item>
          <el-button type="primary" @click="submitForm('accountInfoForm')" :loading="isSave">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  import {orgModuleApi} from '../../api/main'
  export default {
    name: 'openAccount',
    data() {
      var checkPhone = (rule, value, callback) => {
        const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
        // const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
        if (!value) {
          return callback(new Error('手机号不能为空'));
        }else if (!phoneReg.test(value)) {
          callback(new Error('请输入正确格式的手机号'))
        } else {
          callback()
        }
      }
      var checkPassword = (rule, value, callback) => {
        const pswReg = /^[a-zA-Z0-9]{6,12}$/
        if (!value) {
          return callback(new Error('密码不能为空'));
        }else if (value.toString().length < 6 || value.toString().length > 12) {
          callback(new Error('密码长度为6 - 12个字符'))
        }else if(!pswReg.test(value)){
          callback(new Error('请输入正确的密码格式'))
        } else {
          callback()
        }
      }
      var checkAccount = (rule, value, callback) => {
        const accountReg = /^[a-zA-Z]{0,20}$/
        if (!value) {
          return callback(new Error('账号不能为空'));
        }else if (value.toString().length <= 0 || value.toString().length > 20) {
          callback(new Error('20个英文字符以内'))
        }else if(!accountReg.test(value)){
          callback(new Error('账号格式不正确'))
        } else {
          callback()
        }
      }
      return {
        accountInfoForm: {
          account: '',
          phone: '',
          realName: '',
          branch: '999',
          password: '',
          power: [],
        },
        accountInfoRules: {
          account: [{ validator: checkAccount, trigger: 'blur' }],
          phone: [{ validator: checkPhone, trigger: 'blur' }],
          realName: [{ required: true, message: '请输入真实姓名', trigger: 'blur' }],
          branch: [],
          password: [{ validator: checkPassword, trigger: 'blur' }],
          power: [{ type: 'array', required: true, message: '请至少选择一个权限', trigger: 'change' }],
        },
        isSave: false,
      }
    },
    methods: {
      submitForm(formName) {
        this.isSave = true
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.saveInfo();
          } else {
            console.log('error submit!!');
            this.isSave = false
            return false;
          }
        });
      },
      saveInfo() {
        var _this = this
        var params = {
          token	: sessionStorage.getItem('token'),
          account	: this.accountInfoForm.account,
          nickname: this.accountInfoForm.realName,
          mobile: this.accountInfoForm.phone,
          department: this.accountInfoForm.branch,
          password: this.accountInfoForm.password,
          auths: this.accountInfoForm.power.join('-'),
        }
        orgModuleApi.addAccountInfo(params).then(res=>{
          if(res.code == 0) {
            this.$message.success('保存成功')
            this.$refs.accountInfoForm.resetFields()
            _this.isSave = false
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .accountInfo-page{
    .accountInfo-header{
      height: 50px;
      padding-left: 15px;
      .el-breadcrumb{
        font-size: 16px;
        margin-top: 15px;
      }
    }
    .accountInfo-body{
      margin-left: 15px;
      margin-right: 15px;
    }
    .el-input{
      width: 300px;
    }
    .el-button{
      width: 200px;
    }
  }
</style>
