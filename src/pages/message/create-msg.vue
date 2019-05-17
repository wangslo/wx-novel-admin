<template>
  <div class="create-msg-page">
    <div class="create-msg-header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item >消息服务</el-breadcrumb-item>
        <el-breadcrumb-item >消息回复</el-breadcrumb-item>
        <el-breadcrumb-item >新建消息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="create-msg-body">
      <el-form ref="createMsgForm" :model="createMsgForm" label-width="100px" size="small" class="create-msg-form" label-position="left">
        <el-form-item label="消息类型">
          <el-select v-model="createMsgForm.msgtype">
            <el-option label="关注回复" value="0"></el-option>
            <el-option label="关键字回复" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关键词">
          <el-input v-model="createMsgForm.keywords" placeholder="关注回复不需要填写" style="width: 300px;"></el-input>
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
              <div>
                <el-button type="primary" size="mini" @click="chooseBooks">插入书籍</el-button>
              </div>
            </div>
            <div class="img-reply" v-if="createMsgForm.reply_radio==2">
              <el-form-item label="标题" label-width="80px">
                <el-select v-model="createMsgForm.reply_title">
                  <el-option label="saadsafdsa" value="0"></el-option>
                  <el-option label="的发生的发生发生" value="大大沙发"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="图片" label-width="80px">
                <el-upload
                  class="upload-reply-img"
                  action="">
                  <el-button size="small" type="primary">选择图片</el-button>
                </el-upload>
              </el-form-item>
              <el-form-item label="跳转链接" label-width="80px">
                <el-input v-model="createMsgForm.msg_url" style="width: 300px;"></el-input>
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
            placeholder="上线时间"
            v-model="createMsgForm.onlinetime"
            :picker-options="pickerBeginDateBefore"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="下线时间">
          <el-date-picker
            type="datetime"
            placeholder="下线时间"
            v-model="createMsgForm.offlinetime"
            :picker-options="pickerBeginDateAfter"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('createMsgForm')" :loading="isSave">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog title="请选择书籍" :visible.sync="bookDialog">
      <el-form ref="booksForm" :model="booksForm" label-width="80px" inline size="small" class="books-form">
        <el-form-item label="作品CBID">
          <el-input v-model="booksForm.cbid"></el-input>
        </el-form-item>
        <el-form-item label="作品名称">
          <el-input v-model="booksForm.bookname"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" style="width:100%;" stripe border>
        <el-table-column label="选择" width="80" align="center">
          <template slot-scope="scope">
            <el-radio v-model="choose" :label="scope.row.id" @click="choose=scope.row.id"></el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="作品ID" width="180" align="center"></el-table-column>
        <el-table-column prop="keywords" label="作品名词" width="180" align="center"></el-table-column>
        <el-table-column prop="pj" label="评级" width="80" align="center"></el-table-column>
        <el-table-column prop="yjfl" label="一级分类" width="100" align="center"></el-table-column>
        <el-table-column prop="ejfl" label="二级分类" width="100" align="center"></el-table-column>
        <el-table-column prop="sjfl" label="三级分类" width="100" align="center"></el-table-column>
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
        <el-button type="primary" @click="bookDialog = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import {orgModuleApi} from '../../api/main'
  export default {
    name: 'create-msg',
    data() {
      return {
        createMsgForm: {
          msgtype: '0',
          keywords: '',
          reply_radio: '1',
          replycontent: '',
          reply_title: '0',
          msg_desc: '',
          msg_url: '',
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
        tableData: [
          {
            id: '212',
            keywords: '1212',
            pj: '1212',
            yjfl: '2121',
            ejfl: '2121',
            sjfl: '2121',
            status: '2112',
          },
          {
            id: '213',
            keywords: '1212',
            pj: '1212',
            yjfl: '2121',
            ejfl: '2121',
            sjfl: '2121',
            status: '2112',
          },
          {
            id: '214',
            keywords: '1212',
            pj: '1212',
            yjfl: '2121',
            ejfl: '2121',
            sjfl: '2121',
            status: '2112',
          },
        ],
        choose: '',
        pageNo: 0,
        pageSize: 10,
        currentPage: 1,
        totalSize: 0,
      }
    },
    methods: {
      chooseBooks() {
        this.bookDialog = true
      },
      submitForm(formName) {
        this.isSave = true
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.saveInfo();
          } else {
            console.log('error submit!!');
            this.isSave = false
            return false;
          }
        });
      },
      saveInfo() {
        var _this = this

      }
    }
  }
</script>
<style lang="scss" scoped>
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
    }

    .el-button{
      width: 100px;
    }
    /*.books-form{
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    }*/
  }
</style>
