<template>
  <div class="blacklistInfo-page">
    <div class="blacklistInfo-header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path: '/userManger'}">用户管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path: '/blacklist'}">黑名单</el-breadcrumb-item>
        <el-breadcrumb-item >个人详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="blacklistInfo-body">
      <div class="blacklistInfo-box">
        <div class="blacklistInfo-item">
          <span class="item-name head-img-title">头像：</span>
          <div class="head-img-url">
            <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1222929928,1326821480&fm=26&gp=0.jpg"/>
          </div>
        </div>
        <div class="blacklistInfo-item">
          <span class="item-name">昵称：</span>
          <span class="item-value">XXXXXXX</span>
        </div>
        <div class="blacklistInfo-item">
          <span class="item-name">性别：</span>
          <span class="item-value">男</span>
        </div>
        <div class="blacklistInfo-item">
          <span class="item-name">出生日期：</span>
          <span class="item-value">1988-12-12</span>
        </div>
        <div class="blacklistInfo-item">
          <span class="item-name">手机号：</span>
          <span class="item-value">13333333333</span>
        </div>
        <div class="blacklistInfo-item">
          <span class="item-name">ACCID：</span>
          <span class="item-value">13333333333</span>
        </div>
        <div class="blacklistInfo-item">
          <span class="item-name">第三方登录：</span>
          <span class="item-value">QQ</span>
        </div>
        <div class="blacklistInfo-item">
          <span class="item-name">最近登录时间：</span>
          <span class="item-value">2019-04-22</span>
        </div>
        <div class="blacklistInfo-item">
          <span class="item-name">注册时间：</span>
          <span class="item-value">2019-04-22</span>
        </div>
        <div class="blacklistInfo-item">
          <span class="item-name">设备号：</span>
          <span class="item-value">XXXXXXXXXXXXXXXX</span>
        </div>
        <div class="blacklistInfo-item">
          <span class="item-name">IP：</span>
          <span class="item-value">172.168.22.63</span>
        </div>
        <div class="blacklistInfo-item">
          <span class="item-name">APP版本：</span>
          <span class="item-value">v0.0.1</span>
        </div>
        <div class="blacklistInfo-item">
          <span class="item-name">手机型号：</span>
          <span class="item-value">华为</span>
        </div>
        <div class="blacklistInfo-item">
          <span class="item-name">所在城市：</span>
          <span class="item-value">北京</span>
        </div>
        <div class="blacklistInfo-item">
          <span class="item-name">账号状态：</span>
          <span class="item-value">正常</span>
        </div>
        <div class="blacklistInfo-item">
          <span class="item-name">加黑原因：</span>
          <span class="item-value">恶意发布不实言论（操作人：XXXX）</span>
        </div>
      </div>
      <el-button type="primary" class="use-btn" size="mini" @click="openDialog">启用</el-button>
      <div class="dialog-div">
        <el-dialog title="启用账号" :visible.sync="useDialog" width="500px" center>
          <span>启用后，改账号将可以正常访问魅狐文学APP。</span>
          <span>是否启用“XXXXX”？</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="useDialog = false">取 消</el-button>
            <el-button type="primary" @click="useDialog = false">启 用</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'blacklistInfo',
    data() {
      return {
        useDialog: false,
      }
    },
    methods: {
      openDialog() {
        this.useDialog = true
      }
    }
  }
</script>
<style lang="scss" scoped>
  .blacklistInfo-page{
    .blacklistInfo-header{
      height: 50px;
      padding-left: 15px;
      .el-breadcrumb{
        font-size: 16px;
        margin-top: 15px;
      }
    }
    .blacklistInfo-body{
      .blacklistInfo-box{
        width: 95%;
        margin: 0 auto;
        margin-top: 20px;
        .blacklistInfo-item{
          margin-bottom: 20px;
          .head-img-url{
            display: inline-block;
            width: 30px;
            height: 30px;
            img{
              width: 100%;
              height: 100%;
              vertical-align:middle;
            }
          }
        }
      }
      .use-btn{
        margin-left: 2.5%;
        width: 100px;
        margin-bottom: 40px;
      }
      .el-dialog__body{
        span{
          display: block;
          text-align: center;
        }
      }
    }
  }
</style>
