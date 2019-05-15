<template>
    <div class="book-seller-list-page">
        <div class="book-seller-list-header">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{path: '/stack-room'}">书库管理</el-breadcrumb-item>
                <el-breadcrumb-item :to="{path: '/be-audited-list'}">待审核列表</el-breadcrumb-item>
                <el-breadcrumb-item >xxx详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="detail-info">
            <div class="head-img-url">
                <img style="width:80px;height:95px" :src="info.headerImg?info.headerImg:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1222929928,1326821480&fm=26&gp=0.jpg'"/>

            </div>
        </div>
        <div class="banner-detail-box">
            <div class="banner-detail-item">
                <span class="item-name">书籍名称：</span>
                <span class="item-value">{{info.bookName}}</span>
            </div>
            <div class="banner-detail-item">
                <span class="item-name">作者：</span>
                <span class="item-value">{{info.author}}</span>
            </div>
            <div class="banner-detail-item">
                <span class="item-name">分类：</span>
                <span class="item-value">{{info.category}}</span>
            </div>
            <div class="banner-detail-item">
                <span class="item-name">接入方式：</span>
                <span class="item-value">2019-04-04 12:00 至 2019-05-01 12:00</span>
            </div>
            <div class="banner-detail-item">
                <span class="item-name">书商姓名：</span>
                <span class="item-value">书籍名称或跳转链接</span>
            </div>
            <div class="banner-detail-item">
                <span class="item-name">书商电话：</span>
                <span class="item-value">2019-04-06 12:00:00</span>
            </div>
            <div class="banner-detail-item">
                <span class="item-name">书籍总量：</span>
                <span class="item-value">在线</span>
            </div>
            <div class="banner-detail-item">
                <span class="item-name">审核通过：</span>
                <span class="item-value">xxx</span>
            </div>
            <div class="banner-detail-item">
                <span class="item-name">审核未通过：</span>
                <span class="item-value">xxx</span>
            </div>
            <div class="banner-detail-item">
                <span class="item-name">展示中：</span>
                <span class="item-value">xxx</span>
            </div>
            <div class="banner-detail-item">
                <span class="item-name">未展示：</span>
                <span class="item-value">xxx</span>
            </div>
            <div class="banner-detail-item">
                <span class="item-name">收费书籍：</span>
                <span class="item-value">xxx</span>
            </div>
            <div class="banner-detail-item">
                <span class="item-name">免费书籍：</span>
                <span class="item-value">xxx</span>
            </div>
            <div class="banner-detail-item">
                <span class="item-name">书币：</span>
                <span class="item-value">xxx</span>
            </div>
            <div class="banner-detail-item">
                <span class="item-name">创建时间：</span>
                <span class="item-value">xxx</span>
            </div>
            <div class="banner-detail-item">
                <span class="item-name">创建人：</span>
                <span class="item-value">xxx</span>
            </div>
            <div class="banner-detail-item">
                <span class="item-name">备注：</span>
                <span class="item-value">xxx</span>
            </div>

        </div>
        <br />



        <br /><br />

        <div class="line"></div><br />

        <el-row  style="width: 95%;margin: 0 auto;">
            <div style="margin-left: 15px;width : 35%;float: left;height:520px;overflow-y:auto">
                <div class="operat-reason">
                    <template v-for="(chapter,index) in chapters">
                        <span class="item-value" @mouseover="hover(index)" @click="handleDetail(chapter.chapeterId)">> {{chapter.chapterName}}</span>
                    </template>
                </div>
            </div>
            <div style="margin-left: 15px;width : 50%;float: left">
                <el-input
                type="textarea"
                :autosize="{ minRows: 10, maxRows: 25}"
                placeholder="请输入内容"
                v-model="chapterDetail">
                </el-input></div>
            <!--<el-col :span="12"><div class="grid-content bg-purple">5</div></el-col>-->
            <!--<el-col :span="12"><div class="grid-content bg-purple">2</div></el-col>-->
            <!--<span class="item-name" style="display: block">操作记录：</span>-->
            <!--<div class="operat-reason">-->
                <!--<template v-for="operationRecord in operationRecords">-->
                    <!--<span class="item-value">{{operationRecord}}</span>-->
                <!--</template>-->
            <!--</div>-->
        </el-row><br />

        <el-row v-if="info.status == '待审核' ? true:false" style="width: 95%;margin: 0 auto;">
            <div style="margin:0 auto;text-align: center">
                <el-button type="danger"  class="defriend-btn" size="mini" @click="handleDefriend()">拒绝</el-button>
                <el-button type="primary"  class="defriend-btn" size="mini" @click="handleEnable()">通过</el-button>
            </div>
        </el-row>

        <el-row v-if="info.status != '待审核' ? true:false" style="width: 95%;margin: 0 auto;">
            <span class="item-name" style="display: block">操作记录：</span>
            <div class="operat-reason">
                <template v-for="operationRecord in operationRecords">
                    <span class="item-value">{{operationRecord}}</span>
                </template>
            </div>
        </el-row><br />

        <div class="dialog-div">
            <el-dialog title="" :visible.sync="offlineDialog" width="500px" center>
                <span>你确认拒绝“xxxxxxx”书籍吗？</span>
                <el-input
                        type="textarea"
                        :rows="3"
                        resize="none"
                        maxlength='50'
                        placeholder="请输入拒绝原因（不得少于5个汉字）"
                        @keyup.native = "watchSize"
                        v-model="reason">
                </el-input>
                <p style="margin: 0;"><span style="text-align: right;">{{textSize}}/50</span></p>
                <span slot="footer" class="dialog-footer">
            <el-button @click="offlineDialog = false">取 消</el-button>
            <el-button type="primary" @click="offlineDialog = false">确 认</el-button>
          </span>
            </el-dialog>
        </div>


    </div>
