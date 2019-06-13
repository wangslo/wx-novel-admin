<template>
  <div class="userInfo-page">
    <div class="userInfo-header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <template v-if="this.$route.query.from == 'recharge-list'">
          <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{path: '/recharge-list'}">书币管理</el-breadcrumb-item>
          <el-breadcrumb-item :to="{path: '/recharge-list'}">充值列表</el-breadcrumb-item>
          <el-breadcrumb-item >个人详情</el-breadcrumb-item>
        </template>
        <template v-else>
          <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{path: '/userManger'}">用户管理</el-breadcrumb-item>
          <el-breadcrumb-item :to="{path: '/userManger'}">用户列表</el-breadcrumb-item>
          <el-breadcrumb-item >个人详情</el-breadcrumb-item>
        </template>

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
      <el-button type="danger" v-if="info.status == '正常' ? true:false" class="defriend-btn" size="mini" @click="handleDefriend(scope.$index, scope.row)">加黑</el-button>
      <el-button type="primary" v-if="info.status != '正常' ? true:false" class="defriend-btn" size="mini" @click="handleEnable(scope.$index, scope.row)">启用</el-button>

      <el-row style="width: 95%;margin: 0 auto;">
        <span class="item-name" style="display: block">操作记录：</span>
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
            <el-button type="info" @click="clearData">清空</el-button>
            <el-button type="primary" @click="onsubmit">查找</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="tableData" v-if="button_type == 1" style="width:100%;"
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
          <el-table-column prop="remarks" label="备注" min-width="180" align="center"></el-table-column>
        </el-table>
        <el-table :data="tableData2" v-if="button_type == 2" style="width:100%;"
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
          <el-table-column prop="remarks" label="备注" min-width="180" align="center"></el-table-column>
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
          <el-dialog title="加入黑名单" :visible.sync="defriendDialog" width="500px" center>
            <span>加入黑名单后，用户将无法在登录魅狐文学进行阅读操作。</span>
            <span>确认将“{{tmpNickname}}”加入黑名单吗？</span>
            <el-input
                    type="textarea"
                    :rows="3"
                    resize="none"
                    maxlength='100'
                    placeholder="请输入原因"
                    @keyup.native = "watchSize"
                    v-model="reason">
            </el-input>
            <p style="margin: 0;"><span style="text-align: right;">{{textSize}}/100</span></p>
            <span slot="footer" class="dialog-footer">
            <el-button @click="defriendDialog = false">取 消</el-button>
            <el-button type="primary" @click="defriendDialog = false">确 认</el-button>
          </span>
          </el-dialog>
        </div>
        <div class="dialog-div">
          <el-dialog title="" :visible.sync="defriendDialog2" width="500px" center>
            <span>确认启用“{{tmpNickname}}”用户吗？</span>

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
          incomeOrExpenses: '999',
          category: '999',
          status: '999',
          type: '999',
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
        sort_prop: 'time',
        sort_order: 'desc',
        defriendDialog:false,
        defriendDialog2:false,
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
        if(this.reason.length == 100){
          this.textSize = 100
          return false
        }else {
          this.textSize = this.reason.length
        }
      },
      handleSizeChange(val) {
        this.pageSize = val
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.pageNo = val
        console.log(`当前页: ${val}`);
      },
      handleDefriend(idx,row) {
        this.defriendDialog = true
        this.tmpNickname = row.nickName
        console.log(row)
      },
      handleEnable(idx,row) {
        this.defriendDialog2 = true
        this.tmpNickname = row.nickName
        console.log(row)
      },
      handleSearch(idx,row) {
        this.$router.push({
          name:'userInfo'
        })
      },
      clearData() {
        this.$refs.userForm.resetFields()
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
  .operat-reason{
    float: left;
    margin-left: 50px;
    span{
      display: block;
      margin: 10px 0;
    }
  }
</style>
