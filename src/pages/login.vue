<template>
  <div class="v-login">
    <div class="login-body">
      <div class="v-login-img">
        <span>趣阅读管理后台</span>
      </div>
      <el-form ref="loginForm" :rules="rules" :model="form" class="login-form">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" show-password placeholder="请输入密码" @keyup.enter.native="onSubmit('loginForm')"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn" type="primary" @click.prevent="onSubmit('loginForm')" :loading="isLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  import {mapActions} from 'vuex'
  export default {
    name: 'Login',
    data() {
      return {
        form: {
          username: '',
          password: ''
        },
        isLogin: false,
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            //{ min: 6, max: 8, message: '长度在 6 到 8 个字符', trigger: 'blur' }
          ],
        }
      }
    },
    methods: {
      ...mapActions(['login']),
      onSubmit(formName) {
        this.isLogin = true
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.onLogin()
          } else {
            this.isLogin = false
            return false;
          }
        });
      },
      onLogin() {
        this.login(this.form).then(res=>{
          if(res.success){
            this.$message.success('登录成功')
            this.$router.push({path: '/'})
            this.isLogin = false
          }else {
            this.$message.error('登录失败')
            this.isLogin = false
          }
        }).catch((error)=>{
          this.$message.error('服务器出错')
          this.isLogin = false
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .v-login{
    position: absolute;
    width: 100%;
    height: 100%;
    text-align: center;
    background: #ecf0f5;
  }
  .login-body{
    width: 400px;
    height: 400px;
    padding-top: 50px;
    background: #ffffff;
    margin: 100px auto;
  }
  .login-form{
    width: 250px;
    margin: 0 auto;
  }
  .login-btn{
    width: 250px;
    height: 40px;
  }
  .v-login-img{
    margin-bottom: 50px;
    img{
      width: 150px;
      height: 150px;
    }
    span{
      display: block;
      font-size: 30px;
      color: #444444;
    }
  }
</style>
