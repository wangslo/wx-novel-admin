<template>
  <div class="replyMsg-page">
    <div class="replyMsg-header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>消息服务</el-breadcrumb-item>
        <el-breadcrumb-item>消息回复</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="replyMsg-body">
      <div class="create-btn">
        <el-button type="primary" size="mini" @click="createMsg">新建消息</el-button>
      </div>
      <el-table :data="tableData" style="width:100%;" stripe border>
        <el-table-column prop="msgtype" label="消息类型" width="180" align="center"></el-table-column>
        <el-table-column prop="keywords" label="关键字" width="180" align="center"></el-table-column>
        <el-table-column prop="onlinetime" label="上线时间" width="180" align="center"></el-table-column>
        <el-table-column prop="offlinetime" label="下线时间" width="180" align="center"></el-table-column>
        <el-table-column prop="status" label="状态" width="180" align="center"></el-table-column>
        <el-table-column label="操作" min-width="200" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDel(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10,20, 50, 100, 150]"
        background
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalSize">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import {msgModuleApi} from '../../api/main'
  export default {
    name: 'replyMsg',
    data() {
      return {
        tableData: [],
        pageNo: 1,
        pageSize: 10,
        currentPage: 1,
        totalSize: 0,
      }
    },
    created() {
      this.getMsgList()
    },
    methods: {
      getMsgList() {
        var _this = this
        var params = {
          appid: 'wx45a447d8dc271447',
          page: _this.pageNo,
          size: _this.pageSize,
        }
        msgModuleApi.getMsgtem(params).then((res)=>{
          console.log(res)
          if(res.success) {
            res.data.content.map((item,index)=>{
              var status = ''
              if(item.status == 0){
                status = '待上线'
              }
              if(item.status == 1){
                status = '上线'
              }
              if(item.status == 2){
                status = '下线'
              }
              _this.tableData.push({
                msgtype: item.type == 1 ? '关注回复' : '关键字回复',
                keywords: item.type == 1 ? '-': item.kwd,
                onlinetime: _this.common.getDate(item.startDate),
                offlinetime: _this.common.getDate(item.endDate),
                status: status,
              })
            })
            _this.totalSize = parseInt(res.data.totalElements)
          }
        })
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.getMsgList()
      },
      handleCurrentChange(val) {
        this.pageNo = val
        this.getMsgList()
      },
      createMsg() {
        this.$router.push({
          name: 'create-msg'
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .replyMsg-page{
    .replyMsg-header{
      height: 50px;
      padding-left: 15px;
      .el-breadcrumb{
        font-size: 16px;
        margin-top: 15px;
      }
    }
    .replyMsg-body{
      margin-left: 15px;
      margin-right: 15px;
      .create-btn{
        margin-bottom: 30px;
      }
    }
  }
</style>
