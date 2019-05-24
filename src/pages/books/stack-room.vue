<template>
  <div class="stack-room-page">
    <div class="stack-room-header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item >书库管理</el-breadcrumb-item>
        <el-breadcrumb-item >书库列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="stack-room-body">
      <el-form ref="stackRoomForm" :model="stack_room_condition" :rules="stack_room_rules" class="stack-room-form" label-width="80px" size="small">
        <el-form-item label="类型" label-width="60px" prop="bookType">
          <el-select v-model="stack_room_condition.bookType" placeholder="请选择类型">
            <el-option label="全部" value="999"></el-option>
            <el-option label="收费" value="0"></el-option>
            <el-option label="免费" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="书籍名称/作者" label-width="110px" prop="author">
          <el-input v-model="stack_room_condition.author"></el-input>
        </el-form-item>
        <el-form-item label="收费方式" prop="charge_ways">
          <el-select v-model="stack_room_condition.charge_ways" placeholder="请选择收费方式">
            <el-option label="全部" value="999"></el-option>
            <el-option label="书币" value="0"></el-option>
            <el-option label="积分" value="1"></el-option>
            <el-option label="书币/积分" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" label-width="60px" prop="status">
          <el-select v-model="stack_room_condition.status" placeholder="请选择状态">
            <el-option label="全部" value="999"></el-option>
            <el-option label="上架中" value="0"></el-option>
            <el-option label="下架中" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="最近更新时间" label-width="110px">
          <el-col :span="11" class="startTime">
            <el-form-item  prop="update_start_time">
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
          <el-col class="line" :span="2" style="width:20px;text-align:center">至</el-col>
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
        <el-form-item label="书籍状态" prop="bookStatus">
          <el-select v-model="stack_room_condition.bookStatus" placeholder="请选择书籍状态">
            <el-option label="全部" value="999"></el-option>
            <el-option label="完结" value="0"></el-option>
            <el-option label="连载" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="书籍分类" prop="category">
          <el-select v-model="stack_room_condition.category" placeholder="请选择书籍分类">
            <el-option label="全部" value="999"></el-option>
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
        <el-form-item label="来源/书商" prop="bookman">
          <el-select v-model="stack_room_condition.bookman" placeholder="请选择来源/书商">
            <el-option label="全部" value="999"></el-option>
            <el-option label="baike.com" value="0"></el-option>
            <el-option label="quang.com" value="1"></el-option>
            <el-option label="hsxx.com" value="2"></el-option>
            <el-option label="ccom.com" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="float: right;">
          <el-button type="info" @click="clearData">清空</el-button>
          <el-button type="primary" @click="getBannerAppLists">查找</el-button>
          <!--<el-button type="warning" @click="getBannerAppLists">批量上架</el-button>-->
          <!--<el-button type="danger" @click="getBannerAppLists">批量下架</el-button>-->
        </el-form-item>
      </el-form>
      <el-table :data="tableData" style="width:100%;"
                :default-sort = "{prop: 'updateTime', order: 'descending'}"
                stripe border
                @sort-change='sortChange'>
        <el-table-column
          type="selection"
          width="40">
        </el-table-column>
        <el-table-column label="序号" width="80" align="center">
          <template slot-scope="scope">
            <span>{{scope.$index+(pageNo - 1) * pageSize + 1}} </span>
          </template>
        </el-table-column>
        <el-table-column prop="bookName" label="书籍名称" width="180" align="center"></el-table-column>
        <el-table-column prop="author" label="作者" width="80" align="center"></el-table-column>
        <el-table-column prop="category" label="书籍分类" width="80" align="center"></el-table-column>
        <el-table-column prop="category" label="男女分类" width="80" align="center"></el-table-column>
        <el-table-column prop="bookSeller" label="来源/书商" width="180" align="center"></el-table-column>
        <el-table-column prop="bookStatus" label="书籍状态" width="80" align="center"></el-table-column>
        <el-table-column prop="wordNum" label="字数" width="80" align="center"></el-table-column>
        <el-table-column sortable='custom' :sort-orders="['ascending', 'descending']"
                         prop="updateTime" label="最近更新时间" width="180" align="center"></el-table-column>
        <el-table-column prop="bookType" label="类型" width="80" align="center"></el-table-column>
        <el-table-column prop="charge_ways" label="收费方式" width="80" align="center"></el-table-column>
        <el-table-column prop="charge_start" label="收费起始章节" width="80" align="center"><i class="el-icon-edit"></i></el-table-column>

        <el-table-column label="收费起始章节2" width="180" align="center">
          <template slot-scope="scope">
            <span @click="changeStartChapter(scope.$index, scope.row)">
              <i class="el-icon-edit"></i>
              {{scope.row.charge_start}}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="charge_ways" label="审核通过时间" width="180" align="center"></el-table-column>
        <el-table-column prop="status" label="展示状态" width="80" align="center"></el-table-column>
        <el-table-column label="操作" min-width="50" align="center">
          <template slot-scope="scope">
            <!--<el-button size="mini" type="danger" @click="handleOffLine(scope.$index, scope.row)">下架</el-button>-->
            <!--<el-button size="mini" type="primary" @click="handleOnLine(scope.$index, scope.row)">上架</el-button>-->
            <!--<el-button size="mini" type="warning" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
            <el-button size="mini" type="info" @click="handleDetail(scope.$index, scope.row)">查看</el-button>
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
        <el-dialog title="" :visible.sync="offlineDialog" width="500px" center>
          <span>设置收费起始章节</span>
          <el-form  label-width="12px" size="small" class="account-info-form" label-position="left">
            <el-form-item label="收费起始章节" required  label-width="110px">
              <el-input v-model="chargeStartChapter">222</el-input>
            </el-form-item>
          </el-form>
          <!--<el-input-->
                  <!--type="textarea"-->
                  <!--:rows="3"-->
                  <!--resize="none"-->
                  <!--maxlength='50'-->
                  <!--placeholder="请输入下线原因（不得少于5个汉字）"-->
                  <!--@keyup.native = "watchSize"-->
                  <!--v-model="reason">-->
          <!--</el-input>-->
          <!--<p style="margin: 0;"><span style="text-align: right;">{{textSize}}/50</span></p>-->
          <span slot="footer" class="dialog-footer">
            <el-button @click="offlineDialog = false">取 消</el-button>
            <el-button type="primary" @click="offlineDialog = false">确 认</el-button>
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
          bookType: '999',
          author: '',
          charge_ways: '999',
          status: '999',
          bookStatus: '999',
          update_start_time: '',
          update_end_time: '',
          category: '999',
          bookman: '999',
        },
        stack_room_rules: {
          bookType: '999',
          author: '',
          charge_ways: '999',
          status: '999',
          bookStatus: '999',
          update_start_time: '',
          update_end_time: '',
          category: '999',
          bookman: '999',
        },
        pickerBeginDateBefore:{
          disabledDate: (time) => {
            let beginDateVal = this.stack_room_condition.update_end_time;
            if (beginDateVal) {
              return time.getTime() > beginDateVal;
            }
          }
        },
        pickerBeginDateAfter:{
          disabledDate: (time) => {
            let beginDateVal = this.stack_room_condition.update_start_time;
            if (beginDateVal) {
              return time.getTime() < beginDateVal;
            }
          }
        },
        tableData: [
          {bookName:'20岁',author:'张三三',category:'都市',bookSeller:'quang',bookStatus:'完结',wordNum:'200万字',bookType:'收费',charge_ways:'书币',charge_start:13,status:'展示中'},
          {bookName:'20岁',author:'张三三',category:'都市',bookSeller:'quang',bookStatus:'完结',wordNum:'200万字',bookType:'收费',charge_ways:'书币',charge_start:18,status:'展示中'},
          {bookName:'20岁',author:'张三三',category:'都市',bookSeller:'quang',bookStatus:'完结',wordNum:'200万字',bookType:'收费',charge_ways:'书币',charge_start:15,status:'未展示'},
        ],
        pageNo: 1,
        pageSize: 10,
        currentPage: 1,
        totalSize: 0,
        offlineDialog: false,
        sort_prop: 'updateTime',
        sort_order: 'desc',
        chargeStartChapter:'',
      }
    },
    created() {
      this.getStackRoomLists()
    },
    methods: {
      handleDetail(index,row){
        this.$router.push({
          path:'/stack-room-detail'
        })
      },
      changeStartChapter(index,row){
          this.offlineDialog = true;
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
      sortChange: function(column, prop, order) {
        this.sort_prop = column.prop
        this.sort_order = column.order.replace('ending','')
        this.getStackRoomLists()
      },
    }
  }
</script>
<style lang="scss">
  .stack-room-page{
    .stack-room-header{
      height: 50px;
      padding-left: 15px;
      .el-breadcrumb{
        font-size: 16px;
        margin-top: 15px;
      }
    }
    .stack-room-body{
      margin-left: 15px;
      margin-right: 15px;
      .stack-room-form{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
      }
    }
    .el-dialog__header{
      padding: 0!important;
    }
    .el-dialog__body{
      span{
        display: block;
        text-align: center;
        margin-bottom: 10px;
      }
    }
  }
</style>
