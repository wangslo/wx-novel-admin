<template>
    <div class="accountInfo-page">
        <div class="accountInfo-header">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
                <el-breadcrumb-item >数据统计</el-breadcrumb-item>
                <el-breadcrumb-item >数据概览</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="accountInfo-body">
            <div class="grid-box">
                <div class="grid-content bg-purple">
                    <span style="color: red">{{yesterday_income_total}}</span><br />
                    <span>昨日总收入（元）</span>
                </div>
              <div class="grid-content bg-purple">
                    <span style="color: red">{{yesterday_general_rechare}}</span><br />
                    <span>昨日普通充值（元）</span>
                </div>
              <div class="grid-content bg-purple">
                    <span style="color: red">{{yesterday_year_rechare}}</span><br />
                    <span>昨日包年充值（元）</span>
                </div>
              <div class="grid-content bg-purple">
                    <span style="color: red">{{yesterday_read_user}}</span><br />
                    <span>昨日阅读人数（DAU）</span>
                </div>
              <div class="grid-content bg-purple">
                    <span style="color: red">{{yesterday_new_user}}</span><br />
                    <span>昨日新增用户（人）</span>
                </div>
              <div class="grid-content bg-purple">
                    <span style="color: red">{{yesterday_new_user_next_day_retain}}</span><br />
                    <span>昨日新用户次日留存</span>
                </div>
            </div>
            <el-row style="width: 95%;margin: 0 auto;">
                展示时间：
                <el-button-group >
                    <el-button :type="button_type == 1 ? 'primary':''" size="mini" style="width: 70px" @click="reds(1)">7天</el-button>
                    <el-button :type="button_type == 2 ? 'primary':''" size="mini" style="width: 70px" @click="reds(2)">30天</el-button>
                    <el-button :type="button_type == 3 ? 'primary':''" size="mini" style="width: 70px" @click="reds(3)">30天</el-button>
                </el-button-group>
            </el-row><br />
            <el-row>
                <div id="dataMap" style="width: 100%;height: 500px;">
                </div>
            </el-row>
            <br />
            <el-row>
                <el-button-group style="float: right">
                    <el-button type="danger" size="mini" style="width: 70px" @click="reds(1)">导出</el-button>
                </el-button-group>
            </el-row>
            <el-table :data="tableData" style="width:100%;"
                      :default-sort = "{prop: 'dateNum', order: 'descending'}"
                      stripe border
                      @sort-change='sortChange'>
                <el-table-column v-if="false" label="序号" width="50" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.$index + 1}} </span>
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
                <el-table-column prop="dateNum" sortable='custom' :sort-orders="['ascending', 'descending']" label="日期" min-width="120" align="center"></el-table-column>
                <el-table-column prop="allIncome" sortable='custom' :sort-orders="['ascending', 'descending']" label="总收入" width="120" align="center"></el-table-column>
                <el-table-column prop="generalRecharge" sortable='custom' :sort-orders="['ascending', 'descending']" label="普通充值" width="120" align="center"></el-table-column>
                <el-table-column prop="yearRecharge" sortable='custom' :sort-orders="['ascending', 'descending']" label="包年充值" width="120" align="center"></el-table-column>
                <el-table-column prop="generalRechargeArpu" sortable='custom' :sort-orders="['ascending', 'descending']" label="普通充值arpu" width="180" align="center"></el-table-column>
                <el-table-column prop="consumeArpu" sortable='custom' :sort-orders="['ascending', 'descending']" label="消费arpu" width="120" align="center"></el-table-column>
                <el-table-column prop="readerNum" sortable='custom' :sort-orders="['ascending', 'descending']" label="阅读人数" width="120" align="center"></el-table-column>
                <el-table-column prop="newUser" sortable='custom' :sort-orders="['ascending', 'descending']" label="新增用户数" width="120" align="center"></el-table-column>
                <el-table-column prop="newUserNextDayRetain" sortable='custom' :sort-orders="['ascending', 'descending']" label="新用户次日留存" width="180" align="center"></el-table-column>
                <el-table-column prop="newUserRecharge" sortable='custom' :sort-orders="['ascending', 'descending']" label="新用户充值金额" width="150" align="center"></el-table-column>
                <el-table-column prop="NumOfnewUserRecharge" sortable='custom' :sort-orders="['ascending', 'descending']" label="新用户充值人数" width="150" align="center"></el-table-column>
                <el-table-column prop="NumOfRechargeOfnewUser" sortable='custom' :sort-orders="['ascending', 'descending']" label="新用户充值笔数" width="150" align="center"></el-table-column>
                <el-table-column  label="昵称"  v-if="false" width="150" align="center">
                    <template slot-scope="scope">
                        <span @click="userDetail(scope.$index, scope.row)" style="color: #19a05e">{{scope.row.nickName}}</span>
                    </template>
                </el-table-column>
                <el-table-column  v-if="false" prop="rechargeAmount" label="充值金额" width="80" align="center"></el-table-column>
                <el-table-column  v-if="false" sortable='custom' :sort-orders="['ascending', 'descending']"
                                 prop="createTime" label="充值时间" width="180" align="center"></el-table-column>
                <el-table-column v-if="false" label="操作" width="3" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleSearch(scope.$index, scope.row)">查看</el-button>
                        <el-button size="mini" type="warning" @click="handleDefriend(scope.$index, scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-row>
            </el-row>
            <br />
            <br />
        </div>
    </div>
