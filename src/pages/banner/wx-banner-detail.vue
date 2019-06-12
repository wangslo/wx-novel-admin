<template>
  <div class="banner-detail-page">
    <div class="banner-detail-header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>推荐管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path: '/wx-banner-list'}">banner管理</el-breadcrumb-item>
        <el-breadcrumb-item>{{book_name}}详情</el-breadcrumb-item>
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
          <span class="item-name">书籍名称：</span>
          <span class="item-value">{{book_name}}</span>
        </div>
        <div class="banner-detail-item">
          <span class="item-name">状态：</span>
          <span class="item-value">{{status}}</span>
        </div>
      </div>
      <div class="banner-detail-item" v-if="banner_img">
        <span class="item-name head-img-title">banner图：</span>
        <div class="head-img-url">
          <img :src="banner_img" style="width:300px;height:180px"/>
          <div class="banner-detail-btn-box">
            <el-button v-if="status == '待上线'" type="warning" size="mini" class="banner-detail-btn" @click="handleEdit">编辑</el-button>
            <el-button v-if="status == '在线'" type="danger" size="mini" class="banner-detail-btn" @click="handleOffLine">下线</el-button>
          </div>
        </div>
      </div>
      <div class="line" v-if="reasons.length > 0"></div>
      <div class="banner-detail-item operat-info" v-if="reasons.length > 0">
        <span class="item-name operat-title">操作详情：</span>
        <div class="operat-reason">
          <template v-for="reason in reasons">
            <span class="item-value">{{reason}}</span>
          </template>
        </div>
      </div>
    </div>
    <div class="dialog-div">
      <el-dialog title="" :visible.sync="offlineDialog" width="500px" center>
        <span>你确认要将“{{book_name}}”下线吗？</span>
        <span>下线后，将无法再次进行修改！</span>
        <el-input type="textarea"
                  :rows="3"
                  resize="none"
                  maxlength='50'
                  placeholder="请输入下线原因（不得少于5个汉字）"
                  @keyup.native="watchSize"
                  v-model="reason">
        </el-input>
        <p style="margin: 0;"><span style="text-align: right;">{{textSize}}/50</span></p>
        <span slot="footer" class="dialog-footer">
            <el-button @click="offlineDialog = false">取 消</el-button>
            <el-button type="primary" :disabled="reason.length == 0" @click="setOffline">确 认</el-button>
          </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import {orgModuleApi} from '../../api/main'

  export default {
    name: 'bannerWxDetail',
    data() {
      return {
        status: '',
        position: '',
        show_time: "",
        create_time: '',
        book_name: '',
        banner_img: "",
        reasons: [],
        offlineDialog: false,
        reason: '',
        textSize: 0,
      }
    },
    created() {
      this.getBannerWxDetail()
    },
    methods: {
      watchSize() {
        if (this.reason.length == 50) {
          this.textSize = 50
          return false
        } else {
          this.textSize = this.reason.length
        }
      },
      setOffline() {
        var _this = this
        var params = {
          bid: _this.$route.query.id,
          remark: _this.reason,
        }
        orgModuleApi.offBanner(params).then(res=>{
          console.log(res)
          if(res.success) {
            _this.offlineDialog = false
            _this.getBannerWxDetail()
          }
        })
      },
      handleOffLine() {
        this.reason = ''
        this.offlineDialog = true
      },
      handleEdit() {
        this.$router.push({
          path: '/wx-banner-setup',
          query: {
            id: this.$route.query.id
          }
        })
      },
      getBannerWxDetail() {
        var _this = this
        var params = {
          bid: this.$route.query.id
        }
        orgModuleApi.getBannerInfo(params).then(res=>{
          console.log(res)
          if(res.success) {
            _this.status = res.data.data.status == 1 ? '在线' : res.data.data.status == 0 ? '待上线' : '已下线'
            _this.position = res.data.data.bannerGroup == 1 ? '女频' : '男频'
            _this.show_time = _this.common.getDate2(res.data.data.startDate) + ' 至 ' +  _this.common.getDate2(res.data.data.endDate)
            _this.create_time = _this.common.getDate(res.data.data.createDate)
            _this.book_name = res.data.data.bookname
            _this.banner_img = res.data.data.imgsrc
            _this.reasons = res.data.log
          }
        })
      },
    }
  }
</script>
<style lang="scss">
  .banner-detail-page {
    .banner-detail-header {
      height: 50px;
      padding-left: 15px;
      .el-breadcrumb {
        font-size: 16px;
        margin-top: 15px;
      }
    }
    .banner-detail-body {
      padding-left: 30px;
      .banner-detail-box {
        margin: 0 auto;
        display: flex;
        flex-direction: column;
      }
      .banner-detail-item {
        margin-bottom: 10px;
        .item-name {
          font-size: 14px;
          display: inline-block;
          height: 100%;
          width: 80px;
          text-align: right;
          font-weight: 600;
        }
        .item-value{
          font-size: 14px;
        }
      }
      .operat-info {
        margin-top: 20px;
        .operat-title {
          display: block;
          float: left;
        }
        .operat-reason {
          float: left;
          span {
            display: block;
          }
          .item-value{
            margin-top: 0;
          }
        }
      }
      .line {
        width: 100%;
        height: 2px;
        background: #e0e0e0;
      }
      .head-img-title {
        margin-top: 2px;
        display: block;
        float: left;
      }
      .head-img-url {
        display: inline-block;
        img {
          width: 100px;
          height: 100px;
        }
        .banner-detail-btn-box {
          margin-top: 20px;
          margin-bottom: 20px;
          .banner-detail-btn {
            display: inline-block;
          }
        }
      }
    }
    .el-dialog__header {
      padding: 0 !important;
    }
    .el-dialog__body {
      span {
        display: block;
        text-align: center;
        margin-bottom: 10px;
      }
    }
  }
</style>
