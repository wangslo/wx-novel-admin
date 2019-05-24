<template>
  <div class="imgPromotion-page">
    <div class="novel-body" id="novel-text">
      <div class="title">
        <h3>{{title}}</h3>
      </div>
      <div class="header-img">
        <img src="https://ywopen-1252317822.file.myqcloud.com/wxcp/banner/wx_msg_pic_32.png" class="avatar">
      </div>
      <section class="content" v-if="chapterContent" v-for="(item,idx) in chapterContent" :key="idx">
        <h3>{{item.title}}</h3>
        <section v-for="(text,index) in item.content" :key="index">
          <p>{{text}}</p>
        </section>
      </section>
      <div class="footer-img">
        <img src="https://ywopen-1252317822.file.myqcloud.com/wxcp/promotionguide/5a5f0c3fc5674.jpg" class="avatar">
        <canvas id="promotion-qrcode"></canvas>
      </div>
      <div class="footer">
        <span>点击下方“阅读原文”查看更多</span>
      </div>
    </div>
    <div class="right-box2">
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
        title: '',
        id: '',
        bookid: '',
        channel: '',
        chapterNum: '',
        chapterContent: [],
        promotion_url: '',
      }
    },
    created() {
      this.id = this.$route.query.id
      this.bookid = this.$route.query.bookId
      this.channel = this.$route.query.channel
      this.chapterNum = this.$route.query.chapterNum
      this.getBookInfo()
      this.getUrl()
    },
    methods: {
      getUrl() {
        var _this = this
        var params = {
          id: _this.id,
        }
        msgModuleApi.jumpPage(params).then(res=>{
          if(res.success) {
            _this.promotion_url = res.data.qrCodeUrl
            _this.title = res.data.qname

            var qr_target= document.getElementById('promotion-qrcode')
            QRCode.toCanvas(qr_target, _this.promotion_url, function (error) {
              console.log(error)
            })
            qr_target.style.width='229px'
            qr_target.style.height='229px'
          }
        })
      },
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
      getBookInfo() {
        var _this = this
        var params = {
          bookid: _this.bookid,
          chapterNum: _this.chapterNum,
        }
        msgModuleApi.getBookInfos(params).then(res=>{
          if(res.success) {
            var chapter = res.data.chapter
            chapter.map((item,idx) => {
              _this.chapterContent.push({
                chapterId: item.chapterId,
                title: item.title,
                content: item.content.toString().split('!@#!@'),
              })
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

      }
      .header-img{
        text-align: center;
        img{
          width: 100%;
          height: 100%;
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
        position: relative;
        img{
          width: 100%;
          height: 100%;
        }
        #promotion-qrcode{
          position: absolute;
          right: 12px;
          top: 9px;
        }
      }
      .footer{
        margin-bottom: 50px;
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
