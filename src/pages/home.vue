<template>
    <div class="accountInfo-page">
        <div class="accountInfo-header">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="accountInfo-body">
            <div class="grid-box">
                <div class="grid-content bg-purple">
                    <span style="color: red">{{today_income_total}}</span><br />
                    <span>今日总收入（元）</span>
                </div><div class="grid-content bg-purple">
                    <span style="color: red">{{today_income_times}}</span><br />
                    <span>今日充值数（笔）</span>
                </div>
              <div class="grid-content bg-purple" v-if="false">
                    <span style="color: red">{{today_general_rechare}}</span><br />
                    <span>今日普通充值（元）</span>
                </div>
              <div class="grid-content bg-purple" v-if="false">
                    <span style="color: red">{{today_year_rechare}}</span><br />
                    <span>今日包年充值（元）</span>
                </div>
              <div class="grid-content bg-purple">
                    <span style="color: red">{{today_new_user}}</span><br />
                    <span>今日新增用户（人）</span>
                </div>
              <div class="grid-content bg-purple">
                    <span style="color: red">{{today_new_concern}}</span><br />
                    <span>今日新增关注（人）</span>
                </div>
            </div>
            <el-row style="width: 95%;margin: 0 auto;">
                展示时间：
                <el-button-group >
                    <el-button :type="button_type == 1 ? 'primary':''" size="mini" style="width: 70px" @click="reds(1)">7天</el-button>
                    <el-button :type="button_type == 2 ? 'primary':''" size="mini" style="width: 70px" @click="reds(2)">15天</el-button>
                    <el-button :type="button_type == 3 ? 'primary':''" size="mini" style="width: 70px" @click="reds(3)">30天</el-button>
                </el-button-group>
            </el-row><br />
            <el-row>
                <div id="dataMap" style="width: 90%;height: 500px;">
                </div>
            </el-row>
        </div>
    </div>
</template>
<script>

  import ElRow from 'element-ui/packages/row/src/row'

  import {orgModuleApi} from '../api/main'
  export default {
    name: 'Home',
    data() {
      return {
        button_type:1,
        today_income_times:"xxxx",
        today_income_total:"xxxx.xxx",
        today_general_rechare:"xxxx.xxx",
        today_year_rechare:"xxxx.xxx",
        today_new_user:"xxxx",
        today_new_concern:"xxx",
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
            name:'新增用户',
            type:'line',
            stack: '总量',
            data:[320, 332, 301, 334, 390, 330, 320]
          },
          {
            name:'新增关注',
            type:'line',
            stack: '总量',
            data:[820, 932, 901, 934, 1290, 1330, 1320]
          }
        ],
        changeRed:0,

      }
    },
    mounted() {
      this.getDataLists()
    },
    methods: {
      getDataLists(day_num=7){
      var params = {
        //appid	: this.wechatlist_condition.wechatId,
        appid:this.common.appid,
        days:day_num,
      }
      var _this = this
      _this.tableData = []
      orgModuleApi.dataList(params).then((res)=>{
        console.log(res)
        if(res.success){

          _this.today_income_times = res.data[0].tsize
          _this.today_income_total = res.data[0].sumFee
          _this.today_new_user = res.data[0].newAddCount
          _this.today_new_concern = res.data[0].newSubCount

          _this.x_data = []
          //_this.y_data = []
          let allIncome = [];
          let incomeTimes = []
          let newUser = []
          let newConcern = []
          res.data.map((item,index)=>{
            _this.x_data.unshift(item.date)
            allIncome.unshift(item.sumFee)
            incomeTimes.unshift(item.tsize)
            newUser.unshift(item.newAddCount)
            newConcern.unshift(item.newSubCount)
          })
          _this.y_data = [
            {
              name:'总收入',
              type:'line',
              data:allIncome
            },
            {
              name:'充值笔数',
              type:'line',
              data:incomeTimes
            },
            {
              name:'新增用户',
              type:'line',
              data:newUser
            },
            {
              name:'新增关注',
              type:'line',
              data:newConcern
            }
          ]
        }
        console.log('x_data')
        console.log(_this.x_data)
        _this.initECharts()
      })


    },
      initECharts() {
        let myChart = echarts.init(document.getElementById('dataMap'))
        // 绘制图表
        myChart.setOption({
          tooltip : {
            trigger: 'axis'
          },
          legend: {
//            data:['总收入','普通充值','包年充值','新增用户','新增关注']
            data:['总收入','充值笔数','新增用户','新增关注']
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
        if(index == 2){
          this.getDataLists(15)
        }else if(index == 3){
          this.getDataLists(30)
        }else{
          this.getDataLists()
        }
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
      margin-right: 10px;
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
            margin-bottom: 50px;
            display: flex;
            justify-content: left;
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
