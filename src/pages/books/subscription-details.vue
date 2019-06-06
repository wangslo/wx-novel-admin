<template>
  <div class="subscription-detail-page">
    <div class="subscription-detail-header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path: '/stack-room'}">书库管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path: '/stack-room'}">书库列表</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path: '/stack-room-detail'}">xxx详情</el-breadcrumb-item>
        <el-breadcrumb-item>xxx订阅详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="subscription-detail-body">
      <el-form ref="subscriptionform" :model="subscription_condition" class="subscription-detail-form" label-width="70px" :rules="subscriptionRules" size="small">
        <el-form-item label="创建时间">
          <el-col :span="11" class="startTime">
            <el-form-item  prop="pay_start_time">
              <el-date-picker
                type="date"
                format="yyyy-MM-dd"
                placeholder="起始时间"
                v-model="subscription_condition.pay_start_time"
                :picker-options="pickerBeginDateBefore"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col style="width:20px;text-align:center">至</el-col>
          <el-col :span="11" class="endTime">
            <el-form-item prop="pay_end_time">
              <el-date-picker
                type="date"
                format="yyyy-MM-dd"
                placeholder="结束时间"
                v-model="subscription_condition.pay_end_time"
                :picker-options="pickerBeginDateAfter"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="流水号" prop="serialnum" label-width="60px">
          <el-input v-model="subscription_condition.serialnum"></el-input>
        </el-form-item>
        <el-form-item label="OPENID" prop="openid" label-width="60px">
          <el-input v-model="subscription_condition.openid"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname" label-width="60px">
          <el-input v-model="subscription_condition.nickname"></el-input>
        </el-form-item>
        <el-form-item label="支付状态" prop="paystatus" label-width="80px">
          <el-select v-model="subscription_condition.paystatus" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option label="成功" value="成功"></el-option>
            <el-option label="失败" value="失败"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="float: right;">
          <el-button type="primary" @click="clearData">清空</el-button>
          <el-button type="primary" @click="">查找</el-button>
        </el-form-item>
      </el-form>
      <div class="pay-sum">书币付费总额：xxxx</div>
      <el-table :data="tableData" style="width:100%;" stripe border>
        <el-table-column label="序号" min-width="30" align="center">
          <template slot-scope="scope">
            <span>{{scope.$index + (pageNo - 1) * pageSize + 1}} </span>
          </template>
        </el-table-column>
        <el-table-column prop="paytime" label="付费时间" min-width="60" align="center"></el-table-column>
        <el-table-column prop="paytype" label="付费方式" min-width="30" align="center"></el-table-column>
        <el-table-column prop="payamount" label="付费金额" min-width="30" align="center"></el-table-column>
        <el-table-column prop="serialnum" label="流水号" min-width="30" align="center"></el-table-column>
        <el-table-column prop="paystatus" label="支付状态" min-width="30" align="center"></el-table-column>
        <el-table-column prop="openid" label="OPENID" min-width="30" align="center"></el-table-column>
        <el-table-column prop="nickname" label="昵称" min-width="30" align="center"></el-table-column>
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
  </div>
</template>
<script>
  export default {
    name: 'subscription-details',
    data() {
      return {
        subscription_condition: {
          pay_start_time: '',
          pay_end_time: '',
          serialnum: '',
          openid: '',
          nickname: '',
          paystatus: '',
        },
        subscriptionRules: {
          pay_start_time: [],
          pay_end_time: [],
          serialnum: [],
          openid: [],
          nickname: [],
          paystatus: [],
        },
        pickerBeginDateBefore:{
          disabledDate: (time) => {
            let beginDateVal = this.subscription_condition.pay_end_time;
            if (beginDateVal) {
              return time.getTime() > beginDateVal;
            }
          }
        },
        pickerBeginDateAfter:{
          disabledDate: (time) => {
            let beginDateVal = this.subscription_condition.pay_start_time;
            if (beginDateVal) {
              return time.getTime() < beginDateVal;
            }
          }
        },
        tableData: [
          {
            paytime: '第一章：发发'
          },
        ],
        pageNo: 1,
        pageSize: 10,
        currentPage: 1,
        totalSize: 0,
      }
    },
    methods: {
      clearData() {
        this.$refs.subscriptionform.resetFields()
      },
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
  .subscription-detail-page {
    .subscription-detail-header {
      height: 50px;
      padding-left: 15px;
      .el-breadcrumb {
        font-size: 16px;
        margin-top: 15px;
      }
    }
    .subscription-detail-body {
      padding-left: 15px;
      padding-right: 15px;
      .subscription-detail-form{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
      }
      .pay-sum{
        margin-top: 20px;
        margin-bottom: 20px;
        font-size: 14px;
      }
    }
  }
</style>
