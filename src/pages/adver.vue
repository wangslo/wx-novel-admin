<template>
  <div class="adver-page">
    <div class="adver-header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item >广告管理</el-breadcrumb-item>
        <el-breadcrumb-item >广告数据</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="adver-body">
      <el-form ref="adverForm" :model="adver_condition" class="adver-form" label-width="80px" :rules="adverRules" size="small">
        <el-form-item label="账号" prop="account">
          <el-input v-model="adver_condition.account"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="adver_condition.phone"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="phone">
          <el-input v-model="adver_condition.nickName"></el-input>
        </el-form-item>
        <el-form-item label="部门" prop="branch">
          <el-select v-model="adver_condition.branch" placeholder="请选择部门">
            <el-option label="全部" value="999"></el-option>
            <el-option label="部门一" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker
            v-model="adver_condition.create_start_time"
            type="date"
            :picker-options="pickerBeginDateBefore"
            format="yyyy-MM-dd"
            placeholder="">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="至" label-width="40px">
          <el-date-picker
            v-model="adver_condition.create_end_time"
            type="date"
            format="yyyy-MM-dd"
            :picker-options="pickerBeginDateAfter"
            placeholder="">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="账号状态" prop="status">
          <el-select v-model="adver_condition.status" placeholder="请选择账号状态">
            <el-option label="全部" value="999"></el-option>
            <el-option label="部门一" value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Adver',
    data() {
      return {
        adver_condition: {
          account: '',
          phone: '',
          nickName: '',
          branch: '999',
          create_start_time: '',
          create_end_time: '',
          status: '999',
        },
        pickerBeginDateBefore:{
          disabledDate: (time) => {
            let beginDateVal = this.adver_condition.create_end_time;
            if (beginDateVal) {
              return time.getTime() > beginDateVal;
            }
          }
        },
        pickerBeginDateAfter:{
          disabledDate: (time) => {
            let beginDateVal = this.adver_condition.create_start_time;
            if (beginDateVal) {
              return time.getTime() < beginDateVal;
            }
          }
        },
        adverRules: {
          account: [/*{ validator: validateAccount, trigger: 'blur' }*/],
          phone: [],
          nickName:[],
          branch: [],
          create_time: [],
          status: [],
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .adver-page{
    .adver-header{
      height: 50px;
      padding-left: 15px;
      .el-breadcrumb{
        font-size: 16px;
        margin-top: 15px;
      }
    }
    .adver-body{
      margin-left: 15px;
      margin-right: 15px;
      .adver-form{
        .el-form-item{
          float: left;
        }
      }
    }
  }
</style>
