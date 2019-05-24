<template>
    <div class="rechargelist-page">
        <div class="rechargelist-header">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
                <el-breadcrumb-item >书币管理</el-breadcrumb-item>
                <el-breadcrumb-item >充值列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="rechargelist-body">
            <el-form ref="userForm" :model="form_condition" class="rechargelist-form" :rules="userRules" label-width="80px" size="small">
                <el-form-item label="账号(OPENID)" prop="openId" label-width="130px">
                    <el-input v-model="form_condition.openId"></el-input>
                </el-form-item>
                <el-form-item v-if="false" label="昵称" prop="nickName" label-width="60px" >
                    <el-input v-model="form_condition.nickName"></el-input>
                </el-form-item>
                <el-form-item label="订单号" prop="orderNum" label-width="60px">
                    <el-input v-model="form_condition.orderNum"></el-input>
                </el-form-item>
                <el-form-item label="充值时间">
                    <el-col :span="10" class="startTime">
                        <el-form-item  prop="create_start_time">
                            <el-date-picker
                                    type="datetime"
                                    placeholder="起始时间"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    v-model="form_condition.create_start_time"
                                    :picker-options="pickerBeginDateBefore"
                                    style="width: 100%;"
                            ></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col class="line" style="width:20px;text-align:center">至</el-col>
                    <el-col :span="10" class="endTime">
                        <el-form-item prop="create_end_time">
                            <el-date-picker
                                    type="datetime"
                                    format="yyyy-MM-dd HH:mm:ss"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    placeholder="结束时间"
                                    v-model="form_condition.create_end_time"
                                    :picker-options="pickerBeginDateAfter"
                                    style="width: 100%;"
                            ></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="支付状态" prop="status">
                    <el-select v-model="form_condition.status" placeholder="请选择">
                        <el-option label="待支付" value="0"></el-option>
                        <el-option label="支付成功未发货" value="1"></el-option>
                        <el-option label="支付成功已发货" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item style="float: right;">
                    <el-button @click="clearData">清空</el-button>
                    <el-button type="primary" @click="onsubmit">查找</el-button>
                </el-form-item>
            </el-form>

            <br/>
            <el-row style="width: 98%;margin: 0 auto;font-size: 16px;color:green">
                <span>当前页面数据：共{{dataNum}}条；待支付{{toPaidNum}}条，共计{{toPaid}}元；支付成功{{paidNum}}条，共计{{paid}}元</span>
            </el-row><br />
            <el-table :data="tableData" style="width:100%;"
                      :default-sort = "{prop: 'createTime', order: 'descending'}"
                      stripe border
                      @sort-change='sortChange'>
                <el-table-column label="序号" width="50" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.$index+(pageNo) * pageSize + 1}} </span>
                    </template>
                </el-table-column>
                <!--<el-table-column label="头像" width="180" align="center">-->
                <!--<template slot-scope="scope">-->
                <!--<el-popover-->
                <!--placement="right"-->
                <!--title=""-->
                <!--trigger="hover">-->
                <!--<img :src="headerImg?headerImg:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1222929928,1326821480&fm=26&gp=0.jpg'"/>-->
                <!--<img slot="reference" :src="headerImg?headerImg:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1222929928,1326821480&fm=26&gp=0.jpg'" style="max-height: 20px;max-width: 20px">-->
                <!--</el-popover>-->
                <!--</template>-->
                <!--</el-table-column>-->
                <el-table-column prop="openId" label="账号(OPENID)" width="280" align="center"></el-table-column>
                <el-table-column  v-if="false"  label="昵称" width="150" align="center">
                    <template slot-scope="scope">
                        <span @click="userDetail(scope.$index, scope.row)" style="color: #19a05e">{{scope.row.nickName}}</span>
                    </template>
                </el-table-column>
                <el-table-column v-if="false" prop="channel" label="渠道" width="180" align="center"></el-table-column>
                <el-table-column v-if="false" prop="bookName" label="充值书籍" width="180" align="center"></el-table-column>
                <el-table-column prop="orderType" label="充值类型" width="180" align="center"></el-table-column>
                <el-table-column prop="orderNum" label="订单号" min-width="300" align="center"></el-table-column>
                <el-table-column prop="rechargeAmount" label="充值金额" width="80" align="center"></el-table-column>
                <el-table-column sortable='custom' :sort-orders="['ascending', 'descending']"
                                 prop="createTime" label="充值时间" width="180" align="center"></el-table-column>
                <el-table-column prop="status" label="支付状态" width="180" align="center"></el-table-column>
                <el-table-column v-if="false" label="操作" width="3" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleSearch(scope.$index, scope.row)">查看</el-button>
                        <el-button size="mini" type="warning" @click="handleDefriend(scope.$index, scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10,20, 50, 100]"
                    background
                    :page-size="10"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalSize">
            </el-pagination>
            <div class="dialog-div">
                <el-dialog title="加入黑名单" :visible.sync="defriendDialog" width="500px" center>
                    <span>加入黑名单后，用户将无法在登录魅狐文学进行阅读操作。</span>
                    <span>确认将“XXXXX”加入黑名单吗？</span>
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
        </div>
    </div>
