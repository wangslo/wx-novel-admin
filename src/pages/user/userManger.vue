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
        <el-form-item label="微信号" label-width="65px" prop="wxh" v-if="false">
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
                value-format="yyyy-MM-dd HH:mm:ss"
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
                value-format="yyyy-MM-dd 23:59:59"
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
            <el-option label="全部" value="-1"></el-option>
            <el-option label="正常" value="0"></el-option>
            <el-option label="黑名单" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关注状态" label-width="80px" prop="concernStatus">
          <el-select v-model="user_condition.concernStatus" placeholder="请选择关注状态">
            <el-option label="全部" value="-1"></el-option>
            <el-option label="取消关注" value="0"></el-option>
            <el-option label="已关注" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="性别" label-width="55px" prop="sex">
          <el-select v-model="user_condition.sex" placeholder="请选择性别">
            <el-option label="全部" value="-1"></el-option>
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="最近登录时间" label-width="110px">
          <el-col :span="10" class="startTime">
            <el-form-item prop="login_start_time">
              <el-date-picker
                type="date"
                value-format="yyyy-MM-dd HH:mm:ss"
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
                value-format="yyyy-MM-dd 23:59:59"
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
        <el-table-column label="头像" min-width="30" align="center">
          <template slot-scope="scope">
            <el-popover
              placement="right"
              title=""
              trigger="hover">
              <img :src="scope.row.headerImg?scope.row.headerImg:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1222929928,1326821480&fm=26&gp=0.jpg'"/>
              <img slot="reference" :src="scope.row.headerImg?scope.row.headerImg:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1222929928,1326821480&fm=26&gp=0.jpg'" style="max-height: 20px;max-width: 20px">
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="nickName" label="昵称" min-width="60" align="center"></el-table-column>
        <el-table-column prop="sex" label="性别" min-width="30" align="center"></el-table-column>
        <el-table-column prop="openid" label="OPENID" min-width="100" align="center"></el-table-column>
        <el-table-column prop="create_time" label="关注时间" min-width="60" align="center"></el-table-column>
        <el-table-column prop="login_time" label="最近登录时间" min-width="60" align="center"></el-table-column>
        <el-table-column prop="channel" label="推广渠道" min-width="60" align="center"></el-table-column>
        <el-table-column prop="status" label="账号状态" min-width="40" align="center"></el-table-column>
        <el-table-column prop="concernStatus" label="关注状态" min-width="40" align="center"></el-table-column>
        <el-table-column prop="bookMoney" label="书币" min-width="40" align="center"></el-table-column>
        <el-table-column label="操作" min-width="100" align="center">
          <template slot-scope="scope">
            <el-button size="mini" v-if="scope.row.status == '正常' ? true:false" type="danger" @click="handleDefriend(scope.$index, scope.row)">加黑</el-button>
            <el-button size="mini" v-if="scope.row.status != '正常' ? true:false" type="primary" @click="handleEnable(scope.$index, scope.row)">启用</el-button>
            <el-button size="mini" @click="handleSearch(scope.$index, scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5,10, 20, 50, 100]"
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
            <el-button type="primary" @click="confirmStatus(1)" :disabled="jhconfirm">确 认</el-button>
          </span>
        </el-dialog>
      </div>
      <div class="dialog-div">
        <el-dialog title="" :visible.sync="defriendDialog2" width="300px" center>
          <span style="font-size: 16px;margin-bottom: 0px;">确认启用“{{tmpNickname}}”用户吗？</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="defriendDialog2 = false">取 消</el-button>
            <el-button type="primary" @click="confirmStatus(2)">确 认</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
  import {orgModuleApi,msgModuleApi} from '../../api/main'

  export default {
    name: 'user',
    data() {
      return {
        reason: '',
        jhconfirm: true,
        user_condition: {
          openid: '',
          nickName: '',
          concernStatus: "-1",
          sex: "-1",
          create_start_time: '',
          create_end_time: '',
          login_start_time: '',
          login_end_time: '',
          status: "-1",
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
        tmpRow:{},
        id:"",
        pickerBeginDateBefore:{
          disabledDate: (time) => {
            let beginDateVal = this.user_condition.create_end_time;
            if (beginDateVal) {
              return time.getTime() > new Date(beginDateVal).getTime();
            }
          }
        },
        pickerBeginDateAfter:{
          disabledDate: (time) => {
            let beginDateVal = this.user_condition.create_start_time;
            if (beginDateVal) {
              return time.getTime() < new Date(beginDateVal).getTime();
            }
          }
        },
        loginBeginDateBefore:{
          disabledDate: (time) => {
            let beginDateVal = this.user_condition.login_end_time;
            if (beginDateVal) {
              return time.getTime() > new Date(beginDateVal).getTime();
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
          {id: 2,headImg:'',nickName:"2323",login_time:"2019-05-13 13:53",status:'!正常',bookMoney:7000},
        ],
        pageNo: 1,
        pageSize: 5,
        currentPage: 1,
        totalSize: 0,
        defriendDialog:false,
        defriendDialog2:false,
      }
    },
    created() {
      this.onsubmit()
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
        this.onsubmit()
      },
      handleCurrentChange(val) {
        this.pageNo = val
        this.onsubmit()
      },
      handleDefriend(idx,row) {
        this.tmpRow = row
        this.defriendDialog = true
        this.tmpNickname = row.nickName
        this.id = row.id
      },
      handleEnable(idx,row) {
        this.defriendDialog2 = true
        this.tmpNickname = row.nickName
        this.id = row.id
        this.tmpRow = row
      },
      handleSearch(idx,row) {
        this.$router.push({
          name:'userInfo',
          query: {
            openid: row.openid
          }
        })
      },
      clearData() {
        this.$refs.userForm.resetFields()
        this.pageNo = 1;
        this.onsubmit();
      },
      confirmStatus(num){
        let black = 1
        if(num == 1){
          black = 1
        }else{
          black = 0
        }

        var params = {
          appid: this.tmpRow.appid,
          openid: this.tmpRow.openid,
          black: black,
          reason: this.reason,
        }
        console.log(params)
        orgModuleApi.userUpdateStatus(params).then(res=>{
          console.log(res)
          if(res.success){
            this.$message.success('成功')
            if(black){
              this.defriendDialog = false
            }else{
              this.defriendDialog2 = false
            }
            this.onsubmit()
          }
        })


      },
      onsubmit() {
        this.loading = true
        var params = {
          nickName: this.user_condition.nickName,
          openid: this.user_condition.openid,
          subscribed: this.user_condition.concernStatus,
          sex: this.user_condition.sex,
          subDate_s: this.user_condition.create_start_time,
          subDate_e: this.user_condition.create_end_time,
          lastLoginDate_s: this.user_condition.login_start_time,
          lastLoginDate_e: this.user_condition.login_end_time,
          black: this.user_condition.status,
          page: this.pageNo ,
          size: this.pageSize,
        }
        console.log(params)
        orgModuleApi.userManagerList(params).then(res=>{
          console.log(res)
//          this.$message.success('成功')
          this.tableData = []
          res.data.data.map((item,index) => {
            this.tableData.push({
              appid: item.appid,
              headerImg: item.uicon,
              openid: item.openid,
              nickName: item.nickName,
              channelid: item.qid,
              channel: item.qname?item.qname:"-",
              sex: item.sex>1?'女':(item.sex>0?'男':"-"),
              create_time: this.common.getDate(item.subDate),
              login_time:this.common.getDate(item.lastLoginDate),
              status: item.black ? '黑名单':"正常",
              concernStatus: item.subscribed ? '已关注':'取消关注',
              bookMoney:item.coin,
            })
          })
          this.totalSize = parseInt(res.data.total)
        })

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
