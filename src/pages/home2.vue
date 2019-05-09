<template>
    <div class="accountInfo-page">
        <div class="accountInfo-header">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="accountInfo-body">
            <el-row :gutter="80">
                <el-col :span="4"><div class="grid-content bg-purple">
                    <span>XXXX.XX</span><br />
                    <span>今日总收入（元）</span>
                </div></el-col>
                <el-col :span="4"><div class="grid-content bg-purple">
                    <span>XXXX.XX</span><br />
                    <span>今日总收入（元）</span>
                </div></el-col>
                <el-col :span="4"><div class="grid-content bg-purple">
                    <span>XXXX.XX</span><br />
                    <span>今日总收入（元）</span>
                </div></el-col>
                <el-col :span="4"><div class="grid-content bg-purple">
                    <span>XXXX.XX</span><br />
                    <span>今日总收入（元）</span>
                </div></el-col>
                <el-col :span="4"><div class="grid-content bg-purple">
                    <span>XXXX.XX</span><br />
                    <span>今日总收入（元）</span>
                </div></el-col>
            </el-row>
            <el-row>
                展示时间：
                <el-button-group >
                <el-button autofocus="true" size="mini" style="width: 70px">7天</el-button>
                <el-button size="mini" style="width: 70px">15天</el-button>
                <el-button type="primary" size="mini" style="width: 70px">30天</el-button>
            </el-button-group>
            </el-row>
            <el-row>
                <div id="dataMap" style="width: 1400px;height: 500px;">
                </div>
            </el-row>
        </div>
    </div>
</template>
<script>

  import ElRow from 'element-ui/packages/row/src/row'

  const cityOptions = ['上海', '北京', '广州', '深圳'];


  import {orgModuleApi} from '../api/main'
  export default {
    name: 'Home2',
    data() {
      return {
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
            data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
          },
          toolbox: {
            show : true,
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
              data : ['2019-04-22','2019-04-23','2019-04-24','2019-04-25','2019-04-26','2019-04-27','2019-04-28']
            }
          ],
          yAxis : [
            {
              type : 'value'
            }
          ],
          series : [
            {
              name:'邮件营销',
              type:'line',
              stack: '总量',
              data:[120, 132, 101, 134, 90, 230, 210]
            },
            {
              name:'联盟广告',
              type:'line',
              stack: '总量',
              data:[220, 182, 191, 234, 290, 330, 310]
            },
            {
              name:'视频广告',
              type:'line',
              stack: '总量',
              data:[150, 232, 201, 154, 190, 330, 410]
            },
            {
              name:'直接访问',
              type:'line',
              stack: '总量',
              data:[320, 332, 301, 334, 390, 330, 320]
            },
            {
              name:'搜索引擎',
              type:'line',
              stack: '总量',
              data:[820, 932, 901, 934, 1290, 1330, 1320]
            }
          ]
        });
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
        background: #d3dce6;
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
