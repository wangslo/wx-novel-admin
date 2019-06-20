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
          <span class="item-value">{{nickName}}</span>
        </div>
        <div class="user-infos-item">
          <span class="item-name">性别：</span>
          <span class="item-value">{{sex}}</span>
        </div>
        <div class="user-infos-item">
          <span class="item-name">账号状态：</span>
          <span class="item-value">{{status}}</span>
        </div>
        <div class="user-infos-item">
          <span class="item-name">书币：</span>
          <span class="item-value">{{bookMoney}}</span>
        </div>
        <div class="user-infos-item">
          <span class="item-name">OPENID：</span>
          <span class="item-value">{{openid}}</span>
        </div>
        <div class="user-infos-item">
          <span class="item-name">关注时间：</span>
          <span class="item-value">{{}}</span>
        </div>
        <div class="user-infos-item">
          <span class="item-name">最近登录时间：</span>
          <span class="item-value">{{}}</span>
        </div>
        <div class="user-infos-item">
          <span class="item-name">推广渠道：</span>
          <span class="item-value">{{}}</span>
        </div>
        <div class="user-infos-item">
          <span class="item-name">关注状态：</span>
          <span class="item-value">{{}}</span>
        </div>
        <div class="user-infos-item">
          <span class="item-name">加黑原因：</span>
          <span class="item-value">{{}}</span>
        </div>
      </div>
      <el-button type="danger" v-if="info.status == '正常' ? true:false" class="defriend-btn" size="mini" @click="handleDefriend(scope.$index, scope.row)">加黑</el-button>
      <el-button type="primary" v-if="info.status != '正常' ? true:false" class="defriend-btn" size="mini" @click="handleEnable(scope.$index, scope.row)">启用</el-button>

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
              <el-option label="全部" value=""></el-option>
              <el-option label="成功" value="0"></el-option>
              <el-option label="失败" value="1"></el-option>
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
          :page-sizes="[10,20, 50, 100]"
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
  </div>
</template>
<script>
  export default {
    name: 'userInfo',
    data() {
      return {
        button_type:1,
        bookCurrency_condition: {
          start_time: '',
          end_time: '',
          serialnum: '',
          status: '',
        },
        info : {
          headerImg:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1222929928,1326821480&fm=26&gp=0.jp',
          nickName:'nick',
          sex:'男',
          status:"33正常",
          wechatType:'服务号',
          authorizationStatus:'授权成功',
          company:'上海嵩恒网络科技有限股份公司',
          createAdmin:'Tom',
          createTime:'2019-05-13 11:47',
          originId:'12345',
          appId:this.common.appid,
          authorizationAuthority:"首页、用户管理、推荐管理",
          qrcode:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1222929928,1326821480&fm=26&gp=0.jpg'
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
        tableData: [
          {time:'2019-05-13 14:39',projectName:'线下狐仙 第四十二章 不一样的世界',status:'成功'},
          {time:'2019-05-13 14:49',projectName:'线下狐仙 第四十三章 一样的life',status:'成功'},
        ],
        tableData2: [
          {time:'2019-05-13 14:39',projectName:'充值',status:'成功'},
          {time:'2019-05-13 14:49',projectName:'充值',status:'成功'},
        ],
        operationRecords:[
          'xxxxx-xxxxxx-xxxxxxx xxxxxxx 操作加黑用户，原因：xxx',
          'xxxxx-xxxxxx-xxxxxxx xxxxxxx 操作加黑用户，原因：xxx',
        ],
        pageNo: 1,
        pageSize: 10,
        currentPage: 1,
        totalSize: 0,
        defriendDialog:false,
        defriendDialog2:false,
        jhconfirm:true,
      }
    },
    created:function(){
      console.log("openid:"+this.$route.query.openid)
    },
    methods: {
      reds:function(index){
        this.button_type = index;
      },
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
      },
      handleEnable(idx,row) {
        this.defriendDialog2 = true
        this.tmpNickname = row.nickName
      },
      clearData() {
        this.bookCurrency_condition = {
          start_time: '',
          end_time: '',
          serialnum: '',
          status: '',
        }
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
