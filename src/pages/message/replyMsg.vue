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
  export default {
    name: 'replyMsg',
    data() {
      return {
        tableData: [
          {
            msgtype: '212',
            keywords: '1212',
            onlinetime: '1212',
            offlinetime: '2121',
            status: '2112',
          }
        ],
        pageNo: 0,
        pageSize: 10,
        currentPage: 1,
        totalSize: 0,
      }
    },
    methods: {
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
