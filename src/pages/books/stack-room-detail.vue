<template>
  <div class="stack-room-detail-page">
    <div class="stack-room-detail-header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path: '/stack-room'}">书库管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path: '/stack-room'}">书库列表</el-breadcrumb-item>
        <el-breadcrumb-item>xxx详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="stack-room-detail-body">
      <div class="stack-room-detail-info">
        <div class="stack-room-detail-box">
          <div class="detail-info">
            <div class="head-img-url">
              <img style="width:80px;height:95px" src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1222929928,1326821480&fm=26&gp=0.jpg"/>
            </div>
          </div>
          <div class="stack-room-detail-items">
            <div class="stack-room-detail-item">
              <span class="item-name">书籍名称：</span>
              <span class="item-value">XXXXXXX</span>
            </div>
            <div class="stack-room-detail-item">
              <span class="item-name">作者：</span>
              <span class="item-value">XXXXXXX</span>
            </div>
            <div class="stack-room-detail-item">
              <span class="item-name">书籍分类：</span>
              <span class="item-value">XXXXXXX</span>
            </div>
            <div class="stack-room-detail-item">
              <span class="item-name">男女分类：</span>
              <span class="item-value">XXXXXXX</span>
            </div>
            <div class="stack-room-detail-item">
              <span class="item-name">书商：</span>
              <span class="item-value">XXXXXXX</span>
            </div>
            <div class="stack-room-detail-item">
              <span class="item-name">书商标识：</span>
              <span class="item-value">XXXXXXX</span>
            </div>
            <div class="stack-room-detail-item">
              <span class="item-name">书籍状态：</span>
              <span class="item-value">XXXXXXX</span>
            </div>
            <div class="stack-room-detail-item">
              <span class="item-name">字数：</span>
              <span class="item-value">XXXXXXX</span>
            </div>
            <div class="stack-room-detail-item">
              <span class="item-name">章节数：</span>
              <span class="item-value">XXXXXXX</span>
            </div>
            <div class="stack-room-detail-item">
              <span class="item-name">类型：</span>
              <span class="item-value">XXXXXXX</span>
            </div>
            <div class="stack-room-detail-item">
              <span class="item-name">收费方式：</span>
              <span class="item-value">XXXXXXX</span>
            </div>
            <div class="stack-room-detail-item">
              <span class="item-name">收费起始章节：</span>
              <span class="item-value">XXXXXXX</span>
            </div>
            <div class="stack-room-detail-item">
              <span class="item-name">收费起始章节：</span>
              <span class="item-value">XXXXXXX</span>
            </div>
            <div class="stack-room-detail-item">
              <span class="item-name">最后更新时间：</span>
              <span class="item-value">2019-04-04 12:00:00</span>
            </div>
            <div class="stack-room-detail-item">
              <span class="item-name">审核通过时间：</span>
              <span class="item-value">2019-04-04 12:00:00</span>
            </div>
          </div>
        </div>
        <div class="stack-room-detail-btn">
          <el-button v-if="true" type="danger" size="mini" @click="setOnline">上架</el-button>
          <el-button v-else type="danger" size="mini" @click="setOnline">下架</el-button>
          <el-button type="primary" size="mini" @click="setChapter">设置收费章节</el-button>
        </div>
        <div class="stack-room-detail-operat">
          <span class="item-name">操作详情：</span>
          <div class="operat-reason">
            <span class="item-value">XXXX与2019-04-10 12:00:00进行下线操作  原因：因点击量小无法满足运营需求</span>
            <span class="item-value">XXXX与2019-04-10 12:00:00进行下线操作  原因：因点击量小无法满足运营需求</span>
            <span class="item-value">XXXX与2019-04-10 12:00:00进行下线操作  原因：因点击量小无法满足运营需求</span>
          </div>
        </div>
      </div>
      <div class="stack-room-detail-payment">
        <div class="payment-condition">
          <div class="payment-title">
            <h3>付费章节详情</h3>
            <span class="payment-total">书币付费总额：XXX</span>
          </div>
          <div class="payment-search-box">
            <div class="payment-search-input">
              <label>章节</label>
              <el-input v-model="chapter" size="mini"></el-input>
            </div>
            <div class="payment-search-btn">
              <el-button type="primary" size="mini">查找</el-button>
              <el-button type="primary" size="mini">清空</el-button>
            </div>
          </div>
        </div>
        <div class="payment-search-table">
          <el-table :data="tableData" style="width:100%;" stripe border>
            <el-table-column label="序号" min-width="30" align="center">
              <template slot-scope="scope">
                <span>{{scope.$index + (pageNo - 1) * pageSize + 1}} </span>
              </template>
            </el-table-column>
            <el-table-column prop="chapter" label="章节" min-width="60" align="center"></el-table-column>
            <el-table-column prop="status" label="收费状态" min-width="30" align="center"></el-table-column>
            <el-table-column prop="words" label="字数" min-width="30" align="center"></el-table-column>
            <el-table-column prop="needcoins" label="所需书币" min-width="30" align="center"></el-table-column>
            <el-table-column prop="subscribers" label="订阅人数" min-width="30" align="center"></el-table-column>
            <el-table-column prop="subscribecoins" label="订阅总书币" min-width="30" align="center"></el-table-column>
            <el-table-column label="详情" min-width="60" align="center">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="handleInfo(scope.$index, scope.row)">订阅明细</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10,20, 50, 100]"
            background
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalSize">
          </el-pagination>
        </div>
      </div>
    </div>
    <div class="dialog-box">
      <el-dialog title="设置收费起始章节" :visible.sync="editDialog" width="400px">
        <div class="set-input">
          <span>收费起始章节：</span>
          <el-input v-model="new_buyChapter" style="width: 200px;" size="mini"></el-input>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="editDialog = false">取 消</el-button>
            <el-button type="primary" @click="editDialog = false">确 认</el-button>
          </span>
      </el-dialog>
      <el-dialog title="" :visible.sync="offlineDialog" width="500px" center>
        <span v-if="ifOnline" class="offline-title">确认将“XXXXXXXX”上架吗？</span>
        <span v-else class="offline-title">确认将“XXXXXXXX”下架吗？</span>
        <el-input
          type="textarea"
          :rows="3"
          resize="none"
          maxlength='50'
          placeholder="请输入原因"
          @keyup.native="watchSize"
          v-model="reason">
        </el-input>
        <p style="margin: 0;"><span style="text-align: right;">{{textSize}}/50</span></p>
        <span slot="footer" class="dialog-footer">
            <el-button @click="offlineDialog = false">取 消</el-button>
            <el-button v-if="ifOnline" type="primary" @click="offlineDialog = false">上 架</el-button>
            <el-button v-else type="primary" @click="offlineDialog = false">下 架</el-button>
          </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'stackRoomList',
    data() {
      return {
        chapter: '',
        tableData: [
          {
            chapter: '第一章：发发'
          },
        ],
        pageNo: 1,
        pageSize: 10,
        currentPage: 1,
        totalSize: 0,
        new_buyChapter: '',
        editDialog: false,
        ifOnline: true,
        offlineDialog: false,
        reason: '',
        textSize: 0,
      }
    },
    methods: {
      handleInfo(idx,row) {
        this.$router.push({
          name: 'subscription-details'
        })
      },
      watchSize() {
        if (this.reason.length == 50) {
          this.textSize = 50
          return false
        } else {
          this.textSize = this.reason.length
        }
      },
      setOnline() {
        this.offlineDialog = true
      },
      setChapter() {
        this.editDialog = true
      },
      handleSizeChange(val) {
        this.pageSize = val
      },
      handleCurrentChange(val) {
        this.pageNo = val
      },
    }
  }
