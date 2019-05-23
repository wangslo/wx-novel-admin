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
        <el-form-item label="邮箱" required prop="account">
          <el-input v-model="accountInfoForm.account"></el-input>
          <span>（请输入邮箱）</span>
        </el-form-item>
        <el-form-item label="真实姓名" required prop="realName">
          <el-input v-model="accountInfoForm.realName"></el-input>
        </el-form-item>
        <el-form-item label="部门" prop="branch" required>
          <el-select v-model="accountInfoForm.branch" placeholder="请选择部门" @change="inputDept">
            <el-option label="请选择部门" value=""></el-option>
            <el-option label="运营" value="运营"></el-option>
            <el-option label="产品" value="产品"></el-option>
            <el-option label="测试" value="测试"></el-option>
            <el-option label="商务" value="商务"></el-option>
            <el-option label="开发" value="开发"></el-option>
            <el-option label="其它" value="5"></el-option>
          </el-select>
          <span>（请选择部门）</span>
          <el-form-item prop="otherBranch" v-show="otherDept">
            <el-input v-model="accountInfoForm.otherBranch" placeholder="请输入部门"></el-input>
          </el-form-item>
        </el-form-item>
        <el-form-item label="密码" required prop="password">
          <el-input v-model="accountInfoForm.password" show-password></el-input>
          <span>（数字或字母，6—12个字符）</span>
        </el-form-item>
        <el-form-item label="权限选择*（可多选）" label-width="300px">
        </el-form-item>
        <el-form-item label-width="0px" prop="power">
          <el-checkbox-group v-model="accountInfoForm.power">
            <div v-for="(item,idx) in authList"  :key="idx">
            <el-checkbox :label="item.id">{{item.name}}</el-checkbox>
            </div>
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
        const accountReg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
        if (!value) {
          return callback(new Error('邮箱不能为空'));
        }else if(!accountReg.test(value)){
          callback(new Error('邮箱格式不正确'))
        } else {
          callback()
        }
      }
      var checkBranch = (rule, value, callback) => {
        console.log(this.otherDept)
        if(this.otherDept){
          if (!value) {
            return callback(new Error('部门不能为空'));
          }else {
            callback()
          }
        }else {
          callback()
        }
      }
      return {
        accountInfoForm: {
          account: '',
          realName: '',
          branch: '',
          otherBranch: '',
          password: '',
          power: [],
        },
        accountInfoRules: {
          account: [{ validator: checkAccount, trigger: 'blur' }],
          realName: [{ required: true, message: '请输入真实姓名', trigger: 'blur' }],
          branch: [{ required: true, message: '请选择部门', trigger: 'blur' }],
          otherBranch: [{ validator: checkBranch, trigger: 'blur' }],
          password: [{ validator: checkPassword, trigger: 'blur' }],
          power: [{ type: 'array', required: true, message: '请至少选择一个权限', trigger: 'change' }],
        },
        isSave: false,
        authList: [],
        otherDept: false,
      }
    },
    created() {
      this.getPrivileges()
    },
    methods: {
      inputDept(val) {
        if(val == 5) {
          this.otherDept = true
        }else {
          this.otherDept = false
        }
      },
      getPrivileges(){
        orgModuleApi.getAuthList().then(res=>{
          if(res.success){
            this.authList = res.data
          }
        })
      },
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
          username	: this.accountInfoForm.account,
          name: this.accountInfoForm.realName,
          dept: this.accountInfoForm.branch == 5 ? this.accountInfoForm.otherBranch:this.accountInfoForm.branch,
          password: this.accountInfoForm.password,
          rid: this.accountInfoForm.power,
        }
        orgModuleApi.addAccountInfo(params).then(res=>{
          console.log(res)
          if(res.success) {
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
