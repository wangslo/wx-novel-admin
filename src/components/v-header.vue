<template>
  <el-row class="v-header-container">
    <el-col :span="4" class="v-icon" style="float: left;">
      <i :class="{'el-icon-more': !mini,'el-icon-more-outline': mini}" @click="handleSwitchSide"></i>
    </el-col>
    <el-col :span="20">
      <div class="v-user" style="float: right;">
        <el-dropdown @command="handleCommand" v-if="user">
          <span class="el-dropdown-link user">
            {{user.username}} <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="loginInfo">账号信息</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button type="primary" class="logout" @click="onLogout">退出登录</el-button>
      </div>
    </el-col>
  </el-row>
</template>
<script type="text/javascript">
  import {mapActions} from 'vuex'
  export default {
    name: 'Vheader',
    data () {
      return {
        mini: false,
        user: {},
      }
    },
    created() {
      var _this = this
      this.getLoginUser().then(()=>{
        _this.user = JSON.parse(sessionStorage.getItem('user'))
      })
    },
    methods: {
      ...mapActions(['getLoginUser','logout']),
      handleSwitchSide () {
        this.mini = !this.mini
        this.$emit('switch', this.mini)
      },
      onLogout() {
        this.logout().then((res)=>{
          if(res.success){
            this.$router.push({name: 'login'})
          }
        })
      },
      handleCommand(command) {
        this.$router.push({name: command})
      }
    },
  }
</script>
<style type="text/css">
  .v-header-container{
    margin-top: 5px;
  }
  .v-icon i{
    margin-top: 5px;
    margin-left: 15px;
    font-size: 32px;
    cursor: pointer;
    color: #fff;
  }
  .v-user{
    margin-right: 40px;
  }
  .user{
    color: #ffffff;
    font-size: 16px;
    cursor: pointer;
  }
  .logout{
    margin-left: 20px;
  }
</style>
