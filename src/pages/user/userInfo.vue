<template>
  <div class="userInfo-page">
    <div class="userInfo-header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path: '/userManger'}">用户管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path: '/userManger'}">用户列表</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path: '/blacklist'}" v-if="this.$route.query.from == 'black'">黑名单</el-breadcrumb-item>
        <el-breadcrumb-item >用户详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="userInfo-body">
      <div class="user-infos-box">
        <div class="user-infos-item">
          <span class="item-name head-img-title">头像：</span>
          <div class="head-img-url">
            <img :src="info.headerImg?info.headerImg:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1222929928,1326821480&fm=26&gp=0.jpg'"/>
          </div>
        </div>
        <div class="user-infos-item">
          <span class="item-name">昵称：</span>
          <span class="item-value">{{info.nickName}}</span>
        </div>
        <div class="user-infos-item">
          <span class="item-name">性别：</span>
          <span class="item-value">{{info.sex}}</span>
        </div>
        <div class="user-infos-item">
          <span class="item-name">账号状态：</span>
          <span class="item-value">{{info.status}}</span>
        </div>
        <div class="user-infos-item">
          <span class="item-name">书币：</span>
          <span class="item-value">{{info.bookMoney}}</span>
        </div>
        <div class="user-infos-item">
          <span class="item-name">OPENID：</span>
          <span class="item-value">{{info.openid}}</span>
        </div>
        <div class="user-infos-item">
          <span class="item-name">注册时间：</span>
          <span class="item-value">{{info.registerTime}}</span>
        </div>
        <div class="user-infos-item">
          <span class="item-name">关注时间：</span>
          <span class="item-value">{{info.subTime}}</span>
        </div>
        <div class="user-infos-item">
          <span class="item-name">最近登录时间：</span>
          <span class="item-value">{{info.loginTime}}</span>
        </div>
        <div class="user-infos-item">
          <span class="item-name">推广渠道：</span>
          <span class="item-value">{{info.qidName}}</span>
        </div>
        <div class="user-infos-item">
          <span class="item-name">关注状态：</span>
          <span class="item-value">{{info.subStatus}}</span>
        </div>
        <div class="user-infos-item" v-if="info.reason">
          <span class="item-name">加黑原因：</span>
          <span class="item-value">{{info.reason}}</span>
        </div>
      </div>
      <el-button type="danger" v-if="info.status == '正常' ? true:false" class="defriend-btn" size="mini" @click="handleDefriend">加黑</el-button>
      <el-button type="primary" v-if="info.status != '正常' ? true:false" class="defriend-btn" size="mini" @click="handleEnable">启用</el-button>

      <el-row style="width: 95%;margin: 0 auto;">
        <span class="item-name" style="display: block;float: left;color: #999999;font-size: 14px;">操作记录：</span>
        <div class="operat-reason">
          <template v-for="operationRecord in operationRecords">
            <span class="item-value">{{operationRecord}}</span>
          </template>
        </div>
      </el-row><br />

      <el-row style="width: 95%;margin: 0 auto;">
        <el-button-group >
          <el-button :type="button_type == 1 ? 'primary':''" size="mini" style="width: 70px" @click="reds(1)">消费</el-button>
          <el-button :type="button_type == 2 ? 'primary':''" size="mini" style="width: 70px" @click="reds(2)">充值</el-button>
        </el-button-group>
      </el-row><br />
      <div class="userInfo-book-currency">
        <el-form ref="bookCurrencyForm" :model="bookCurrency_condition" class="book-currency-form" label-width="50px" size="small">
          <el-form-item label="时间">
            <el-col :span="11" class="startTime">
              <el-form-item>
                <el-date-picker
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="起始时间"
                  v-model="bookCurrency_condition.start_time"
                  :picker-options="pickerBeginDateBefore"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2" style="width:20px;text-align:center">至</el-col>
            <el-col :span="11" class="endTime">
              <el-form-item>
                <el-date-picker
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd 23:59:59"
                  placeholder="结束时间"
                  v-model="bookCurrency_condition.end_time"
                  :picker-options="pickerBeginDateAfter"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="流水号/订单号" label-width="100px">
            <el-input v-model="bookCurrency_condition.serialnum"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="bookCurrency_condition.status" placeholder="请选择状态">
              <el-option label="全部" value="-1"></el-option>
              <el-option label="成功" value="1"></el-option>
              <el-option label="失败" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="info" @click="clearData">清空</el-button>
            <el-button type="primary" @click="onsubmit">查找</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="tableData" v-if="button_type == 1" style="width:100%;" stripe border>
          <el-table-column label="序号" min-width="30" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index+(pageNo - 1) * pageSize + 1}} </span>
            </template>
          </el-table-column>
          <el-table-column prop="time" label="时间" min-width="40" align="center"></el-table-column>
          <el-table-column prop="projectName" label="项目" min-width="60" align="center"></el-table-column>
          <el-table-column prop="incomeOrExpenses" label="支出" min-width="40" align="center"></el-table-column>
          <el-table-column prop="status" label="状态" min-width="40" align="center"></el-table-column>
          <el-table-column prop="serialnum" label="流水号" min-width="60" align="center"></el-table-column>
        </el-table>
        <el-table :data="tableData2" v-if="button_type == 2" style="width:100%;" stripe border>
          <el-table-column label="序号" min-width="30" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index+(pageNo - 1) * pageSize + 1}} </span>
            </template>
          </el-table-column>
          <el-table-column prop="time" label="时间" min-width="40" align="center"></el-table-column>
          <el-table-column prop="projectName" label="项目" min-width="40" align="center"></el-table-column>
          <el-table-column prop="recharge" label="充值金额" min-width="40" align="center"></el-table-column>
          <el-table-column prop="bookmoney" label="书币" min-width="40" align="center"></el-table-column>
          <el-table-column prop="sendmoney" label="赠送金额" min-width="40" align="center"></el-table-column>
          <el-table-column prop="status" label="状态" min-width="40" align="center"></el-table-column>
          <el-table-column prop="ordernum" label="订单号" min-width="60" align="center"></el-table-column>
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
          <el-dialog title="" :visible.sync="defriendDialog" width="500px" center>
            <span style="font-size: 16px;margin-bottom: 20px;">确认将“{{info.nickName}}”用户加黑吗？</span>
            <el-input
              type="textarea"
              :rows="3"
              resize="none"
              maxlength='50'
              placeholder="请输入加黑原因，不少于5个汉字。"
              @keyup.native = "watchSize"
              v-model="reason">
            </el-input>
            <p style="margin: 0;"><span style="text-align: right;">{{textSize}}/50</span></p>
            <span slot="footer" class="dialog-footer">
              <el-button @click="defriendDialog = false">取 消</el-button>
              <el-button type="primary" @click="confirmStatus(1)" :disabled="jhconfirm">确 认</el-button>
            </span>
          </el-dialog>
        </div>
        <div class="dialog-div">
          <el-dialog title="" :visible.sync="defriendDialog2" width="300px" center>
            <span style="font-size: 16px;margin-bottom: 0px;">确认启用“{{info.nickName}}”用户吗？</span>
            <span slot="footer" class="dialog-footer">
            <el-button @click="defriendDialog2 = false">取 消</el-button>
            <el-button type="primary" @click="confirmStatus(2)">确 认</el-button>
          </span>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {orgModuleApi,msgModuleApi} from '../../api/main'
  export default {
    name: 'userInfo',
    data() {
      return {
        button_type:1,
        bookCurrency_condition: {
          start_time: '',
          end_time: '',
          serialnum: '',
          status: '-1',
        },
        info : {
          headerImg:'-',
          nickName:'-',
          openid:'-',
          sex:'-',
          status:"-",
          bookMoney:'-',
          subTime:'-',
          loginTime:'-',
          qidName:'-',
          subStatus:'-',
          reason:'-',
          appId:this.common.appid,
        },
        pickerBeginDateBefore:{
          disabledDate: (time) => {
            let beginDateVal = this.bookCurrency_condition.end_time;
            if (beginDateVal) {
              return time.getTime() > new Date(beginDateVal).getTime();
            }
          }
        },
        pickerBeginDateAfter:{
          disabledDate: (time) => {
            let beginDateVal = this.bookCurrency_condition.start_time;
            if (beginDateVal) {
              return time.getTime() < new Date(beginDateVal).getTime();
            }
          }
        },
        tableData: [],
        tableData2: [],
        operationRecords:[],
        pageNo: 1,
        pageSize: 5,
        currentPage: 1,
        totalSize: 0,
        defriendDialog:false,
        defriendDialog2:false,
        jhconfirm:true,
        reason:'',
        textSize: 0,
      }
    },
    created:function(){
      this.info.openid = this.$route.query.openid
      this.userDetail()
      this.onsubmit()
    },
    methods: {
      confirmStatus(num){
        let black = 1
        if(num == 1){
          black = 1
        }else{
          black = 0
        }
        var _this = this
        var params = {
          appid:this.common.appid,
          openid: this.info.openid,
          black: black,
          reason: this.reason,
        }
        orgModuleApi.userUpdateStatus(params).then(res=>{
          if(res.success){
            this.$message.success('成功')
            if(black){
              _this.defriendDialog = false
              _this.userDetail()
            }else{
              _this.defriendDialog2 = false
              _this.userDetail()
            }
            _this.onsubmit()
          }
        })
      },
      userDetail() {
        var _this = this
        var params = {
          appid:this.common.appid,
          openid: this.info.openid,
        }
        console.log(params)
        orgModuleApi.userManagerDetail(params).then(res=>{
          if(res.success){
            let detail = res.data.userDetail
            _this.info = {
              headerImg: detail.uicon,
              nickName: detail.nickName,
              openid: detail.openid,
              sex: detail.sex>1?'女':(detail.sex>0?'男':"-"),
              status: detail.black ? '黑名单':"正常",
              bookMoney: detail.coin,
              registerTime: this.common.getDate(detail.registerDate),
              subTime: this.common.getDate(detail.subDate),
              loginTime: this.common.getDate(detail.lastLoginDate),
              qidName: detail.qname,
              qid: detail.qid,
              subStatus: detail.subscribed ? '已关注':'取消关注',
              reason: detail.blackReason,
              appId: detail.appid,
            }
            _this.operationRecords = res.data.operate
          }else{
            this.$message.error('服务器异常')
          }

        })
      },
      reds:function(index){
        this.button_type = index;
        this.onsubmit()
      },
      watchSize() {
        if (this.reason.length == 50) {
          this.textSize = 50
          return false
        } else {
          if(this.reason.length >= 5){
            this.jhconfirm = false
          }else {
            this.jhconfirm = true
          }
          this.textSize = this.reason.length
        }
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.onsubmit(1)
      },
      handleCurrentChange(val) {
        this.pageNo = val
        this.onsubmit(1)
      },
      handleDefriend(idx,row) {
        this.defriendDialog = true
      },
      handleEnable(idx,row) {
        this.defriendDialog2 = true
      },
      clearData() {
        this.bookCurrency_condition = {
          start_time: '',
          end_time: '',
          serialnum: '',
          status: '-1',
        }
      },
      onsubmit(type) {
        var _this = this
        if(type != 1){
          this.pageNo = 1
          this.currentPage = 1
          this.totalSize = 0
        }
        let params = {
          appid: this.common.appid,
          openid: this.info.openid,
          type: this.button_type,
          startDate: this.bookCurrency_condition.start_time,
          endDate: this.bookCurrency_condition.end_time,
          status: this.bookCurrency_condition.status,
          serialNum: this.bookCurrency_condition.serialnum,
          page: this.pageNo,
          size: this.pageSize,
        }
        orgModuleApi.payOrPurchaseList(params).then(res=>{
          if(res.success){
            if(_this.button_type == 1){
              _this.tableData = []
              res.data.data.map((item,index) => {
                _this.tableData.push({
                  time: _this.common.getDate(item.payDate),
                  projectName: item.bookName + ' ' + item.cOrder + ' ' + item.chapterName,
                  incomeOrExpenses: item.coin,
                  status: item.status?'成功':'失败',
                  serialnum: item.id,
                })
              })
            }else {
              _this.tableData2 = []
              res.data.data.map((item,index) => {
                _this.tableData2.push({
                  time: _this.common.getDate(item.createDate),
                  projectName: '充值',
                  recharge: item.amount,
                  bookmoney: item.coin,
                  sendmoney: item.addition,
                  status: item.status == 2 ? '成功':'失败',
                  ordernum: item.orderno,
                })
              })
            }
            this.totalSize = parseInt(res.data.total)
          }
        })

      },
    }
  }
</script>
<style lang="scss">
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
            color: #999999;
            font-size: 14px;
          }
          .item-value{
            color: #333333;
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
        margin-bottom: 20px;
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
  .operat-reason{
    float: left;
    display: flex;
    flex-direction: column;
    max-height: 96px;
    overflow: auto;
    span{
      margin-bottom: 0px;
      color: #333333;
      font-weight: 600;
      font-size: 14px;
    }
  }
</style>
