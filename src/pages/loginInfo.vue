<template>
  <div class="loginInfo-page">
    <div class="loginInfo-header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item >账号信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="loginInfo-body">
      <div class="loginInfo-item-row">
        <span class="loginInfo-item-col">邮箱</span><label>：</label>
        <span class="loginInfo-item-col1">{{user.account}}</span>
      </div>
      <div class="loginInfo-item-row">
        <span class="loginInfo-item-col">真实姓名</span><label>：</label>
        <span class="loginInfo-item-col1">{{user.nickname}}</span>
      </div>
      <div class="loginInfo-item-row">
        <span class="loginInfo-item-col">部门</span><label>：</label>
        <span class="loginInfo-item-col1">{{user.department}}</span>
      </div>
      <div class="loginInfo-item-row">
        <span class="loginInfo-item-col">密码</span><label>：</label>
        <span class="loginInfo-item-col1">******</span>
        <el-button type="success" size="mini" class="loginInfo-item-col2" @click="showPwd">修改密码</el-button>
      </div>
      <div class="loginInfo-psw-update" v-show="pswStatus">
        <el-form :model="resetPwd" status-icon :rules="resetPwdRules" ref="resetPwd">
          <el-form-item prop="oldpwd">
            <el-input type="password" v-model="resetPwd.oldpwd" placeholder="请输入旧密码" show-password></el-input>
            <label class="oldPwdValidate" v-show="oldpwd_err">{{oldpwd_tip}}</label>
          </el-form-item>
          <el-form-item prop="newpwd">
            <el-input type="password" v-model="resetPwd.newpwd" placeholder="请输入新密码" show-password></el-input>
            <span>（数字或字母，6—12个字符）</span>
          </el-form-item>
          <el-form-item prop="renewpwd">
            <el-input type="password" v-model="resetPwd.renewpwd" placeholder="再次输入新密码" show-password></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="loginInfo-item-row loginInfo-auth">
        <span class="loginInfo-item-col">拥有权限</span><label>：</label>
        <div class="loginInfo-item-col1-list">
          <span class="loginInfo-item-col-small" v-for="(item,index) in branch" :key="index">{{item}}</span>
        </div>
      </div>
      <div class="loginInfo-save-btn" v-show="pswStatus">
        <el-button type="success" size="small" @click="updatePassword">保存</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import {orgModuleApi} from '../api/main'
  export default {
    name: 'loginInfo',
    data() {
      var validateOldPass = (rule, value, callback) => {
        this.oldpwd_err = false
        if (!value) {
          return callback(new Error('密码不能为空'));
        }else {
          callback()
        }
      };
      var validatePass = (rule, value, callback) => {
        const pswReg = /^[a-zA-Z0-9]{6,12}$/
        if (!value) {
          callback(new Error('请输入新密码'));
        } else if (value.toString().length < 6 || value.toString().length > 12) {
          callback(new Error('密码长度为6 - 12个字符'))
        }else if(!pswReg.test(value)){
          callback(new Error('请输入正确的密码格式'))
        } else {
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        const pswReg = /^[a-zA-Z0-9]{6,12}$/
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if(!pswReg.test(value)){
          callback(new Error('请输入正确的密码格式'))
        } else if (value !== this.resetPwd.newpwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        id: '',
        user: '',
        branch: [],
        resetPwd:{
          oldpwd: '',
          newpwd: '',
          renewpwd: '',
        },
        resetPwdRules: {
          oldpwd: [
            { required: true, validator: validateOldPass, trigger: 'blur' }
          ],newpwd: [
            { required: true, validator: validatePass, trigger: 'blur' }
          ],
          renewpwd: [
            { required: true, validator: validatePass2, trigger: 'blur' }
          ]
        },
        pswStatus: false,
        oldpwd_err: false,
        oldpwd_tip: '',
      }
    },
    created() {
      this.getLoginInfo()
    },
    methods: {
      showPwd() {
        this.pswStatus = true
      },
      updatePassword() {
        var _this = this
        this.$refs['resetPwd'].validate((valid) => {
          if (valid) {
            var params  = {
              originPwd: this.resetPwd.oldpwd,
              newPwd: this.resetPwd.newpwd
            }
            orgModuleApi.updatePwd(params).then(res=>{
              console.log(res)
              if(res.success){
                this.$message.success('密码修改成功')
                _this.oldpwd_err = false
                _this.$refs.resetPwd.resetFields()
              }else {
                _this.oldpwd_err = true
                _this.oldpwd_tip = '密码错误，请重新输入'
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      getLoginInfo() {
        var _this = this
        var params = {
          uid: ''
        }
        orgModuleApi.getAccountInfo(params).then(res=>{
          console.log(res)
          if(res.success){
            res.data.privileges.map((item,idx)=>{
              if(res.data.rid.indexOf(item.id) > -1) {
                _this.branch.push(item.name)
              }
            })
            _this.user = {
              account: res.data.username,
              nickname: res.data.name,
              department: res.data.dept,
            }
          }
        })
      },
    }
  }
</script>
<style lang="scss" scoped>
  .loginInfo-page{
    .loginInfo-header{
      height: 50px;
      padding-left: 15px;
      .el-breadcrumb{
        font-size: 16px;
        margin-top: 15px;
      }
    }
    .loginInfo-body{
      margin-left: 15px;
      margin-right: 15px;
      background: #ffffff;
      padding: 15px;
      .loginInfo-item-row{
        height: 30px;
        font-size: 16px;
        line-height: 30px;
        margin-top: 30px;
        .loginInfo-item-col{
          display: inline-block;
          text-align: justify;
          width: 100px;
          float: left;
          color: #999999;
          font-size: 14px;
        }
        .loginInfo-item-col:after{
          content: " ";
          display: inline-block;
          width: 100%;
        }
        .loginInfo-item-col1-list{
          margin-top: 30px;
          color: #333333;
          font-weight: 600;
          .loginInfo-item-col-small{
            display: inline-block;
            margin-right: 50px;
            margin-bottom: 20px;
            color: #303133;
          }
        }
        .loginInfo-item-col1{
          color: #333333;
          font-weight: 600;
        }
      }
      .loginInfo-item-row:nth-child(1){
        margin-top: 0;
      }
      .loginInfo-auth{
        height: auto;
      }
      .loginInfo-psw-update{
        margin-left: 116px;
        margin-top: 20px;
        .el-input{
          display: inline-block;
          width: 250px;
        }
        .oldPwdValidate{
          color: #F56C6C;
          font-size: 12px;
          line-height: 1;
          padding-top: 4px;
          position: absolute;
          top: 100%;
          left: 0;
        }
      }
      .loginInfo-save-btn{
        width: 100%;
        height: 30px;
        text-align: center;
        .el-button{
          width: 100px;
          height: 30px;
        }
      }
    }
  }
</style>
