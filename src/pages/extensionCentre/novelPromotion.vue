<template>
  <div class="novelPromotion-page">
    <div class="novelPromotion-header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path: '/novelPromotion'}">推广中心</el-breadcrumb-item>
        <el-breadcrumb-item>小说推广</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="novelPromotion-body">
      <el-form ref="novelForm" :model="novelForm" :rules="novelRules" inline size="small" class="novel-form">
        <el-form-item label="书籍名称/作者" prop="bookname">
          <el-input v-model="novelForm.bookname"></el-input>
        </el-form-item>
        <!--<el-form-item label="书商/书商标识" prop="booksellerlogo">
          <el-select v-model="novelForm.booksellerlogo">
            <el-option label="全部" value="0"></el-option>
            <el-option label="baike" value="1"></el-option>
            <el-option label="baike2" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型" prop="booktype">
          <el-select v-model="novelForm.booktype">
            <el-option label="全部" value="0"></el-option>
            <el-option label="收费" value="1"></el-option>
            <el-option label="免费" value="2"></el-option>
          </el-select>
        </el-form-item>-->
        <el-form-item label="书籍分类" prop="booksort">
          <el-select v-model="novelForm.booksort">
            <el-option label="全部" value="-1"></el-option>
            <el-option label="玄幻" value="1001"></el-option>
            <el-option label="武侠" value="1002"></el-option>
            <el-option label="都市" value="1003"></el-option>
            <el-option label="穿越" value="1004"></el-option>
            <el-option label="游戏" value="1005"></el-option>
            <el-option label="灵异" value="1006"></el-option>
            <el-option label="古代" value="1007"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="男女分类" prop="mansort">
          <el-select v-model="novelForm.mansort">
            <el-option label="全部" value="-1"></el-option>
            <el-option label="男生" value="0"></el-option>
            <el-option label="女生" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="书籍状态" prop="bookstatus">
          <el-select v-model="novelForm.bookstatus">
            <el-option label="全部" value="-1"></el-option>
            <el-option label="完结" value="1"></el-option>
            <el-option label="连载" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="info" size="mini" @click="clearData">清空</el-button>
          <el-button type="primary" size="mini" @click="query">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" style="width:100%;" stripe border>
        <el-table-column label="序号" min-width="30" align="center">
          <template slot-scope="scope">
            <span>{{scope.$index+(pageNo-1) * pageSize +1}} </span>
          </template>
        </el-table-column>
        <el-table-column prop="bookname" label="书籍名称" min-width="30" align="center"></el-table-column>
        <el-table-column prop="author" label="作者" min-width="30" align="center"></el-table-column>
        <el-table-column prop="booksort" label="书籍分类" min-width="30" align="center"></el-table-column>
        <el-table-column prop="channel" label="男女分类" min-width="30" align="center"></el-table-column>
        <el-table-column prop="ufr" label="书商" min-width="30" align="center"></el-table-column>
        <el-table-column prop="status" label="书籍状态" min-width="30" align="center"></el-table-column>
        <el-table-column prop="words" label="字数" min-width="30" align="center"></el-table-column>
        <el-table-column prop="chapterNum" label="章数" min-width="30" align="center"></el-table-column>
        <el-table-column prop="updDate" label="最后更新时间" min-width="30" align="center"></el-table-column>
        <el-table-column prop="booktype" label="类型" min-width="30" align="center"></el-table-column>
        <el-table-column label="收费起始章节" min-width="30" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.tollsection}}</span>
            <!--<i class="el-icon-edit" style="cursor: pointer" @click="editBuyChapter(scope.$index, scope.row)"></i>-->
          </template>
        </el-table-column>
        <el-table-column v-show="false" prop="status" min-width="30" label="推荐时间" align="center"></el-table-column>
        <el-table-column label="操作" min-width="100" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="createLinks(scope.$index, scope.row)">生成推广链接</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10,20, 50, 100]"
        background
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalSize">
      </el-pagination>
    </div>
    <div class="dialog-box">
      <el-dialog title="设置收费起始章节" :visible.sync="editDialog" width="400px">
        <div class="set-input">
          <span>收费起始章节：</span>
          <el-input v-model="new_buyChapter" style="width: 200px;" size="mini"></el-input>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="editDialog = false">取 消</el-button>
            <el-button type="primary" @click="editDialog = false">确 认</el-button>
          </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import {msgModuleApi} from "../../api/main";

  export default {
    name: 'novelPromotion',
    data() {
      return {
        novelForm: {
          bookname: '',
          // booksellerlogo: '0',
          // booktype: '0',
          booksort: '-1',
          mansort: '-1',
          bookstatus: '-1',
        },
        novelRules: {
          bookname: [],
          // booksellerlogo: [],
          // booktype: [],
          booksort: [],
          mansort: [],
          bookstatus: [],
        },
        tableData: [],
        pageNo: 1,
        pageSize: 10,
        currentPage: 1,
        totalSize: 0,
        new_buyChapter: 0,
        editDialog: false,
        isQuery: 1,
      }
    },
    created() {
      this.queryNovelsBySort()
    },
    methods: {
      query() {
        var _this = this
        _this.pageNo = 1
        _this.pageSize = 10
        _this.totalSize = 0
        _this.currentPage = 1
        if(_this.novelForm.bookname == ''){
          _this.isQuery = 1
          _this.queryNovelsBySort()
        }else if(_this.novelForm.bookname != ''){
          _this.isQuery = 2
          this.searchNovels()
        }
      },
      handleSizeChange(val) {
        this.pageSize = val
        if(this.isQuery == 1){
          this.queryNovelsBySort()
        }else if(this.isQuery == 2){
          this.searchNovels()
        }
      },
      handleCurrentChange(val) {
        this.pageNo = val
        if(this.isQuery == 1){
          this.queryNovelsBySort()
        }else if(this.isQuery == 2){
          this.searchNovels()
        }
      },
      searchNovels() {
        var _this = this
        var params = {
          kwd: _this.novelForm.bookname,
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
                author: item.author,
                booksort: item.tp1st,
                channel: item.channel == 0 ? '男生' : '女生',
                ufr: item.ufr,
                status: item.bookstatus == 1 ? '完结' : '连载中',
                words: item.words,
                chapterNum: item.allChapterNum,
                updDate: item.updDate,
                booktype: '收费',
                tollsection: item.novelSet,
              })
            })
            _this.totalSize = res.data.total
          }
        })
      },
      queryNovelsBySort() {
        var _this = this
        var params = {
          page: _this.pageNo,
          size: _this.pageSize,
          sex: _this.novelForm.mansort,
          cateid: _this.novelForm.booksort,
          bookStatus: _this.novelForm.bookstatus,
        }
        _this.tableData = []
        msgModuleApi.getNovelsBySort(params).then(res=>{
          console.log(res)
          if(res.success) {
            var data = res.data.list
            data.map((item,idx) => {
              _this.tableData.push({
                bookid: item.bookid,
                bookname: item.name,
                author: item.author,
                booksort: item.tp1st,
                channel: item.channel == 0 ? '男生' : '女生',
                ufr: item.ufr,
                status: item.bookstatus == 1 ? '完结' : '连载中',
                words: item.words,
                chapterNum: item.allChapterNum,
                updDate: item.updDate,
                booktype: '收费',
                tollsection: item.novelSet,
              })
            })
            _this.totalSize = res.data.total
          }
        })
      },
      editBuyChapter(idx, row) {
        this.editDialog = true
      },
      createLinks(idx, row) {
        this.$router.push({
          path: 'promotionDetail',
          query: {
            id: row.bookid
          }
        })
      },
      clearData() {
        this.$refs.novelForm.resetFields()
      },
    }
  }
</script>
<style lang="scss" scoped>
  .novelPromotion-page{
    .novelPromotion-header{
      height: 50px;
      padding-left: 15px;
      .el-breadcrumb{
        font-size: 16px;
        margin-top: 15px;
      }
    }
    .novelPromotion-body{
      margin-left: 15px;
      margin-right: 15px;
    }
    .dialog-box{
      .set-input{
        display: flex;
        span{
          line-height: 1;
          margin-top: 5px;
        }
      }
    }
  }
</style>