</template>
<script>
  import {orgModuleApi} from '../../api/main'
  import ElRow from 'element-ui/packages/row/src/row'
  export default {
    components: {ElRow},
    name: 'bookDetail',
    data() {
      return {
        tmpBookName:'',
        info : {
          headerImg:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1222929928,1326821480&fm=26&gp=0.jp',
          bookName:'鬼吹灯1',
          author:'作者1',
          category:'玄幻',
          status:"待审核1",
          wechatType:'服务号',
          authorizationStatus:'授权成功',
          company:'上海嵩恒网络科技有限股份公司',
          createAdmin:'Tom',
          createTime:'2019-05-13 11:47',
          originId:'12345',
          appId:'456789',
          authorizationAuthority:"首页、用户管理、推荐管理",
          qrcode:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1222929928,1326821480&fm=26&gp=0.jpg'


        },
        operationRecords:[
          'xxxxx-xxxxxx-xxxxxxx xxxxxxx ，原因：xxx',
          'xxxxx-xxxxxx-xxxxxxx xxxxxxx ，原因：xxx',
        ],
        active:'',
        chapters:[
          {'chapeterId':1,chapterName:"第一章 1"},
          {'chapeterId':2,chapterName:"第二章 2"},
          {'chapeterId':1,chapterName:"第一章 1"},
          {'chapeterId':2,chapterName:"第二章 2"},
          {'chapeterId':1,chapterName:"第一章 1"},
          {'chapeterId':2,chapterName:"第二章 2"},
          {'chapeterId':1,chapterName:"第一章 1"},
          {'chapeterId':2,chapterName:"第二章 2"},
          {'chapeterId':1,chapterName:"第一章 1"},
          {'chapeterId':2,chapterName:"第二章 2"},
          {'chapeterId':1,chapterName:"第一章 1"},
          {'chapeterId':2,chapterName:"第二章 2"},
          {'chapeterId':1,chapterName:"第一章 1"},
          {'chapeterId':2,chapterName:"第二章 2"},
          {'chapeterId':1,chapterName:"第一章 1"},
          {'chapeterId':2,chapterName:"第二章 2"},
          {'chapeterId':1,chapterName:"第一章 1"},
          {'chapeterId':2,chapterName:"第二章 2"},
          {'chapeterId':1,chapterName:"第一章 1"},
          {'chapeterId':2,chapterName:"第二章 2"},
          {'chapeterId':1,chapterName:"第一章 1"},
          {'chapeterId':2,chapterName:"第二章 2"},
          {'chapeterId':1,chapterName:"第一章 1"},
          {'chapeterId':2,chapterName:"第二章 2"},
          {'chapeterId':1,chapterName:"第一章 1"},
          {'chapeterId':2,chapterName:"第二章 2"},
          {'chapeterId':1,chapterName:"第一章 1"},
          {'chapeterId':2,chapterName:"第二章 2"},
          {'chapeterId':1,chapterName:"第一章 1"},
          {'chapeterId':2,chapterName:"第二章 2"},
        ],
        chapterDetail:"第三张  第三章标题\n" +
        "       \n" +
        "       张杰张杰张张杰张杰张杰张杰张杰张杰杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰杰张...\n" +
        "张杰张杰张张杰张杰张杰张杰张杰张杰杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰杰张...\n" +
        "张杰张杰张张杰张杰张杰张杰张杰张杰杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰杰张...张杰张杰张张杰张杰张杰张杰张杰张杰杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰杰张...张杰张杰张张杰张杰张杰张杰张杰张杰杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰杰张...张杰张杰张张杰张杰张杰张杰张杰张杰杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰杰张...张杰张杰张张杰张杰张杰张杰张杰张杰杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰杰张...张杰张杰张张杰张杰张杰张杰张杰张杰杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰杰张...\n" +
        "张杰张杰张张杰张杰张杰张杰张杰张杰杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰杰张...\n" +
        "张杰张杰张张杰张杰张杰张杰张杰张杰杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰杰张...\n" +
        "张杰张杰张张杰张杰张杰张杰张杰张杰杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰杰张...\n" +
        "张杰张杰张张杰张杰张杰张杰张杰张杰杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰杰张...\n" +
        "张杰张杰张张杰张杰张杰张杰张杰张杰杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰杰张...\n" +
        "张杰张杰张张杰张杰张杰张杰张杰张杰杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰杰张...\n" +
        "张杰张杰张张杰张杰张杰张杰张杰张杰杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰杰张...\n" +
        "张杰张杰张张杰张杰张杰张杰张杰张杰杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰杰张...\n" +
        "张杰张杰张张杰张杰张杰张杰张杰张杰杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰杰张...\n" +
        "张杰张杰张张杰张杰张杰张杰张杰张杰杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰杰张...张杰张杰张张杰张杰张杰张杰张杰张杰杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰杰张...张杰张杰张张杰张杰张杰张杰张杰张杰杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张张杰张杰张杰张杰张杰张杰杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰杰张...张杰张杰张张杰张杰张杰张杰张杰张杰杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张张...张杰张杰张张杰张杰张杰张杰张杰张杰杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张张...张杰张杰张张杰张杰张杰张杰张杰张杰杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张张...张杰张杰张张杰张杰张杰张杰张杰张杰杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张张...张杰张杰张张杰张杰张杰张杰张杰张杰杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张张...\n" +
        "       张杰张杰张张杰张杰张杰张杰张杰张杰杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张张...张杰张杰张张杰张杰张杰张杰张杰张杰杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰...张杰张杰张张杰张杰张杰张杰张杰张杰杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰...张杰张杰张张杰张杰张杰张杰张杰张杰杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰...张杰张张杰张杰张杰张杰张杰张杰杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰张杰...",
        book_seller_detail_condition: {
          bookType: '999',
          author: '',
          charge_ways: '999',
          status: '999',
          bookStatus: '999',
          update_start_time: '',
          update_end_time: '',
          category: '999',
          bookman: '999',
        },
        book_seller_detail_rules: {
          bookType: '999',
          author: '',
          charge_ways: '999',
          status: '999',
          bookStatus: '999',
          update_start_time: '',
          update_end_time: '',
          category: '999',
          bookman: '999',
        },
        pickerBeginDateBefore:{
          disabledDate: (time) => {
            let beginDateVal = this.book_seller_detail_condition.update_end_time;
            if (beginDateVal) {
              return time.getTime() > beginDateVal;
            }
          }
        },
        pickerBeginDateAfter:{
          disabledDate: (time) => {
            let beginDateVal = this.book_seller_detail_condition.update_start_time;
            if (beginDateVal) {
              return time.getTime() < beginDateVal;
            }
          }
        },
        tableData: [],
        pageNo: 1,
        pageSize: 10,
        currentPage: 1,
        totalSize: 0,
        offlineDialog: false,
        sort_prop: 'updateTime',
        sort_order: 'desc',
      }
    },
    created() {
      this.getStackRoomLists()
    },
    methods: {
      handleDefriend() {
        this.offlineDialog = true
        this.tmpBookName = this.info.bookName
      },
      handleEnable(idx,row) {
//        this.defriendDialog = true
//        this.tmpNickname = row.nickName
//        console.log(row)
      },
      handleDetail:function(chapterId){
        console.log('章节：'+chapterId)
      },
      hover: function(index){
        console.log(index);
        $('.operat-reason span').eq(index).css({
//          'background': green,
          'color': 'green'
        }).siblings().css({
//          'background': '#fff',
          'color': '#333'
        })
      },
      mouseOver: function(){
        this.active = 'background-color: #cccccc';
      },
      mouseLeave: function () {
        this.active = '';
      },
      getStackRoomLists() {

      },
      handleSizeChange(val) {
        this.pageSize = val
        this.getStackRoomLists()
      },
      handleCurrentChange(val) {
        this.pageNo = val
        this.getStackRoomLists()
      },
      clearData() {
        this.$refs.stackRoomForm.resetFields()
      },
      sortChange: function(column, prop, order) {
        this.sort_prop = column.prop
        this.sort_order = column.order.replace('ending','')
        this.getStackRoomLists()
      },
    }
  }
