<template>
    <div class="accountInfo-page">
        <div class="accountInfo-header">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
                <el-breadcrumb-item >数据统计</el-breadcrumb-item>
                <el-breadcrumb-item :to="{path: '/promotion-statistics'}">推广统计</el-breadcrumb-item>
                <el-breadcrumb-item >数据明细</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="accountInfo-body">
            <br />
            <el-row style="width: 95%;margin: 0 auto;">
                展示时间：
                <el-button-group >
                    <el-button :type="button_type == 1 ? 'primary':''" size="mini" style="width: 70px" @click="reds(1)">7天</el-button>
                    <el-button :type="button_type == 2 ? 'primary':''" size="mini" style="width: 70px" @click="reds(2)">30天</el-button>
                    <el-button :type="button_type == 3 ? 'primary':''" size="mini" style="width: 70px" @click="reds(3)">30天</el-button>
                </el-button-group>
            </el-row><br />
            <el-row>
                <div id="dataMap" style="width: 95%;height: 500px;">
                </div>
            </el-row>
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
                <el-table-column prop="generalRecharge" sortable='custom' :sort-orders="['ascending', 'descending']" label="PV" width="120" align="center"></el-table-column>
                <el-table-column prop="yearRecharge" sortable='custom' :sort-orders="['ascending', 'descending']" label="UV" width="120" align="center"></el-table-column>
                <el-table-column prop="newUser" sortable='custom' :sort-orders="['ascending', 'descending']" label="新增关注" width="120" align="center"></el-table-column>
                <el-table-column prop="NumOfnewUserRecharge" sortable='custom' :sort-orders="['ascending', 'descending']" label="总流水" width="150" align="center"></el-table-column>
                <el-table-column prop="NumOfRechargeOfnewUser" sortable='custom' :sort-orders="['ascending', 'descending']" label="充值笔数" width="150" align="center"></el-table-column>

                <!--<el-table-column prop="dateNum" sortable='custom' :sort-orders="['ascending', 'descending']" label="日期" min-width="120" align="center"></el-table-column>-->
                <!--<el-table-column prop="allIncome" sortable='custom' :sort-orders="['ascending', 'descending']" label="总收入" width="120" align="center"></el-table-column>-->
                <!--<el-table-column prop="generalRecharge" sortable='custom' :sort-orders="['ascending', 'descending']" label="普通充值" width="120" align="center"></el-table-column>-->
                <!--<el-table-column prop="yearRecharge" sortable='custom' :sort-orders="['ascending', 'descending']" label="包年充值" width="120" align="center"></el-table-column>-->
                <!--<el-table-column prop="generalRechargeArpu" sortable='custom' :sort-orders="['ascending', 'descending']" label="普通充值arpu" width="180" align="center"></el-table-column>-->
                <!--<el-table-column prop="consumeArpu" sortable='custom' :sort-orders="['ascending', 'descending']" label="消费arpu" width="120" align="center"></el-table-column>-->
                <!--<el-table-column prop="readerNum" sortable='custom' :sort-orders="['ascending', 'descending']" label="阅读人数" width="120" align="center"></el-table-column>-->
                <!--<el-table-column prop="newUser" sortable='custom' :sort-orders="['ascending', 'descending']" label="新增用户数" width="120" align="center"></el-table-column>-->
                <!--<el-table-column prop="newUserNextDayRetain" sortable='custom' :sort-orders="['ascending', 'descending']" label="新用户次日留存" width="180" align="center"></el-table-column>-->
                <!--<el-table-column prop="newUserRecharge" sortable='custom' :sort-orders="['ascending', 'descending']" label="新用户充值金额" width="150" align="center"></el-table-column>-->
                <!--<el-table-column prop="NumOfnewUserRecharge" sortable='custom' :sort-orders="['ascending', 'descending']" label="新用户充值人数" width="150" align="center"></el-table-column>-->
                <!--<el-table-column prop="NumOfRechargeOfnewUser" sortable='custom' :sort-orders="['ascending', 'descending']" label="新用户充值笔数" width="150" align="center"></el-table-column>-->
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
  import {orgModuleApi} from '../../api/main'
  export default {
    name: 'dataDetail',
    data() {
      return {
        button_type:1,
        x_data:['2019-04-22','2019-04-23','2019-04-24','2019-04-25','2019-04-26','2019-04-27','2019-04-28'],
        y_data:[
          {
            name:'充值金额',
            type:'line',
            stack: '总量',
            data:[120, 132, 101, 134, 90, 230, 210]
          },
          {
            name:'充值笔数',
            type:'line',
            stack: '总量',
            data:[220, 182, 191, 234, 290, 330, 310]
          },
          {
            name:'新增关注',
            type:'line',
            stack: '总量',
            data:[150, 232, 201, 154, 190, 330, 410]
          },
          {
            name:'PV',
            type:'line',
            stack: '总量',
            data:[320, 332, 301, 334, 390, 330, 320]
          },
          {
            name:'UV',
            type:'line',
            stack: '总量',
            data:[320, 332, 301, 334, 390, 330, 320]
          },
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
            data:['充值金额','充值笔数','新增关注','PV','UV']
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
        /*background: #d3dce6;*/
        background: white;
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
        }
        .el-input{
            width: 300px;
        }
        .el-button{
            width: 200px;
        }
    }
</style>
