<template>
  <div class="promotionDetail-page">
    <div class="promotionDetail-header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path: '/novelPromotion'}">推广中心</el-breadcrumb-item>
        <el-breadcrumb-item>小说推广</el-breadcrumb-item>
        <el-breadcrumb-item>{{bookname}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="promotionDetail-body">
      <div class="novel-detail" v-if="book">
        <div class="novel-top">
          <div class="novel-img">
            <img :src="book.scover"/>
          </div>
          <div class="novel-top-right">
            <span>{{book.name}}</span>
            <span>作者：{{book.author}}</span>
            <span>{{book.tp1st}}/{{book.channel==0?'男生':'女生'}}/{{book.bookstatus == 1 ? '完结' : '连载中'}}</span>
            <span>书商：{{book.ufr}}（标识{{book.ufr}}）</span>
          </div>
        </div>
        <div class="novel-center">
          <span>总字数：{{book.words}}</span>
          <span>总章节数：{{book.allChapterNum}}</span>
          <span>最后更新时间：{{book.updDate}}</span>
        </div>
        <div class="novel-desc">
          <span>书籍介绍：</span>
          <p>{{book.summary}}</p>
        </div>
      </div>
      <div class="novel-table">
        <el-table :data="tableData" style="width:auto;" stripe border>
          <el-table-column label="序号" width="60" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index+ 1}} </span>
            </template>
          </el-table-column>
          <el-table-column label="章节 / 标题 / 字数 / 收费状态" width="300" align="center">
            <template slot-scope="scope">
              <div class="chapter-box">
                <span style="color: blue;cursor: pointer;">{{scope.row.chapter}}</span>
                <span>(共{{scope.row.num}}字)</span>
                <span>({{scope.row.status}})</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="图文推广" width="100" align="center">
            <template slot-scope="scope">
              <div class="img-promotion" style="color: blue;cursor: pointer;" @click="openImgPage(scope.$index, scope.row)">生成图文</div>
            </template>
          </el-table-column>
          <el-table-column label="H5推广" width="100" align="center">
            <template slot-scope="scope">
              <div class="h5-promotion" style="color: blue;cursor: pointer;" @click="openCreateBox(scope.$index, scope.row)">生成H5链接</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="dialog-box">
      <el-dialog title="生成推广链接" :visible.sync="createDialog" width="500px">
        <div class="dialog-body">
          <span>*渠道名称默认带入日期，可自行修改</span>
          <div class="url_param">
            <span>渠道名称：</span>
            <el-input v-model="channel_name" style="width: 200px;" size="mini"></el-input>
          </div>
          <div class="url_param">
            <span>推广页面：</span>
            <el-input v-model="promotion_page" style="width: 200px;" size="mini" disabled></el-input>
          </div>
          <div class="url_param">
            <span>强关设置：</span>
            <el-radio v-model="concern" label="1">强制关注</el-radio>
            <el-radio v-model="concern" label="2" v-show="false">主动关注</el-radio>
            <el-radio v-model="concern" label="3" v-show="false">不设置强关</el-radio>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="createDialog = false">取 消</el-button>
          <el-button type="primary" @click="closeCreateBox">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="消息提示" :visible.sync="msgDialog" width="500px">
        <span>推广链接已生成，推广效果在推广统计中查看。</span>
        <el-button type="primary" size="mini" class="tag-read" :data-clipboard-text='promotion_url' @click="copyUrl">复制链接</el-button>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="msgDialog = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import {msgModuleApi} from "../../api/main";
  import Clipboard from 'clipboard';

  export default {
    name: 'promotionDetail',
    data() {
      return {
        book: {},
        tableData: [],
        createDialog: false,
        msgDialog: false,
        concern: '1',
        channel_name: '',
        promotion_page: '',
        bookid: '',
        bookname: '',
        chapterId: '',
        chapterNum: '',
        promotion_url: '',
      }
    },
    created() {
      this.bookid = this.$route.query.id
      this.getBookInfo()
    },
    methods: {
      copyUrl() {
        var clipboard = new Clipboard('.tag-read')
        clipboard.on('success', e => {
          this.$message.success('复制成功')
          clipboard.destroy()
        })
        clipboard.on('error', e => {
          this.$message.success('复制失败')
          clipboard.destroy()
        })
      },
      getBookInfo() {
        var _this = this
        var params = {
          bookid: _this.bookid,
          chapterNum: -1,
        }
        msgModuleApi.getBookInfos(params).then(res=>{
          console.log(res)
          if(res.success) {
            _this.book = res.data.book
            _this.bookname = res.data.book.name
            var chapter = res.data.chapter
            chapter.map((item,idx) => {
              _this.tableData.push({
                chapterId: item.chapterId,
                chapter: item.title,
                num: item.words,
                status: '免费',
              })
            })
          }
        })
      },
      closeCreateBox() {
        var _this = this
        var params = {
          appid: _this.common.appid,
          qname: _this.channel_name,
          defaultHtml: _this.promotion_page,
          type: 2,
          subType: _this.concern,
          title: '',
          bookid: _this.bookid,
          chapterId: _this.chapterId,
          chapterNum: _this.chapterNum,
          qrCodeUrl: _this.common.h5_url + 'readPage.html?chapterId=' + _this.chapterId
          + '&bookid=' + _this.bookid + '&booktitle=' + _this.bookname,
        }
        msgModuleApi.createUrl(params).then(res=>{
          console.log(res)
          if(res.success) {
            _this.createDialog = false
            _this.msgDialog = true
            _this.promotion_url = _this.common.h5_url + 'promotion.html?channel=' + res.data.qid
          }
        })
      },
      openCreateBox(idx, row) {
        this.createDialog = true
        this.chapterId = row.chapterId
        this.chapterNum = idx + 1
        this.promotion_page = "《" + this.bookname + "》" + row.chapter
      },
      openImgPage(idx, row) {
        var _this = this
        const {href} = this.$router.resolve({
          path: '/imgPromotion',
          query: {
            id: _this.bookid,
            chapterNum: idx+1,
          }
        })
        window.open(href, '_blank')
      },
    }
  }
