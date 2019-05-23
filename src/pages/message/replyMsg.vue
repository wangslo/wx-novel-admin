<template>
  <div class="replyMsg-page">
    <div class="replyMsg-header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path: '/replyMsg'}">消息服务</el-breadcrumb-item>
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
    <div class="dialog-box">
      <el-dialog title="" :visible.sync="delDialog" width="300px" center>
        <span>确认删除此消息类型吗？</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="delMsg(msgid)">确 认</el-button>
          <el-button @click="delDialog = false">取 消</el-button>
        </span>
      </el-dialog>
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
        msgid: '',
        delDialog: false,
      }
    },
    created() {
      this.getMsgList()
    },
    methods: {
      delMsg(id) {
        var _this = this
        var params = {
          appid: 'wx45a447d8dc271447',
          msgId: id
        }
        msgModuleApi.delMsgtem(params).then(res=>{
          console.log(res)
          if(res.success) {
            _this.delDialog = false
            _this.getMsgList()
          }
        })
      },
      handleEdit(idx, row) {
        this.$router.push({
          path: 'create-msg',
          query: {
            id: row.id
          }
        })
      },
      handleDel(idx, row) {
        this.msgid = row.id
        this.delDialog = true
      },
      getMsgList() {
        var _this = this
        var params = {
          appid: 'wx45a447d8dc271447',
          page: _this.pageNo,
          size: _this.pageSize,
        }
        _this.tableData = []
        msgModuleApi.getMsgtem(params).then((res)=>{
          console.log(res)
          if(res.success) {
            res.data.content.map((item,index)=>{
              var status = ''
              var now = new Date().getTime()
              if(item.startDate > now){
                status = '待上线'
              }
              if(item.startDate < now && item.endDate > now){
                status = '上线'
              }
              if(item.endDate < now){
                status = '下线'
              }
              _this.tableData.push({
                id: item.id,
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
<style lang="scss">
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
    .el-dialog__body{
      text-align: center;
    }
  }
</style>