</template>
<script>
  import {orgModuleApi} from '../../api/main'
  export default {
    name: 'recharge-list',
    data() {
      return {
        reason: '',
        textSize: 0,
        form_condition: {
          openId: '',
          nickName: '',
          orderNum: '',
          create_start_time: '',
          create_end_time: '',
          status: '',
        },
        userRules: {
          openId: '',
          nickName: '',
          orderNum: '',
          create_start_time: '',
          create_end_time: '',
          status: '',
        },
        pickerBeginDateBefore:{
          disabledDate: (time) => {
            let beginDateVal = this.form_condition.create_end_time;
            if (beginDateVal) {
              return time.getTime() > beginDateVal;
            }
          }
        },
        pickerBeginDateAfter:{
          disabledDate: (time) => {
            let beginDateVal = this.form_condition.create_start_time;
            if (beginDateVal) {
              return time.getTime() < beginDateVal;
            }
          }
        },
        loginBeginDateBefore:{
          disabledDate: (time) => {
            let beginDateVal = this.form_condition.login_end_time;
            if (beginDateVal) {
              return time.getTime() > beginDateVal;
            }
          }
        },
        loginBeginDateAfter:{
          disabledDate: (time) => {
            let beginDateVal = this.form_condition.login_start_time;
            if (beginDateVal) {
              return time.getTime() < beginDateVal;
            }
          }
        },
        tableData: [
          {
            openId:'openid-123',
            nickName:'nick34',
            channel:'channel23',
            bookName:'鬼吹灯1',
            orderNum:'adfadfad22312sdfdfasd',
            rechargeAmount:30,
            createTime:'2019-5-14 11:50:23',
            status:'支付成功'
          },
        ],
        pageNo: 0,
        pageSize: 10,
        currentPage: 1,
        totalSize: 0,
        defriendDialog:false,
      }
    },
    created(){
    },
    mounted() {
      this.getOrderList()
    },
    computed:{
      dataNum:function(){
          return this.tableData.length
      },
      toPaidNum:function(){
        var num = 0;
        for(var i=0,len = this.tableData.length; i<len; i++ ){
          if(this.tableData[i].status != '支付成功'){
            num = num + 1
          }
        }
        return num
      },
      toPaid:function(){
        var num = 0;
        for(var i=0,len = this.tableData.length; i<len; i++ ){
          if(this.tableData[i].status != '支付成功'){
            num = num + this.tableData[i].rechargeAmount
          }
        }
        return num
      },
      paidNum:function(){
        var num = 0;
        for(var i=0,len = this.tableData.length; i<len; i++ ){
          if(this.tableData[i].status == '支付成功'){
            num = num + 1
          }
        }
        return num
      },
      paid:function(){
        var num = 0;
        for(var i=0,len = this.tableData.length; i<len; i++ ){
          if(this.tableData[i].status == '支付成功'){
            num = num + this.tableData[i].rechargeAmount
          }
        }
        return num
      },

    },
    methods: {
      getOrderList(){
        let endDate = new Date(+new Date()+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')

        let create_start_time = this.form_condition.create_start_time
        let create_end_time = this.form_condition.create_end_time

        if(create_end_time == ''){
          create_end_time = endDate
        }
        if(create_start_time == ''){
          create_start_time = '2019-3-23 17:56:00'
        }
        var params = {
          page: this.pageNo,
          size: this.pageSize,
          appid: this.common.appid,
          openid:this.form_condition.openId,
          orderno:this.form_condition.orderNum,
          createDate_s: create_start_time,
          createDate_e: create_end_time,
          status:this.form_condition.status,
        }
        console.log(this.form_condition.createDate_s)
        console.log(this.form_condition.createDate_e)
        var _this = this
        _this.tableData = []
        orgModuleApi.orderList(params).then((res)=>{
          console.log(res)
          if(res.success){
            res.data.data.map((item,index)=>{
              _this.tableData.push({
                id: item.id,
                openId:item.openid,
                orderNum:item.orderno,
                orderType:item.type>0?(item.type > 1?'包半年':'包一年'):'普通充值',
                nickName:'nick678',
                channel:'channe678',
                bookName:'鬼吹灯2',
                rechargeAmount:item.amount,
                createTime:_this.common.getDate(item.createDate),
                status:item.status > 0 ?'支付成功':'待支付',
              })
            })
            _this.totalSize = parseInt(res.data.total)
          }


        })


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
        this.getOrderList()
      },
      handleCurrentChange(val) {
        this.pageNo = val -1
        this.getOrderList()
      },
      handleDefriend(idx,row) {
        this.defriendDialog = true
        console.log(row)
      },
      handleSearch(idx,row) {
        this.$router.push({
          name:'userInfo'
        })
      },
      userDetail(idx,row) {
        this.$router.push({
          name:'userInfo',
          query:{
            openid:row.openId,
            from:'recharge-list',
          }
        })
      },
      clearData() {
        console.log('clearData')
        this.$refs.userForm.resetFields()
      },
      sortChange: function(column, prop, order) {
        console.log(column.prop + '-' + column.order)
      },
      onsubmit() {
        this.getOrderList()
      },
    }
  }
</script>
<style lang="scss" scoped>
    .rechargelist-page{
        .rechargelist-header{
            height: 50px;
            padding-left: 15px;
            .el-breadcrumb{
                font-size: 16px;
                margin-top: 15px;
            }
        }
        .rechargelist-body{
            margin-left: 15px;
            margin-right: 15px;
            .rechargelist-form{
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
