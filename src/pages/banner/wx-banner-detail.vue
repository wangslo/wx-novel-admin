<template>
    <div class="banner-detail-page">
        <div class="banner-detail-header">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{path: '/app-banner-list'}">banner管理</el-breadcrumb-item>
                <el-breadcrumb-item >***详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="banner-detail-body">
            <div class="banner-detail-box">
                <div class="banner-detail-item">
                    <span class="item-name">位置：</span>
                    <span class="item-value">{{position}}</span>
                </div>
                <div class="banner-detail-item">
                    <span class="item-name">展示时间：</span>
                    <span class="item-value">{{show_time}}</span>
                </div>
                <div class="banner-detail-item">
                    <span class="item-name">创建时间：</span>
                    <span class="item-value">{{create_time}}</span>
                </div>
                <div class="banner-detail-item">
                    <span class="item-name">状态：</span>
                    <span class="item-value">{{status}}</span>
                </div>
            </div>
            <div class="banner-detail-item">
                <span class="item-name head-img-title">banner图：</span>
                <div class="head-img-url">
                    <img :src="banner_img" style="width:300px;height:180px"/>
                    <div class="banner-detail-btn-box">
                        <el-button type="warning" size="mini" class="banner-detail-btn">编辑</el-button>
                        <el-button type="danger" size="mini" class="banner-detail-btn">下线</el-button>
                    </div>
                </div>
            </div>
            <div class="line"></div>
            <div class="banner-detail-item operat-info">
                <span class="item-name operat-title">操作详情：</span>
                <div class="operat-reason">
                    <template v-for="reason in reasons">
                        <span class="item-value">{{reason}}</span>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  import {orgModuleApi} from '../../api/main'
  export default {
    name: 'bannerWxDetail',
    data() {
      return {
        status: '在线',
        position: '男频',
        show_time:"2019-04-04 12:00 至 2019-05-01 12:00",
        create_time: '2019-04-06 12:00:00',
        book_name: '书籍名称',
        banner_img:"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1222929928,1326821480&fm=26&gp=0.jpg",
        reasons:[
          "XXAXX与2019-04-10 12:00:00进行下线操作  原因：因点击量小无法满足运营需求",
          "XXXX与2019-04-10 12:00:00进行下线操作  原因：因点击量小无法满足运营需求",
          "XXXX与2019-04-10 12:00:00进行下线操作  原因：因点击量小无法满足运营需求",
        ],
        pickerBeginDateBefore:{
          disabledDate: (time) => {
            let beginDateVal = this.banner_wx_condition.create_end_time;
            if (beginDateVal) {
              return time.getTime() > beginDateVal;
            }
          }
        },
        pickerBeginDateAfter:{
          disabledDate: (time) => {
            let beginDateVal = this.banner_wx_condition.create_start_time;
            if (beginDateVal) {
              return time.getTime() < beginDateVal;
            }
          }
        },
        showPickerBeginDateBefore:{
          disabledDate: (time) => {
            let beginDateVal = this.banner_wx_condition.show_end_time;
            if (beginDateVal) {
              return time.getTime() > beginDateVal;
            }
          }
        },
        showPickerBeginDateAfter:{
          disabledDate: (time) => {
            let beginDateVal = this.banner_wx_condition.show_start_time;
            if (beginDateVal) {
              return time.getTime() < beginDateVal;
            }
          }
        },
        tableData: [
          {"bannerImage":"http://images01.mopimg.cn/imgs/20180702/20180702_c12a04208c276a5f9adef630bda4dd61.JPEG",
            "position":"男频","bookName":"鬼吹灯","showTime":"2019-05-07 ~ 2019-09-15","createTime":"2019-05-07","status":"在线","createAdmin":"A"
          },
          {"bannerImage":"http://images01.mopimg.cn/imgs/20180706/20180706_8c97b34a6c53fe256c5dc07493541df9.JPEG",
            "position":"女频","bookName":"鬼吹灯1","showTime":"2019-05-07 ~ 2019-09-15","createTime":"2019-05-07","status":"在线","createAdmin":"B"
          },
        ],
        pageNo: 1,
        pageSize: 10,
        currentPage: 1,
        totalSize: 0,
        offlineDialog: false,
        offlineDialog2: true,
        sort_prop: 'createTime',
        sort_order: 'desc',
        reason: '',
        textSize: 0,
      }
    },
    created() {
      this.getBannerWxDetail()
    },
    methods: {
      watchSize() {
        if(this.reason.length == 50){
          this.textSize = 50
          return false
        }else {
          this.textSize = this.reason.length
        }
      },
      getBannerWxDetail() {

      },
      handleSizeChange(val) {
        this.pageSize = val
        this.getBannerWxLists()
      },
      handleCurrentChange(val) {
        this.pageNo = val
        this.getBannerWxLists()
      },
      clearData() {
        this.$refs.bannerWxForm.resetFields()
        this.banner_wx_condition.status = '999'
        this.banner_wx_condition.bookName = ''
        this.banner_wx_condition.position = '999'
      },
      sortChange: function(column, prop, order) {
        this.sort_prop = column.prop
        this.sort_order = column.order.replace('ending','')
        this.getBannerWxLists()
      },
    }
  }
</script>
<style lang="scss" scoped>
    .banner-detail-box{
        width: 95%;
        margin: 0 auto;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin-top: 20px;
    }
    .banner-detail-item{
        margin-right: 20px;
        margin-bottom: 10px;
        .item-name{
            font-size: 14px;
            font-weight: 600;
        }
    }
    .operat-info{
        margin-top: 20px;
        .operat-title{
            display: block;
            float: left;
        }
        .operat-reason{
            float: left;
            span{
                display: block;
            }
        }
    }
    .head-img-title{
        margin-top: 2px;
        display: block;
        float: left;
    }
    .head-img-url{
        display: inline-block;
        text-align: center;
        img{
            width: 100px;
            height: 100px;
        }
        .banner-detail-btn-box{
            margin-top: 20px;
            margin-bottom: 20px;
            .banner-detail-btn{
                display: inline-block;
            }
        }
    }
    .line{
        width: 100%;
        height: 2px;
        background: #e0e0e0;
    }
</style>
