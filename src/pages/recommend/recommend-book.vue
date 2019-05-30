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
        <el-form-item label="推荐位置" label-width="80px" prop="options">
          <el-cascader expand-trigger="hover"
                       :options="recommend_condition.options"
                       change-on-select="false"
          ></el-cascader>
        </el-form-item>
        <el-form-item style="float: right;">
          <el-button type="primary" @click="clearData">清空</el-button>
          <el-button type="primary" @click="onsubmit">查找</el-button>
        </el-form-item>
      </el-form>
      <div style="width: 100%;">
        <div class="recommend-left">
          <div class="recommend-left-cond">
            <el-input v-model="xx" placeholder="请输入书籍名称或关键词" size="small"></el-input>
            <el-button type="primary" @click="onsubmit" size="small">搜索</el-button>
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
                <el-button size="mini" @click="handleAdd(scope.$index, scope.row)">添加</el-button>
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
            <el-button type="primary" @click="defriendDialogAll = true" size="small">全部删除</el-button>
            <el-button type="primary" @click="onsubmit" size="small">提交</el-button>
          </div>
          <el-table class="recommend-table" :data="tableData2" stripe border row-key="id">
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
                <el-button size="mini" @click="movedelete(scope.$index, scope.row)">删除</el-button>
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

  export default {
    name: 'recommend',
    data() {
      return {
        recommend_condition: {
          options: [
            {
              value: '火爆热书',
              label: '火爆热书',
              children: [
                {
                  value: '热门书单',
                  label: '热门书单',
                },
              ],
            },
            {
              value: '热门书单（排行榜）',
              label: '热门书单（排行榜）',
              children: [{
                value: '女频榜',
                label: '女频榜',
              }, {
                value: '男频榜',
                label: '男频榜',
              }, {
                value: '总榜',
                label: '总榜',
              },]
            },
            {
              value: '男频',
              label: '男频',
              children: [{
                value: '精品推荐',
                label: '精品推荐',
              }, {
                value: '热门书单',
                label: '热门书单',
              }, {
                value: '新书推荐',
                label: '新书推荐',
              }, {
                value: '排行榜',
                label: '排行榜',
              },]
            },
            {
              value: '女频',
              label: '女频',
              children: [{
                value: '精品推荐',
                label: '精品推荐',
              }, {
                value: '热门书单',
                label: '热门书单',
              }, {
                value: '新书推荐',
                label: '新书推荐',
              }, {
                value: '排行榜',
                label: '排行榜',
              },]
            },
            {
              value: '分类',
              label: '分类',
              children: [{
                value: '玄幻',
                label: '玄幻',
              }, {
                value: '武侠',
                label: '武侠',
              }, {
                value: '都市',
                label: '都市',
              }, {
                value: '穿越',
                label: '穿越',
              },{
                value: '旅游',
                label: '旅游',
              },{
                value: '灵异',
                label: '灵异',
              },{
                value: '古代',
                label: '古代',
              },]
            },
            {
              value: '搜索',
              label: '搜索',
              children: [{
                value: '精品推荐',
                label: '精品推荐',
              },]
            },
            {
              value: '书籍尾页',
              label: '书籍尾页',
              children: [{
                value: '为你推荐',
                label: '为你推荐',
              },]
            },
          ],
        },
        recommendRules: {
          options: [],
        },
        tableData1: [
          {"bookName": "张三三的20岁", "author": "张三", "source": "xxxx"},
          {"bookName": "盛世骑兵", "author": "张三", "source": "xxxx"},
          {"bookName": "盛世骑兵4", "author": "张三", "source": "xxxx"}
        ],
        tableData2: [
          {'id': '1', "bookName": "张三三的20岁", "author": "张三", "source": "xxxx"},
          {'id': '2', "bookName": "盛世骑兵", "author": "张三", "source": "xxxx"},
          {'id': '3', "bookName": "盛世骑兵4", "author": "张三", "source": "xxxx"},
          {'id': '4', "bookName": "张三三的20岁", "author": "张三", "source": "xxxx"},
          {'id': '5', "bookName": "盛世骑兵", "author": "张三", "source": "xxxx"},
          {'id': '6', "bookName": "盛世骑兵4", "author": "张三", "source": "xxxx"},
          {'id': '7', "bookName": "张三三的20岁", "author": "张三", "source": "xxxx"},
          {'id': '8', "bookName": "盛世骑兵", "author": "张三", "source": "xxxx"},
          {'id': '9', "bookName": "盛世骑兵4", "author": "张三", "source": "xxxx"},
        ],
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
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
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
      },
      confirmdeleteall() {
        this.defriendDialog = false
        this.tableData2.splice(this.tmpIdx, 1)
        this.allLine = this.allLine - 1;
        this.tmpIdx = 999
      },
      handleAdd(idx, row) {

      },
      clearData() {
        this.$refs.recommendForm.resetFields()
      },
      onsubmit() {
        this.tableData = [
          {
            headerImg: 'http://img5.duitang.com/uploads/item/201409/23/20140923094045_BNYji.thumb.700_0.png',
            phone: '1233',
            nickName: 'asa',
            loginType: 'QQ',
            accid: '',
            login_time: '',
            create_time: '',
            status: '',
            bookMoney: '',
          },
          {
            headerImg: '',
            phone: '111',
            nickName: '',
            loginType: '',
            accid: '',
            login_time: '',
            create_time: '',
            status: '',
            bookMoney: '',
          }
        ]
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
