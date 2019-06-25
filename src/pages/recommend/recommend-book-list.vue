<template>
  <div class="stack-room-page">
    <div class="stack-room-header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>推荐管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path: '/recommend-book'}">推荐书籍</el-breadcrumb-item>
        <el-breadcrumb-item>推荐列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="stack-room-body">
      <el-form ref="stackRoomForm" :model="recommend_book_list_condition" :rules="stack_room_rules"
               class="stack-room-form"
               label-width="80px" size="small">
        <el-form-item label="书籍名称/作者" label-width="110px" prop="author">
          <el-input v-model="recommend_book_list_condition.author"></el-input>
        </el-form-item>
        <el-form-item label="推荐位置" label-width="80px" prop="option">
          <el-cascader expand-trigger="hover"
                       v-model="recommend_book_list_condition.option"
                       :options="options"
                       @change="getRecommendList"

          ></el-cascader>
        </el-form-item>
        <el-form-item label="推荐时间" label-width="110px">
          <el-col :span="11" class="startTime">
            <el-form-item prop="update_start_time">
              <el-date-picker
                type="datetime"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="起始时间"
                v-model="recommend_book_list_condition.update_start_time"
                :picker-options="pickerBeginDateBefore"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="2" style="width:20px;text-align:center">至</el-col>
          <el-col :span="11" class="endTime">
            <el-form-item prop="update_end_time">
              <el-date-picker
                type="datetime"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="结束时间"
                v-model="recommend_book_list_condition.update_end_time"
                :picker-options="pickerBeginDateAfter"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="书籍分类" prop="category" v-if="false">
          <el-select v-model="recommend_book_list_condition.category" placeholder="请选择书籍分类">
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
        <el-form-item label="创建人" label-width="110px" prop="creater" v-if="false">
          <el-input v-model="recommend_book_list_condition.author"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="recommend_book_list_condition.status" placeholder="请选择状态">
            <el-option label="全部" value="-1"></el-option>
            <el-option label="推荐中" value="0"></el-option>
            <el-option label="已删除" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="info" @click="clearData">清空</el-button>
          <el-button type="primary" @click="getRecommendBookLogList">查找</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" style="width:100%;" stripe border>
        <el-table-column label="序号" min-width="30" align="center">
          <template slot-scope="scope">
            <span>{{scope.$index+(pageNo) * pageSize + 1}} </span>
          </template>
        </el-table-column>
        <el-table-column prop="bookName" label="书籍名称" min-width="50" align="center"></el-table-column>
        <el-table-column prop="position" label="位置" min-width="80" align="center"></el-table-column>
        <el-table-column prop="author" label="作者" min-width="50" align="center"></el-table-column>
        <el-table-column prop="category" label="书籍分类" min-width="30" align="center"></el-table-column>
        <el-table-column prop="updateTime" label="推荐时间" min-width="55" align="center"></el-table-column>
        <el-table-column prop="creater" label="推荐人" min-width="40" align="center"></el-table-column>
        <el-table-column prop="status" label="状态" min-width="50" align="center"></el-table-column>
        <el-table-column label="操作" min-width="150" align="center">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status == '推荐中'" size="mini" type="danger"
                       @click="handleOffLine(scope.$index, scope.row)">删除
            </el-button>
            <el-button size="mini" type="primary" @click="handleDetail(scope.$index, scope.row)">操作记录
            </el-button>
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
    <div class="dialog-div">
      <el-dialog title="" :visible.sync="offlineDialog" width="500px" center>
        <span class="offline-title">确认将“{{tmpBookName}}”删除吗？</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="offlineDialog = false">取 消</el-button>
            <el-button type="primary" @click="updateStatus">删 除</el-button>
          </span>
      </el-dialog>
      <el-dialog title="" :visible.sync="detailDialog" width="500px">
        <span class="offline-title">操作记录</span>
        <div class="operat-reason">
          <template v-for="(record,index) in operationRecords">
            <span>{{record}}</span>
          </template>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" size="mini" @click="detailDialog = false">关 闭</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import {orgModuleApi} from '../../api/main'

  export default {
    name: 'recommendBookList',
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
            value: '4000',
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
            value: '5000',
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
            value: '6000',
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
            }, {
              value: '6000-0500',
              label: '游戏',
            }, {
              value: '6000-0600',
              label: '灵异',
            }, {
              value: '6000-0700',
              label: '古代',
            },]
          },
          {
            value: '7000',
            label: '搜索',
            children: [{
              value: '7000-0100',
              label: '精品推荐',
            },]
          },
          {
            value: '8000',
            label: '书籍尾页',
            children: [{
              value: '8000-0100',
              label: '为你推荐',
            },]
          },
        ],
        recommend_book_list_condition: {
          bookType: '',
          author: '',
          status: "-1",
          bookStatus: '-1',
          update_start_time: '',
          update_end_time: '',
          category: "-1",
          bookman: '',
          option: "",
        },
        stack_room_rules: {
          bookType: '',
          author: '',
          sex_type: '',
          status: '',
          bookStatus: '',
          update_start_time: '',
          update_end_time: '',
          category: '',
          bookman: '',
        },
        operationRecords: [],
        pickerBeginDateBefore: {
          disabledDate: (time) => {
            let beginDateVal = this.recommend_book_list_condition.update_end_time;
            if (beginDateVal) {
              return time.getTime() > new Date(beginDateVal).getTime();
            }
          }
        },
        pickerBeginDateAfter: {
          disabledDate: (time) => {
            let beginDateVal = this.recommend_book_list_condition.update_start_time;
            if (beginDateVal) {
              return time.getTime() < new Date(beginDateVal).getTime();
            }
          }
        },
        tableData: [],
        pageNo: 0,
        pageSize: 5,
        currentPage: 1,
        totalSize: 0,
        offlineDialog: false,
        detailDialog: false,
        ifOnline: '',
        reason: '',
        textSize: 0,
        tmpBookName: '',
        tmpRow: {},
      }
    },
    created() {
      this.getRecommendBookLogList()
    },
    methods: {
      getNameById(id) {
        let str = ""
        for (let i in this.options) {
          let item = this.options[i]
          if (item.children.length > 0) {
            for (let a in item.children) {
              if (item.children[a].value == id) {
                str = "-" + item.children[a].label
                break
              }
            }
            if (str.length > 0) {
              str = item.label + str
              break
            }
          }
        }
        return str
      },
      handleOffLine(index, row) {
        this.tmpBookName = row.bookName,
          this.offlineDialog = true
        this.tmpRow = row
      },
      handleDetail(index, row) {
        let params = {
          bookid: row.bookid,
          pos: row.positionId,
        }
        let _this = this
        orgModuleApi.recommendBookHistory(params).then((res) => {
          console.log(res)
          if (res.success) {
            this.detailDialog = true
            this.operationRecords = res.data
          } else {
            this.$message.error('服务器异常')
          }
        })
      },
      getRecommendBookLogList(type) {
        var _this = this
        if (type != 1) {
          _this.pageNo = 0
          _this.currentPage = 1
          _this.totalSize = 0
        }
        let _position = this.recommend_book_list_condition.option
        let _positionItem = -1;

        if (_position.length == 2) {
          _positionItem = _position[1]
        }
        let params = {
          kwd: this.recommend_book_list_condition.author,
          pos: _positionItem,
          status: this.recommend_book_list_condition.status,
          page: this.pageNo,
          size: this.pageSize,
          startDate: this.recommend_book_list_condition.update_start_time,
          endDate: this.recommend_book_list_condition.update_end_time,
        }
        _this.tableData = []
        orgModuleApi.getRecommendBookLogList(params).then((res) => {
          console.log(res)
          if (res.success) {
            res.data.data.map((item, index) => {
              _this.tableData.push({
                bookid: item.bookid,
                bookName: item.bookName,
                author: item.author,
                category: item.category,
                creater: item.operater,
                positionId: item.posid,
                position: _this.getNameById(item.posid),
                status: item.status < 1 ? '推荐中' : "已删除",
                updateTime: _this.common.getDate(item.recoData),
              })
            })
            _this.totalSize = parseInt(res.data.total)
          }
        })
      },
      updateStatus(status = 1) {
//        if(this.reason.length <3){
//          this.$message.error('请填写原因（不少于三个字）')
//          return
//        }
        this.offlineDialog = false
        let params = {
          bookids: [this.tmpRow.bookid],
          pos: this.tmpRow.positionId,
        }
        var _this = this
        orgModuleApi.deleteRecommendBook(params).then((res) => {
          console.log(res)
          if (res.success) {
            this.$message.success('成功')
            _this.getRecommendBookLogList(1);
          } else {
            this.$message.error('失败')
          }
        })
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.getRecommendBookLogList(1)
      },
      handleCurrentChange(val) {
        this.pageNo = val - 1
        this.getRecommendBookLogList(1)
      },
      clearData() {
        this.$refs.stackRoomForm.resetFields()
        this.getRecommendBookLogList()
      },
    }
  }
</script>
<style lang="scss">
  .stack-room-page {
    .stack-room-header {
      height: 50px;
      padding-left: 15px;
      .el-breadcrumb {
        font-size: 16px;
        margin-top: 15px;
      }
    }
    .stack-room-body {
      margin-left: 15px;
      margin-right: 15px;
      .stack-room-form {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
      }
    }
  }
  .dialog-div{
    .el-dialog__header {
      padding: 0 !important;
    }
    .el-dialog__body {
      span {
        display: block;
        text-align: center;
        margin-bottom: 10px;
      }
      .operat-reason {
        display: flex;
        flex-direction: column;
        max-height: 150px;
        overflow: auto;
        margin-top: 20px;
        span {
          margin: 0;
          text-align: left;
          color: #333333;
          margin-bottom: 5px;
        }
      }
      .offline-title {
        font-size: 16px;
      }
    }
  }
</style>
