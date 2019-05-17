<template>
  <div class="promotionDetail-page">
    <div class="promotionDetail-header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>推广中心</el-breadcrumb-item>
        <el-breadcrumb-item>小说推广</el-breadcrumb-item>
        <el-breadcrumb-item>小说推广XXX</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="promotionDetail-body">
      <div class="novel-detail">
        <div class="novel-top">
          <div class="novel-img">
            <img src=""/>
          </div>
          <div class="novel-top-right">
            <span>书籍名称</span>
            <span>作者：XXXXX</span>
            <span>玄幻/男生/完结</span>
            <span>书商：XXXX（标识XXXXXX）</span>
          </div>
        </div>
        <div class="novel-center">
          <span>总字数：XXXXXX</span>
          <span>总章节数：XXXXXX</span>
          <span>最后更新时间：XXXXXX</span>
        </div>
        <div class="novel-desc">
          <span>书籍介绍</span>
          <p>
            书籍介绍书籍介绍书籍介绍书籍介绍书籍介绍书籍介绍书籍介绍书籍介绍书籍介绍书籍介
            绍书籍介绍书籍介绍书籍介绍书籍介绍书籍介绍书籍介绍书籍介绍书籍介绍书籍介绍
            书籍介绍书籍介绍书籍介绍书籍介绍书籍介绍书籍介绍书籍介绍...
          </p>
        </div>
      </div>
      <div class="novel-table">
        <el-table :data="tableData" style="width:auto;" stripe border>
          <el-table-column label="序号" width="60" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index+ 1}} </span>
            </template>
          </el-table-column>
          <el-table-column label="章节 / 标题 / 字数 / 收费状态" width="300" align="center">
            <template slot-scope="scope">
              <div class="chapter-box">
                <span style="color: blue;cursor: pointer;">{{scope.row.chapter}}</span>
                <span>(共{{scope.row.num}}字)</span>
                <span>({{scope.row.status}})</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="图文推广" width="100" align="center">
            <template slot-scope="scope">
              <div class="img-promotion" style="color: blue;cursor: pointer;">生成图文</div>
            </template>
          </el-table-column>
          <el-table-column label="H5推广" width="100" align="center">
            <template slot-scope="scope">
              <div class="h5-promotion" style="color: blue;cursor: pointer;" @click="openCreateBox(scope.$index, scope.row)">生成H5链接</div>
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
            <span>推广页面：</span>
            <el-input v-model="promotion_page" style="width: 200px;" size="mini"></el-input>
          </div>
          <div class="url_param">
            <span>强关设置：</span>
            <el-radio v-model="concern" label="1">强制关注</el-radio>
            <el-radio v-model="concern" label="2">主动关注</el-radio>
            <el-radio v-model="concern" label="3">不设置强关</el-radio>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="createDialog = false">取 消</el-button>
          <el-button type="primary" @click="createDialog = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'promotionDetail',
    data() {
      return {
        tableData: [
          {
            chapter: '第1章  XXXXXXXX',
            num: '5000',
            status: '免费',
          },
          {
            chapter: '第1章  XXXXXXXX',
            num: '5000',
            status: '免费',
          },
          {
            chapter: '第1章  XXXXXXXX',
            num: '5000',
            status: '免费',
          },
          {
            chapter: '第1章  XXXXXXXX',
            num: '5000',
            status: '免费',
          },
          {
            chapter: '第1章  XXXXXXXX',
            num: '5000',
            status: '免费',
          },
          {
            chapter: '第1章  XXXXXXXX',
            num: '5000',
            status: '免费',
          },
          {
            chapter: '第1章  XXXXXXXX',
            num: '5000',
            status: '免费',
          },
          {
            chapter: '第1章  XXXXXXXX',
            num: '5000',
            status: '免费',
          },
          {
            chapter: '第1章  XXXXXXXX',
            num: '5000',
            status: '免费',
          },
          {
            chapter: '第1章  XXXXXXXX',
            num: '5000',
            status: '免费',
          },
        ],
        createDialog: false,
        concern: 2,
        channel_name: '',
        promotion_page: '',
      }
    },
    methods: {
      openCreateBox(idx, row) {
        this.createDialog = true
      },
    }
  }
</script>
<style lang="scss" scoped>
  .promotionDetail-page{
    .promotionDetail-header{
      height: 50px;
      padding-left: 15px;
      .el-breadcrumb{
        font-size: 16px;
        margin-top: 15px;
      }
    }
    .promotionDetail-body{
      margin: 0 auto;
      width: max-content;
      .novel-detail{
        width: 500px;
        height: 100%;
        padding-right: 30px;
        margin-right: 30px;
        float: left;
        .novel-top{
          display: flex;
          .novel-img{
            img{
              width: 180px;
              height: 200px;
            }
          }
          .novel-top-right{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-left: 20px;
            padding-top: 20px;
            padding-bottom: 20px;
          }
        }
        .novel-center{
          span{
            display: block;
            margin-top: 10px;
          }
        }
        .novel-desc{
          margin-top: 10px;
          p{
            text-indent: 24px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow: hidden;
          }
        }
      }
      .novel-table{
        padding-left: 30px;
        border-left: 1px solid #e0e0e0;
        float: left;
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
        }
        .el-radio{
          margin-right: 2px;
          line-height: 1;
          margin-top: 5px;
        }
      }
    }
  }
</style>
