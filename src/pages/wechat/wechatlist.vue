<template>
    <div class="wechatlist-page">
        <div class="wechatlist-header">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
                <el-breadcrumb-item >公众号管理</el-breadcrumb-item>
                <el-breadcrumb-item >公众号列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="wechatlist-body">
            <el-form ref="userForm" :model="wechatlist_condition" class="wechatlist-form" :rules="userRules" label-width="80px" size="small">
                <el-form-item label="公众号ID" label-width="90px" prop="wechatId">
                    <el-input v-model="wechatlist_condition.wechatId"></el-input>
                    <!--<el-select v-model="wechatlist_condition.wechatId" placeholder="请选择">-->
                        <!--<el-option label="全部" value="999"></el-option>-->
                        <!--<el-option label="adsfasd" value="0"></el-option>-->
                        <!--<el-option label="dfdfd" value="1"></el-option>-->
                        <!--<el-option label="erew" value="2"></el-option>-->
                    <!--</el-select>-->
                </el-form-item>
                <el-form-item label="公众号名称" label-width="90px" prop="wechatName">
                    <el-input v-model="wechatlist_condition.wechatName"></el-input>
                    <!--<el-select v-model="wechatlist_condition.wechatName" placeholder="请选择">-->
                        <!--<el-option label="全部" value="999"></el-option>-->
                        <!--<el-option label="A" value="0"></el-option>-->
                        <!--<el-option label="B" value="1"></el-option>-->
                        <!--<el-option label="C" value="2"></el-option>-->
                    <!--</el-select>-->
                </el-form-item>
                <el-form-item label="创建人" label-width="100px">
                    <el-input v-model="wechatlist_condition.createAdmin"></el-input>
                </el-form-item>
                <el-form-item label="创建时间" label-width="80px">
                    <el-col :span="10" class="startTime">
                        <el-form-item prop="create_start_time">
                            <el-date-picker
                                    type="date"
                                    format="yyyy-MM-dd"
                                    value-format="yyyy-MM-dd"
                                    placeholder="起始时间"
                                    v-model="wechatlist_condition.create_start_time"
                                    :picker-options="pickerBeginDateBefore"
                                    style="width: 100%;"
                            ></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col class="line" :span="2" style="width:20px;text-align:center">至</el-col>
                    <el-col :span="10" class="endTime">
                        <el-form-item prop="create_end_time">
                            <el-date-picker
                                    type="date"
                                    format="yyyy-MM-dd"
                                    value-format="yyyy-MM-dd"
                                    placeholder="结束时间"
                                    v-model="wechatlist_condition.create_end_time"
                                    :picker-options="pickerBeginDateAfter"
                                    style="width: 100%;"
                            ></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item v-if="false" label="创建时间" label-width="110px">
                    <el-col :span="10" class="startTime">
                        <el-form-item prop="login_start_time">
                            <el-date-picker
                                    type="date"
                                    format="yyyy-MM-dd"
                                    value-format="yyyy-MM-dd"
                                    placeholder="起始时间"
                                    v-model="wechatlist_condition.login_start_time"
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
                                    v-model="wechatlist_condition.login_end_time"
                                    :picker-options="loginBeginDateAfter"
                                    style="width: 100%;"
                            ></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item style="float: right;">
                    <el-button  @click="clearData">清空</el-button>
                    <el-button type="primary" @click="getWechatLists">查找</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="tableData" style="width:100%;"
                      :default-sort = "{prop: 'create_time', order: 'descending'}"
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
                <el-table-column prop="wechatId" label="公众号ID" width="180" align="center"></el-table-column>
                <el-table-column prop="wechatName" label="公众号名称" width="180" align="center"></el-table-column>
                <el-table-column prop="wechatType" label="公众号类型" width="180" align="center"></el-table-column>
                <el-table-column prop="company" label="认证主体" width="180" align="center"></el-table-column>
                <el-table-column v-if="false" prop="dailyRecharge" label="日充值" width="50" align="center"></el-table-column>
                <el-table-column v-if="false" prop="dailyConcernS" label="日引流/日关注" width="50" align="center"></el-table-column>
                <el-table-column v-if="false" prop="dailyChargeS" label="日付费(人)/总付费(人)" width="50" align="center"></el-table-column>
                <el-table-column v-if="false" prop="allConcernS" label="总引流/总关注" width="50" align="center"></el-table-column>
                <el-table-column v-if="false" prop="accumulatedCost" label="累计成本/累计充值" width="50" align="center"></el-table-column>
                <el-table-column v-if="false" sortable='custom' :sort-orders="['ascending', 'descending']"
                                 prop="login_time" label="最近登录时间" width="50" align="center"></el-table-column>
                <el-table-column sortable='custom' :sort-orders="['ascending', 'descending']"
                                 prop="createTime" label="创建时间" min-width="80" align="center"></el-table-column>
                <el-table-column prop="createAdmin" label="创建人" min-width="80" align="center"></el-table-column>
                <el-table-column label="操作" min-width="250" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleSearch(scope.$index, scope.row)">查看</el-button>
                        <!--<el-button size="mini" type="warning" @click="handleDefriend(scope.$index, scope.row)">编辑</el-button>-->
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[20, 50, 100, 150]"
                    background
                    :page-size="20"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="400">
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
    name: 'user',
    data() {
      return {
        reason: '',
        textSize: 0,
        wechatlist_condition: {
          accid: '',
          phone: '',
          wechatId:'',
          wechatName: '',
          loginType: '999',
          create_start_time: '',
          create_end_time: '',
          login_start_time: '',
          login_end_time: '',
          status: '999',
        },
        userRules: {
          accid: '',
          phone: '',
          nickName: '',
          loginType: '999',
          create_start_time: '',
          create_end_time: '',
          login_start_time: '',
          login_end_time: '',
          status: '999',
        },
        pickerBeginDateBefore:{
          disabledDate: (time) => {
            let beginDateVal = this.wechatlist_condition.create_end_time;
            if (beginDateVal) {
              return time.getTime() > beginDateVal;
            }
          }
        },
        pickerBeginDateAfter:{
          disabledDate: (time) => {
            let beginDateVal = this.wechatlist_condition.create_start_time;
            if (beginDateVal) {
              return time.getTime() < beginDateVal;
            }
          }
        },
        loginBeginDateBefore:{
          disabledDate: (time) => {
            let beginDateVal = this.wechatlist_condition.login_end_time;
            if (beginDateVal) {
              return time.getTime() > beginDateVal;
            }
          }
        },
        loginBeginDateAfter:{
          disabledDate: (time) => {
            let beginDateVal = this.wechatlist_condition.login_start_time;
            if (beginDateVal) {
              return time.getTime() < beginDateVal;
            }
          }
        },
        tableData: [
          {
            'wechatId':"x11x",
            'wechatName':'好多好书1',
            'wechatType':'A',
            'company':'公司1',
            'dailyRecharge':13,
            'dailyConcernS':'12/34',
            'dailyChargeS':'12/4556',
            'allConcernS':'12345/2345',
            'accumulatedCost':'xxx',
            'createTime':'2019-01-21 11:00:00',
            'createAdmin':'Tom'
          },
          {
            'wechatId':"x22x",
            'wechatName':'好多好书2',
            'wechatType':'A',
            'company':'公司2',
            'dailyRecharge':13,
            'dailyConcernS':'12/34',
            'dailyChargeS':'12/4556',
            'allConcernS':'12345/2345',
            'accumulatedCost':'xxx',
            'createTime':'2019-01-21 11:00:00',
            'createAdmin':'Tom'
          }
        ],
        pageNo: 0,
        pageSize: 10,
        currentPage: 1,
        defriendDialog:false,
      }
    },
    created() {
      this.getWechatLists()
    },
    methods: {
      watchSize() {
        if(this.reason.length == 100){
          this.textSize = 100
          return false
        }else {
          this.textSize = this.reason.length
        }
      },
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
      getWechatLists(){
        var params = {
          page: this.pageNo,
          size: this.pageSize,
          appid	: this.wechatlist_condition.wechatId,
          name: this.wechatlist_condition.wechatName,
          belongto:'',
          uid:'',
          registDate_s:this.wechatlist_condition.create_start_time,
          registDate_e:this.wechatlist_condition.create_end_time,
        }
        var _this = this
        _this.tableData = []
        orgModuleApi.wechatList(params).then((res)=>{
          console.log(res)
          if(res.success){
            res.data.data.map((item,index)=>{
              _this.tableData.push({
//              {
//                'wechatId':"x11x",
//                'wechatName':'好多好书1',
//                'wechatType':'A',
//                'company':'公司1',
//                'dailyRecharge':13,
//                'dailyConcernS':'12/34',
//                'dailyChargeS':'12/4556',
//                'allConcernS':'12345/2345',
//                'accumulatedCost':'xxx',
//                'createTime':'2019-01-21 11:00:00',
//                'createAdmin':'Tom'
//              },
                wechatId: item.appid,
                wechatName: item.name,
                company: item.belongto,
                wechatType: item.type,
                createTime: _this.common.getDate(item.registDate),
//                status: item.status==1?'正常':'禁用',
              })
            })
            _this.totalSize = parseInt(res.data.total)
          }
        })

      },
      handleSearch(idx,row) {
        this.$router.push({
          name:'authorizationManager'
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
    .wechatlist-page{
        .wechatlist-header{
            height: 50px;
            padding-left: 15px;
            .el-breadcrumb{
                font-size: 16px;
                margin-top: 15px;
            }
        }
        .wechatlist-body{
            margin-left: 15px;
            margin-right: 15px;
            .wechatlist-form{
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
