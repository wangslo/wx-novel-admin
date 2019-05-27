<template>
    <div class="menu-config-page">
        <div class="menu-config-header">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
                <el-breadcrumb-item >数据统计</el-breadcrumb-item>
                <el-breadcrumb-item >复充率-首充</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-row>
            <div style="margin-left: 50px;font-weight:bold;background-color: #d9edf7;border-color: #bce8f1;color: #31708f;padding: 20px;"><i class="el-icon-thumb"></i>*报表说明：展示当天总充值用户数，其中在当天首充的用户数、其中在前第1天首充的用户数、其中在前第2天首充的用户数...其中在前第7天首充的用户数、其中在前7天前首充的用户数。</div>
        </el-row>
        <el-row>
            <div id="dataMap" style="width: 95%;height: 500px;box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);margin-left:50px;margin-bottom: 15px;padding-top: 15px">
            </div>
        </el-row>

    </div>
</template>
<script>

  var chart = '{"x":["05\u670810\u65e5","05\u670811\u65e5","05\u670812\u65e5","05\u670813\u65e5","05\u670814\u65e5","05\u670815\u65e5","05\u670816\u65e5"],"series":[{"name":"\u5f53\u5929\u9996\u5145\u7528\u6237\u6570","data":[30,36,37,42,53,51,34]},{"name":"\u524d\u7b2c1\u5929\u9996\u5145\u7528\u6237\u6570","data":[5,0,3,2,2,6,7]},{"name":"\u524d\u7b2c2\u5929\u9996\u5145\u7528\u6237\u6570","data":[1,4,3,3,5,4,4]},{"name":"\u524d\u7b2c3\u5929\u9996\u5145\u7528\u6237\u6570","data":[1,2,6,4,2,0,4]},{"name":"\u524d\u7b2c4\u5929\u9996\u5145\u7528\u6237\u6570","data":[4,2,2,3,5,3,3]},{"name":"\u524d\u7b2c5\u5929\u9996\u5145\u7528\u6237\u6570","data":[1,4,1,1,2,2,1]},{"name":"\u524d\u7b2c6\u5929\u9996\u5145\u7528\u6237\u6570","data":[1,7,1,3,3,2,2]},{"name":"\u524d\u7b2c7\u5929\u9996\u5145\u7528\u6237\u6570","data":[1,1,3,3,2,1,1]},{"name":"\u524d7\u5929\u524d\u9996\u5145\u7528\u6237\u6570","color":"#aaaaaa","data":[25,33,35,33,32,34,36]}]}' || false;