</script>
<style lang="scss" scoped>
  .stack-room-detail-page {
    .stack-room-detail-header {
      height: 50px;
      padding-left: 15px;
      .el-breadcrumb {
        font-size: 16px;
        margin-top: 15px;
      }
    }
    .stack-room-detail-body {
      padding-left: 15px;
      padding-right: 15px;
      .stack-room-detail-info{
        padding-bottom: 20px;
        .stack-room-detail-box {
          margin: 0 auto;
          display: flex;
          flex-direction: row;
          margin-top: 5px;
          .stack-room-detail-items{
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            margin-left: 10px;
            .stack-room-detail-item {
              margin-right: 20px;
              margin-bottom: 10px;
              font-size: 14px;
            }
            .operat-reason {
              float: left;
              span {
                display: block;
                margin: 10px 0;
              }
            }
          }
        }
        .stack-room-detail-btn{
          margin-top: 20px;
          margin-bottom: 20px;
        }
        .stack-room-detail-operat{
          display: flex;
          font-size: 14px;
          .operat-reason{
            display: flex;
            flex-direction: column;
          }
        }
      }
      .stack-room-detail-payment{
        padding-top: 20px;
        border-top: 1px solid #e0e0e0;
        .payment-condition{
          .payment-title{
            display: flex;
            flex-direction: row;
            h3{
              background: #409EFF;
              color: #ffffff;
              font-weight: normal;
              text-align: center;
              font-size: 16px;
              margin: 0;
              padding-left: 10px;
              padding-right: 10px;
            }
            .payment-total{
              margin-left: 20px;
              font-size: 14px;
              margin-top: 2px;
            }
          }
          .payment-search-box{
            display: flex;
            margin-top: 20px;
            .payment-search-input{
              label{
                font-size: 14px;
              }
              .el-input{
                width: 200px;
                margin-left: 10px;
              }
            }
            .payment-search-btn{
              margin-left: 50px;
            }
          }
        }
        .payment-search-table{
          margin-top: 20px;
        }
      }
    }
    .dialog-box{
      text-align: center;
      .set-input{
        display: flex;
        span{
          line-height: 1;
          margin-top: 5px;
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
      .offline-title {
        font-size: 16px;
      }
    }
  }
</style>
