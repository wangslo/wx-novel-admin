<template>
  <div class="stack-room-detail-page">
    <div class="stack-room-detail-header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path: '/stack-room'}">书库管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path: '/stack-room'}">书库列表</el-breadcrumb-item>
        <el-breadcrumb-item>{{info.bookName}}详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="stack-room-detail-body">
      <div class="stack-room-detail-info">
        <div class="stack-room-detail-box">
          <div class="detail-info">
            <div class="head-img-url">
              <img style="width:80px;height:95px" :src="info.cover ? info.cover:`https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1222929928,1326821480&fm=26&gp=0.jpg`"/>
            </div>
          </div>
          <div class="stack-room-detail-items">
            <div class="stack-room-detail-item">
              <span class="item-name">书籍名称：</span>
              <span class="item-value">{{info.bookName}}</span>
            </div>
            <div class="stack-room-detail-item">
              <span class="item-name">作者：</span>
              <span class="item-value">{{info.author}}</span>
            </div>
            <div class="stack-room-detail-item">
              <span class="item-name">书籍分类：</span>
              <span class="item-value">{{info.category}}</span>
            </div>
            <div class="stack-room-detail-item">
              <span class="item-name">男女分类：</span>
              <span class="item-value">{{info.sex}}</span>
            </div>
            <div class="stack-room-detail-item">
              <span class="item-name">书商：</span>
              <span class="item-value">{{info.bookSeller}}</span>
            </div>
            <div class="stack-room-detail-item" v-if="false">
              <span class="item-name">书商标识：</span>
              <span class="item-value">XXXXXXX</span>
            </div>
            <div class="stack-room-detail-item">
              <span class="item-name">书籍状态：</span>
              <span class="item-value">{{info.bookStatus}}</span>
            </div>
            <div class="stack-room-detail-item">
              <span class="item-name">字数：</span>
              <span class="item-value">{{info.words}}</span>
            </div>
            <div class="stack-room-detail-item">
              <span class="item-name">章节数：</span>
              <span class="item-value">{{info.chapters}}</span>
            </div>
            <div class="stack-room-detail-item">
              <span class="item-name">类型：</span>
              <span class="item-value">{{info.charge}}</span>
            </div>
            <div class="stack-room-detail-item">
              <span class="item-name">收费方式：</span>
              <span class="item-value">{{info.chargeWays}}</span>
            </div>
            <div class="stack-room-detail-item">
              <span class="item-name">收费起始章节：</span>
              <span class="item-value">{{info.chargeStart}}</span>
            </div>
            <div class="stack-room-detail-item">
              <span class="item-name">状态：</span>
              <span class="item-value">{{info.status}}</span>
            </div>
            <div class="stack-room-detail-item">
              <span class="item-name">最后更新时间：</span>
              <span class="item-value">{{info.lastUpdateTime}}</span>
            </div>
            <div class="stack-room-detail-item">
              <span class="item-name">审核通过时间：</span>
              <span class="item-value">{{info.approvalTimeOfAudit}}</span>
            </div>
          </div>
        </div>
        <div class="stack-room-detail-btn">
          <el-button v-if="info.status != '上架中'" type="primary" size="mini" @click="setOnline">上架</el-button>
          <el-button v-else type="danger" size="mini" @click="setOnline">下架</el-button>
          <el-button type="primary" size="mini" @click="setChapter">设置收费章节</el-button>
        </div>
        <div class="stack-room-detail-operat">
          <span class="item-name">操作详情：</span>
          <div class="operat-reason">
            <template v-for="(record,index) in operationRecords">
              <span class="item-value">{{record}}</span>
            </template>
          </div>
        </div>
      </div>
      <div class="stack-room-detail-payment">
        <div class="payment-condition">
          <div class="payment-title">
            <h3>付费章节详情</h3>
            <span class="payment-total">书币付费总额：{{info.coinSum}}</span>
          </div>
          <div class="payment-search-box">
            <div class="payment-search-input">
              <label>章节</label>
              <el-input v-model="chapter" size="mini"></el-input>
            </div>
            <div class="payment-search-btn">
              <el-button type="primary" size="mini" @click="getStackChapterDetail">查找</el-button>
              <el-button type="info" size="mini" @click="clearData">清空</el-button>
            </div>
          </div>
        </div>
        <div class="payment-search-table">
          <el-table :data="tableData" style="width:100%;" stripe border>
            <el-table-column label="序号" min-width="30" align="center">
              <template slot-scope="scope">
                <span>{{scope.$index + (pageNo - 1) * pageSize + 1}} </span>
              </template>
            </el-table-column>
            <el-table-column prop="chapter" label="章节" min-width="60" align="center"></el-table-column>
            <el-table-column prop="status" label="收费状态" min-width="30" align="center"></el-table-column>
            <el-table-column prop="words" label="字数" min-width="30" align="center"></el-table-column>
            <el-table-column prop="needcoins" label="所需书币" min-width="30" align="center"></el-table-column>
            <el-table-column prop="subscribers" label="订阅人数" min-width="30" align="center"></el-table-column>
            <el-table-column prop="subscribecoins" label="订阅总书币" min-width="30" align="center"></el-table-column>
            <el-table-column label="详情" min-width="60" align="center" v-if="false">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="handleInfo(scope.$index, scope.row)">订阅明细</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5,10,20, 50, 100]"
            background
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalSize">
          </el-pagination>
        </div>
      </div>
    </div>
    <div class="dialog-box">
      <el-dialog title="设置收费起始章节" :visible.sync="editDialog" width="400px">
        <div class="set-input">
          <span>收费起始章节：</span>
          <el-input v-model="new_buyChapter" style="width: 200px;" size="mini"></el-input>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="editDialog = false">取 消</el-button>
            <el-button type="primary" @click="confirmChangeStartChapter(info.bookid)">确 认</el-button>
          </span>
      </el-dialog>
      <el-dialog title="" :visible.sync="offlineDialog" width="500px" center>
        <span v-if="info.status != '上架中'" class="offline-title">确认将“{{info.bookName}}”上架吗？</span>
        <span v-else class="offline-title">确认将“{{info.bookName}}”下架吗？</span>
        <el-input
          type="textarea"
          :rows="3"
          resize="none"
          maxlength='50'
          placeholder="请输入原因"
          @keyup.native="watchSize"
          v-model="reason">
        </el-input>
        <p style="margin: 0;"><span style="text-align: right;">{{textSize}}/50</span></p>
        <span slot="footer" class="dialog-footer">
            <el-button @click="offlineDialog = false">取 消</el-button>
            <el-button v-if="info.status != '上架中'" type="primary" @click="updateStatus(1)">上 架</el-button>
            <el-button v-else type="primary" @click="updateStatus(2)">下 架</el-button>
          </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>

  import {orgModuleApi,msgModuleApi} from '../../api/main'

  export default {
    name: 'stackRoomDetail',
    data() {
      return {
        info : {
          coinSum:0,
          cover:'',
          bookName:'鬼吹灯1',
          author:'作者1',
          category:'玄幻',
          sex:'',
          bookSeller:'',
          bookStatus:'完结',
          bookid:'',
          words:"",
          chapters:"",
          charge:'收费',
          chargeWays:"书币",
          chargeStart:"",
          status:"上架中",
          lastUpdateTime:"",
          approvalTimeOfAudit:"",
        },
        operationRecords:[
          'xxxxx-xxxxxx-xxxxxxx xxxxxxx ，原因：xxx',
        ],
        redirectBookId:'',
        chapter: '',
        tableData: [
          {
            chapter: '第一章：发发',
            status:'收费',
            words:"1000",
            needcoins:'100',
            subscribers:'10',
            subscribecoins:'',
          },
        ],
        pageNo: 1,
        pageSize: 5,
        currentPage: 1,
        totalSize: 0,
        new_buyChapter: '',
        editDialog: false,
        ifOnline: true,
        offlineDialog: false,
        reason: '',
        textSize: 0,
      }
    },
    created() {
      this.redirectBookId = this.$route.query.bookid
      this.getBookDetailInfo()
    },
    mounted(){
      this.getStackChapters(this.redirectBookId)
      //this.getStackChapterDetail(this.redirectBookId);
    },
    methods: {
      getBookDetailInfo(){
        let params = {
          bookid:this.redirectBookId,
        }
        var _this = this
        msgModuleApi.getStackBookDetail(params).then((res)=>{
          console.log(res)
          if(res.success){
            let infos = res.data.novel
            this.info = {
              bookid:infos.bookid,
              cover:infos.cover,
              bookName:infos.name,
              author:infos.author,
              category:infos.category,
              sex: infos.channel >0 ? '女生':'男生',
              bookSeller:infos.ufr,
              bookStatus: infos.bookstatus > 0 ? '完结':'连载',
              words:infos.words,
              chapters:infos.allChapterNum,
              charge:'收费',
              chargeWays:"书币",
              chargeStart:infos.novelSet,
              status: infos.status <= 1 ? '上架中':"已下架",
              lastUpdateTime:infos.updDate,
              approvalTimeOfAudit:infos.addDate,
            }
            this.info.coinSum = res.data.coinSum
            this.operationRecords = res.data.optionList
          }else{
            _this.$router.push({
              path: '/stack-room',
            })
          }
        })
      },
      handleInfo(idx,row) {
        this.$router.push({
          name: 'subscription-details'
        })
      },
      watchSize() {
        if (this.reason.length == 50) {
          this.textSize = 50
          return false
        } else {
          this.textSize = this.reason.length
        }
      },
      setOnline() {
        this.offlineDialog = true
      },
      updateStatus(status = 1){
        if(this.reason.length <3){
          this.$message.error('请填写原因')
          return
        }
        this.offlineDialog = false
        let params = {
          bookid:this.redirectBookId,
          status:status,
          reason:this.reason,
        }
        var _this = this
        msgModuleApi.bookUpdateStatus(params).then((res)=>{
          console.log(res)
          if(res.success){
            _this.getBookDetailInfo();
            this.reason = ''
          }else{
            this.$message.error('服务器出错~~~')
          }
        })
      },
      setChapter() {
        this.editDialog = true
      },
      confirmChangeStartChapter(bookid){
        if(parseInt(this.new_buyChapter) < 1){
          this.$message.error('请填写起始章节')
          return
        }
        let params = {
          bookid:bookid,
          novelset:this.new_buyChapter,
        }
        var _this = this
        msgModuleApi.updateBookStartChapter(params).then((res)=>{
          this.editDialog = false;
          this.chargeStartChapter = ''
          console.log(res)
          if(res.success){
            _this.getBookDetailInfo();
          }else{
            this.$message.error('服务器出错~~~')
          }
        })
      },
      getStackChapters(bookid){
        let params = {
          bookid:bookid,
          page:this.pageNo,
          size:this.pageSize,
        }
        var _this = this
        msgModuleApi.getStackChapters(params).then((res)=>{
          console.log(res)
          if(res.success){
            _this.tableData = []
            res.data.list.map((item,index)=>{
              _this.tableData.push({
                chapter: item.title,
                status:item.isVip > 0 ? '收费':'免费',
                words:item.words,
                needcoins:item.cost,
                subscribers:item.count,
                subscribecoins:item.costCount,
                chapterId:item.chapterId,
                chapterNum:item.order,
                bookid:item.bookid,
              })
            })
          }else{
            this.$message.error('服务器出错~~~')
          }
          _this.totalSize = parseInt(res.data.total)
        })
      },
      getStackChapterDetail(){

        if(this.chapter < 1){
          this.$message.error('请填写章节序号')
          return
        }
        let params = {
          bookid:this.redirectBookId,
          chapternum:this.chapter,
        }
        var _this = this
        this.$message.success('查询中···')
        msgModuleApi.getStackChapterDetail(params).then((res)=>{
          console.log(res)
          if(res.success){
            _this.tableData = []
            res.data.map((item,index)=>{
              _this.tableData.push({
                chapter: item.title,
                status:item.isVip > 0 ? '收费':'免费',
                words:item.words,
                needcoins:item.cost,
                subscribers:item.count,
                subscribecoins:item.costCount,
                chapterId:item.chapterId,
                chapterNum:item.order,
                bookid:item.bookid,
              })
            })
          }
          _this.totalSize = 1
        })
      },
      clearData() {
        this.chapter = ''
        this.getStackChapters(this.redirectBookId)
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.getStackChapters(this.redirectBookId)
      },
      handleCurrentChange(val) {
        this.pageNo = val
        this.getStackChapters(this.redirectBookId)
      },
    }
  }
