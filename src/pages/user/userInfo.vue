<template>
  <div class="userInfo-page">
    <div class="userInfo-header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path: '/userManger'}">用户管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path: '/userManger'}">用户列表</el-breadcrumb-item>
        <el-breadcrumb-item >个人详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="userInfo-body">
      <div class="user-infos-box">
        <div class="user-infos-item">
          <span class="item-name head-img-title">头像：</span>
          <div class="head-img-url">
            <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1222929928,1326821480&fm=26&gp=0.jpg"/>
          </div>
        </div>
        <div class="user-infos-item">
          <span class="item-name">昵称：</span>
          <span class="item-value">XXXXXXX</span>
        </div>
        <div class="user-infos-item">
          <span class="item-name">性别：</span>
          <span class="item-value">男</span>
        </div>
        <div class="user-infos-item">
          <span class="item-name">出生日期：</span>
          <span class="item-value">1988-12-12</span>
        </div>
        <div class="user-infos-item">
          <span class="item-name">所在城市：</span>
          <span class="item-value">上海 浦东</span>
        </div>
        <div class="user-infos-item">
          <span class="item-name">账号状态：</span>
          <span class="item-value">正常</span>
        </div>
        <div class="user-infos-item">
          <span class="item-name">剩余书币：</span>
          <span class="item-value">8000</span>
        </div>
        <div class="user-infos-item">
          <span class="item-name">手机号：</span>
          <span class="item-value">13555555652</span>
        </div>
        <div class="user-infos-item">
          <span class="item-name">ACCID：</span>
          <span class="item-value">13555555652</span>
        </div>
        <div class="user-infos-item">
          <span class="item-name">第三方登录：</span>
          <span class="item-value">QQ</span>
        </div>
        <div class="user-infos-item">
          <span class="item-name">手机型号：</span>
          <span class="item-value">HUAWEI</span>
        </div>
        <div class="user-infos-item">
          <span class="item-name">最近登录时间：</span>
          <span class="item-value">2019-03-21</span>
        </div>
        <div class="user-infos-item">
          <span class="item-name">注册时间：</span>
          <span class="item-value">2019-03-21</span>
        </div>
        <div class="user-infos-item">
          <span class="item-name">设备号：</span>
          <span class="item-value">2019-03-21</span>
        </div>
        <div class="user-infos-item">
          <span class="item-name">APP版本：</span>
          <span class="item-value">V4.5.6</span>
        </div>
        <div class="user-infos-item">
          <span class="item-name">加黑原因：</span>
          <span class="item-value">是你就能看深V马克思的V领的深V马拉松的门开了</span>
        </div>
      </div>
      <el-button type="danger" class="defriend-btn" size="mini">加黑</el-button>
      <div class="userInfo-book-currency">
        <el-form ref="bookCurrencyForm" :model="bookCurrency_condition" class="book-currency-form" label-width="50px" size="small">
          <el-form-item label="时间">
            <el-col :span="11" class="startTime">
              <el-form-item>
                <el-date-picker
                  type="date"
                  format="yyyy-MM-dd"
                  placeholder="起始时间"
                  v-model="bookCurrency_condition.start_time"
                  :picker-options="pickerBeginDateBefore"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2" style="text-align:center">至</el-col>
            <el-col :span="11" class="endTime">
              <el-form-item>
                <el-date-picker
                  type="date"
                  format="yyyy-MM-dd"
                  placeholder="结束时间"
                  v-model="bookCurrency_condition.end_time"
                  :picker-options="pickerBeginDateAfter"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="收入 / 支出" label-width="100px">
            <el-select v-model="bookCurrency_condition.incomeOrExpenses" placeholder="请选择收入 / 支出">
              <el-option label="全部" value="999"></el-option>
              <el-option label="支出" value="0"></el-option>
              <el-option label="收入" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="类目">
            <el-select v-model="bookCurrency_condition.category" placeholder="请选择类目">
              <el-option label="全部" value="999"></el-option>
              <el-option label="章节购买" value="0"></el-option>
              <el-option label="活动消耗" value="1"></el-option>
              <el-option label="活动奖励" value="2"></el-option>
              <el-option label="充值" value="3"></el-option>
              <el-option label="签到" value="4"></el-option>
              <el-option label="阅读奖励" value="5"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="bookCurrency_condition.status" placeholder="请选择状态">
              <el-option label="全部" value="999"></el-option>
              <el-option label="成功" value="0"></el-option>
              <el-option label="失败" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="bookCurrency_condition.type" placeholder="请选择类型">
              <el-option label="全部" value="999"></el-option>
              <el-option label="积分" value="0"></el-option>
              <el-option label="书币" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="width: 100%;text-align: right">
            <el-button type="primary" @click="onsubmit">查找</el-button>
            <el-button type="primary" @click="clearData">清空</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="tableData" style="width:100%;"
                  :default-sort = "{prop: 'time', order: 'descending'}"
                  stripe border
                  @sort-change='sortChange'>
          <el-table-column label="序号" width="80" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index+(pageNo - 1) * pageSize + 1}} </span>
            </template>
          </el-table-column>
          <el-table-column sortable='custom' :sort-orders="['ascending', 'descending']"
                           prop="time" label="时间" width="180" align="center"></el-table-column>
          <el-table-column prop="projectName" label="项目" width="180" align="center"></el-table-column>
          <el-table-column prop="incomeOrExpenses" label="收入 / 支出" width="180" align="center"></el-table-column>
          <el-table-column prop="category" label="类目" width="180" align="center"></el-table-column>
          <el-table-column prop="status" label="状态" width="180" align="center"></el-table-column>
          <el-table-column prop="type" label="类型" width="180" align="center"></el-table-column>
          <el-table-column sortable='custom' :sort-orders="['ascending', 'descending']"
                           prop="expireTime" label="积分过期时间" width="180" align="center"></el-table-column>
          <el-table-column prop="remarks" label="备注" width="180" align="center"></el-table-column>
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
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'userInfo',
    data() {
      return {
        bookCurrency_condition: {
          start_time: '',
          end_time: '',
          incomeOrExpenses: '999',
          category: '999',
          status: '999',
          type: '999',
        },
        pickerBeginDateBefore:{
          disabledDate: (time) => {
            let beginDateVal = this.bookCurrency_condition.end_time;
            if (beginDateVal) {
              return time.getTime() > beginDateVal;
            }
          }
        },
        pickerBeginDateAfter:{
          disabledDate: (time) => {
            let beginDateVal = this.bookCurrency_condition.start_time;
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
        sort_prop: 'time',
        sort_order: 'desc',
      }
    },
    methods: {
      handleSizeChange(val) {
        this.pageSize = val
      },
      handleCurrentChange(val) {
        this.pageNo = val
      },
    }
  }
</script>
<style lang="scss" scoped>
  .userInfo-page{
    .userInfo-header{
      height: 50px;
      padding-left: 15px;
      .el-breadcrumb{
        font-size: 16px;
        margin-top: 15px;
      }
    }
    .userInfo-body{
      .user-infos-box{
        width: 95%;
        margin: 0 auto;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin-top: 20px;
        .user-infos-item{
          margin-right: 20px;
          margin-bottom: 10px;
          .item-name{
            font-size: 14px;
            font-weight: 600;
          }
        }
        .head-img-title{
          margin-top: 2px;
          display: block;
          float: left;
        }
        .head-img-url{
          display: inline-block;
          width: 20px;
          height: 20px;
          img{
            width: 100%;
            height: 100%;
          }
        }
      }
      .defriend-btn{
        margin-left: 2.5%;
        width: 100px;
        margin-bottom: 40px;
      }
      .userInfo-book-currency{
        width: 95%;
        margin: 0 auto;
        .book-currency-form{
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
        }
      }
    }
  }
</style>
