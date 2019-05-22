<template>
    <div class="authorization-page">
        <div class="authorization-header">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{path: '/wechat-list'}">公众号管理</el-breadcrumb-item>
                <el-breadcrumb-item >授权管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="authorization-body">
            <div class="authorization-box">
                <div class="authorization-item">
                    <span class="item-name">公众号名称：</span>
                    <span class="item-value">{{info.wechatName}}</span>
                </div>
                <div class="authorization-item">
                    <span class="item-name">公众号ID：</span>
                    <span class="item-value">{{info.wechatId}}</span>
                </div>
                <div class="authorization-item">
                    <span class="item-name">公众号类型：</span>
                    <span class="item-value">{{info.wechatType}}</span>
                </div>
                <div class="authorization-item">
                    <span class="item-name">授权状态：</span>
                    <span class="item-value" style="color:green;">{{info.authorizationStatus}}</span>
                </div>
                <div class="authorization-item">
                    <span class="item-name">认证主体：</span>
                    <span class="item-value">{{info.company}}</span>
                </div>
                <div class="authorization-item">
                    <span class="item-name">创建人：</span>
                    <span class="item-value">{{info.createAdmin}}</span>
                </div>
                <div class="authorization-item">
                    <span class="item-name">创建时间：</span>
                    <span class="item-value">{{info.createTime}}</span>
                </div>
                <div class="authorization-item">
                    <span class="item-name">原始ID：</span>
                    <span class="item-value">{{info.originId}}</span>
                </div>
                <!--<div class="authorization-item">-->
                    <!--<span class="item-name">APPID：</span>-->
                    <!--<span class="item-value">{{info.appId}}</span>-->
                <!--</div>-->
                <div class="authorization-item">
                    <span class="item-name">授权权限：</span>
                    <span class="item-value">
                        <div style="margin-left:70px;color:green;">
                            <div style="padding:5px">消息管理权限</div>
                            <div style="padding:5px">自定义菜单权限</div>
                            <div style="padding:5px">网页服务权限</div>
                            <div style="padding:5px">群发与通知权限</div>
                            <div style="padding:5px">用户管理权限</div>
                            <div style="padding:5px">帐号服务权限</div>
                            <div style="padding:5px">素材管理权限</div>
                            <div style="padding:5px">开放平台帐号管理权限</div>
                        </div>
                    </span>
                </div>
                <div class="authorization-item">
                    <span class="item-name head-img-title">二维码：</span>
                    <div class="head-img-url">
                        <img :src=info.qrcode />
                    </div>
                </div>
            </div>
            <!--<el-button type="primary" class="use-btn" size="mini" @click="openDialog">启用</el-button>-->
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
    provide(){
      return {
        reload:this.getStorage
      }
    },
    data() {
      return {
        useDialog: false,
        info : {
          wechatName:'公众号名',
          wechatId:"adc",
          wechatType:'服务号',
          authorizationStatus:'授权成功',
          company:'上海嵩恒网络科技有限股份公司',
          createAdmin:'Tom',
          createTime:'2019-05-13 11:47',
          originId:'12345',
          appId:'456789',
          authorizationAuthority:"消息管理权限\n" +
          "\n" +
          "自定义菜单权限\n" +
          "\n" +
          "网页服务权限\n" +
          "\n" +
          "群发与通知权限\n" +
          "\n" +
          "用户管理权限\n" +
          "\n" +
          "帐号服务权限\n" +
          "\n" +
          "素材管理权限\n" +
          "\n" +
          "开放平台帐号管理权限",
          qrcode:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1222929928,1326821480&fm=26&gp=0.jpg'


        },

      }
    },
    watch:{
      '$route':'getStorage'
    },
    created(){
    },
    mounted:function(){
//      this.$nextTick(function () {
//        this.getStorage();
//      })
    },
    methods: {
      getStorage(){
        let res = JSON.parse(localStorage.getItem("wechatItem"));
        this.info.wechatType = res.wechatType?res.wechatType:this.info.wechatType
        this.info.wechatName = res.wechatName?res.wechatName:this.info.wechatName
        this.info.wechatId = res.wechatId?res.wechatId:this.info.wechatId
        this.info.originId = res.originId?res.originId:this.info.originId
        this.info.company = res.company?res.company:this.info.company
        this.info.createTime = res.createTime?res.createTime:this.info.createTime
        this.info.qrcode = res.qrcode?res.qrcode:this.info.qrcode
        console.log(res)
        console.log(res.wechatId)
        console.log(res.wechatName)
      },
      openDialog() {
        this.useDialog = true
      }
    }
  }
</script>
<style lang="scss" scoped>
    .authorization-page{
        .authorization-header{
            height: 50px;
            padding-left: 15px;
            .el-breadcrumb{
                font-size: 16px;
                margin-top: 15px;
            }
        }
        .authorization-body{
            .authorization-box{
                width: 95%;
                margin: 10px 0 0 40px;
                font-weight:bold;
                /*margin: 0 auto;*/
                /*margin-top: 20px;*/
                .authorization-item{
                    margin-bottom: 20px;
                    .head-img-url{
                        display: inline-block;
                        width: 100px;
                        height: 100px;
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