</script>
<style lang="scss">
    .detail-info {
        //width: 15%;
        margin: 0 auto;
        display: inline-block;
        flex-direction: row;
        flex-wrap: wrap;
        float:left;
        margin-left:35px;
    }
    .banner-detail-box{
        width: 89%;
        margin: 0 auto;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin-top: 5px;

    }
    .banner-detail-item{
        margin-right: 20px;
        margin-bottom: 10px;
        .item-name{
            font-size: 14px;
            font-weight: 600;
        }
    }


    .book-seller-list-page{
        .book-seller-list-header{
            height: 50px;
            padding-left: 15px;
            .el-breadcrumb{
                font-size: 16px;
                margin-top: 15px;
            }
        }
        .book-seller-list-body{
            margin-left: 15px;
            margin-right: 15px;
            .book-seller-list-form{
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
            }
        }
        .el-dialog__header{
            padding: 0!important;
        }
        .el-dialog__body{
            span{
                display: block;
                text-align: center;
                margin-bottom: 10px;
            }
        }
    }
    .operat-reason{
        float: left;
        span{
            display: block;
            margin: 10px 0;
        }
    }

    .line{
        width: 100%;
        height: 2px;
        background: #e0e0e0;
        margin-bottom: 10px;
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
    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple {
        background: #d3dce6;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }


</style>
