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
        <el-form ref="bannerWxSetupForm" :model="banner_wx_setup_condition" class="banner-wx-setup-form" :rules="banner_wx_setup_rules"
                 label-width="140px" size="small">
          <el-form-item label="选择位置：" prop="position">
            <el-select v-model="banner_wx_setup_condition.position" placeholder="请选择展示位置">
              <el-option label="请选择展示位置" value=""></el-option>
              <el-option label="男频" value="0"></el-option>
              <el-option label="女频" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上传图片：" class="banner-wx-setup-img" prop="bannerImg">
            <div class="img-box">
              <img v-show="banner_wx_setup_condition.bannerImg != ''" :src="banner_wx_setup_condition.bannerImg"/>
            </div>
            <el-upload
              class="banner-wx-img-upload"
              action=""
              list-type="picture"
              :show-file-list="false"
              :before-upload="beforeAvatarUpload">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="书籍名称：" prop="banner_name">
            <el-autocomplete
              v-model="banner_wx_setup_condition.banner_name"
              :fetch-suggestions="queryBannerUrl"
              placeholder="请输入书籍名称检索"
              @select="handleSelect"
              style="width: 420px;"
              :hide-loading="loading"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item label="展示时间：">
            <el-col :span="11" class="startTime">
              <el-form-item>
                <el-input id="startTime" v-model="banner_wx_setup_condition.show_start_time" placeholder="开始时间"></el-input>
                <span v-show="show_time" style="color: #F56C6C;font-size: 12px;">请设置展示时间</span>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2" style="width:20px;text-align:center">至</el-col>
            <el-col :span="11" class="endTime">
              <el-form-item>
                <el-input id="endTime" v-model="banner_wx_setup_condition.show_end_time" placeholder="结束时间"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item style="text-align: center;">
            <el-button type="primary" style="width: 100px;" @click="submitForm('bannerWxSetupForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
  import {orgModuleApi,msgModuleApi} from '../../api/main'

  export default {
    name: 'wxBannerSetup',
    inject:['reload'],
    data() {
      return {
        search_banner_name: [],
        loading: false,
        banner_wx_setup_condition: {
          position: '',
          bannerImg: '',
          banner_name: '',
          show_start_time: '',
          show_end_time: '',
        },
        banner_wx_setup_rules: {
          position: [{ required: true, message: '请先选择展示位置'}],
          bannerImg: [{ required: true, message: '请先上传图片'}],
          banner_name: [{ required: true, message: '请先确认书籍名称'}],
        },
        show_time:false,
        uploadFile: '',
        chooseBook: {
          value: '',
          label: '',
          name: '',
        },
        id: '',
        imgsrc: '',
        idx: '',
      }
    },
    created() {
      if(this.$route.query.id != undefined){
        this.id = this.$route.query.id
        this.initBanner()
      }
    },
    mounted() {
      var _this = this
      var start = laydate.render({
        elem: '#startTime',
        type: 'datetime',
        format: 'yyyy-MM-dd HH:mm',
        min: this.common.getDateTime(),
        ready: function () {
          $(".laydate-btns-now").hide();
        },
        done: function (value, date, endDate) {
          if(value != ''){
            _this.banner_wx_setup_condition.show_start_time = value
            date.month = date.month - 1
            end.config.min = date
          }
        }
      });
      var end = laydate.render({
        elem: '#endTime',
        type: 'datetime',
        format: 'yyyy-MM-dd HH:mm',
        min: this.common.getDateTime(),
        ready: function () {
          $(".laydate-btns-now").hide();
        },
        done: function (value, date, endDate) {
          if(value != ''){
            _this.banner_wx_setup_condition.show_end_time = value
            date.month = date.month - 1
            start.config.max = date
          }
        }
      });
    },
    methods: {
      initBanner() {
        var _this = this
        var params = {
          bid: this.$route.query.id
        }
        orgModuleApi.getBannerInfo(params).then(res=>{
          if(res.success) {
            _this.banner_wx_setup_condition = {
              position: res.data.bannerGroup.toString(),
              bannerImg: res.data.imgsrc,
              banner_name: '',
              show_start_time: _this.common.getDate2(res.data.startDate),
              show_end_time: _this.common.getDate2(res.data.endDate),
            }
            _this.chooseBook = {
              value: '',
              label: res.data.bookid,
              name: '',
            },
            _this.queryNovelsById(_this,res.data.bookid)
            _this.imgsrc = res.data.imgsrc
            _this.idx = res.data.idx
          }
        })
      },
      queryNovelsById(e,bookid) {
        var params = {
          id: bookid,
        }
        msgModuleApi.getNovels(params).then(res=>{
          if(res.success) {
            e.banner_wx_setup_condition.banner_name = res.data.name + ' / ' + res.data.author + ' / ' + res.data.ufr
            e.chooseBook = {
              value: res.data.name + ' / ' + res.data.author + ' / ' + res.data.ufr,
              label: res.data.bookid,
              name: res.data.name,
            }
          }
        })
      },
      beforeAvatarUpload (file) {
        let _this = this
        if (file.type.indexOf('image')<0) {
          this.$message.error('图片格式不正确')
          return false
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        const isSize = new Promise(function(resolve, reject) {
          let width = 750;
          let height = 385;
          let _URL = window.URL || window.webkitURL;
          let img = new Image();
          img.onload = function() {
            let valid = img.width == width && img.height == height;
            valid ? resolve() : reject();
          }
          img.src = _URL.createObjectURL(file);
        }).then(() => {
          let _URL = window.URL || window.webkitURL;
          _this.banner_wx_setup_condition.bannerImg = _URL.createObjectURL(file);
          _this.uploadFile = file
          return file;
        }, () => {
          _this.banner_wx_setup_condition.bannerImg = ''
          _this.$message.error('上传的banner必须是等于750*425!')
          return Promise.reject();
        });
        return isSize
      },
      handleSelect(item) {
        this.chooseBook = item
      },
      queryBannerUrl(bookname, cb) {
        var _this = this
        if (bookname != '') {
          this.loading = false
          var params = {
            kwd: bookname,
            page: 1,
            size: 100,
          }
          msgModuleApi.searchNovel(params).then(res=>{
            if(res.success){
              res.data.list.map((item,index)=>{
                _this.search_banner_name.push({
                  value: item.name + ' / ' + item.author + ' / ' + item.ufr,
                  label: item.bookid,
                  name: item.name,
                })
              })
            }
          })
        } else {
          this.loading = true
          this.search_banner_name = []
        }
        setTimeout(() => {
          cb(this.search_banner_name);
        }, 300);
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.banner_wx_setup_condition.show_start_time == '' || this.banner_wx_setup_condition.show_end_time == ''){
              this.show_time = true
              return false
            }else {
              this.show_time = false
              this.saveBannerWx();
            }
          } else {
            if(this.banner_wx_setup_condition.show_start_time == '' || this.banner_wx_setup_condition.show_end_time == ''){
              this.show_time = true
              return false
            }else {
              this.show_time = false
            }
            // this.$message.error('提交失败!!');
            return false;
          }
        });
      },
      saveBannerWx() {
        let _URL = window.URL || window.webkitURL;
        _URL.revokeObjectURL(this.banner_wx_setup_condition.bannerImg)

        var _this = this
        if(_this.uploadFile == ''){
          _this.saveBannerNoFile()
        }else {
          _this.saveBanner()
        }
      },
      saveBanner() {
        var _this = this
        let uploadData = new FormData()
        uploadData.append('id',_this.id)
        uploadData.append('imgsrc',_this.imgsrc)
        uploadData.append('imgfile',_this.uploadFile)
        uploadData.append('bannerGroup',_this.banner_wx_setup_condition.position)
        uploadData.append('bookid',_this.chooseBook.label)
        uploadData.append('bookname',_this.chooseBook.name)
        uploadData.append('idx',_this.idx)
        uploadData.append('startDate',_this.banner_wx_setup_condition.show_start_time)
        uploadData.append('endDate',_this.banner_wx_setup_condition.show_end_time)
        uploadData.append('status', 0)

        orgModuleApi.addBanner(uploadData).then(res=>{
          console.log(res)
          if(res.success){
            this.$message.success('提交成功！')
            _this.reload()
          }
        })
      },
      saveBannerNoFile() {
        var _this = this
        var params = {
          id: _this.id,
          imgsrc: _this.imgsrc,
          imgfile: _this.uploadFile,
          bannerGroup: _this.banner_wx_setup_condition.position,
          bookid: _this.chooseBook.label,
          bookname: _this.chooseBook.name,
          idx: _this.idx,
          startDate: _this.banner_wx_setup_condition.show_start_time,
          endDate: _this.banner_wx_setup_condition.show_end_time,
          status: 0,
        }

        orgModuleApi.editBanner(params).then(res=>{
          console.log(res)
          if(res.success){
            this.$message.success('提交成功！')
            _this.reload()
          }
        })
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
  .layui-laydate-content>.layui-laydate-list {
    padding-bottom: 0px;
    overflow: hidden;
  }
  .layui-laydate-content>.layui-laydate-list>li{
    width:50%
  }
</style>
