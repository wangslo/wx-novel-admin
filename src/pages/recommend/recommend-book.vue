<template>
  <div class="recommend-page">
    <div class="recommend-header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>推荐管理</el-breadcrumb-item>
        <el-breadcrumb-item>推荐书籍</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="recommend-body">
      <el-form ref="recommendForm" :model="recommend_condition" class="recommend-form" :rules="recommendRules"
               label-width="80px" size="small" style="border-bottom: 1px solid #e0e0e0;">
        <el-form-item label="推荐位置" label-width="80px" prop="option">
          <el-cascader expand-trigger="hover"
                       v-model="recommend_condition.option"
                       :options="options"
                       @change="getRecommendList"

          ></el-cascader>
        </el-form-item>
        <el-form-item style="float: right;">
          <el-button @click="clearData">清空</el-button>
          <el-button type="primary" @click="getRecommendList">查找</el-button>
        </el-form-item>
      </el-form>
      <div style="width: 100%;">
        <div class="recommend-left">
          <div class="recommend-left-cond">
            <el-input v-model="bookName" placeholder="请输入书籍名称或关键词" size="small"></el-input>
            <el-button type="primary" @click="queryBannerUrl" size="small">搜索</el-button>
          </div>
          <el-table :data="tableData1" stripe border>
            <el-table-column label="序号" min-width="30" align="center">
              <template slot-scope="scope">
                <span>{{scope.$index+(pageNo - 1) * pageSize + 1}} </span>
              </template>
            </el-table-column>
            <el-table-column prop="bookName" label="书籍名称" min-width="80" align="center"></el-table-column>
            <el-table-column prop="author" label="作者" min-width="80" align="center"></el-table-column>
            <el-table-column prop="source" label="来源" min-width="80" align="center"></el-table-column>
            <el-table-column label="操作" min-width="80" align="center">
              <template slot-scope="scope">
                <el-button type="success" size="mini" @click="handleAdd(scope.$index, scope.row)">添加</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 50, 100]"
            background
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalSize">
          </el-pagination>
        </div>
        <div class="recommend-right">
          <div class="recommend-right-btn">
            <el-button type="danger" @click="defriendDialogAll = true" size="small">全部删除</el-button>
            <el-button type="primary" @click="onsubmit" size="small">提交</el-button>
            &nbsp;<span>（提交后生效）</span>
          </div>
          <el-table class="recommend-table" :data="tableData2" stripe border row-key="bookId">
            <el-table-column label="序号" min-width="30" align="center">
              <template slot-scope="scope">
                <span>{{scope.$index + 1}} </span>
              </template>
            </el-table-column>
            <el-table-column prop="bookName" label="书籍名称" min-width="80" align="center"></el-table-column>
            <el-table-column prop="author" label="作者" min-width="80" align="center"></el-table-column>
            <el-table-column prop="source" label="来源" min-width="80" align="center"></el-table-column>
            <el-table-column label="操作" min-width="80" align="center">
              <template slot-scope="scope">
                <el-button type="danger" size="mini" @click="movedelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="dialog-div">
        <el-dialog title="" :visible.sync="defriendDialog" width="300px" center>
          <span>确定删除“{{tmpRow.bookName}}”吗?</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="defriendDialog = false">取 消</el-button>
            <el-button type="primary" @click="confirmdelete">确 认</el-button>
          </span>
        </el-dialog>
        <el-dialog title="" :visible.sync="defriendDialogAll" width="300px" center>
          <span>确定全部删除吗?</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="defriendDialogAll = false;">取 消</el-button>
            <el-button type="primary" @click="confirmdeleteall">确 认</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
  import Sortable from 'sortablejs'
  import {orgModuleApi,msgModuleApi} from '../../api/main'

  export default {
    name: 'recommend',
    data() {
      return {
        options: [
          {
            value: '火爆热书',
            label: '火爆热书',
            children: [
              {
                value: '1000-0100',
                label: '热门书单',
              },
            ],
          },
          {
            value: '热门书单（排行榜）',
            label: '热门书单（排行榜）',
            children: [{
              value: '5000-0100',
              label: '女频榜',
            }, {
              value: '3000-0100',
              label: '男频榜',
            }, {
              value: '2000-0100',
              label: '总榜',
            },]
          },
          {
            value: '男频',
            label: '男频',
            children: [{
              value: '4000-0100',
              label: '精品推荐',
            }, {
              value: '4000-0200',
              label: '热门书单',
            }, {
              value: '4000-0300',
              label: '新书推荐',
            }, {
              value: '4000-0400',
              label: '排行榜',
            },]
          },
          {
            value: '女频',
            label: '女频',
            children: [{
              value: '5000-0200',
              label: '精品推荐',
            }, {
              value: '5000-0300',
              label: '热门书单',
            }, {
              value: '5000-0400',
              label: '新书推荐',
            }, {
              value: '5000-0500',
              label: '排行榜',
            },]
          },
          {
            value: '分类',
            label: '分类',
            children: [{
              value: '6000-0100',
              label: '玄幻',
            }, {
              value: '6000-0200',
              label: '武侠',
            }, {
              value: '6000-0300',
              label: '都市',
            }, {
              value: '6000-0400',
              label: '穿越',
            },{
              value: '6000-0500',
              label: '旅游',
            },{
              value: '6000-0600',
              label: '灵异',
            },{
              value: '6000-0700',
              label: '古代',
            },]
          },
          {
            value: '搜索',
            label: '搜索',
            children: [{
              value: '7000-0100',
              label: '精品推荐',
            },]
          },
          {
            value: '书籍尾页',
            label: '书籍尾页',
            children: [{
              value: '8000-0100',
              label: '为你推荐',
            },]
          },
        ],
        recommend_condition: {
          option: ''
        },
        recommendRules: {
          option: [],
        },
        tableData1: [
        ],
        tableData2: [
        ],
        bookName:"",
        pageNo: 1,
        pageSize: 10,
        currentPage: 1,
        totalSize: 0,
        allLine: 9,
        defriendDialog: false,
        defriendDialogAll: false,
        tmpIdx: 999,
        tmpRow: {},
      }
    },
    mounted() {
      this.rowDrop()
    },
    methods: {
      //行拖拽
      rowDrop() {
        const tbody = document.querySelector('.recommend-table .el-table__body-wrapper tbody')
        const _this = this
        Sortable.create(tbody, {
          onEnd({newIndex, oldIndex}) {
            const currRow = _this.tableData2.splice(oldIndex, 1)[0]
            _this.tableData2.splice(newIndex, 0, currRow)
          }
        })
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.queryBannerUrl()
      },
      handleCurrentChange(val) {
        this.pageNo = val
        this.queryBannerUrl()
      },
      handleDefriend(idx, row) {
        this.defriendDialog = true
      },
      movedelete(idx, row) {
        this.defriendDialog = true
        this.tmpIdx = idx
        this.tmpRow = row
      },
      confirmdelete() {
        this.defriendDialog = false
        this.tableData2.splice(this.tmpIdx, 1)
        this.allLine = this.allLine - 1;
        this.tmpIdx = 999
        this.onsubmit()
      },
      confirmdeleteall() {
        this.defriendDialogAll = false
        this.tableData2 = []
        this.allLine = 0;
        this.tmpIdx = 999
        this.onsubmit()
      },
      handleAdd(idx, row) {
        let _position = [];
        _position[1] = this.checkPosition();
        if(!_position[1]) return
        if(!this.checkBookUnqie(row.bookId,this.tableData2)) return

        switch (_position[1]) {
          case '8000-0100':
            if(this.tableData2.length < 3){
              this.tableData2.push(row)
            }else {
              this.$message.error('添加失败，此位置仅能添加3本书籍')
            }
            break;
          case '7000-0100':
            if(this.tableData2.length < 5){
              this.tableData2.push(row)
            }else {
              this.$message.error('添加失败，此位置仅能添加5本书籍')
            }
            break;
          default:
            if(this.tableData2.length < 10){
              this.tableData2.push(row)
            }else {
              this.$message.error('添加失败，此位置仅能添加10本书籍')
            }
        }


      },
      clearData() {
        this.$refs.recommendForm.resetFields()
      },
      queryBannerUrl(bookname) {
        var _this = this
        bookname = _this.bookName;
        if (bookname != '') {
          this.loading = false
          var params = {
            kwd: bookname,
            page: _this.pageNo,
            size: _this.pageSize,
          }
          msgModuleApi.searchNovel(params).then(res=>{
            console.log(res)
            if(res.success){
              _this.tableData1 = [];
              res.data.list.map((item,index)=>{
                _this.tableData1.push({
                  bookName:item.name,
                  author:item.author,
                  source:item.ufr,
                  bookId:item.bookid,
                })
              })
              _this.totalSize = parseInt(res.data.total)
            }
          })
        } else {
          this.loading = true
          this.$message.error('请输入书籍名称')
          return false
//          this.search_banner_name = []
        }
      },
      checkPosition(){
        let _position = this.recommend_condition.option
        if(_position.length < 2){
          this.$message.error('请选择推荐位置')
          return false
        }
        return _position[1]
      },
      checkBookUnqie(bookId,_table){
        let _flag = true;
        if(_table.length>0){
          _table.map((item,index)=>{
              if(item.bookId == bookId){
                this.$message.error('本书籍在该推荐位置已存在')
                _flag = false
              }
          })
        }
        return _flag
      },
      getRecommendList(){
        let _position = [];
        let _this = this
        _position[1] = this.checkPosition();
        if(_position[1].length > 2){
          var params = {
            pos:_position[1],
          }
          orgModuleApi.listRecommendBook(params).then(res=>{
            console.log(res)
            _this.tableData2 = [];
            if(res.success && res.data){
              res.data.map((item,index)=>{
                _this.tableData2.push({
                  bookName:item.name,
                  author:item.author,
                  source:item.ufr,
                  bookId:item.bookid,
                })
              })
            }
          })
        }
      },
      onsubmit() {
        let _position = [];
        _position[1] = this.checkPosition();
        let _bookids = [];
        let _this = this
        console.log(_this.tableData2)
        if(_position[1].length > 2){

          _this.tableData2.map((item,index)=>{
            _bookids.push(item.bookId)
          })
          this.loading = false
          var params = {
            pos:_position[1],
            bookids:_bookids,
          }
          console.log(params)
          orgModuleApi.editRecommendBook(params).then(res=>{
            console.log(res)
            this.$message.success('成功')

          })
        }


      },
    }
  }
</script>
<style lang="scss" scoped>
  .recommend-page {
    .recommend-header {
      height: 50px;
      padding-left: 15px;
      .el-breadcrumb {
        font-size: 16px;
        margin-top: 15px;
      }
    }
    .recommend-body {
      margin-left: 15px;
      margin-right: 15px;
      .recommend-form {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
      }
      .recommend-left{
        margin-left: 15px;
        width : 40%;
        float: left;
        padding-top: 30px;
        padding-bottom: 50px;
        .recommend-left-cond{
          .el-input{
            width: 300px;
            margin-bottom: 20px;
          }
        }
      }
      .recommend-right{
        margin-left: 15px;
        width : 50%;
        float: left;
        padding-top: 30px;
        border-left: 1px solid #e0e0e0;
        padding-left: 15px;
        .recommend-right-btn{
          margin-bottom: 20px;
        }
      }
    }
    .el-dialog__body {
      span {
        display: block;
        text-align: center;
      }
    }
  }
</style>
