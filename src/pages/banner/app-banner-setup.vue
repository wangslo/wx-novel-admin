<template>
  <div class="banner-app-setup-page">
    <div class="banner-app-setup-header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item >banner管理</el-breadcrumb-item>
        <el-breadcrumb-item >设置APP</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="banner-app-setup-body">
      <el-form ref="bannerAppSetupForm" :model="banner_app_setup_condition" class="banner-app-setup-form" label-width="140px" size="small">
        <el-form-item label="banner名称：">
          <el-input v-model="banner_app_setup_condition.bannerName" placeholder="请输入banner名称（情况控制在20个汉字内）"></el-input>
        </el-form-item>
        <el-form-item label="选择位置：">
          <el-select v-model="banner_app_setup_condition.position" placeholder="请选择展示位置">
            <el-option label="请选择展示位置" value="999"></el-option>
            <el-option label="APP书城一位" value="0"></el-option>
            <el-option label="APP书城二位" value="1"></el-option>
            <el-option label="APP书城三位" value="2"></el-option>
            <el-option label="APP我的一位" value="3"></el-option>
            <el-option label="APP书架一位" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上传图片：" class="banner-app-setup-img">
          <div class="img-box">
            <img v-show="banner_app_setup_condition.bannerImg != ''" :src="banner_app_setup_condition.bannerImg"/>
          </div>
          <el-upload
            class="banner-app-img-upload"
            action="http://test-dev.admin.dftoutiao.com/banner/upload"
            :http-request="uploadBanner"
            :on-success="getImg"
            list-type="picture"
            :show-file-list="false">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="跳转位置或链接：">
          <el-autocomplete
            v-model="banner_app_setup_condition.banner_url"
            :fetch-suggestions="queryBannerUrl"
            placeholder="请输入书籍名称检索或h5链接"
            style="width: 420px;"
            :hide-loading="loading"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="展示时间：">
          <el-col :span="11" class="startTime">
            <el-form-item>
              <el-date-picker
                type="datetime"
                format="yyyy-MM-dd hh:mm:ss"
                placeholder="起始时间"
                v-model="banner_app_setup_condition.show_start_time"
                :picker-options="showPickerBeginDateBefore"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2" style="text-align:center">至</el-col>
          <el-col :span="11" class="endTime">
            <el-form-item>
              <el-date-picker
                type="datetime"
                format="yyyy-MM-dd hh:mm:ss"
                placeholder="结束时间"
                v-model="banner_app_setup_condition.show_end_time"
                :picker-options="showPickerBeginDateAfter"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item style="text-align: center;">
          <el-button type="primary" style="width: 100px;" @click="saveBannerApp">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  import {msgModuleApi} from '../../api/main'
  export default {
    name: 'appBannerSetup',
    data() {
      return {
        search_banner_url: [],
        loading: false,
        banner_app_setup_condition: {
          bannerName: '',
          position: '999',
          bannerImg: '',
          banner_url: '',
          show_start_time: '',
          show_end_time: '',
        },
        showPickerBeginDateBefore:{
          disabledDate: (time) => {
            let beginDateVal = this.banner_app_setup_condition.show_end_time;
            if (beginDateVal) {
              return time.getTime() > beginDateVal;
            }
          }
        },
        showPickerBeginDateAfter:{
          disabledDate: (time) => {
            let beginDateVal = this.banner_app_setup_condition.show_start_time;
            if (beginDateVal) {
              return time.getTime() < beginDateVal;
            }
          }
        },
      }
    },
    methods: {
      getImg(res, file, fileList) {
        this.$message.success('图片上传成功')

      },
      uploadBanner(e){
        var _this = this
        let uploadData = new FormData();
        uploadData.append('file', e.file);
        msgModuleApi.uploadFile(uploadData).then(res=>{
          if(res.success) {
            _this.banner_app_setup_condition.bannerImg = res.data.url
          }
        })
      },
      queryBannerUrl(params,cb) {
        if(params != ''){
          this.loading = false
          this.search_banner_url = [{value:'gggfffdddsss'}]
        }else {
          this.loading = true
          this.search_banner_url = []
        }
        setTimeout(() => {
          cb(this.search_banner_url);
        }, 300);
      },
      saveBannerApp() {
        console.log(this.banner_app_setup_condition.banner_url)
      }
    }
  }
</script>
<style lang="scss">
  .banner-app-setup-page{
    .banner-app-setup-header{
      height: 50px;
      padding-left: 15px;
      .el-breadcrumb{
        font-size: 16px;
        margin-top: 15px;
      }
    }
    .banner-app-setup-body{
      margin-left: 15px;
      margin-right: 15px;
      .banner-app-setup-form{
        width: 560px;
        .banner-app-setup-img{
          .img-box{
            width: 100px;
            height: 100px;
            border: 1px solid #e0e0e0;
            float: left;
            img{
              width: 100%;
              height: 100%;
            }
          }
          .banner-app-img-upload{
            float: left;
            margin-top: 35px;
            margin-left: 20px;
            .el-button{
              width: 100px;
            }
          }
        }

      }
    }
    .el-dialog__header{
      padding: 0!important;
    }
    .el-dialog__body{
      span{
        display: block;
        text-align: center;
        margin-bottom: 10px;
      }
    }
  }
</style>
