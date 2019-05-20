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
            <div style="margin-left: 50px;font-weight:bold;background-color: #fcf8e3;padding: 20px;"><i class="el-icon-thumb"></i> 规则：一共可以选择6个档位，其中至多两个为首充档位，至多一个为无充赠档位；若选择无充赠档位为首充档位，则该档位不计入总共6个档位中</div>
        </el-row>
        <el-row :gutter="40" style="margin-left: 50px;">
            <el-col :span="6">
                <div class="grid-content">
                    <h2>
                        无充赠档位
                    </h2>
                    <p>低额度，无赠币，吸引低R用户，至多1个</p>
                    <div style="max-height: 1px;min-height: 1px;over-flow:hidden;margin:6px 0 5px"></div>
                    <ul >
                        <div class="level-item">
                            <li class="page-c-recharge-item">
                                <div class="page-c-recharge-box">
                                    <h4 class="page-c-recharge-title">
                                        <span>得600</span>
                                    </h4>
                                    <h5 class="page-c-recharge-mtitle">

                                    </h5>
                                    <span class="page-c-recharge-num">￥6</span>
                                </div>
                            </li>
                            <div class="first-recharge">
                                <div class="first-recharge-check">
                                    <input type="checkbox" name="onefirstPay" value="1">
                                    <h5>首充</h5>
                                </div>
                            </div>
                        </div>
                        <div class="level-item">
                            <li class="page-c-recharge-item">
                                <div class="page-c-recharge-box">
                                    <h4 class="page-c-recharge-title">
                                        <span>得600</span>
                                    </h4>
                                    <h5 class="page-c-recharge-mtitle">

                                    </h5>
                                    <span class="page-c-recharge-num">￥6</span>
                                </div>
                            </li>
                            <div class="first-recharge">
                                <div class="first-recharge-check">
                                    <input type="checkbox" name="onefirstPay" value="1">
                                    <h5>首充</h5>
                                </div>
                            </div>
                        </div>
                        <div class="level-item">
                            <li class="page-c-recharge-item">
                                <div class="page-c-recharge-box">
                                    <h4 class="page-c-recharge-title">
                                        <span>得600</span>
                                    </h4>
                                    <h5 class="page-c-recharge-mtitle">

                                    </h5>
                                    <span class="page-c-recharge-num">￥6</span>
                                </div>
                            </li>
                            <div class="first-recharge">
                                <div class="first-recharge-check">
                                    <input type="checkbox" name="onefirstPay" value="1">
                                    <h5>首充</h5>
                                </div>
                            </div>
                        </div>
                    </ul>
                </div>


            </el-col>
            <el-col :span="10">
                <div class="grid-content">
                    <h2>
                        常规充赠档位
                    </h2>
                    <p>档位越高，赠币比例越高，选择档位后，可以在其中选择至多2个作为首充档位，首充金额为充值金额-2元，用户已充值过任何一档将不再满足首充优惠，充赠比>1:1（例30元档，首充为充28元赠3200书券，若用户已充值过任一档，该档位回落30元赠1000书券）</p>
                    <div style="max-height: 1px;min-height: 1px;over-flow:hidden;margin:6px 0 5px"></div>
                    <ul >
                        <div class="level-item">
                            <li class="page-c-recharge-item">
                                <div class="page-c-recharge-box">
                                    <h4 class="page-c-recharge-title">
                                        <span>得600</span>
                                    </h4>
                                    <h5 class="page-c-recharge-mtitle" style="color:rgb(255, 136, 0);">
                                        3000书币+1000书券
                                    </h5>
                                    <span class="page-c-recharge-num">￥6</span>
                                </div>
                            </li>
                            <div class="first-recharge">
                                <div class="first-recharge-check">
                                    <input type="checkbox" name="onefirstPay" value="1">
                                    <h5>首充</h5>
                                </div>
                            </div>
                        </div>
                        <div class="level-item">
                            <li class="page-c-recharge-item">
                                <div class="page-c-recharge-box">
                                    <h4 class="page-c-recharge-title">
                                        <span>得600</span>
                                    </h4>
                                    <h5 class="page-c-recharge-mtitle" style="color:rgb(255, 136, 0);">
                                        3000书币+1000书券
                                    </h5>
                                    <span class="page-c-recharge-num">￥6</span>
                                </div>
                            </li>
                            <div class="first-recharge">
                                <div class="first-recharge-check">
                                    <input type="checkbox" name="onefirstPay" value="1">
                                    <h5>首充</h5>
                                </div>
                            </div>
                        </div>
                        <div class="level-item">
                            <li class="page-c-recharge-item">
                                <div class="page-c-recharge-box">
                                    <h4 class="page-c-recharge-title">
                                        <span>得600</span>
                                    </h4>
                                    <h5 class="page-c-recharge-mtitle" style="color:rgb(255, 136, 0);">
                                        3000书币+1000书券
                                    </h5>
                                    <span class="page-c-recharge-num">￥6</span>
                                </div>
                            </li>
                            <div class="first-recharge">
                                <div class="first-recharge-check">
                                    <input type="checkbox" name="onefirstPay" value="1">
                                    <h5>首充</h5>
                                </div>
                            </div>
                        </div>
                        <div class="level-item">
                            <li class="page-c-recharge-item">
                                <div class="page-c-recharge-box">
                                    <h4 class="page-c-recharge-title">
                                        <span>得600</span>
                                    </h4>
                                    <h5 class="page-c-recharge-mtitle" style="color:rgb(255, 136, 0);">
                                        3000书币+1000书券
                                    </h5>
                                    <span class="page-c-recharge-num">￥6</span>
                                </div>
                            </li>
                            <div class="first-recharge">
                                <div class="first-recharge-check">
                                    <input type="checkbox" name="onefirstPay" value="1">
                                    <h5>首充</h5>
                                </div>
                            </div>
                        </div>
                    </ul>
                </div>


            </el-col>
            <el-col :span="7">
                <div class="grid-content">
                    <h2>
                        包年档位
                    </h2>
                    <p>包年书库免费权益</p>
                    <div style="max-height: 1px;min-height: 1px;over-flow:hidden;margin:6px 0 5px"></div>
                    <ul >
                        <div class="level-item">
                            <li class="page-c-recharge-item">
                                <div class="page-c-recharge-box">
                                    <h4 class="page-c-recharge-title">
                                        <span>得600</span>
                                    </h4>
                                    <h5 class="page-c-recharge-mtitle" style="color:rgb(255, 136, 0);">
                                        3000书币+1000书券
                                    </h5>
                                    <span class="page-c-recharge-num">￥6</span>
                                </div>
                            </li>
                            <div class="first-recharge">
                                <div class="first-recharge-check">
                                    <input type="checkbox" name="onefirstPay" value="1">
                                    <h5>首充</h5>
                                </div>
                            </div>
                        </div>
                        <div class="level-item">
                            <li class="page-c-recharge-item">
                                <div class="page-c-recharge-box">
                                    <h4 class="page-c-recharge-title">
                                        <span>得600</span>
                                    </h4>
                                    <h5 class="page-c-recharge-mtitle" style="color:rgb(255, 136, 0);">
                                        3000书币+1000书券
                                    </h5>
                                    <span class="page-c-recharge-num">￥6</span>
                                </div>
                            </li>
                            <div class="first-recharge">
                                <div class="first-recharge-check">
                                    <input type="checkbox" name="onefirstPay" value="1">
                                    <h5>首充</h5>
                                </div>
                            </div>
                        </div>
                        <div class="level-item">
                            <li class="page-c-recharge-item">
                                <div class="page-c-recharge-box">
                                    <h4 class="page-c-recharge-title">
                                        <span>得600</span>
                                    </h4>
                                    <h5 class="page-c-recharge-mtitle" style="color:rgb(255, 136, 0);">
                                        3000书币+1000书券
                                    </h5>
                                    <span class="page-c-recharge-num">￥6</span>
                                </div>
                            </li>
                            <div class="first-recharge">
                                <div class="first-recharge-check">
                                    <input type="checkbox" name="onefirstPay" value="1">
                                    <h5>首充</h5>
                                </div>
                            </div>
                        </div>
                        <div class="level-item">
                            <li class="page-c-recharge-item">
                                <div class="page-c-recharge-box">
                                    <h4 class="page-c-recharge-title">
                                        <span>得600</span>
                                    </h4>
                                    <h5 class="page-c-recharge-mtitle" style="color:rgb(255, 136, 0);">
                                        3000书币+1000书券
                                    </h5>
                                    <span class="page-c-recharge-num">￥6</span>
                                </div>
                            </li>
                            <div class="first-recharge">
                                <div class="first-recharge-check">
                                    <input type="checkbox" name="onefirstPay" value="1">
                                    <h5>首充</h5>
                                </div>
                            </div>
                        </div>
                    </ul>
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
  import {orgModuleApi} from '../../api/main'
  export default {
    components: {ElRow},
    name: 'recharge-position-setup',
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
    .level-item {
        display: inline-block;
        padding: 10px 5px 10px 10px;
        margin: 0 10px 10px 0;
        border-radius: 8px;
        border: 1px solid #eee;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
    }
    .page-c-recharge-item {
        cursor: pointer;
        margin-bottom: 0;
        width: 130px;
    }
    .red {
        color: #DD5A43 !important;
    }


    .page-c-recharge-item {
        width: calc(50% - 1.4rem);
        display: inline-block;
        vertical-align: top;
        margin-bottom: .9375rem;
        color: #333;
        position: relative;
    }
    .page-c-recharge-item {
        cursor: pointer;
        margin-bottom: 0;
        width: 130px;
    }

    .page-c-recharge-box {
        overflow: hidden;
        min-height: 4.75rem;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
        border-radius: .5rem;
        position: relative;
        padding: .7rem 0 .5rem;
        color: #333;
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
        margin-top: 30px;
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
        left:160px;
        font-size: 90px;
        color: #00AA00;
        text-align: center;
        display: none;
        z-index:1000;
        position:absolute;
    }
    .menu-pic {
        width: 350px;
        margin: 30px 1px 30px 160px;
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
