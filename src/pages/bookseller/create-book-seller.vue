<template>
    <div class="accountInfo-page">
        <div class="accountInfo-header">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
                <el-breadcrumb-item >书商管理</el-breadcrumb-item>
                <el-breadcrumb-item >创建书商</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="accountInfo-body">
            <el-form ref="accountInfoForm" :model="accountInfoForm" :rules="accountInfoRules" label-width="100px" size="small" class="account-info-form" label-position="left">
                <el-form-item label="书商名称" required prop="account">
                    <el-input v-model="accountInfoForm.account" maxlength="20"></el-input>
                    <span>（20个英文字符以内）</span>
                </el-form-item>
                <el-form-item label="书籍接入方式" required prop="realName">
                    <el-checkbox-group v-model="checkList">
                        <el-checkbox label="jiekou">接口</el-checkbox>
                        <el-checkbox label="wenben">文本</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="书商标识" required prop="phone">
                    <el-input v-model="accountInfoForm.phone" maxlength="11"></el-input>
                    <span>（请输入手机号）</span>
                </el-form-item>
                <el-form-item label="书商姓名" required prop="phone">
                    <el-input v-model="accountInfoForm.phone" maxlength="11"></el-input>
                    <span></span>
                </el-form-item>
                <el-form-item label="联系电话" required prop="phone">
                    <el-input v-model="accountInfoForm.phone" maxlength="11"></el-input>
                    <span>（请输入手机号）</span>
                </el-form-item>
                <el-form-item label="是否收费" required prop="realName">
                    <el-checkbox-group v-model="checkList">
                        <el-checkbox label="jiekou">收费</el-checkbox>
                        <el-checkbox label="wenben">免费</el-checkbox>
                    </el-checkbox-group>
                    <span>（可多选，必选项）</span>
                </el-form-item>

                <el-form-item label="活动形式" required prop="realName">
                    <el-input type="textarea" v-model="checkList" style="width: 50%"></el-input>
                </el-form-item>


                <el-form-item>
                    <el-button type="primary" @click="submitForm('accountInfoForm')" :loading="isSave">保存</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>

  const cityOptions = ['上海', '北京', '广州', '深圳'];


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

        checkAll: false,
        checkedCities: ['上海', '北京'],
        cities: cityOptions,
        isIndeterminate: true

      }
    },
    methods: {

      handleCheckAllChange(val) {
        this.checkedCities = val ? cityOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
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
