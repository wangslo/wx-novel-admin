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
                type="date"
                format="yyyy-MM-dd"
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
                type="date"
                format="yyyy-MM-dd"
                placeholder="结束时间"
                v-model="stack_room_condition.update_end_time"
                :picker-options="pickerBeginDateAfter"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="书商/书商标识" prop="bookman" label-width="100px">
          <el-select v-model="stack_room_condition.bookman" placeholder="请选择书商/书商标识">
            <el-option label="全部" value=""></el-option>
            <el-option label="baike.com" value="0"></el-option>
            <el-option label="quang.com" value="1"></el-option>
            <el-option label="hsxx.com" value="2"></el-option>
            <el-option label="ccom.com" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型" label-width="50px" prop="bookType">
          <el-select v-model="stack_room_condition.bookType" placeholder="请选择类型">
            <el-option label="全部" value=""></el-option>
            <el-option label="收费" value="0"></el-option>
            <el-option label="免费" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="书籍分类" prop="category">
          <el-select v-model="stack_room_condition.category" placeholder="请选择书籍分类">
            <el-option label="全部" value=""></el-option>
            <el-option label="玄幻" value="0"></el-option>
            <el-option label="武侠" value="1"></el-option>
            <el-option label="都市" value="2"></el-option>
            <el-option label="军事" value="3"></el-option>
            <el-option label="历史" value="4"></el-option>
            <el-option label="竞技" value="5"></el-option>
            <el-option label="科幻" value="6"></el-option>
            <el-option label="灵异" value="7"></el-option>
            <el-option label="悬疑" value="8"></el-option>
            <el-option label="同人" value="9"></el-option>
            <el-option label="言情" value="10"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="男女分类" prop="sex_type">
          <el-select v-model="stack_room_condition.sex_type" placeholder="请选择男女分类">
            <el-option label="全部" value=""></el-option>
            <el-option label="男生" value="0"></el-option>
            <el-option label="女生" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="书籍状态" prop="bookStatus">
          <el-select v-model="stack_room_condition.bookStatus" placeholder="请选择书籍状态">
            <el-option label="全部" value=""></el-option>
            <el-option label="完结" value="0"></el-option>
            <el-option label="连载" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展示状态" prop="status">
          <el-select v-model="stack_room_condition.status" placeholder="请选择状态">
            <el-option label="全部" value=""></el-option>
            <el-option label="上架中" value="0"></el-option>
            <el-option label="已下架" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="clearData">清空</el-button>
          <el-button type="primary" @click="getBannerAppLists">查找</el-button>
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
        <el-table-column prop="category" label="男女分类" min-width="30" align="center"></el-table-column>
        <el-table-column prop="bookSeller" label="书商" min-width="30" align="center"></el-table-column>
        <el-table-column prop="bookSellerLogo" label="书商标识" min-width="30" align="center"></el-table-column>
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
              <i class="el-icon-edit"></i>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="charge_ways" label="审核通过时间" min-width="80" align="center"></el-table-column>
        <el-table-column prop="status" label="展示状态" min-width="30" align="center"></el-table-column>
        <el-table-column label="操作" min-width="150" align="center">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status == '上架中'" size="mini" type="primary"
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
        :page-sizes="[10,20, 50, 100]"
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
              <el-input v-model="chargeStartChapter">222</el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="setChapterDialog = false">取 消</el-button>
            <el-button type="primary" @click="setChapterDialog = false">确 认</el-button>
          </span>
        </el-dialog>
        <el-dialog title="" :visible.sync="offlineDialog" width="500px" center>
          <span v-if="ifOnline" class="offline-title">确认将“XXXXXXXX”上架吗？</span>
          <span v-else class="offline-title">确认将“XXXXXXXX”下架吗？</span>
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
            <el-button v-if="ifOnline" type="primary" @click="offlineDialog = false">上 架</el-button>
            <el-button v-else type="primary" @click="offlineDialog = false">下 架</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
  import {orgModuleApi} from '../../api/main'

  export default {
    name: 'stackRoomList',
    data() {
      return {
        stack_room_condition: {
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
          {
            bookName: '20岁',
            author: '张三三',
            category: '都市',
            bookSeller: 'quang',
            bookStatus: '完结',
            wordNum: '200万字',
            bookType: '收费',
            charge_ways: '书币',
            charge_start: 18,
            status: '上架中'
          },
          {
            bookName: '20岁',
            author: '张三三',
            category: '都市',
            bookSeller: 'quang',
            bookStatus: '完结',
            wordNum: '200万字',
            bookType: '收费',
            charge_ways: '书币',
            charge_start: 15,
            status: '已下架'
          },
        ],
        pageNo: 1,
        pageSize: 10,
        currentPage: 1,
        totalSize: 0,
        setChapterDialog: false,
        chargeStartChapter: '',
        offlineDialog: false,
        ifOnline: '',
        reason: '',
        textSize: 0,
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
          this.ifOnline = false
        } else {
          this.ifOnline = true
        }
        this.offlineDialog = true
      },
      handleDetail(index, row) {
        this.$router.push({
          path: '/stack-room-detail'
        })
      },
      changeStartChapter(index, row) {
        this.setChapterDialog = true;
      },
      getStackRoomLists() {

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