</template>
<script>

  import ElRow from 'element-ui/packages/row/src/row'

  const cityOptions = ['上海', '北京', '广州', '深圳'];


  import {orgModuleApi} from '../../api/main'
  export default {
    name: 'dataOverview',
    data() {
      return {
        button_type:1,
        yesterday_income_total:"1586",
        yesterday_general_rechare:"123.23",
        yesterday_year_rechare:"45.32",
        yesterday_read_user:"45",
        yesterday_new_user:"23",
        yesterday_new_user_next_day_retain:"34.85",
        x_data:['2019-04-22','2019-04-23','2019-04-24','2019-04-25','2019-04-26','2019-04-27','2019-04-28'],
        y_data:[
          {
            name:'总收入',
            type:'line',
            stack: '总量',
            data:[120, 132, 101, 134, 90, 230, 210]
          },
          {
            name:'普通充值',
            type:'line',
            stack: '总量',
            data:[220, 182, 191, 234, 290, 330, 310]
          },
          {
            name:'包年充值',
            type:'line',
            stack: '总量',
            data:[150, 232, 201, 154, 190, 330, 410]
          },
          {
            name:'阅读人数',
            type:'line',
            stack: '总量',
            data:[320, 332, 301, 334, 390, 330, 320]
          },
          {
            name:'新增用户',
            type:'line',
            stack: '总量',
            data:[320, 332, 301, 334, 390, 330, 320]
          },
          {
            name:'新用户次日留存',
            type:'line',
            stack: '总量',
            itemStyle: {
              normal: {
                lineStyle: {
//                  shadowColor : 'rgba(0,0,0,0.4)'
//                  color : '#00FF00',
                }
              }
            },
            data:[15.35, 35.21, 21.78, 97.64, 57.21, 42.50, 65.21]
          }
        ],
        changeRed:0,
        tableData: [
          {
            dateNum:'2019-04-22',
            allIncome:'5000',
            generalRecharge:'2000',
            yearRecharge:'0',
            generalRechargeArpu:0,
            consumeArpu:0,
            readerNum:0,
            newUser:2000,
            newUserNextDayRetain:0,
            newUserRecharge:0,
            NumOfnewUserRecharge:0,
            NumOfRechargeOfnewUser:0,
          },
          {
            dateNum:'2019-04-23',
            allIncome:'54300',
            generalRecharge:'2000',
            yearRecharge:'0',
            generalRechargeArpu:0,
            consumeArpu:0,
            readerNum:0,
            newUser:2700,
            newUserNextDayRetain:0,
            newUserRecharge:0,
            NumOfnewUserRecharge:0,
            NumOfRechargeOfnewUser:0,
          },
          {
            dateNum:'2019-04-24',
            allIncome:'2300',
            generalRecharge:'1600',
            yearRecharge:'0',
            generalRechargeArpu:0,
            consumeArpu:0,
            readerNum:0,
            newUser:1500,
            newUserNextDayRetain:0,
            newUserRecharge:0,
            NumOfnewUserRecharge:0,
            NumOfRechargeOfnewUser:0,
          },
          {
            dateNum:'2019-04-25',
            allIncome:'2300',
            generalRecharge:'1600',
            yearRecharge:'0',
            generalRechargeArpu:0,
            consumeArpu:0,
            readerNum:0,
            newUser:1500,
            newUserNextDayRetain:0,
            newUserRecharge:0,
            NumOfnewUserRecharge:0,
            NumOfRechargeOfnewUser:0,
          },
          {
            dateNum:'2019-04-26',
            allIncome:'2300',
            generalRecharge:'1600',
            yearRecharge:'0',
            generalRechargeArpu:0,
            consumeArpu:0,
            readerNum:0,
            newUser:1500,
            newUserNextDayRetain:0,
            newUserRecharge:0,
            NumOfnewUserRecharge:0,
            NumOfRechargeOfnewUser:0,
          },
          {
            dateNum:'2019-04-27',
            allIncome:'2300',
            generalRecharge:'1600',
            yearRecharge:'0',
            generalRechargeArpu:0,
            consumeArpu:0,
            readerNum:0,
            newUser:1500,
            newUserNextDayRetain:0,
            newUserRecharge:0,
            NumOfnewUserRecharge:0,
            NumOfRechargeOfnewUser:0,
          },
        ],

      }
    },
    mounted() {
      this.initECharts()
    },
    methods: {
      initECharts() {
        let myChart = echarts.init(document.getElementById('dataMap'))
        // 绘制图表
        myChart.setOption({
          tooltip : {
            trigger: 'axis'
          },
          legend: {
            data:['总收入','普通充值','包年充值','阅读人数','新增用户','新用户次日留存']
          },
          toolbox: {
            show : false,
            feature : {
              mark : {show: true},
              dataView : {show: true, readOnly: false},
              magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
              restore : {show: true},
              saveAsImage : {show: true}
            }
          },
          calculable : true,
          xAxis : [
            {
              type : 'category',
              boundaryGap : false,
              data :this.x_data,
            }
          ],
          yAxis : [
            {
              type : 'value'
            }
          ],
          series :this.y_data,
        });
      },
      reds:function(index){
        this.button_type = index;
      }
    }
  }
</script>
<style lang="scss" scoped>
    .el-row {
        margin-bottom: 20px;
        &:last-child {
            margin-bottom: 0;
        }
    }
    .el-col {
        border-radius: 4px;
    }
    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple {
      background: white;
      box-shadow: 0px 4px 14px 0px rgba(0, 0, 0, 0.1);
      margin-right: 2px;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        border-radius: 4px;
        padding: 10px 5px;
        text-align: center;
        min-height: 36px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
    .accountInfo-page{
        .accountInfo-header{
            height: 50px;
            padding-left: 15px;
            .el-breadcrumb{
                font-size: 16px;
                margin-top: 15px;
            }
        }
        .accountInfo-body{
          margin-left: 15px;
          margin-right: 15px;
          .grid-box{
            display: flex;
            margin-bottom: 30px;
          }
        }
        .el-input{
            width: 300px;
        }
        .el-button{
            width: 200px;
        }
    }
</style>
