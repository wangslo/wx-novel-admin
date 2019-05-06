<template>
  <div class="container">
    <div class="home-text" v-show="false">
      <h3 class="text1">欢迎登录</h3>
      <p class="text2">魅狐文学后台管理</p>
    </div>
    <div id="dataMap" style="width: 800px;height: 500px;">
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Home',
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
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'red' // 0% 处的颜色
            }, {
              offset: 1, color: 'blue' // 100% 处的颜色
            }],
            global: false // 缺省为 false
          },
          grid: {
            show: true,
            x: 30,
            y: 12,
          },
          series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true
          }],
          tooltip: {
            trigger: 'axis',
            /*formatter: function (params) {
              return "<div>" + params.name + "</div>数量：" + params.value;
            }*/
          },
        });
      }
    }
  }
</script>
<style scoped>
  .container{
    text-align: center;
  }
  .home-text{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .home-text .text1{
    font-size: 26px;
  }
  .home-text .text2{
    font-size: 20px;
  }
</style>
