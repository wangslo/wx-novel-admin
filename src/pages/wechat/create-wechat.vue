<template>
  <div class="accountInfo-page">
    <div class="accountInfo-header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>公众号管理</el-breadcrumb-item>
        <el-breadcrumb-item>开设公众号</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="accountInfo-body">
      <el-form ref="wechatForm" :model="wechatForm" :rules="accountInfoRules" label-width="100px" size="small"
               class="account-info-form" label-position="left">
        <el-form-item label="公众号名称" required prop="wechatName">
          <el-input v-model="wechatForm.wechatName" maxlength="20"></el-input>
          <span>（20个字符以内）</span>
        </el-form-item>
        <el-form-item label="公众号类型" required prop="wechatType">
          <template>
            <el-radio v-model="wechatForm.wechatType" label="服务号">服务号</el-radio>
            <el-radio v-model="wechatForm.wechatType" label="订阅号">订阅号</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="认证主体" required prop="company">
          <el-input v-model="wechatForm.company" maxlength="11" placeholder="请输入公众号认证主体"></el-input>
        </el-form-item>
        <el-form-item label="原始ID" required prop="originId">
          <el-input v-model="wechatForm.originId" maxlength="11"></el-input>
          <span></span>
        </el-form-item>
        <el-form-item label="appSecret" required prop="appSecret">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model="wechatForm.appSecret"
            style="width: 17%"
          >
          </el-input>
          <span></span>
        </el-form-item>
        <el-form-item label="APPID" required prop="appId">
          <el-input v-model="wechatForm.appId" maxlength="11"></el-input>
          <span></span>
        </el-form-item>
        <el-form-item label="二维码：" required prop="qrcode" class="banner-wx-setup-img">
          <div class="img-box">
            <img v-if="wechatForm.qrcode" :src="wechatForm.qrcode" class="avatar">
            <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
          </div>
          <el-upload
            class="banner-wx-img-upload"
            action="http://test-dev.admin.dftoutiao.com/banner/upload"
            :http-request="uploadBanner"
            :before-upload="beforeAvatarUpload"
            list-type="picture"
            :show-file-list="false">
            <el-button size="small" type="primary" style="margin-left:10px;">上传二维码</el-button>
            <div>请上传公众号二维码</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="用户选择*" required prop="uid">
          <el-select v-model="wechatForm.uid" placeholder="请选择用户" @change="inputDept">
            <template v-for="(name,key,index) in users">
              <el-option :label="name" :value="key"></el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('wechatForm')" :loading="isSave">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>

  const cityOptions = ['上海', '北京', '广州', '深圳'];


  import {orgModuleApi} from '../../api/main'

  export default {
    name: 'openWechat',
    data() {
      var checkPhone = (rule, value, callback) => {
        const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
        // const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
        if (!value) {
          return callback(new Error('手机号不能为空'));
        } else if (!phoneReg.test(value)) {
          callback(new Error('请输入正确格式的手机号'))
        } else {
          callback()
        }
      }
      var checkPassword = (rule, value, callback) => {
        const pswReg = /^[a-zA-Z0-9]{6,12}$/
        if (!value) {
          return callback(new Error('密码不能为空'));
        } else if (value.toString().length < 6 || value.toString().length > 12) {
          callback(new Error('密码长度为6 - 12个字符'))
        } else if (!pswReg.test(value)) {
          callback(new Error('请输入正确的密码格式'))
        } else {
          callback()
        }
      }
      var checkAccount = (rule, value, callback) => {
        const accountReg = /^[a-zA-Z]{0,20}$/
        if (!value) {
          return callback(new Error('账号不能为空'));
        } else if (value.toString().length <= 0 || value.toString().length > 20) {
          callback(new Error('20个英文字符以内'))
        } else if (!accountReg.test(value)) {
          callback(new Error('账号格式不正确'))
        } else {
          callback()
        }
      }
      return {
        wechatForm: {
          wechatName: '',
          wechatType: '',
          company: '',
          originId: '',
          appId: '',
          appSecret: '',
          qrcode: '',
          //qrcode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAIAAACzY+a1AAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAA7EAAAOxAGVKw4bAAADZ0lEQVR4nO2dS27kMAwF48Hc/8o9yzgNMKBMUnZNVy0DWzK6wDzI+vh4vV5fQubP3Q8gVVSIR4V4VIhHhXhUiEeFeFSIR4V4VIhHhXhUiEeFeFSIR4V4VIjn74V7juNof47zzPO5/WhGOnqG1etXn62rzdW+fsEqxKNCPCrEcyULz1RWT2XybDXzIipZm7l+4ndIYhXiUSEeFeKpZuGZzP/0rgyL+q2M4TLtZJj4HX7BKsSjQjwqxNOZhdNU8iPK1K78uxGrEI8K8agQz9OzMMqqrrHg6vUPzEurEI8K8agQT2cWTuREJv+iv2fer0Z9nVnN1M15aRXiUSEeFeKpZuHEWsqJebtKpq72tRmrEI8K8agQz5UsfMJ7wkrOrbYf8YTf4csq/A9QIR4V4uncX7i6F6Lr3WaGTG6t9js9fk1iFeJRIR4V4plaO7O6bnPnfF7lGSbW7BTHl1YhHhXiUSGeqf2F0Tgvuv5M5frMHsTo79N7E4fmFK1CPCrEo0I8x4VBycTYLmq/QlcGR/dWzsdp3NdoFeJRIR4V4rmShaX+mjJjNXen++1ad+p84SeiQjwqxLNjT8XqGZ5dc4ereTaxBnViHdAbViEeFeJRIZ7qOtKJ9ZOV+b8zE2efZtYEVdq/gFWIR4V4VIhnxxlslTUvGSrzfJlrunJu6OxTqxCPCvGoEM/u+cIffQ/vPejKv8rZNBNn3LxhFeJRIR4V4pl6R/qEc2Em7t3ZZhKrEI8K8agQT3VPxSoTuTixFyLT18S9riP9RFSIR4V47szCTJt3vYcEfdfCKsSjQjwqxNOZhdPfF5xoZ/q8mImzCN6wCvGoEI8K8dy5diZiej971OZd5+Y4Lvx0VIhHhXg6v1NRYfX80sq70K45y65+i1iFeFSIR4V4qvsLu/baV/qayKGudS6ZZ/abTZ+OCvGoEM/UdyoiKu8YK/dWzmPL/H0Vx4XyjQrxqBDPjnNnKnTtf1/N1659/Ru+V2wV4lEhHhXieWIWrubc9HcHM1TmGotYhXhUiEeFeDqzsGtJ6sSZNZUcndhf77hQvlEhHhXi2b3XPqLyjYjomjMT71cjhs4djbAK8agQjwrxPHF/oSxhFeJRIR4V4lEhHhXiUSEeFeJRIR4V4lEhHhXiUSEeFeJRIR4V4lEhnn/+wiZlJ+LAFwAAAABJRU5ErkJggg==',
          uid: '',
        },
        users: {},
        accountInfoRules: {
          wechatName: [{required: true, message: '请输入公众号名称', trigger: 'blur'}],
          company: [{required: true, message: '请输入认证主体', trigger: 'blur'}],
          originId: [{required: true, message: '请输入原始ID', trigger: 'blur'}],
          appSecret: [{required: true, message: '请输入appSecret', trigger: 'blur'}],
          appId: [{required: true, message: '请输入appId', trigger: 'blur'}],
          wechatType: [{required: true, message: '请选择公众号类型', trigger: 'blur'}],
          qrcode: [{required: true, message: '请上传二维码', trigger: 'blur'}],
          uid: [{required: true, message: '请选择用户', trigger: 'blur'}],
        },
        isSave: false,

        checkAll: false,
        checkedCities: ['上海', '北京'],
        cities: cityOptions,
        isIndeterminate: true

      }
    },
    created() {
      this.getWechatUsers()
    },
    methods: {
      beforeAvatarUpload(file) {
        var params = {}
        var _this = this
        _this.tableData = []

        var reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onload = function (e) {
          console.log(e.target.result)
          _this.wechatForm.qrcode = e.target.result
        }
        console.log(file)

        return false

      },
      getWechatUsers() {
        var params = {}
        var _this = this
        _this.tableData = []
        orgModuleApi.wechatRelationToUser(params).then((res) => {
          console.log(res)
          this.users = res.data
//          if(res.success){
//            res.data.data.map((item,index)=>{
//              _this.tableData.push({
//                id: item.id,
//                account: item.username,
//                realName: item.name,
//                branch: item.dept,
//                createTime: _this.common.getDate((item.registDate/1000)),
//                status: item.status==1?'正常':'禁用',
//              })
//            })
//            _this.totalSize = parseInt(res.data.total)
//          }
        })

      },
      submitWechat() {

        var params = {
          uid: this.wechatForm.uid,
          appid: this.wechatForm.appId,
          name: this.wechatForm.wechatName,
          type: this.wechatForm.wechatType,
          originId: this.wechatForm.originId,
          appsecret: this.wechatForm.appSecret,
          //belongto:this.wechatForm.company,
          qrcode: this.wechatForm.qrcode,
        }
        var _this = this
        _this.tableData = []
        orgModuleApi.createWechat(params).then((res) => {
          console.log(res)
          if (res.success) {
            this.$message.success('保存成功')
            this.$refs.wechatForm.resetFields()
            _this.isSave = false
          }
        })
      },
      handleCheckAllChange(val) {
        this.checkedCities = val ? cityOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      },
      submitForm(formName) {
        this.isSave = true
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.submitWechat();
          } else {
            console.log('error submit!!');
            this.isSave = false
            return false;
          }
        });
      },
      saveInfo() {
        var _this = this
        var params = {
          token: sessionStorage.getItem('token'),
          account: this.wechatForm.account,
          nickname: this.wechatForm.realName,
          mobile: this.wechatForm.phone,
          department: this.wechatForm.branch,
          password: this.wechatForm.password,
          auths: this.wechatForm.power.join('-'),
        }
        orgModuleApi.addAccountInfo(params).then(res => {
          if (res.code == 0) {
            this.$message.success('保存成功')
            this.$refs.wechatForm.resetFields()
            _this.isSave = false
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .accountInfo-page {
    .accountInfo-header {
      height: 50px;
      padding-left: 15px;
      .el-breadcrumb {
        font-size: 16px;
        margin-top: 15px;
      }
    }
    .accountInfo-body {
      margin-left: 15px;
      margin-right: 15px;
      background: #ffffff;
      padding: 15px;
    }
    .el-input {
      width: 300px;
    }
    .el-button {
      width: 200px;
    }

  }

  .banner-wx-setup-img {
    .img-box {
      width: 200px;
      height: 200px;
      border: 1px solid #e0e0e0;
      float: left;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
