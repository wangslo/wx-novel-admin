<template>
    <div class="menu-config-page">
        <div class="menu-config-header">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
                <el-breadcrumb-item >计费管理</el-breadcrumb-item>
                <el-breadcrumb-item >充值档位配置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-row>
            <div style="margin-left: 50px;font-weight:bold;background-color: #fcf8e3;padding: 20px;"><i class="el-icon-thumb"></i>点击图片，可切换充值档位，即时生效</div>
        </el-row>
        <el-row :gutter="10">
            <template v-for="(item, index) in ulList">
                <el-col :span="6">
                    <div class="grid-content bg-purple menu-pic" @click="changeType(1)" style="background-image: url('//ywopen-1252317822.file.myqcloud.com/openwx/recommendimg/20190117/5c40386892ccd.png')">
                        <div  class="menu-check" :style="{'display' : index == 0 ? 'block' : 'none'}"><i class="fa fa-check-circle"></i></div>
                        <div style="border: 0;width: 100%;margin-top: 240px;">
                            <ul style="margin:10px 5px 0 5px;list-style: none;">
                                <template v-for="(liItem,index2) in item.grades">
                                    <li :class="{'page-c-recharge-item':true,'red':liItem.first,'orange':liItem.option.type}">
                                        <div class="page-c-recharge-box">
                                            <h4 class="page-c-recharge-title"><span>得</span>{{liItem.option.times*liItem.option.amount}}</h4>
                                            <h5 class="page-c-recharge-mtitle" v-if="liItem.option.addition">{{liItem.option.addition}}</h5>
                                            <h5 class="page-c-recharge-mtitle" v-else>&nbsp;</h5>
                                            <span class="page-c-recharge-num">¥{{liItem.option.amount}}</span>
                                        </div>
                                    </li>
                                </template>
                            </ul>
                        </div>
                    </div>
                    <div style="width: 300px;
                            margin: 3px 1px 30px 50px;
                            height: 330px;
                            float: left;
                            cursor: pointer;
                            background-size: 100%;
                            background-repeat: no-repeat;
                            font-size: medium;
                            text-align: center;
                        ">
                        自定义档位配置{{item.id}}
                        <br />
                        <br />
                        <a @click="clickButton(item.id)">编辑配置</a>
                    </div>
                </el-col>
            </template>




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
  import {orgModuleApi} from '../../api/main'
  export default {
    components: {ElRow},
    name: 'recharge-position',
    data() {
      return {
        defriendDialog: false,
        wechatType:1,
        tmpWechatType:1,
        ulList:[],
      }
    },
    created() {
      this.getGradeList()
      console.log('created')
      this.getOptionList()
    },
    methods: {
      clickButton(index){
        this.$router.push({
          name:'rechargePositionSetup',
          query:{
            id:index,
          },
        })
      },
      getOptionList(){
        var params = {}
        var _this = this
        orgModuleApi.optionList(params).then((res)=>{
          console.log(res)

//          if(res.success){
//            res.data.data.map((item,index)=>{
//              _this.tableData.push({
//                id: item.id,
//                account: item.username,
//                realName: item.name,
//                branch: item.dept,
//                createTime: _this.common.getDate((item.registDate/1000)),
//                status: item.status==1?'正常':'禁用',
//              })
//            })
//            _this.totalSize = parseInt(res.data.total)
//          }
        })
      },
      gradeActive(){
        var params = {}
        var _this = this
        params = {
          appid: '1234567',
        }
        orgModuleApi.gradeList(params).then((res)=>{
          console.log(res)

//          if(res.success){
//            res.data.data.map((item,index)=>{
//              _this.tableData.push({
//                id: item.id,
//                account: item.username,
//                realName: item.name,
//                branch: item.dept,
//                createTime: _this.common.getDate((item.registDate/1000)),
//                status: item.status==1?'正常':'禁用',
//              })
//            })
//            _this.totalSize = parseInt(res.data.total)
//          }
        })
      },
      getGradeList(){
        var params = {}
        var _this = this
        params = {
          appid: '1234567',
        }
        orgModuleApi.gradeList(params).then((res)=>{
          console.log(res)
          this.ulList = res.data;

//          if(res.success){
//            res.data.data.map((item,index)=>{
//              _this.tableData.push({
//                id: item.id,
//                account: item.username,
//                realName: item.name,
//                branch: item.dept,
//                createTime: _this.common.getDate((item.registDate/1000)),
//                status: item.status==1?'正常':'禁用',
//              })
//            })
//            _this.totalSize = parseInt(res.data.total)
//          }
        })
      },
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
    h4 {
        margin-top: 1px;
        margin-bottom: 0px
    }

    .level-container {
        width: 1200px;
        margin: 0 auto
    }

    .level-pic {
        width: 280px;
        margin: 20px 10px 0;
        height: 512px;
        float: left;
        cursor: pointer;
        background-size: 100%;
        background-repeat: no-repeat;
        position: relative
    }

    .level-tips {
        width: 280px;
        margin: 10px 10px;
        float: left;
        font-size: 17px
    }

    .level-check {
        width: 70px;
        height: 50px;
        top: 160px;
        left: 100px;
        font-size: 90px;
        z-index: 1000;
        color: #0A0;
        position: absolute;
        display: none
    }

    .pic-checked {
        width: 283px;
        border: 3px solid #0A0
    }

    .page-c-recharge-list {
        font-size: 0
    }

    .page-c-recharge-item {
        width: calc(50% - 1.4rem);
        display: inline-block;
        vertical-align: top;
        margin-bottom: .9375rem;
        color: #333;
        position: relative
    }

    .page-c-recharge-box {
        overflow: hidden;
        min-height: 4.75rem;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
        border-radius: .5rem;
        position: relative;
        padding: .7rem 0 .5rem;
        color: #333
    }

    .page-c-recharge-box::before {
        position: absolute;
        content: '';
        right: 0;
        bottom: 0;
        top: 0;
        left: 0
    }

    .page-c-recharge-item.orange {
        color: #F80
    }

    .page-c-recharge-item.orange .page-c-recharge-box {
        color: #fff;
        box-shadow: 0 4px 8px 0 rgba(255, 136, 0, 0.2);
        background-color: #F80
    }

    .page-c-recharge-item.orange .page-c-recharge-box::before {
        background: url(//ywopen-1252317822.file.myqcloud.com/openwx/recommendimg/20190115/5c3d88ee52ee9.png) no-repeat bottom right;
        background-size: contain
    }

    .page-c-recharge-item.red {
        color: #FF002B
    }

    .page-c-recharge-item.red .page-c-recharge-box {
        color: #fff;
        box-shadow: 0 4px 8px 0 rgba(255, 0, 43, 0.2);
        background-color: #FF002B
    }

    .page-c-recharge-item.red .page-c-recharge-box::before {
        background: url(//ywopen-1252317822.file.myqcloud.com/openwx/recommendimg/20190115/5c3d88ee63c6f.png) no-repeat bottom right;
        background-size: contain
    }

    .page-c-recharge-item.gray .page-c-recharge-mtitle {
        position: absolute;
        left: 0;
        right: 0;
        color: #F80;
        margin: auto;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden
    }

    .page-c-recharge-item.gray .page-c-recharge-title {
        margin-bottom: 2px;
        margin-top: 0px
    }

    .page-c-recharge-item.gray .page-c-recharge-num {
        padding-top: 1.085rem;
        padding-bottom: 0
    }

    .page-c-recharge-item.gray .page-c-recharge-box {
        border: 1px solid #E6E9EB
    }

    .page-c-recharge-item.red::after,.page-c-recharge-item.orange::after {
        position: absolute;
        content: '优惠';
        font-size: .75rem;
        width: 2.375rem;
        height: 1.125rem;
        background: url("data:image/svg+xml,%3Csvg width='38' height='18' viewBox='0 0 38 18' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h30a8 8 0 0 1 8 8v10H7.209a4 4 0 0 1-3.905-3.132L0 0z' fill='%23FFBB68' fill-rule='evenodd'/%3E%3C/svg%3E") center center no-repeat;
        background-size: cover;
        right: 0;
        top: 0;
        color: #FFF;
        text-align: center
    }

    .page-c-recharge-item.red::after {
        content: '首充';
        background: url("data:image/svg+xml,%3Csvg width='38' height='18' viewBox='0 0 38 18' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h30a8 8 0 0 1 8 8v10H7.209a4 4 0 0 1-3.905-3.132L0 0z' fill='%23FF7D7D' fill-rule='evenodd'/%3E%3C/svg%3E") center center no-repeat;
        background-size: cover
    }

    .page-c-recharge-item:nth-of-type(even) {
        margin-left: .4rem
    }

    .page-c-recharge-item:nth-of-type(odd) {
        margin-right: .4rem
    }

    .page-c-recharge-title {
        position: relative;
        color: currentColor;
        font-size: 22px;
        text-align: center;
        line-height: 1
    }

    .page-c-recharge-title span {
        font-size: .75rem;
        color: currentColor;
        margin-right: 5px
    }

    .page-c-recharge-mtitle {
        font-size: .75rem;
        color: currentColor;
        position: relative;
        text-align: center;
        margin-bottom: 0;
        margin-top: 2px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden
    }

    .page-c-recharge-num {
        font-family: 'special';
        color: currentColor;
        font-size: 18px;
        display: block;
        position: relative;
        text-align: center;
        margin-right: .3125rem
    }

    .page-c-recharge-mnum {
        text-decoration: line-through;
        font-weight: normal;
        margin-left: .3125rem;
        color: currentColor;
        font-style: normal;
        font-size: .75rem
    }

    .level-show {
        border: 0;
        width: 100%;
        margin-top: 180px
    }




    .level-item {
        display: inline-block;
        padding: 10px 5px 10px 10px;
        margin: 0 10px 10px 0;
        border-radius: 8px;
        border: 1px solid #eee;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
    }
    .level-item-checked {
        border: 1px solid #00AA00;
        box-shadow: rgba(0, 255, 0, 0.2) 0px 4px 8px 0px;
    }
    .page-c-recharge-item {
        cursor: pointer;
        margin-bottom: 30px;
        width: 130px;
    }


    .orange {
        color: #FF892A !important;
    }
    .red {
        color: #dd350b !important;
    }

    .page-c-recharge-item.red .page-c-recharge-box {
        color: #fff;
        box-shadow: 0 4px 8px 0 rgba(255, 136, 0, 0.2);
        background-color:#FF002B;
    }

    .page-c-recharge-item.orange .page-c-recharge-box {
        color: #fff;
        box-shadow: 0 4px 8px 0 rgba(255, 136, 0, 0.2);
        background-color: #F80;
    }

    .page-c-recharge-item {
        width: calc(50% - 1.4rem);
        display: inline-block;
        vertical-align: top;
        margin-bottom: .9375rem;
        color: #333;
        position: relative;
    }

    .page-c-recharge-box {
        overflow: hidden;
        min-height: 4.75rem;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
        border-radius: .5rem;
        position: relative;
        padding: .2rem 0 .5rem;
        color: #333;
    }
    .page-c-recharge-item.red .page-c-recharge-box::before {
        background: url(//ywopen-1252317822.file.myqcloud.com/openwx/recommendimg/20190115/5c3d88ee63c6f.png) no-repeat bottom right;
        background-size: contain;
    }

    .page-c-recharge-box::before {
        position: absolute;
        content: '';
        right: 0;
        bottom: 0;
        top: 0;
        left: 0;
    }
    .page-c-recharge-item.red::after {
        content: '首充';
        background: url("data:image/svg+xml,%3Csvg width='38' height='18' viewBox='0 0 -38 -18' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h30a8 8 0 0 1 8 8v10H7.209a4 4 0 0 1-3.905-3.132L0 0z' fill='%23FF7D7D' fill-rule='evenodd'/%3E%3C/svg%3E") center center no-repeat;
        background-size: cover
    }

    .page-c-recharge-title {
        position: relative;
        color: currentColor;
        font-size: 12px;
        text-align: center;
        line-height: 1;
    }

    .page-c-recharge-mtitle {
        margin: 2px 0 1px;
    }

    .page-c-recharge-mtitle {
        font-size: .75rem;
        color: currentColor;
        position: relative;
        text-align: center;
        margin-bottom: 0;
        margin-top: 2px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }

    .first-recharge {
        width: 40px;
        //margin-top: 30px;
        display: inline-block;
        text-align: center;
    }


    .page-c-recharge-num {
        padding-top: 0.285rem;
        padding-bottom: 0;
    }
    .page-c-recharge-num {
        font-family: 'special';
        color: currentColor;
        font-size: 18px;
        display: block;
        position: relative;
        text-align: center;
        margin-right: .3125rem;
    }

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
        /*margin: 50% auto;*/
        top:250px;
        left:145px;
        font-size: 90px;
        color: #00AA00;
        text-align: center;
        display: none;
        z-index:1000;
        position:absolute;
    }
    .menu-pic {
        width: 350px;
        margin: 30px 1px 30px 50px;
        height: 660px;
        float: left;
        cursor: pointer;
        background-size: 100%;
        background-repeat: no-repeat;
        position: relative;
    }
    .fa {
        display: inline-block;
        font: normal normal normal 14px/1 FontAwesome;
        font-size: inherit;
        text-rendering: auto;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
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
