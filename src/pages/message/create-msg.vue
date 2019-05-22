<template>
  <div class="create-msg-page">
    <div class="create-msg-header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path: '/replyMsg'}">消息服务</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path: '/replyMsg'}">消息回复</el-breadcrumb-item>
        <el-breadcrumb-item >新建消息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="create-msg-body">
      <el-form ref="createmsgform" :model="createMsgForm" label-width="100px" size="small" class="create-msg-form" label-position="left">
        <el-form-item label="消息类型">
          <el-select v-model="createMsgForm.msgtype">
            <el-option label="关注回复" value="1"></el-option>
            <el-option label="关键字回复" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关键词">
          <el-input v-model="createMsgForm.keywords" placeholder="关注回复不需要填写" style="width: 300px;"></el-input>
          <span v-show="createMsgRules.keywords" style="color: #F56C6C;">关键词不能为空</span>
        </el-form-item>
        <el-form-item label="回复内容">
          <div class="reply-content-part">
            <div class="reply-content-radio">
              <el-radio v-model="createMsgForm.reply_radio" label="1">文字回复</el-radio>
              <el-radio v-model="createMsgForm.reply_radio" label="2">单条图文</el-radio>
            </div>
            <div class="text-reply" v-if="createMsgForm.reply_radio==1">
              <el-input
                type="textarea"
                :rows="6"
                placeholder="请输入内容"
                style="width: 300px;"
                v-model="createMsgForm.replycontent">
              </el-input>
              <span v-show="createMsgRules.replycontent" style="color: #F56C6C;">回复内容不能为空</span>
              <div>
                <el-button type="primary" size="mini" @click="chooseBooks">插入书籍</el-button>
              </div>
            </div>
            <div class="img-reply" v-if="createMsgForm.reply_radio==2">
              <el-form-item label="标题" label-width="80px">
                <el-input placeholder="关注回复不需要填写" v-model="createMsgForm.reply_title" style="width: 300px;"></el-input>
                <span v-show="createMsgRules.reply_title" style="color: #F56C6C;">标题不能为空</span>
              </el-form-item>
              <el-form-item label="图片" label-width="80px">
                <div class="img-box">
                  <img v-show="createMsgForm.replyImg != ''" :src="createMsgForm.replyImg"/>
                  <span v-show="createMsgRules.replyImg" style="color: #F56C6C;position: absolute;margin-top: 70px;left: 120px;">图片不能为空</span>
                </div>
                <el-upload
                  class="upload-reply-img"
                  :http-request="uploadBanner"
                  action=""
                  :on-success="getImg"
                  list-type="picture"
                  :show-file-list="false">
                  <el-button size="small" type="primary">选择图片</el-button>
                </el-upload>
              </el-form-item>
              <el-form-item label="跳转链接" label-width="80px">
                <el-input v-model="createMsgForm.msg_url" placeholder="请输入跳转链接" style="width: 300px;"></el-input>
                <span v-show="createMsgRules.msg_url" style="color: #F56C6C;">跳转链接不能为空</span>
              </el-form-item>
              <el-form-item label="消息描述" label-width="80px">
                <el-input v-model="createMsgForm.msg_desc" placeholder="选填" style="width: 300px;"></el-input>
              </el-form-item>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="上线时间">
          <el-date-picker
            type="datetime"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="上线时间"
            v-model="createMsgForm.onlinetime"
            :picker-options="pickerBeginDateBefore"
          ></el-date-picker>
          <span v-show="createMsgRules.onlinetime" style="color: #F56C6C;">上线时间不能为空</span>
        </el-form-item>
        <el-form-item label="下线时间">
          <el-date-picker
            type="datetime"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="下线时间"
            v-model="createMsgForm.offlinetime"
            :picker-options="pickerBeginDateAfter"
          ></el-date-picker>
          <span v-show="createMsgRules.offlinetime" style="color: #F56C6C;">下线时间不能为空</span>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm" :loading="isSave">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog title="请选择书籍" :visible.sync="bookDialog" width="782px">
      <el-form ref="booksForm" :model="booksForm" label-width="80px" inline size="small" class="books-form">
        <el-form-item label="作品CBID">
          <el-input v-model="booksForm.cbid"></el-input>
        </el-form-item>
        <el-form-item label="作品名称">
          <el-input v-model="booksForm.bookname"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="query">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" style="width:100%;" stripe border>
        <el-table-column label="选择" width="80" align="center">
          <template slot-scope="scope">
            <el-radio v-model="choose" :label="scope.row.bookid" @click.native.prevent="selectBooks(scope.$index,scope.row)"></el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="bookid" label="作品ID" width="180" align="center"></el-table-column>
        <el-table-column prop="bookname" label="作品名词" width="180" align="center"></el-table-column>
        <el-table-column prop="channel" label="一级分类" width="100" align="center"></el-table-column>
        <el-table-column prop="sort" label="二级分类" width="100" align="center"></el-table-column>
        <el-table-column prop="status" label="连载状态" width="100" align="center"></el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10,20, 50, 100, 150]"
        background
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalSize">
      </el-pagination>
      <span slot="footer" class="dialog-footer">
        <el-button @click="bookDialog = false">取 消</el-button>
        <el-button type="primary" @click="insertBook">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import {msgModuleApi} from '../../api/main'
  export default {
    name: 'create-msg',
    data() {
      return {
        id: '',
        createMsgRules: {
          keywords: false,
          replycontent: false,
          reply_title: false,
          msg_url: false,
          replyImg: false,
          onlinetime: false,
          offlinetime: false,
        },
        createMsgForm: {
          msgtype: '1',
          keywords: '',
          reply_radio: '1',
          replycontent: '',
          reply_title: '',
          msg_desc: '',
          msg_url: '',
          replyImg: '',
          onlinetime: '',
          offlinetime: '',
        },
        booksForm: {
          cbid: '',
          bookname: '',
        },
        pickerBeginDateBefore:{
          disabledDate: (time) => {
            let beginDateVal = this.createMsgForm.offlinetime;
            if (beginDateVal) {
              return time.getTime() > beginDateVal;
            }
          }
        },
        pickerBeginDateAfter:{
          disabledDate: (time) => {
            let beginDateVal = this.createMsgForm.onlinetime;
            if (beginDateVal) {
              return time.getTime() < beginDateVal;
            }
          }
        },
        isSave: false,
        bookDialog: false,
        tableData: [],
        choose: '',
        choose_name: '',
        pageNo: 1,
        pageSize: 10,
        currentPage: 1,
        totalSize: 0,
        isQuery: 1,
      }
    },
    created() {
      if(this.$route.query.id != undefined) {
        this.id = this.$route.query.id
        this.initMsgData()
      }else {
        this.createMsgForm = {
          msgtype: '1',
          keywords: '',
          reply_radio: '1',
          replycontent: '',
          reply_title: '',
          msg_desc: '',
          msg_url: '',
          replyImg: '',
          onlinetime: '',
          offlinetime: '',
        }
      }
    },
    methods: {
      initMsgData() {
      var _this = this
      var params = {
        appid: 'wx45a447d8dc271447',
        msgId: _this.id,
      }
      msgModuleApi.getSingleMsg(params).then(res=>{
        console.log(res)
        if(res.success) {
          this.createMsgForm = {
            msgtype: res.data.type.toString(),
            keywords: res.data.kwd,
            reply_radio: res.data.msgType.toString(),
            replycontent: res.data.content,
            reply_title: res.data.title,
            msg_desc: res.data.description,
            msg_url: res.data.url,
            replyImg: res.data.picUrl,
            onlinetime: _this.common.getDate(res.data.startDate),
            offlinetime: _this.common.getDate(res.data.endDate),
          }
        }
      })
      },
      getImg(res, file, fileList) {
        this.$message.success('图片上传成功')
      },
      uploadBanner(e){
        var _this = this
        let uploadData = new FormData();
        uploadData.append('file', e.file);
        msgModuleApi.uploadFile(uploadData).then(res=>{
          if(res.success) {
            _this.createMsgForm.replyImg = res.data.url
          }
        })
      },
      insertBook() {
        this.bookDialog = false
        var chooseText = "<a href='http://test-dev.dftoutiao.com/janfly_html/wx-novel/bookInfo.html?bookId='" + this.choose + "'>" + this.choose_name + "</a>"
        this.createMsgForm.replycontent = this.createMsgForm.replycontent + chooseText
      },
      query() {
        var _this = this
        _this.pageNo = 1
        _this.pageSize = 10
        _this.totalSize = 0
        _this.currentPage = 1
        if(_this.booksForm.cbid == '' && _this.booksForm.bookname == ''){
          _this.isQuery = 1
          _this.initBooks()
        }else if(_this.booksForm.cbid == '' && _this.booksForm.bookname != ''){
          _this.isQuery = 2
          this.searchNovels()
        }else{
          _this.isQuery = 3
          this.queryNovelsById()
        }
      },
      searchNovels() {
        var _this = this
        var params = {
          kwd: _this.booksForm.bookname,
          page: _this.pageNo,
          size: _this.pageSize,
        }
        _this.tableData = []
        msgModuleApi.searchNovel(params).then(res=>{
          console.log(res)
          if(res.success) {
            var data = res.data.list
            data.map((item,idx) => {
              _this.tableData.push({
                bookid: item.bookid,
                bookname: item.name,
                channel: item.channel == 0 ? '男生' : '女生',
                sort: item.tp1st,
                status: item.bookstatus == 1 ? '完结' : '连载中',
              })
            })
            _this.totalSize = res.data.total
          }
        })
      },
      queryNovelsById() {
        var _this = this
        var params = {
          id: _this.booksForm.cbid,
        }
        _this.tableData = []
        msgModuleApi.getNovels(params).then(res=>{
          console.log(res)
          if(res.success) {
            var data = res.data.list
            _this.tableData.push({
              bookid: res.data.bookid,
              bookname: res.data.name,
              channel: res.data.channel == 0 ? '男生' : '女生',
              sort: res.data.tp1st,
              status: res.data.bookstatus == 1 ? '完结' : '连载中',
            })
            _this.totalSize = 1
          }
        })
      },
      selectBooks(idx, row) {
        this.choose = row.bookid
        this.choose_name = row.bookname
      },
      chooseBooks() {
        this.bookDialog = true
        this.initBooks()
      },
      initBooks() {
        var _this = this
        var params = {
          page: _this.pageNo,
          size: _this.pageSize,
        }
        _this.tableData = []
        msgModuleApi.getNovelLists(params).then(res=>{
          console.log(res)
          if(res.success) {
            var data = res.data.list
            data.map((item,idx) => {
              _this.tableData.push({
                bookid: item.bookid,
                bookname: item.name,
                channel: item.channel == 0 ? '男生' : '女生',
                sort: item.tp1st,
                status: item.bookstatus == 1 ? '完结' : '连载中',
              })
            })
            _this.totalSize = res.data.total
          }
        })
      },
      handleSizeChange(val) {
        this.pageSize = val
        if(this.isQuery == 1){
          this.initBooks()
        }else if(this.isQuery == 2){
          this.searchNovels()
        }else if(this.isQuery == 3){
          this.queryNovelsById()
        }
      },
      handleCurrentChange(val) {
        this.pageNo = val
        if(this.isQuery == 1){
          this.initBooks()
        }else if(this.isQuery == 2){
          this.searchNovels()
        }else if(this.isQuery == 3){
          this.queryNovelsById()
        }
      },
      submitForm() {
        this.isSave = true
        if(this.checkKwd() && this.checkContent() && this.checkTitle() && this.checkImg() && this.checkUrl() && this.checkOnlineTime() && this.checkOfflineTime()){
          if(this.id == ''){
            this.saveInfo()
          }else {
            this.updateInfo()
          }
        }else {
          this.isSave = false
          return false;
        }
      },
      checkKwd() {
        if(this.createMsgForm.msgtype == '2'){
          if(this.createMsgForm.keywords == ''){
            this.createMsgRules.keywords = true
            return false
          }else {
            this.createMsgRules.keywords = false
          }
        }
        return true
      },
      checkContent() {
        if(this.createMsgForm.reply_radio == '1'){
          if(this.createMsgForm.replycontent == ''){
            this.createMsgRules.replycontent = true
            return false
          }else {
            this.createMsgRules.replycontent = false
          }
        }
        return true
      },
      checkTitle() {
        if(this.createMsgForm.reply_radio == '2'){
          if(this.createMsgForm.reply_title == ''){
            this.createMsgRules.reply_title = true
            return false
          }else {
            this.createMsgRules.reply_title = false
          }
        }
        return true
      },
      checkImg() {
        if(this.createMsgForm.reply_radio == '2'){
          if(this.createMsgForm.replyImg == ''){
            this.createMsgRules.replyImg = true
            return false
          }else {
            this.createMsgRules.replyImg = false
          }
        }
        return true
      },
      checkUrl() {
        if(this.createMsgForm.reply_radio == '2'){
          if(this.createMsgForm.msg_url == ''){
            this.createMsgRules.msg_url = true
            return false
          }else {
            this.createMsgRules.msg_url = false
          }
        }
        return true
      },
      checkOnlineTime() {
        if(this.createMsgForm.onlinetime == ''){
          this.createMsgRules.onlinetime = true
          return false
        }else {
          this.createMsgRules.onlinetime = false
        }
        return true
      },
      checkOfflineTime() {
        if(this.createMsgForm.offlinetime == ''){
          this.createMsgRules.offlinetime = true
          return false
        }else {
          this.createMsgRules.offlinetime = false
        }
        return true
      },
      saveInfo() {
        var _this = this
        var params = {
          appid: 'wx45a447d8dc271447',
          kwd: _this.createMsgForm.keywords,
          type: _this.createMsgForm.msgtype,
          msgType	: _this.createMsgForm.reply_radio,
          content	: _this.createMsgForm.replycontent,
          title: _this.createMsgForm.reply_title,
          picUrl: _this.createMsgForm.replyImg,
          url: _this.createMsgForm.msg_url,
          description: _this.createMsgForm.msg_desc,
          startDate: _this.createMsgForm.onlinetime,
          endDate: _this.createMsgForm.offlinetime,
        }
        msgModuleApi.addMsgtem(params).then(res=>{
          if(res.success){
            this.$message.success('保存成功')
            _this.createMsgForm = {
              msgtype: '1',
              keywords: '',
              reply_radio: '1',
              replycontent: '',
              reply_title: '',
              msg_desc: '',
              msg_url: '',
              replyImg: '',
              onlinetime: '',
              offlinetime: '',
            }
            this.isSave = false
          }
        })
      },
      updateInfo() {
        var _this = this
        var params = {
          appid: 'wx45a447d8dc271447',
          msgId: _this.id,
          kwd: _this.createMsgForm.keywords,
          type: _this.createMsgForm.msgtype,
          msgType	: _this.createMsgForm.reply_radio,
          content	: _this.createMsgForm.replycontent,
          title: _this.createMsgForm.reply_title,
          picUrl: _this.createMsgForm.replyImg,
          url: _this.createMsgForm.msg_url,
          description: _this.createMsgForm.msg_desc,
          startDate: _this.createMsgForm.onlinetime,
          endDate: _this.createMsgForm.offlinetime,
        }
        msgModuleApi.updateMsgtem(params).then(res=>{
          if(res.success){
            this.$message.success('修改成功')
            this.isSave = false
          }
        })
      }
    }
  }
</script>
<style lang="scss">
  .create-msg-page{
    .create-msg-header{
      height: 50px;
      padding-left: 15px;
      .el-breadcrumb{
        font-size: 16px;
        margin-top: 15px;
      }
    }
    .create-msg-body{
      margin-left: 15px;
      margin-right: 15px;
      .img-box{
        width: 100px;
        height: 100px;
        float: left;
        border: 1px solid #e0e0e0;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .upload-reply-img{
        float: left;
        margin-top: 35px;
        margin-left: 20px;
        .el-button{
          width: 100px;
        }
      }
    }
    .el-button{
      width: 100px;
    }
    .el-table__row{
      .el-radio__label{
        display: none;
      }
    }
  }
</style>
