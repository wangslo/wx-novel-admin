<template>
  <div class="accountInfo-page">
    <div class="accountInfo-header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path: '/account-manger'}">权限管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path: '/account-manger'}">账号管理</el-breadcrumb-item>
        <el-breadcrumb-item >账号详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="accountInfo-body">
      <div class="accountInfo-box">
        <div class="accountInfo-item">
          <span class="item-name">邮箱：</span>
          <span class="item-value">{{username}}</span>
        </div>
        <div class="accountInfo-item">
          <span class="item-name">真实姓名：</span>
          <span class="item-value">{{name}}</span>
        </div>
        <div class="accountInfo-item">
          <span class="item-name">部门：</span>
          <span class="item-value">{{dept}}</span>
        </div>
        <div class="accountInfo-item">
          <span class="item-name">密码：</span>
          <span class="item-value">{{password}}</span>
        </div>
        <div class="accountInfo-item">
          <span class="item-name">拥有权限：</span>
          <div class="authList">
            <span class="item-value" v-for="item in authList" :key="item">{{item}}</span>
          </div>
        </div>
        <div class="accountInfo-item">
          <span class="item-name">操作记录：</span>
          <div class="operaLogs">
            <span class="item-value" v-for="item in operaLogs" :key="item">{{item}}</span>
          </div>
        </div>
      </div>
      <div class="accountInfo-btn">
        <el-button type="success" size="mini" >编辑</el-button>
        <el-button v-if="status" type="warning" size="mini" >禁用</el-button>
        <el-button v-else type="warning" size="mini" >启用</el-button>
        <el-button type="danger" size="mini" >删除</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import {orgModuleApi} from '../../api/main'
  export default {
    name: 'openAccount',
    data() {
      return {
        id: this.$route.params.id,
        username: '',
        name: '',
        dept: '',
        password: '******',
        authList: [],
        operaLogs: [],
        status: true,
      }
    },
    created() {
      this.getAccountDetails()
    },
    methods: {
      getAccountDetails() {
        var _this = this
        var params = {
          uid: this.id
        }
        orgModuleApi.getAccountInfo(params).then(res=>{
          console.log(res)
          if(res.success){
            _this.username = res.data.username
            _this.name = res.data.name
            _this.dept = res.data.dept
            res.data.privileges.map((item,idx)=>{
              if(res.data.rid.indexOf(item.id) > -1) {
                _this.authList.push(item.name)
              }
            })
          }
        })
      },
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
      .accountInfo-box{
        width: 95%;
        margin: 0 auto;
        margin-top: 20px;
        .accountInfo-item{
          margin-bottom: 20px;
          display: flex;
          flex-direction: row;
          span{
            display: block;
          }
          div{
            display: flex;
            flex-direction: column;
          }
        }
      }
    }
    .accountInfo-btn{
      display: flex;
      justify-content: center;
      margin-top: 100px;
      .el-button{
        width: 100px;
      }
    }
  }
</style>
