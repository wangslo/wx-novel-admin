<template>
  <div class="blacklist-page">
    <div class="blacklist-header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item >用户管理</el-breadcrumb-item>
        <el-breadcrumb-item >黑名单</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="blacklist-body">
      <el-form ref="blacklistForm" :model="blacklist_condition" :rules="blacklistRules" class="blacklist-form" label-width="80px" size="small">
        <el-form-item label="昵称" label-width="60px" prop="nickName">
          <el-input v-model="blacklist_condition.nickName"></el-input>
        </el-form-item>
        <el-form-item label="手机号" label-width="70px" prop="phone">
          <el-input v-model="blacklist_condition.phone"></el-input>
        </el-form-item>
        <el-form-item label="ACCID" label-width="70px" prop="accid">
          <el-input v-model="blacklist_condition.accid"></el-input>
        </el-form-item>
        <el-form-item label="操作人" label-width="90px" prop="operator">
          <el-select v-model="blacklist_condition.operator" placeholder="请选择操作人">
            <el-option label="全部" value="999"></el-option>
            <el-option label="QQ" value="0"></el-option>
            <el-option label="微信" value="1"></el-option>
            <el-option label="微博" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="注册时间" label-width="80px">
          <el-col :span="10" class="startTime">
            <el-form-item  prop="create_start_time">
              <el-date-picker
                type="date"
                format="yyyy-MM-dd"
                placeholder="起始时间"
                v-model="blacklist_condition.create_start_time"
                :picker-options="pickerBeginDateBefore"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2" style="width:20px;text-align:center">至</el-col>
          <el-col :span="10" class="endTime">
            <el-form-item  prop="create_end_time">
              <el-date-picker
                type="date"
                format="yyyy-MM-dd"
                placeholder="结束时间"
                v-model="blacklist_condition.create_end_time"
                :picker-options="pickerBeginDateAfter"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="加黑时间" label-width="110px">
          <el-col :span="10" class="startTime">
            <el-form-item  prop="bolding_start_time">
              <el-date-picker
                type="date"
                format="yyyy-MM-dd"
                placeholder="起始时间"
                v-model="blacklist_condition.bolding_start_time"
                :picker-options="loginBeginDateBefore"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2" style="width:20px;text-align:center">至</el-col>
          <el-col :span="10" class="endTime">
            <el-form-item  prop="bolding_end_time">
              <el-date-picker
                type="date"
                format="yyyy-MM-dd"
                placeholder="结束时间"
                v-model="blacklist_condition.bolding_end_time"
                :picker-options="loginBeginDateAfter"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item style="float: right;">
          <el-button type="info" @click="clearData">清空</el-button>
          <el-button type="primary" @click="onsubmit">查找</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" style="width:100%;"
                :default-sort = "{prop: 'create_time', order: 'descending'}"
                stripe border
                @sort-change='sortChange'>
        <el-table-column label="序号" width="80" align="center">
          <template slot-scope="scope">
            <span>{{scope.$index+(pageNo - 1) * pageSize + 1}} </span>
          </template>
        </el-table-column>
        <el-table-column label="头像" width="180" align="center">
          <template slot-scope="scope">
            <el-popover
              placement="right"
              title=""
              trigger="hover">
              <img :src="headerImg?headerImg:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1222929928,1326821480&fm=26&gp=0.jpg'"/>
              <img slot="reference" :src="headerImg?headerImg:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1222929928,1326821480&fm=26&gp=0.jpg'" style="max-height: 20px;max-width: 20px">
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="nickName" label="昵称" width="180" align="center"></el-table-column>
        <el-table-column prop="phone" label="手机号" width="180" align="center"></el-table-column>
        <el-table-column prop="accid" label="ACCID" width="180" align="center"></el-table-column>
        <el-table-column prop="bolding" label="加黑原因" width="180" align="center"></el-table-column>
        <el-table-column sortable='custom' :sort-orders="['ascending', 'descending']"
                         prop="bolding_time" label="加黑时间" width="180" align="center"></el-table-column>
        <el-table-column sortable='custom' :sort-orders="['ascending', 'descending']"
                         prop="create_time" label="注册时间" width="180" align="center"></el-table-column>
        <el-table-column prop="operator" label="操作人" width="180" align="center"></el-table-column>
        <el-table-column label="操作" min-width="250" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleSearch(scope.$index, scope.row)">查看</el-button>
            <el-button size="mini" type="danger" @click="handleDefriend(scope.$index, scope.row)">启用</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[20, 50, 100]"
        background
        :page-size="20"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
      <div class="dialog-div">
        <el-dialog title="启用账号" :visible.sync="defriendDialog" width="500px" center>
          <span>启用后，改账号将可以正常访问魅狐文学APP。</span>
          <span>是否启用“XXXXX”？</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="defriendDialog = false">取 消</el-button>
            <el-button type="primary" @click="defriendDialog = false">启 用</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'blacklist',
    data() {
      return {
        blacklist_condition: {
          accid: '',
          phone: '',
          nickName: '',
          operator: '999',
          create_start_time: '',
          create_end_time: '',
          bolding_start_time: '',
          bolding_end_time: '',
        },
        blacklistRules: {
          accid: '',
          phone: '',
          nickName: '',
          operator: '999',
          create_start_time: '',
          create_end_time: '',
          bolding_start_time: '',
          bolding_end_time: '',
        },
        pickerBeginDateBefore:{
          disabledDate: (time) => {
            let beginDateVal = this.blacklist_condition.create_end_time;
            if (beginDateVal) {
              return time.getTime() > beginDateVal;
            }
          }
        },
        pickerBeginDateAfter:{
          disabledDate: (time) => {
            let beginDateVal = this.blacklist_condition.create_start_time;
            if (beginDateVal) {
              return time.getTime() < beginDateVal;
            }
          }
        },
        loginBeginDateBefore:{
          disabledDate: (time) => {
            let beginDateVal = this.blacklist_condition.bolding_end_time;
            if (beginDateVal) {
              return time.getTime() > beginDateVal;
            }
          }
        },
        loginBeginDateAfter:{
          disabledDate: (time) => {
            let beginDateVal = this.blacklist_condition.bolding_start_time;
            if (beginDateVal) {
              return time.getTime() < beginDateVal;
            }
          }
        },
        tableData: [],
        pageNo: 1,
        pageSize: 10,
        currentPage: 1,
        defriendDialog:false,
      }
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      handleDefriend(idx,row) {
        this.defriendDialog = true
        console.log(row)
      },
      handleSearch(idx,row) {
        this.$router.push({
          name:'blacklistInfo'
        })
      },
      clearData() {
        this.$refs.blacklistForm.resetFields()
      },
      sortChange: function(column, prop, order) {
        console.log(column.prop + '-' + column.order)
      },
      onsubmit() {
        this.tableData = [
          {
            headerImg: 'http://img5.duitang.com/uploads/item/201409/23/20140923094045_BNYji.thumb.700_0.png',
            phone: '1233',
            nickName: 'asa',
            operator: 'QQ',
            bolding: '古道边',
            accid: '',
            bolding_time: '',
            create_time: '',
          },
          {
            headerImg: '',
            phone: '111',
            nickName: 'ggg',
            operator: 'hhh',
            bolding: '兰亭外',
            accid: '',
            bolding_time: '',
            create_time: '',
          }
        ]
      },
    }
  }
</script>
<style lang="scss" scoped>
  .blacklist-page{
    .blacklist-header{
      height: 50px;
      padding-left: 15px;
      .el-breadcrumb{
        font-size: 16px;
        margin-top: 15px;
      }
    }
    .blacklist-body{
      margin-left: 15px;
      margin-right: 15px;
      .blacklist-form{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
      }
    }
    .el-dialog__body{
      span{
        display: block;
        text-align: center;
      }
    }
  }
</style>