</script>
<style lang="scss" scoped>
  .promotionDetail-page{
    .promotionDetail-header{
      height: 50px;
      padding-left: 15px;
      .el-breadcrumb{
        font-size: 16px;
        margin-top: 15px;
      }
    }
    .promotionDetail-body{
      margin: 0 auto;
      width: max-content;
      .novel-detail{
        width: 500px;
        height: 100%;
        padding-right: 30px;
        float: left;
        .novel-top{
          display: flex;
          .novel-img{
            img{
              width: 147px;
              height: 200px;
            }
          }
          .novel-top-right{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-left: 20px;
            padding-top: 20px;
            padding-bottom: 20px;
          }
        }
        .novel-center{
          span{
            display: block;
            margin-top: 10px;
          }
        }
        .novel-desc{
          margin-top: 10px;
          p{
            text-indent: 24px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow: hidden;
          }
        }
      }
      .novel-table{
        padding-left: 30px;
        border-left: 1px solid #e0e0e0;
        float: left;
      }
    }
    .dialog-box{
      .dialog-body{
        padding-left: 50px;
        padding-right: 50px;
        text-align: left;
      }
      .url_param{
        display: flex;
        margin-top: 20px;
        span{
          line-height: 1;
          margin-top: 5px;
        }
        .el-radio{
          margin-right: 10px;
          line-height: 1;
          margin-top: 5px;
        }
      }
    }
  }
  @media screen and (max-width: 1300px) {
    .novel-detail{
      float: none !important;
      padding-left: 20px;
    }
    .novel-table{
      border: 0 !important;
      float: none !important;
      padding-left: 0 !important;
      padding-top: 30px;
      padding-bottom: 50px;
    }
  }
</style>
