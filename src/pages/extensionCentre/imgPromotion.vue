<template>
  <div class="imgPromotion-page">
    <div class="novel-body" id="novel-text">
      <div class="title">
        <h3 v-show="!ifEdit" @click="editTitle">{{title}}</h3>
        <div class="edit-title" v-show="ifEdit">
          <el-input type="textarea" :rows="2" v-model="title" resize="none" autofocus="true"></el-input>
          <div class="title-btn">
            <el-button type="primary" size="mini" @click="editTitle">确认</el-button>
            <el-button size="mini" @click="editTitle">取消</el-button>
          </div>
        </div>
      </div>
      <div class="header-img">
        <el-upload
          class="avatar-uploader"
          :http-request="uploadHeadImg"
          action=""
          list-type="picture"
          :show-file-list="false"
          drag>
          <img v-if="headPicUrl != ''" :src="headPicUrl" class="avatar">
          <div class="el-upload__text" v-else>
            <span style="margin-bottom: 20px;">请将图片拖至此</span>
            <span>（上传图片尺寸为XXX*XXX）</span>
            <span>可上传本地图片，支持jpg、jpeg、png格式，大小不超过2M，</span>
            <span>请勿上传含版权争议的图片</span>
          </div>
        </el-upload>
      </div>
      <section class="content" v-if="chapterContent" v-for="(item,idx) in chapterContent" :key="idx">
        <h3>{{item.title}}</h3>
        <section v-for="(text,index) in item.content" :key="index">
          <p>{{text}}</p>
        </section>
      </section>
      <div class="footer-img">
        <el-upload
          class="avatar-uploader"
          :http-request="uploadFootImg"
          action=""
          list-type="picture"
          :show-file-list="false"
          drag>
          <img v-if="footPicUrl != ''" :src="footPicUrl" class="avatar">
          <div class="el-upload__text" v-else>
            <span style="margin-bottom: 20px;">请将图片拖至此</span>
            <span>（上传图片尺寸为XXX*XXX）</span>
            <span>可上传本地图片，支持jpg、jpeg、png格式，大小不超过2M，</span>
            <span>请勿上传含版权争议的图片</span>
          </div>
        </el-upload>
        <canvas id="promotion-qrcode"></canvas>
      </div>
      <div class="footer">
        <span>点击下方“阅读原文”查看更多</span>
      </div>
    </div>
    <div class="right-box" v-show="!copybox">
      <div class="right-box-inner">
        <div class="right-content">
          <h3>（功能操作）</h3>
          <div class="create-box" @click="closeCreateBox">生成推广链接</div>
        </div>
      </div>
    </div>
    <div class="dialog-box">
      <el-dialog :title="'生成《'+bookname+'》推广链接'" :visible.sync="createDialog" width="500px">
        <div class="dialog-body">
          <span>渠道名称默认带入“日期”，可自行修改！</span>
          <div class="url_param">
            <span class="channel">渠道名称：</span>
            <el-input v-model="channel_name" style="width: 200px;" size="mini"></el-input>
          </div>
          <div class="url_param">
            <span>强关设置：</span>
            <el-radio v-model="concern" label="1">强制关注</el-radio>
            <el-radio v-model="concern" label="2">主动关注</el-radio>
            <el-radio v-model="concern" label="3">不设置强关</el-radio>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="createDialog = false">取 消</el-button>
          <el-button type="primary" @click="goToPromo">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="right-box2" v-show="copybox">
      <div class="right-box-inner">
        <div class="right-content">
          <h3>（正常复制粘贴）</h3>
          <div class="create-box tag-title" :data-clipboard-text='title' @click="copyTitle">复制文章标题</div>
          <div class="create-box tag-text" data-clipboard-target="#novel-text" @click="copyText">复制文章内容</div>
          <div class="create-box tag-url" :data-clipboard-text='promotion_url' @click="copyUrl">复制原文链接</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {msgModuleApi} from "../../api/main";
  import Clipboard from 'clipboard';
  import QRCode from 'qrcode'
  export default {
    name: 'imgPromotion',
    data() {
      return {
        ifEdit: false,
        title: '请输入标题',
        createDialog: false,
        headPicUrl: '',
        footPicUrl: '',
        channel_name: '',
        concern: '2',
        bookid: '',
        bookname: '',
        chapterId: '',
        chapterNum: '',
        chapterContent: [],
        copybox: false,
        promotion_url: '',
      }
    },
    created() {
      this.bookid = this.$route.query.id
      this.chapterNum = this.$route.query.chapterNum
      this.getBookInfo()
    },
    methods: {
      copyTitle() {
        var clipboard = new Clipboard('.tag-title')
        clipboard.on('success', e => {
          this.$message.success('复制成功')
          clipboard.destroy()
        })
        clipboard.on('error', e => {
          this.$message.success('复制失败')
          clipboard.destroy()
        })
      },
      copyText() {
        var clipboard = new Clipboard('.tag-text')
        clipboard.on('success', e => {
          this.$message.success('复制成功')
          clipboard.destroy()
        })
        clipboard.on('error', e => {
          this.$message.success('复制失败')
          clipboard.destroy()
        })
      },
      copyUrl() {
        var clipboard = new Clipboard('.tag-url')
        clipboard.on('success', e => {
          this.$message.success('复制成功')
          clipboard.destroy()
        })
        clipboard.on('error', e => {
          this.$message.success('复制失败')
          clipboard.destroy()
        })
      },
      uploadHeadImg(e) {
        var _this = this
        let uploadData = new FormData();
        uploadData.append('file', e.file);
        msgModuleApi.uploadFile(uploadData).then(res=>{
          if(res.success) {
            _this.headPicUrl = res.data.url
          }
        })
      },
      uploadFootImg(e){
        var _this = this
        let uploadData = new FormData();
        uploadData.append('file', e.file);
        msgModuleApi.uploadFile(uploadData).then(res=>{
          if(res.success) {
            _this.footPicUrl = res.data.url
          }
        })
      },
      getBookInfo() {
        var _this = this
        var params = {
          bookid: _this.bookid,
          chapterNum: _this.chapterNum,
        }
        msgModuleApi.getBookInfos(params).then(res=>{
          console.log(res)
          if(res.success) {
            _this.bookname = res.data.book.name
            var chapter = res.data.chapter
            chapter.map((item,idx) => {
              _this.chapterContent.push({
                chapterId: item.chapterId,
                title: item.title,
                content: item.content.toString().split('!@#!@'),
              })
            })
            _this.chapterId = res.data.next
          }
        })
      },
      editTitle() {
        this.ifEdit = !this.ifEdit
      },
      closeCreateBox() {
        this.createDialog = !this.createDialog
      },
      goToPromo() {
        var _this = this
        var params = {
          appid: 'wx45a447d8dc271447',
          qname: _this.channel_name,
          defaultHtml: 'asasd',
          subType: _this.concern,
          title: _this.title,
          bookid: _this.bookid,
          chapterId: _this.chapterId,
          chapterNum: _this.chapterNum + 1,
          qrCodeUrl: 'http://test-dev.dftoutiao.com/janfly_html/wx-novel/readPage.html?chapterId=' + _this.chapterId
          + '&bookid=' + _this.bookid + '&booktitle=' + _this.bookname,
        }
        msgModuleApi.createUrl(params).then(res=>{
          console.log(res)
          if(res.success) {
            _this.createDialog = false
            _this.copybox = true
            _this.promotion_url = 'http://test-dev.dftoutiao.com/janfly_html/wx-novel/promotion.html?channel=' + res.data.qid
            var msg= document.getElementById('promotion-qrcode')
            QRCode.toCanvas(msg, _this.promotion_url, function (error) {
              console.log(error)
            })
          }
        })
      },
    }
  }
