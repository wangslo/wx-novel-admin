<template>
  <div class="imgPromotion-page">
    <div class="novel-body">
      <div class="title">
        <h3>{{title}}</h3>
      </div>
      <div class="header-img">
        <img src=""/>
      </div>
      <section class="content">
        <h3>第1章 兵王‘凌天’</h3>
        <p></p>
      </section>
      <div class="footer-img">
        <img src=""/>
      </div>
      <div class="footer">
        <span>点击下方“阅读原文”查看更多</span>
      </div>
    </div>
    <div class="right-box">
      <div class="right-box-inner">
        <div class="right-content">
          <h3>（正常复制粘贴）</h3>
          <div class="create-box">复制文章标题</div>
          <div class="create-box">复制文章内容</div>
          <div class="create-box">复制原文链接</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'promotion',
    data() {
      return {
        title: '为了心爱女人的手术费，他忍痛卖血……',
        bookid: '',
        bookname: '',
        chapterNum: '',
        chapterContent: [],
      }
    },
    created() {
      this.bookid = this.$route.query.id
      this.chapterNum = this.$route.query.chapterNum
      this.getBookInfo()
    },
    methods: {
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
      .header-img{
        img{
          width: 700px;
          height: 300px;
        }
      }
      .content{
        padding: 30px;
        background: #e8e8e7;
        border-left: 2px solid #E44A40;
      }
      .footer-img{
        img{
          width: 700px;
          height: 200px;
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
  }
</style>
