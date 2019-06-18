<template>
  <div class="banner-wx-page">
    <div class="banner-wx-header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>推荐管理</el-breadcrumb-item>
        <el-breadcrumb-item>banner管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="banner-wx-body">
      <el-form ref="bannerWxForm" :model="banner_wx_condition" class="banner-wx-form" label-width="80px" size="small">
        <el-form-item label="状态" label-width="50px">
          <el-select v-model="banner_wx_condition.status" placeholder="请选择状态">
            <el-option label="全部" value=""></el-option>
            <el-option label="在线" value="1"></el-option>
            <el-option label="待上线" value="0"></el-option>
            <el-option label="已下线" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="位置" label-width="50px">
          <el-select v-model="banner_wx_condition.position" placeholder="请选择位置">
            <el-option label="全部" value=""></el-option>
            <el-option label="男频" value="0"></el-option>
            <el-option label="女频" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发布时间">
          <el-col :span="11" class="startTime">
            <el-form-item>
              <el-date-picker
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="起始时间"
                v-model="banner_wx_condition.create_start_time"
                :picker-options="pickerBeginDateBefore"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" style="width:20px;text-align:center">至</el-col>
          <el-col :span="11" class="endTime">
            <el-form-item>
              <el-date-picker
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="结束时间"
                v-model="banner_wx_condition.create_end_time"
                :picker-options="pickerBeginDateAfter"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="展示时间">
          <el-col :span="11" class="startTime">
            <el-form-item>
              <el-date-picker
                type="datetime"
                value-format="yyyy-MM-dd HH:mm"
                placeholder="起始时间"
                v-model="banner_wx_condition.show_start_time"
                :picker-options="showPickerBeginDateBefore"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" style="width:20px;text-align:center">至</el-col>
          <el-col :span="11" class="endTime">
            <el-form-item>
              <el-date-picker
                type="datetime"
                value-format="yyyy-MM-dd HH:mm"
                placeholder="结束时间"
                v-model="banner_wx_condition.show_end_time"
                :picker-options="showPickerBeginDateAfter"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="书籍名" label-width="67px">
          <el-input v-model="banner_wx_condition.bookName"></el-input>
        </el-form-item>
        <el-form-item label="创建人" label-width="67px">
          <el-input v-model="banner_wx_condition.createAdmin"></el-input>
        </el-form-item>
        <el-form-item style="float: right;">
          <el-button type="info" @click="clearData">清空</el-button>
          <el-button type="primary" @click="getBannerWxLists">查找</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" style="width:100%;" stripe border>
        <el-table-column label="序号" min-width="30" align="center">
          <template slot-scope="scope">
            <span>{{scope.$index+(pageNo-1) * pageSize + 1}} </span>
          </template>
        </el-table-column>
        <el-table-column label="图片" min-width="60" align="center">
          <template slot-scope="scope">
            <el-popover
              placement="right"
              title=""
              trigger="hover">
              <img :src="scope.row.bannerImage"/>
              <img slot="reference" :src="scope.row.bannerImage" style="max-height: 40px;max-width: 40px">
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="position" label="位置" min-width="30" align="center"></el-table-column>
        <el-table-column prop="bookName" label="书籍名称" min-width="60" align="center"></el-table-column>
        <el-table-column label="展示时间" min-width="60" align="center">
          <template slot-scope="scope">
            <span style="display: block;">{{scope.row.showTime_s}}</span>
            <span style="display: block;">{{scope.row.showTime_e}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" min-width="60" align="center"></el-table-column>
        <el-table-column prop="createAdmin" label="创建人" min-width="30" align="center"></el-table-column>
        <el-table-column prop="status" label="状态" min-width="30" align="center"></el-table-column>
        <el-table-column label="操作" min-width="150" align="center">
          <template slot-scope="scope">
            <el-button size="mini" v-if="scope.row.status == '在线'" type="danger"
                       @click="handleOffLine(scope.$index, scope.row)">下线
            </el-button>
            <el-button size="mini" v-if="scope.row.status == '待上线'" type="warning" @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button size="mini" type="success" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
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
          <span>你确认要将“{{bannerName}}”下线吗？</span>
          <span>下线后，将无法再次进行修改！</span>
          <el-input type="textarea"
                    :rows="3"
                    resize="none"
                    maxlength='50'
                    placeholder="请输入下线原因（不得少于5个汉字）"
                    @keyup.native="watchSize"
                    v-model="reason">
          </el-input>
          <p style="margin: 0;"><span style="text-align: right;">{{textSize}}/50</span></p>
          <span slot="footer" class="dialog-footer">
            <el-button @click="offlineDialog = false">取 消</el-button>
            <el-button type="primary" :disabled="reason.length == 0" @click="setOffline">确 认</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
  import {orgModuleApi} from '../../api/main'

  export default {
    name: 'bannerWxList',
    data() {
      return {
        banner_wx_condition: {
          status: '',
          position: '',
          create_start_time: '',
          create_end_time: '',
          show_start_time: '',
          show_end_time: '',
          bookName: '',
          createAdmin: "",
        },
        pickerBeginDateBefore: {
          disabledDate: (time) => {
            let beginDateVal = this.banner_wx_condition.create_end_time;
            if (beginDateVal) {
              return time.getTime() > beginDateVal;
            }
          }
        },
        pickerBeginDateAfter: {
          disabledDate: (time) => {
            let beginDateVal = this.banner_wx_condition.create_start_time;
            if (beginDateVal) {
              return time.getTime() < beginDateVal;
            }
          }
        },
        showPickerBeginDateBefore: {
          disabledDate: (time) => {
            let beginDateVal = this.banner_wx_condition.show_end_time;
            if (beginDateVal) {
              return time.getTime() > beginDateVal;
            }
          }
        },
        showPickerBeginDateAfter: {
          disabledDate: (time) => {
            let beginDateVal = this.banner_wx_condition.show_start_time;
            if (beginDateVal) {
              return time.getTime() < beginDateVal;
            }
          }
        },
        tableData: [],
        pageNo: 1,
        pageSize: 10,
        currentPage: 1,
        totalSize: 0,
        bannerName: '',
        bannerid: '',
        offlineDialog: false,
        reason: '',
        textSize: 0,
      }
    },
    created() {
      this.getBannerWxLists()
    },
    methods: {
      setOffline() {
        var _this = this
        var params = {
          bid: _this.bannerid,
          remark: _this.reason,
        }
        orgModuleApi.offBanner(params).then(res=>{
          console.log(res)
          if(res.success) {
            _this.offlineDialog = false
            _this.getBannerWxLists()
          }
        })
      },
      handleOffLine(index, row) {
        this.reason = ''
        this.offlineDialog = true
        this.bannerName = row.bookName
        this.bannerid = row.id
      },
      handleEdit(index, row) {
        this.$router.push({
          path: '/wx-banner-setup',
          query: {
            id: row.id
          }
        })
      },
      handleDetail(index, row) {
        this.$router.push({
          path: '/wx-banner-detail',
          query: {
            id: row.id
          }
        })
      },
      watchSize() {
        if (this.reason.length == 50) {
          this.textSize = 50
          return false
        } else {
          this.textSize = this.reason.length
        }
      },
      getBannerWxLists(type) {
        var _this = this
        if(type != 1) {
          _this.pageNo = 1
          _this.currentPage = 1
          _this.totalSize = 0
        }

        var params = {
          bannerGroup: _this.banner_wx_condition.position,
          bookname: _this.banner_wx_condition.bookName,
          startDate: _this.banner_wx_condition.show_start_time,
          endDate: _this.banner_wx_condition.show_end_time,
          createDate_s: _this.banner_wx_condition.create_start_time,
          createDate_e: _this.banner_wx_condition.create_end_time,
          status: _this.banner_wx_condition.status,
          operator: _this.banner_wx_condition.createAdmin,
          size: _this.pageSize,
          page: _this.pageNo-1,
        }
        _this.tableData = []
        orgModuleApi.getBannerList(params).then(res => {
          console.log(res)
          if (res.success) {
            res.data.data.map((item, index) => {
              _this.tableData.push({
                id: item.id,
                bannerImage: item.imgsrc,
                position: item.bannerGroup == 1 ? '女频' : '男频',
                bookName: item.bookname,
                showTime_s: _this.common.getDate2(item.startDate),
                showTime_e: _this.common.getDate2(item.endDate),
                createTime: _this.common.getDate(item.createDate),
                status: item.status == 1 ? '在线' : item.status == 0 ? '待上线' : '已下线',
                createAdmin: item.operator
              })
            })
            _this.totalSize = parseInt(res.data.total)
          }
        })
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.getBannerWxLists(1)
      },
      handleCurrentChange(val) {
        this.pageNo = val
        this.getBannerWxLists(1)
      },
      clearData() {
        this.banner_wx_condition = {
          status: '',
          position: '',
          create_start_time: '',
          create_end_time: '',
          show_start_time: '',
          show_end_time: '',
          bookName: '',
          createAdmin: "",
        }
      },
    }
  }
</script>
<style lang="scss">
  .banner-wx-page {
    .banner-wx-header {
      height: 50px;
      padding-left: 15px;
      .el-breadcrumb {
        font-size: 16px;
        margin-top: 15px;
      }
    }
    .banner-wx-body {
      margin-left: 15px;
      margin-right: 15px;
      padding-bottom: 50px;
      .banner-wx-form {
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
  }
</style>