</script>
<style lang="scss">
  .imgPromotion-page{
    width: 740px;
    margin: 0 auto;
    .novel-body{
      padding-left: 20px;
      padding-right: 20px;
      .title{
        .edit-title{
          margin-top: 20px;
          .title-btn{
            float: right;
          }
        }
      }
      .header-img{
        text-align: center;
        .avatar-uploader{
          .el-upload-dragger{
            width: 700px;
            height: 300px;
            .el-upload__text{
              margin-top: 50px;
            }
            span{
              display: block;
            }
            .avatar {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
      .content{
        padding: 30px;
        background: #e8e8e7;
        border-left: 2px solid #E44A40;
        margin-bottom: 20px;
        p{
          font-size: 16px;
          text-indent: 32px;
          line-height: 40px;
        }
      }
      .footer-img{
        text-align: center;
        display: flex;
        justify-content: space-between;
        .avatar-uploader{
          .el-upload-dragger{
            width: 480px;
            height: 200px;
            .el-upload__text{
              margin-top: 20px;
            }
            span{
              display: block;
            }
            .avatar {
              width: 100%;
              height: 100%;
            }
          }
        }
        #promotion-qrcode{
          width:200px;
          height:200px;
          border: 1px solid;
        }
      }
      .footer{
        margin-bottom: 50px;
      }
    }
    .right-box{
      position: fixed;
      top: 20px;
      left: 0;
      right: 0;
      color: #717375;
      text-align: center;
      .right-box-inner{
        position: relative;
        width: 740px;
        margin-left: auto;
        margin-right: auto;
        .right-content{
          width: 180px;
          right: -198px;
          box-shadow: rgba(30, 30, 30, 0.027451) 2px 4px 16px;
          border: 1px solid rgb(222, 222, 222);
          position: absolute;
          top: 0;
          padding: 5px;
          background-color: #fff;
          word-wrap: break-word;
          word-break: break-all;
          h3{
            background: #6a7583;
            color: white;
            padding: 8px;
            font-size: 14px;
            margin: 0;
            border-radius: 4px;
          }
          .create-box{
            width: 120px;
            font-size: 14px;
            line-height: 1;
            margin: 20px auto;
            padding: 10px 8px;
            background: #4caf50;
            color: #ffffff;
            border-radius: 4px;
          }
        }
      }
    }
    .dialog-box{
      .dialog-body{
        text-align: left;
      }
      .url_param{
        display: flex;
        margin-top: 20px;
        span{
          line-height: 1;
        }
        .channel{
          margin-top: 5px;
        }
        .el-radio{
          margin-right: 10px;
          line-height: 1;
        }
      }
    }
    .right-box2{
      position: fixed;
      top: 20px;
      left: 0;
      right: 0;
      color: #717375;
      text-align: center;
      .right-box-inner{
        position: relative;
        width: 740px;
        margin-left: auto;
        margin-right: auto;
        .right-content{
          width: 180px;
          right: -198px;
          box-shadow: rgba(30, 30, 30, 0.027451) 2px 4px 16px;
          border: 1px solid rgb(222, 222, 222);
          position: absolute;
          top: 0;
          padding: 5px;
          background-color: #fff;
          word-wrap: break-word;
          word-break: break-all;
          h3{
            background: #6a7583;
            color: white;
            padding: 8px;
            font-size: 14px;
            margin: 0;
            border-radius: 4px;
          }
          .create-box{
            width: 120px;
            font-size: 14px;
            line-height: 1;
            margin: 20px auto;
            padding: 10px 8px;
            background: #4caf50;
            color: #ffffff;
            border-radius: 4px;
          }
        }
      }
    }
  }
</style>