//  $(function () {
//    if(chart){
//      chart = JSON.parse(chart);
//      $('#dataMap').highcharts({
//        title: {text:''},
//        chart: {
//          type: 'area'
//        },
//        plotOptions: {
//          series: {
//            stacking: 'normal',
//          }
//        },
//        tooltip: {
//          headerFormat:'{point.x}<br/>当天总充值用户数：<b>{point.total} 人</b><br/>',
//          pointFormat:'{series.name}：<b>{point.y}</b><br/>',
//          valueSuffix: ' 人',
//          borderRadius:8,
//          backgroundColor:'rgba(102,102,102,0.9)',
//          borderColor:'#777',
//          style:{color:'#fff'},
//          shared: true
//        },
//        credits: {enabled:false},
//        xAxis: {gridLineWidth: 1,categories: chart.x},
//        yAxis: {minRange: 1,alternateGridColor: '#eee',title: {enabled:false}},
//        series: chart.series
//      });
//    }
//  });


  import ElRow from 'element-ui/packages/row/src/row'

  import {orgModuleApi} from '../../api/main'
  export default {
    name: 'recharge-rate-first',
    data() {
      return {
        button_type:1,
        today_income_total:"xxxx.xxx",
        today_general_rechare:"123.23",
        today_year_rechare:"45,32",
        today_new_user:"23",
        today_new_concern:"34",
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
      this.initECharts()
    },
    methods: {
      initECharts() {
        let myChart = echarts.init(document.getElementById('dataMap'))
        // 绘制图表
        var chart = '{"x":["05\u670810\u65e5","05\u670811\u65e5","05\u670812\u65e5","05\u670813\u65e5","05\u670814\u65e5","05\u670815\u65e5","05\u670816\u65e5"],"series":[{"name":"\u5f53\u5929\u9996\u5145\u7528\u6237\u6570","data":[30,36,37,42,53,51,34]},{"name":"\u524d\u7b2c1\u5929\u9996\u5145\u7528\u6237\u6570","data":[5,0,3,2,2,6,7]},{"name":"\u524d\u7b2c2\u5929\u9996\u5145\u7528\u6237\u6570","data":[1,4,3,3,5,4,4]},{"name":"\u524d\u7b2c3\u5929\u9996\u5145\u7528\u6237\u6570","data":[1,2,6,4,2,0,4]},{"name":"\u524d\u7b2c4\u5929\u9996\u5145\u7528\u6237\u6570","data":[4,2,2,3,5,3,3]},{"name":"\u524d\u7b2c5\u5929\u9996\u5145\u7528\u6237\u6570","data":[1,4,1,1,2,2,1]},{"name":"\u524d\u7b2c6\u5929\u9996\u5145\u7528\u6237\u6570","data":[1,7,1,3,3,2,2]},{"name":"\u524d\u7b2c7\u5929\u9996\u5145\u7528\u6237\u6570","data":[1,1,3,3,2,1,1]},{"name":"\u524d7\u5929\u524d\u9996\u5145\u7528\u6237\u6570","color":"#aaaaaa","data":[25,33,35,33,32,34,36]}]}' || false;
        chart = JSON.parse(chart);
        chart = {
          "x": ["05月10日", "05月11日", "05月12日", "05月13日", "05月14日", "05月15日", "05月16日"],
          "series": [{
            "type":"line",
            "name": "当天首充用户数",
            "data": [30, 36, 37, 42, 53, 51, 34]
          }, {
            "type":"line",
            "name": "前第1天首充用户数",
            "data": [5, 0, 3, 2, 2, 6, 7]
          }, {
            "type":"line",
            "name": "前第2天首充用户数",
            "data": [1, 4, 3, 3, 5, 4, 4]
          }, {
            "type":"line",
            "name": "前第3天首充用户数",
            "data": [1, 2, 6, 4, 2, 0, 4]
          }, {
            "type":"line",
            "name": "前第4天首充用户数",
            "data": [4, 2, 2, 3, 5, 3, 3]
          }, {
            "type":"line",
            "name": "前第5天首充用户数",
            "data": [1, 4, 1, 1, 2, 2, 1]
          }, {
            "type":"line",
            "name": "前第6天首充用户数",
            "data": [1, 7, 1, 3, 3, 2, 2]
          }, {
            "type":"line",
            "name": "前第7天首充用户数",
            "data": [1, 1, 3, 3, 2, 1, 1]
          }, {
            "type":"line",
            "name": "前7天前首充用户数",
            "color": "#aaaaaa",
            "data": [25, 33, 35, 33, 32, 34, 36]
          }]
        }
        console.log(chart)
        myChart.setOption({
          title : {
            text: '',
            subtext: ''
          },
          tooltip : {
            trigger: 'axis'
          },
          legend: {
            data:['当天首充用户数','前第1天首充用户数','前第2天首充用户数','前第3天首充用户数','前第4天首充用户数','前第5天首充用户数','前第6天首充用户数','前第7天首充用户数','前7天前首充用户数']
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
              data : ["05月10日", "05月11日", "05月12日", "05月13日", "05月14日", "05月15日", "05月16日"],
            }
          ],
          yAxis : [
            {
              type : 'value'
            }
          ],
          series : [
            {
              name:'当天首充用户数',
              type:'line',
              smooth:true,
              itemStyle: {normal: {areaStyle: {type: 'default',
                fillColor:"rgb(124, 181, 236);",}}},
              data:[30, 36, 37, 42, 53, 51, 34],
            },
            {
              name:'前第1天首充用户数',
              type:'line',
              smooth:true,
              itemStyle: {
                normal: {
                            areaStyle: {
                              type: 'default',
                              fillColor:'yellow',
                            }
                        }
                  },
              data:[5, 0, 3, 2, 2, 6, 7]
            },
            {
              name:'前第2天首充用户数',
              type:'line',
              smooth:true,
              itemStyle: {normal: {areaStyle: {type: 'default'}}},
              data:[1, 4, 3, 3, 5, 4, 4]
            },
            {
              name: "前第3天首充用户数",
              type:'line',
              smooth:true,
              itemStyle: {normal: {areaStyle: {type: 'default'}}},
              data: [1, 2, 6, 4, 2, 0, 4]
            }, {
              name: "前第4天首充用户数",
              type:'line',
              smooth:true,
              itemStyle: {normal: {areaStyle: {type: 'default'}}},
              data: [4, 2, 2, 3, 5, 3, 3]
            }, {
              name: "前第5天首充用户数",
              type:'line',
              smooth:true,
              itemStyle: {normal: {areaStyle: {type: 'default'}}},
              data: [1, 4, 1, 1, 2, 2, 1]
            }, {
              name: "前第6天首充用户数",
              type:'line',
              smooth:true,
              color:'rgb(228, 211, 84);',
              itemStyle: {normal: {areaStyle: {type: 'default'}}},
              data: [1, 7, 1, 3, 3, 2, 2]
            }, {
              name: "前第7天首充用户数",
              type:'line',
              smooth:true,
              itemStyle: {normal: {areaStyle: {type: 'default'}}},
              data: [1, 1, 3, 3, 2, 1, 1]
            }, {
              name: "前7天前首充用户数",
              type:'line',
              smooth:true,
              color: "#aaaaaa",
              itemStyle: {normal: {areaStyle: {type: 'default'}}},
              data: [25, 33, 35, 33, 32, 34, 36]
            }]
        })
      },
      reds:function(index){
        this.button_type = index;
      }
    }
  }
</script>
<style lang="scss" scoped>
    .menu-config-page{
        .menu-config-header{
            height: 50px;
            padding-left: 15px;
            .el-breadcrumb{
                font-size: 16px;
                margin-top: 15px;
            }
        }
        .menu-config-body{
            .menu-config-box{
                width: 95%;
                margin: 10px 0 0 40px;
                font-weight:bold;
                /*margin: 0 auto;*/
                /*margin-top: 20px;*/
                .menu-config-item{
                    margin-bottom: 20px;
                    .head-img-url{
                        display: inline-block;
                        width: 100px;
                        height: 100px;
                        img{
                            width: 100%;
                            height: 100%;
                            vertical-align:middle;
                        }
                    }
                }
            }
            .use-btn{
                margin-left: 2.5%;
                width: 100px;
                margin-bottom: 40px;
            }
            .el-dialog__body{
                span{
                    display: block;
                    text-align: center;
                }
            }
        }
    }
    .menu-check {
        width: 70px;
        height: 50px;
        margin: 50% auto;
        font-size: 90px;
        color: #00AA00;
        text-align: center;
        display: none;
    }
    .menu-pic {
        width: 300px;
        margin: 30px 1px 30px 160px;
        height: 530px;
        float: left;
        cursor: pointer;
        background-size: 100%;
        background-repeat: no-repeat;
    }
    .el-row {
        margin-bottom: 20px;
        &:last-child {
            margin-bottom: 0;
        }
    }
    .el-col {
        border-radius: 4px;
    }
</style>
