<template>
  <div class="novelPromotion-page">
    <div class="novelPromotion-header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>推广中心</el-breadcrumb-item>
        <el-breadcrumb-item>小说推广</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="novelPromotion-body">
      <el-form ref="novelForm" :model="novelForm" :rules="novelRules" inline size="small" class="novel-form">
        <el-form-item label="书籍名称/作者" prop="bookname">
          <el-input v-model="novelForm.bookname"></el-input>
        </el-form-item>
        <el-form-item label="书商/书商标识" prop="booksellerlogo">
          <el-select v-model="novelForm.booksellerlogo">
            <el-option label="全部" value="0"></el-option>
            <el-option label="baike" value="1"></el-option>
            <el-option label="baike2" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型" prop="booktype">
          <el-select v-model="novelForm.booktype">
            <el-option label="全部" value="0"></el-option>
            <el-option label="收费" value="1"></el-option>
            <el-option label="免费" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="书籍分类" prop="booksort">
          <el-select v-model="novelForm.booksort">
            <el-option label="全部" value="0"></el-option>
            <el-option label="玄幻" value="1"></el-option>
            <el-option label="武侠" value="2"></el-option>
            <el-option label="都市" value="3"></el-option>
            <el-option label="穿越" value="4"></el-option>
            <el-option label="游戏" value="5"></el-option>
            <el-option label="灵异" value="6"></el-option>
            <el-option label="古代" value="7"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="男女分类" prop="mansort">
          <el-select v-model="novelForm.mansort">
            <el-option label="全部" value="0"></el-option>
            <el-option label="男生" value="1"></el-option>
            <el-option label="女生" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="书籍状态" prop="bookstatus">
          <el-select v-model="novelForm.bookstatus">
            <el-option label="全部" value="0"></el-option>
            <el-option label="完结" value="1"></el-option>
            <el-option label="连载" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="clearData">清空</el-button>
          <el-button type="primary" size="mini">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" style="width:100%;" stripe border>
        <el-table-column label="序号" width="80" align="center">
          <template slot-scope="scope">
            <span>{{scope.$index+pageNo * pageSize + 1}} </span>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="书籍名称" width="100" align="center"></el-table-column>
        <el-table-column prop="keywords" label="作者" width="100" align="center"></el-table-column>
        <el-table-column prop="pj" label="书籍分类" width="100" align="center"></el-table-column>
        <el-table-column prop="pj" label="男女分类" width="100" align="center"></el-table-column>
        <el-table-column prop="yjfl" label="书商" width="100" align="center"></el-table-column>
        <el-table-column prop="ejfl" label="书商标识" width="100" align="center"></el-table-column>
        <el-table-column prop="sjfl" label="书籍状态" width="100" align="center"></el-table-column>
        <el-table-column prop="sjfl" label="字数" width="100" align="center"></el-table-column>
        <el-table-column prop="status" label="章数" width="100" align="center"></el-table-column>
        <el-table-column prop="status" label="最好更新时间" width="120" align="center"></el-table-column>
        <el-table-column prop="status" label="类型" width="100" align="center"></el-table-column>
        <el-table-column label="收费起始章节" width="120" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.buychapter}}</span>
            <i class="el-icon-edit" style="cursor: pointer" @click="editBuyChapter(scope.$index, scope.row)"></i>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="推荐时间" width="100" align="center"></el-table-column>
        <el-table-column label="操作" min-width="140" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="createLinks(scope.$index, scope.row)">生成推广链接</el-button>
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
    </div>
  </div>
</template>
<script>
  export default {
    name: 'novelPromotion',
    data() {
      return {
        novelForm: {
          bookname: '',
          booksellerlogo: '0',
          booktype: '0',
          booksort: '0',
          mansort: '0',
          bookstatus: '0',
        },
        novelRules: {
          bookname: [],
          booksellerlogo: [],
          booktype: [],
          booksort: [],
          mansort: [],
          bookstatus: [],
        },
        tableData: [
          {
            id:'1',
            buychapter: '1',
          }
        ],
        pageNo: 0,
        pageSize: 10,
        currentPage: 1,
        totalSize: 0,
        new_buyChapter: 0,
        editDialog: false,
      }
    },
    methods: {
      editBuyChapter(idx, row) {
        this.editDialog = true
      },
      createLinks(idx, row) {
        this.$router.push({
          name: 'promotionDetail',
        })
      },
      clearData() {
        this.$refs.novelForm.resetFields()
      },
    }
  }
</script>
<style lang="scss" scoped>
  .novelPromotion-page{
    .novelPromotion-header{
      height: 50px;
      padding-left: 15px;
      .el-breadcrumb{
        font-size: 16px;
        margin-top: 15px;
      }
    }
    .novelPromotion-body{
      margin-left: 15px;
      margin-right: 15px;
    }
    .dialog-box{
      .set-input{
        display: flex;
        span{
          line-height: 1;
          margin-top: 5px;
        }
      }
    }
  }
</style>
