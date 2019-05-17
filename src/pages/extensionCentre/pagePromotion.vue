<template>
  <div class="pagePromotion-page">
    <div class="pagePromotion-header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>推广中心</el-breadcrumb-item>
        <el-breadcrumb-item>页面推广</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="pagePromotion-body">
      <div class="novel-table">
        <el-table :data="tableData" style="width:312px;" stripe border>
          <el-table-column label="序号" width="60" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index+ 1}} </span>
            </template>
          </el-table-column>
          <el-table-column prop="pagename" label="页面" width="100" align="center"></el-table-column>
          <el-table-column label="操作" width="150" align="center">
            <template slot-scope="scope">
              <div class="create-promotion" style="color: blue;cursor: pointer;" @click="openCreateBox(scope.$index, scope.row)">生成推广链接</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="dialog-box">
      <el-dialog title="生成推广链接" :visible.sync="createDialog" width="500px">
        <div class="dialog-body">
          <span>*渠道名称默认带入日期，可自行修改</span>
          <div class="url_param">
            <span>渠道名称：</span>
            <el-input v-model="channel_name" style="width: 200px;" size="mini"></el-input>
          </div>
          <div class="url_param">
            <span>推广入口页面：</span>
            <el-input v-model="promotion_page" style="width: 200px;" size="mini"></el-input>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="createDialog = false">取 消</el-button>
          <el-button type="primary" @click="closeCreateBox">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="消息提示" :visible.sync="msgDialog" width="500px">
        <span>推广链接已生成，推广效果在推广统计中查看。</span>
        <el-button type="primary" size="mini">复制链接</el-button>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="msgDialog = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'pagePromotion',
    data() {
      return {
        tableData: [
          {
            pagename: '书城首页',
          },
          {
            pagename: '书城首页1',
          },
          {
            pagename: '书城首页2',
          },
        ],
        createDialog: false,
        msgDialog: false,
        channel_name: '',
        promotion_page: '',
      }
    },
    methods: {
      closeCreateBox() {
        this.createDialog = false
        this.msgDialog = true
      },
      openCreateBox(idx, row) {
        this.createDialog = true
      },
    }
  }
</script>
<style lang="scss" scoped>
  .pagePromotion-page{
    .pagePromotion-header{
      height: 50px;
      padding-left: 15px;
      .el-breadcrumb{
        font-size: 16px;
        margin-top: 15px;
      }
    }
    .pagePromotion-body{
      margin: 0 auto;
      .novel-table{
        padding-left: 30px;
      }
    }
    .dialog-box{
      .dialog-body{
        padding-left: 50px;
        padding-right: 50px;
        text-align: left;
      }
      .url_param{
        display: flex;
        margin-top: 20px;
        span{
          line-height: 1;
          margin-top: 5px;
          width: 100px;
          text-align: right;
        }
      }
    }
  }
</style>