</script>
<style lang="scss" scoped>
  .stack-room-detail-page {
    padding-bottom: 50px;
    .stack-room-detail-header {
      height: 50px;
      padding-left: 15px;
      .el-breadcrumb {
        font-size: 16px;
        margin-top: 15px;
      }
    }
    .stack-room-detail-body {
      padding-left: 15px;
      padding-right: 15px;
      .stack-room-detail-info{
        padding-bottom: 20px;
        .stack-room-detail-box {
          margin: 0 auto;
          display: flex;
          flex-direction: row;
          margin-top: 5px;
          .stack-room-detail-items{
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            margin-left: 10px;
            .stack-room-detail-item {
              margin-right: 20px;
              margin-bottom: 10px;
              font-size: 14px;
            }
            .operat-reason {
              float: left;
              span {
                display: block;
                margin: 10px 0;
              }
            }
          }
        }
        .stack-room-detail-btn{
          margin-top: 20px;
          margin-bottom: 20px;
        }
        .stack-room-detail-operat{
          display: flex;
          font-size: 14px;
          .operat-reason{
            display: flex;
            flex-direction: column;
          }
        }
      }
      .stack-room-detail-payment{
        padding-top: 20px;
        border-top: 1px solid #e0e0e0;
        .payment-condition{
          .payment-title{
            display: flex;
            flex-direction: row;
            h3{
              background: #409EFF;
              color: #ffffff;
              font-weight: normal;
              text-align: center;
              font-size: 16px;
              margin: 0;
              padding-left: 10px;
              padding-right: 10px;
            }
            .payment-total{
              margin-left: 20px;
              font-size: 14px;
              margin-top: 2px;
            }
          }
          .payment-search-box{
            display: flex;
            margin-top: 20px;
            .payment-search-input{
              label{
                font-size: 14px;
              }
              .el-input{
                width: 200px;
                margin-left: 10px;
              }
            }
            .payment-search-btn{
              margin-left: 50px;
            }
          }
        }
        .payment-search-table{
          margin-top: 20px;
        }
      }
    }
    .dialog-box{
      text-align: center;
      .set-input{
        display: flex;
        span{
          line-height: 1;
          margin-top: 5px;
        }
      }
      .el-dialog__header {
        padding: 0 !important;
      }
      .el-dialog__body {
        span {
          display: block;
          text-align: center;
          margin-bottom: 10px;
        }
      }
      .offline-title {
        font-size: 16px;
      }
    }
  }
</style>
