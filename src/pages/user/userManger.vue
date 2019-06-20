<template>
  <div class="user-page">
    <div class="user-header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path: '/userManger'}">用户管理</el-breadcrumb-item>
        <el-breadcrumb-item >用户列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="user-body">
      <el-form ref="userForm" :model="user_condition" class="user-form" :rules="userRules" label-width="80px" size="small">
        <el-form-item label="昵称" label-width="50px" prop="nickName">
          <el-input v-model="user_condition.nickName"></el-input>
        </el-form-item>
        <el-form-item label="微信号" label-width="65px" prop="wxh">
          <el-input v-model="user_condition.wxh"></el-input>
        </el-form-item>
        <el-form-item label="OPENID" label-width="75px" prop="openid">
          <el-input v-model="user_condition.openid"></el-input>
        </el-form-item>
        <el-form-item label="关注时间" label-width="78px">
          <el-col :span="11" class="startTime">
            <el-form-item prop="create_start_time">
              <el-date-picker
                type="date"
                format="yyyy-MM-dd"
                placeholder="起始时间"
                v-model="user_condition.create_start_time"
                :picker-options="pickerBeginDateBefore"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2" style="width:20px;text-align:center">至</el-col>
          <el-col :span="11" class="endTime">
            <el-form-item prop="create_end_time">
              <el-date-picker
                type="date"
                format="yyyy-MM-dd"
                placeholder="结束时间"
                v-model="user_condition.create_end_time"
                :picker-options="pickerBeginDateAfter"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="账号状态" prop="status">
          <el-select v-model="user_condition.status" placeholder="请选择账号状态">
            <el-option label="全部" value=""></el-option>
            <el-option label="正常" value="0"></el-option>
            <el-option label="黑名单" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关注状态" label-width="80px" prop="concernStatus">
          <el-select v-model="user_condition.concernStatus" placeholder="请选择关注状态">
            <el-option label="全部" value=""></el-option>
            <el-option label="已关注" value="0"></el-option>
            <el-option label="取消关注" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="性别" label-width="55px" prop="sex">
          <el-select v-model="user_condition.sex" placeholder="请选择性别">
            <el-option label="全部" value=""></el-option>
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="最近登录时间" label-width="110px">
          <el-col :span="10" class="startTime">
            <el-form-item prop="login_start_time">
              <el-date-picker
                type="date"
                format="yyyy-MM-dd"
                placeholder="起始时间"
                v-model="user_condition.login_start_time"
                :picker-options="loginBeginDateBefore"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2" style="width:20px;text-align:center">至</el-col>
          <el-col :span="10" class="endTime">
            <el-form-item prop="login_end_time">
              <el-date-picker
                type="date"
                format="yyyy-MM-dd"
                placeholder="结束时间"
                v-model="user_condition.login_end_time"
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
      <el-table :data="tableData" style="width:100%;" stripe border>
        <el-table-column label="序号" min-width="30" align="center">
          <template slot-scope="scope">
            <span>{{scope.$index+(pageNo - 1) * pageSize + 1}} </span>
          </template>
        </el-table-column>
        <el-table-column label="头像" min-width="60" align="center">
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
        <el-table-column prop="nickName" label="昵称" min-width="40" align="center"></el-table-column>
        <el-table-column prop="sex" label="性别" min-width="30" align="center"></el-table-column>
        <el-table-column prop="openid" label="OPENID" min-width="60" align="center"></el-table-column>
        <el-table-column prop="create_time" label="关注时间" min-width="60" align="center"></el-table-column>
        <el-table-column prop="login_time" label="最近登录时间" min-width="60" align="center"></el-table-column>
        <el-table-column prop="channel" label="推广渠道" min-width="60" align="center"></el-table-column>
        <el-table-column prop="status" label="账号状态" min-width="40" align="center"></el-table-column>
        <el-table-column prop="concernStatus" label="关注状态" min-width="40" align="center"></el-table-column>
        <el-table-column prop="bookMoney" label="书币" min-width="60" align="center"></el-table-column>
        <el-table-column label="操作" min-width="150" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleSearch(scope.$index, scope.row)">查看</el-button>
            <el-button size="mini" v-if="scope.row.status == '正常' ? true:false" type="danger" @click="handleDefriend(scope.$index, scope.row)">加黑</el-button>
            <el-button size="mini" v-if="scope.row.status != '正常' ? true:false" type="primary" @click="handleEnable(scope.$index, scope.row)">启用</el-button>
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
      <div class="dialog-div">
        <el-dialog title="" :visible.sync="defriendDialog" width="500px" center>
          <span style="font-size: 16px;margin-bottom: 20px;">确认将“{{tmpNickname}}”用户加黑吗？</span>
          <el-input
            type="textarea"
            :rows="3"
            resize="none"
            placeholder="请输入加黑原因，不少于5个汉字。"
            @keyup.native = "watchSize"
            v-model="reason">
          </el-input>
          <span slot="footer" class="dialog-footer">
            <el-button @click="defriendDialog = false">取 消</el-button>
            <el-button type="primary" @click="defriendDialog = false" :disabled="jhconfirm">确 认</el-button>
          </span>
        </el-dialog>
      </div>
      <div class="dialog-div">
        <el-dialog title="" :visible.sync="defriendDialog2" width="300px" center>
          <span style="font-size: 16px;margin-bottom: 0px;">确认启用“{{tmpNickname}}”用户吗？</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="defriendDialog2 = false">取 消</el-button>
            <el-button type="primary" @click="defriendDialog2 = false">确 认</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'user',
    data() {
      return {
        reason: '',
        jhconfirm: true,
        user_condition: {
          openid: '',
          wxh: '',
          nickName: '',
          concernStatus: '',
          sex: '',
          create_start_time: '',
          create_end_time: '',
          login_start_time: '',
          login_end_time: '',
          status: '',
        },
        userRules: {
          openid: '',
          wxh: '',
          nickName: '',
          concernStatus: '',
          sex: '',
          create_start_time: '',
          create_end_time: '',
          login_start_time: '',
          login_end_time: '',
          status: '',
        },
        tmpNickname:"xAx",
        id:"",
        pickerBeginDateBefore:{
          disabledDate: (time) => {
            let beginDateVal = this.user_condition.create_end_time;
            if (beginDateVal) {
              return time.getTime() > beginDateVal;
            }
          }
        },
        pickerBeginDateAfter:{
          disabledDate: (time) => {
            let beginDateVal = this.user_condition.create_start_time;
            if (beginDateVal) {
              return time.getTime() < beginDateVal;
            }
          }
        },
        loginBeginDateBefore:{
          disabledDate: (time) => {
            let beginDateVal = this.user_condition.login_end_time;
            if (beginDateVal) {
              return time.getTime() > beginDateVal;
            }
          }
        },
        loginBeginDateAfter:{
          disabledDate: (time) => {
            let beginDateVal = this.user_condition.login_start_time;
            if (beginDateVal) {
              return time.getTime() < beginDateVal;
            }
          }
        },
        tableData: [
          {id: 1,headImg:'',nickName:"nike",login_time:"2019-05-13 13:53",status:'正常',bookMoney:5000},
          {id: 2,headImg:'',nickName:"2323",login_time:"2019-05-13 13:53",status:'!正常',bookMoney:7000},
        ],
        pageNo: 1,
        pageSize: 10,
        currentPage: 1,
        totalSize: 0,
        defriendDialog:false,
        defriendDialog2:false,
      }
    },
    methods: {
      watchSize() {
        if(this.reason.length >= 5){
          this.jhconfirm = false
        }else {
          this.jhconfirm = true
        }
      },
      handleSizeChange(val) {
        this.pageSize = val
      },
      handleCurrentChange(val) {
        this.pageNo = val
      },
      handleDefriend(idx,row) {
        this.defriendDialog = true
        this.tmpNickname = row.nickName
        this.id = row.id
      },
      handleEnable(idx,row) {
        this.defriendDialog2 = true
        this.tmpNickname = row.nickName
        this.id = row.id
      },
      handleSearch(idx,row) {
        this.$router.push({
          name:'userInfo'
        })
      },
      clearData() {
        this.$refs.userForm.resetFields()
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
<style lang="scss">
  .user-page{
    .user-header{
      height: 50px;
      padding-left: 15px;
      .el-breadcrumb{
        font-size: 16px;
        margin-top: 15px;
      }
    }
    .user-body{
      margin-left: 15px;
      margin-right: 15px;
      .user-form{
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
