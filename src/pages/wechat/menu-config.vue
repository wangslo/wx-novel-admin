<template>
    <div class="menu-config-page">
        <div class="menu-config-header">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{path: '/wechat-list'}">公众号管理</el-breadcrumb-item>
                <el-breadcrumb-item >菜单配置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-row>
            <div style="margin-left: 50px;font-weight:bold;background-color: #fcf8e3;padding: 20px;"><i class="el-icon-thumb"></i>点击图片，可切换菜单样式，即时生效</div>
        </el-row>
        <el-row :gutter="1">
            <el-col :span="6">
                <div class="grid-content bg-purple menu-pic" @click="changeType(1)" style="background-image: url('//ywopen-1252317822.file.myqcloud.com/wxcp/upload/menu/template1.png')">
                    <div  class="menu-check" :style="{'display' : wechatType == 1 ? 'block' : 'none'}"><i class="fa fa-check-circle"></i></div>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple menu-pic" @click="changeType(2)" style="background-image: url('//ywopen-1252317822.file.myqcloud.com/wxcp/upload/menu/template2.png')">
                    <div class="menu-check" :style="{'display' : wechatType == 2 ? 'block' : 'none'}"><i class="fa fa-check-circle"></i></div>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple menu-pic" @click="changeType(3)" style="background-image: url('//ywopen-1252317822.file.myqcloud.com/wxcp/upload/menu/template3.png')">
                    <div class="menu-check" :style="{'display' : wechatType == 3 ? 'block' : 'none'}"><i class="fa fa-check-circle"></i></div>
                </div>
            </el-col>
        </el-row>


        <div class="dialog-div">
            <el-dialog title="消息提示" :visible.sync="defriendDialog" width="500px" center>
                <span>确认要更换吗？</span>
                <span slot="footer" class="dialog-footer">
            <el-button @click="defriendDialog = false">取 消</el-button>
            <el-button type="primary" @click="ajaxChange">确 认</el-button>
          </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
  import ElRow from 'element-ui/packages/row/src/row'

  export default {
    components: {ElRow},
    name: 'menu-config',
    data() {
      return {
        defriendDialog: false,
        wechatType:1,
        tmpWechatType:1,
        info : {
          wechatName:'公众号名',
          wechatId:"adc",
          wechatType:'服务号',
          authorizationStatus:'授权成功',
          company:'上海嵩恒网络科技有限股份公司',
          createAdmin:'Tom',
          createTime:'2019-05-13 11:47',
          originId:'12345',
          appId:this.common.appid,
          authorizationAuthority:"首页、用户管理、推荐管理",
          qrcode:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1222929928,1326821480&fm=26&gp=0.jpg'


        }
      }
    },
    methods: {
      ajaxChange(){
        this.defriendDialog = false
        this.wechatType = this.tmpWechatType
      },
      changeType(index) {
        this.defriendDialog = true
        this.tmpWechatType = index
        console.log(index)
      },
      openDialog() {
        this.useDialog = true
      }
    }
  }
</script>
<style lang="scss" scoped>
    .menu-config-page{
        .menu-config-header{
            height: 50px;
            padding-left: 15px;
            .el-breadcrumb{
                font-size: 16px;
                margin-top: 15px;
            }
        }
        .menu-config-body{
            .menu-config-box{
                width: 95%;
                margin: 10px 0 0 40px;
                font-weight:bold;
                /*margin: 0 auto;*/
                /*margin-top: 20px;*/
                .menu-config-item{
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
    .menu-check {
        width: 70px;
        height: 50px;
        margin: 50% auto;
        font-size: 90px;
        color: #00AA00;
        text-align: center;
        display: none;
    }
    .menu-pic {
        width: 300px;
        margin: 30px 1px 30px 160px;
        height: 530px;
        float: left;
        cursor: pointer;
        background-size: 100%;
        background-repeat: no-repeat;
    }
    .el-row {
        margin-bottom: 20px;
        &:last-child {
            margin-bottom: 0;
        }
    }
    .el-col {
        border-radius: 4px;
    }
</style>
