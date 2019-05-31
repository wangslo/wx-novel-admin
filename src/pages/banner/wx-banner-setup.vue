<template>
  <div class="banner-wx-setup-page">
    <div class="banner-wx-setup-header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>banner管理</el-breadcrumb-item>
        <el-breadcrumb-item>创建banner</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="width: 100%">
      <div style="margin-left: 15px;width : 40%;float: left" class="banner-wx-setup-body">
        <el-form ref="bannerWxSetupForm" :model="banner_wx_setup_condition" class="banner-wx-setup-form"
                 label-width="140px" size="small">
          <el-form-item label="选择位置：">
            <el-select v-model="banner_wx_setup_condition.position" placeholder="请选择展示位置">
              <el-option label="请选择展示位置" value="999"></el-option>
              <el-option label="男频" value="1"></el-option>
              <el-option label="女频" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上传图片：" class="banner-wx-setup-img">
            <div class="img-box">
              <img v-show="banner_wx_setup_condition.bannerImg != ''" :src="banner_wx_setup_condition.bannerImg"/>
            </div>
            <el-upload
              class="banner-wx-img-upload"
              action="http://test-dev.admin.dftoutiao.com/banner/upload"
              :http-request="uploadBanner"
              :on-success="getImg"
              list-type="picture"
              :show-file-list="false">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="书籍名称：">
            <el-autocomplete
              v-model="banner_wx_setup_condition.banner_name"
              :fetch-suggestions="queryBannerUrl"
              placeholder="请输入书籍名称检索"
              style="width: 420px;"
              :hide-loading="loading"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item label="展示时间：">
            <el-col :span="11" class="startTime">
              <el-form-item>
                <el-input type="text" id="startTime" v-model="banner_wx_setup_condition.show_start_time" class="form-control" readonly placeholder="开始时间"></el-input>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2" style="width:20px;text-align:center">至</el-col>
            <el-col :span="11" class="endTime">
              <el-form-item>
                <el-input type="text" id="endTime" v-model="banner_wx_setup_condition.show_end_time" class="form-control" readonly placeholder="结束时间"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item style="text-align: center;">
            <el-button type="primary" style="width: 100px;" @click="saveBannerWx">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
  import {msgModuleApi} from '../../api/main'

  export default {
    name: 'wxBannerSetup',
    data() {
      return {
        search_banner_name: [],
        loading: false,
        banner_wx_setup_condition: {
          position: '999',
          bannerImg: '',
          banner_name: '',
          book_id: 0,
          show_start_time: '',
          show_end_time: '',
        },
      }
    },
    mounted() {
      var start = laydate.render({
        elem: '#startTime',
        type: 'datetime',
        min: this.common.getDateTime(),
        ready: function () {
          $(".laydate-btns-now").hide();
        },
        done: function (value, date, endDate) {
          if(value != ''){
            date.month = date.month - 1
            end.config.min = date
          }
        }
      });
      var end = laydate.render({
        elem: '#endTime',
        type: 'datetime',
        min: this.common.getDateTime(),
        ready: function () {
          $(".laydate-btns-now").hide();
        },
        done: function (value, date, endDate) {
          if(value != ''){
            date.month = date.month - 1
            start.config.max = date
          }
        }
      });
    },
    methods: {
      getImg(res, file, fileList) {
        this.$message.success('图片上传成功')
      },
      uploadBanner(e) {
        var _this = this
        let uploadData = new FormData();
        uploadData.append('thumb', e.file);
        msgModuleApi.uploadFile(uploadData).then(res => {
          if (res.success) {
            _this.banner_wx_setup_condition.bannerImg = res.data.url
          }
        })
      },
      queryBannerUrl(params, cb) {
        if (params != '') {
          this.loading = false
          this.search_banner_name = [{value: 'gggfffdddsss/asfasf'}]
        } else {
          this.loading = true
          this.search_banner_name = []
        }
        setTimeout(() => {
          cb(this.search_banner_name);
        }, 300);
      },
      saveBannerWx() {
        console.log('提交了')
        console.log(this.banner_wx_setup_condition.banner_name)
      },
    }
  }
</script>
<style lang="scss">
  .banner-wx-setup-page {
    .banner-wx-setup-header {
      height: 50px;
      padding-left: 15px;
      .el-breadcrumb {
        font-size: 16px;
        margin-top: 15px;
      }
    }
    .banner-wx-setup-body {
      margin-left: 15px;
      margin-right: 15px;
      .banner-wx-setup-form {
        width: 560px;
        .banner-wx-setup-img {
          .img-box {
            width: 300px;
            height: 180px;
            border: 1px solid #e0e0e0;
            float: left;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .banner-wx-img-upload {
            float: left;
            margin-top: 35px;
            margin-left: 20px;
            .el-button {
              width: 100px;
            }
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
