<template>
  <div class="stack-room-page">
    <div class="stack-room-header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>书库管理</el-breadcrumb-item>
        <el-breadcrumb-item>书库列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="stack-room-body">
      <el-form ref="stackRoomForm" :model="stack_room_condition" :rules="stack_room_rules" class="stack-room-form"
               label-width="80px" size="small">
        <el-form-item label="书籍名称/作者" label-width="110px" prop="author">
          <el-input v-model="stack_room_condition.author"></el-input>
        </el-form-item>
        <el-form-item label="最后更新时间" label-width="110px">
          <el-col :span="11" class="startTime">
            <el-form-item prop="update_start_time">
              <el-date-picker
                type="datetime"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="起始时间"
                v-model="stack_room_condition.update_start_time"
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
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="结束时间"
                v-model="stack_room_condition.update_end_time"
                :picker-options="pickerBeginDateAfter"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="书商/书商标识" prop="bookman" label-width="100px" v-if="false">
          <el-select v-model="stack_room_condition.bookman" placeholder="请选择书商/书商标识">
            <el-option label="全部" value=""></el-option>
            <el-option label="baike.com" value="0"></el-option>
            <el-option label="quang.com" value="1"></el-option>
            <el-option label="hsxx.com" value="2"></el-option>
            <el-option label="ccom.com" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型" label-width="50px" prop="bookType" v-if="false">
          <el-select v-model="stack_room_condition.bookType" placeholder="请选择类型">
            <el-option label="全部" value=""></el-option>
            <el-option label="收费" value="0"></el-option>
            <el-option label="免费" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="书籍分类" prop="category">
          <el-select v-model="stack_room_condition.category" placeholder="请选择书籍分类">
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
        <el-form-item label="男女分类" prop="sex_type">
          <el-select v-model="stack_room_condition.sex_type" placeholder="请选择男女分类">
            <el-option label="全部" value="-1"></el-option>
            <el-option label="男生" value="0"></el-option>
            <el-option label="女生" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="书籍状态" prop="bookStatus">
          <el-select v-model="stack_room_condition.bookStatus" placeholder="请选择书籍状态">
            <el-option label="全部" value="-1"></el-option>
            <el-option label="完结" value="1"></el-option>
            <el-option label="连载" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展示状态" prop="status">
          <el-select v-model="stack_room_condition.status" placeholder="请选择状态">
            <el-option label="全部" value="0"></el-option>
            <el-option label="上架中" value="1"></el-option>
            <el-option label="已下架" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button  @click="clearData">清空</el-button>
          <el-button type="primary" @click="getStackRoomLists">查找</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" style="width:100%;" stripe border>
        <el-table-column label="序号" min-width="30" align="center">
          <template slot-scope="scope">
            <span>{{scope.$index+(pageNo - 1) * pageSize + 1}} </span>
          </template>
        </el-table-column>
        <el-table-column prop="bookName" label="书籍名称" min-width="80" align="center"></el-table-column>
        <el-table-column prop="author" label="作者" min-width="30" align="center"></el-table-column>
        <el-table-column prop="category" label="书籍分类" min-width="30" align="center"></el-table-column>
        <el-table-column prop="sex" label="男女分类" min-width="30" align="center"></el-table-column>
        <el-table-column prop="bookSeller" label="书商" min-width="30" align="center"></el-table-column>
        <el-table-column v-if = "false" prop="bookSellerLogo" label="书商标识" min-width="30" align="center"></el-table-column>
        <el-table-column prop="bookStatus" label="书籍状态" min-width="30" align="center"></el-table-column>
        <el-table-column prop="wordNum" label="字数" min-width="30" align="center"></el-table-column>
        <el-table-column prop="chapterNum" label="章数" min-width="30" align="center"></el-table-column>
        <el-table-column prop="updateTime" label="最后更新时间" min-width="80" align="center"></el-table-column>
        <el-table-column prop="bookType" label="类型" min-width="30" align="center"></el-table-column>
        <el-table-column prop="charge_ways" label="收费方式" min-width="30" align="center"></el-table-column>
        <el-table-column label="收费起始章节" min-width="50" align="center">
          <template slot-scope="scope">
            <span @click="changeStartChapter(scope.$index, scope.row)">
              {{scope.row.charge_start}}
              <i class="el-icon-edit" type="primary"></i>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="addDate" label="审核通过时间" min-width="80" align="center"></el-table-column>
        <el-table-column prop="status" label="展示状态" min-width="30" align="center"></el-table-column>
        <el-table-column label="操作" min-width="80" align="center">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status == '上架中'" size="mini" type="danger"
                       @click="handleOffLine(scope.$index, scope.row, '1')">下架
            </el-button>
            <el-button v-else size="mini" type="primary" @click="handleOffLine(scope.$index, scope.row, '0')">上架
            </el-button>
            <el-button size="mini" type="primary" @click="handleDetail(scope.$index, scope.row)">查看</el-button>
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
      <div class="dialog-div">
        <el-dialog title="" :visible.sync="setChapterDialog" width="500px" center>
          <span>设置收费起始章节</span>
          <el-form label-width="12px" size="small" class="account-info-form" label-position="left">
            <el-form-item label="收费起始章节" required label-width="110px">
              <el-input v-model="chargeStartChapter"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="setChapterDialog = false">取 消</el-button>
            <el-button type="primary" @click="confirmChangeStartChapter">确 认</el-button>
          </span>
        </el-dialog>
        <el-dialog title="" :visible.sync="offlineDialog" width="500px" center>
          <span v-if="ifOnline" class="offline-title">确认将“{{tmpBookName}}”上架吗？</span>
          <span v-else class="offline-title">确认将“{{tmpBookName}}”下架吗？</span>
          <el-input
            type="textarea"
            :rows="3"
            resize="none"
            maxlength='50'
            placeholder="请输入原因"
            @keyup.native="watchSize"
            v-model="reason">
          </el-input>
          <p style="margin: 0;"><span style="text-align: right;">{{textSize}}/50</span></p>
          <span slot="footer" class="dialog-footer">
            <el-button @click="offlineDialog = false">取 消</el-button>
            <el-button v-if="ifOnline" type="primary" @click="updateStatus(1)">上 架</el-button>
            <el-button v-else type="primary" @click="updateStatus(2)">下 架</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
  import {orgModuleApi,msgModuleApi} from '../../api/main'

  export default {
    name: 'stackRoomList',
    data() {
      return {
        stack_room_condition: {
          bookType: '',
          author: '',
          sex_type: '-1',
          status: "0",
          bookStatus: '-1',
          update_start_time: '',
          update_end_time: '',
          category: "-1",
          bookman: '',
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
        pickerBeginDateBefore: {
          disabledDate: (time) => {
            let beginDateVal = this.stack_room_condition.update_end_time;
            if (beginDateVal) {
              return time.getTime() > beginDateVal;
            }
          }
        },
        pickerBeginDateAfter: {
          disabledDate: (time) => {
            let beginDateVal = this.stack_room_condition.update_start_time;
            if (beginDateVal) {
              return time.getTime() < beginDateVal;
            }
          }
        },
        tableData: [
          {
            bookName: '20岁',
            author: '张三三',
            category: '都市',
            bookSeller: 'quang',
            bookStatus: '完结',
            wordNum: '200万字',
            bookType: '收费',
            charge_ways: '书币',
            charge_start: 13,
            status: '上架中'
          },
        ],
        pageNo: 1,
        pageSize: 5,
        currentPage: 1,
        totalSize: 0,
        setChapterDialog: false,
        chargeStartChapter: '',
        offlineDialog: false,
        ifOnline: '',
        reason: '',
        textSize: 0,
        tmpBookName:'',
        tmpRow:{},
      }
    },
    created() {
      this.getStackRoomLists()
    },
    methods: {
      watchSize() {
        if (this.reason.length == 50) {
          this.textSize = 50
          return false
        } else {
          this.textSize = this.reason.length
        }
      },
      handleOffLine(index, row, type) {
        this.reason = ''
        if (type == 1) {
          //将什么下架
          this.ifOnline = false
        } else {
          this.ifOnline = true
        }
        this.tmpBookName = row.bookName,
        this.offlineDialog = true
        this.tmpRow = row
      },
      handleDetail(index, row) {
        this.$router.push({
          path: '/stack-room-detail',
          query: {
            bookid: row.bookid
          }
        })
      },
      changeStartChapter(index, row) {
        this.setChapterDialog = true;
        this.tmpRow = row
      },
      confirmChangeStartChapter(){
        if(this.chargeStartChapter < 1){
          this.$message.error('请填写起始章节')
          return
        }
        let params = {
          bookid:this.tmpRow.bookid,
          novelset:this.chargeStartChapter,
        }
        var _this = this
        msgModuleApi.updateBookStartChapter(params).then((res)=>{
          this.setChapterDialog = false;
          this.chargeStartChapter = ''
          console.log(res)
          if(res.success){
            _this.getStackRoomLists();
          }
        })
      },
      getStackRoomLists() {
        let params = {
          kwd:this.stack_room_condition.author,
          cateid:this.stack_room_condition.category,
          sex:this.stack_room_condition.sex_type,
          bookStatus:this.stack_room_condition.bookStatus,
          status:this.stack_room_condition.status,
          page: this.pageNo ,
          size: this.pageSize,
          startDate: this.stack_room_condition.update_start_time,
          endDate: this.stack_room_condition.update_end_time,
        }
        var _this = this
        _this.tableData = []
        msgModuleApi.bookList(params).then((res)=>{
          console.log(res)
          if(res.success){
            res.data.list.map((item,index)=>{
              _this.tableData.push({
                bookid :item.bookid,
                bookName: item.name,
                author: item.author,
                category: item.tp1st,
                sex: item.channel >0 ? '女生':'男生',
                bookSeller: item.ufr,
                bookStatus: item.bookstatus > 0 ? '完结':'连载',
                wordNum: item.words,
                bookType: '收费',
                charge_ways: '书币',
                charge_start: item.novelSet,
                status: item.status <= 1 ? '上架中':"已下架",
                updateTime:item.updDate,
                chapterNum:item.allChapterNum,
                addDate:item.addDate,
              })
            })
            _this.totalSize = parseInt(res.data.total)
          }
        })
      },
      updateStatus(status = 1){
        if(this.reason.length <3){
          this.$message.error('请填写原因')
          return
        }
        this.offlineDialog = false
        let params = {
          bookid:this.tmpRow.bookid,
          status:status,
          reason:this.reason,
        }
        var _this = this
        msgModuleApi.bookUpdateStatus(params).then((res)=>{
          console.log(res)
          if(res.success){
            _this.getStackRoomLists();
          }
        })
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.getStackRoomLists()
      },
      handleCurrentChange(val) {
        this.pageNo = val
        this.getStackRoomLists()
      },
      clearData() {
        this.$refs.stackRoomForm.resetFields()
        this.getStackRoomLists()
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
    .el-dialog__header {
      padding: 0 !important;
    }
    .el-dialog__body {
      span {
        display: block;
        text-align: center;
        margin-bottom: 10px;
      }
    }
    .offline-title {
      font-size: 16px;
      margin-top: 20px;
    }
  }
</style>
