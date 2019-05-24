<template>
    <div class="accountInfo-page">
        <div class="accountInfo-header">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
                <el-breadcrumb-item >数据统计</el-breadcrumb-item>
                <el-breadcrumb-item >推广统计</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="accountInfo-body">
            <br />
            <el-row style="width: 95%;margin: 0 auto;">
                <el-button-group >
                    <el-button :type="button_type == 1 ? 'primary':''"  style="width: 120px;margin-right: 15px;" @click="reds(1)">页面推广</el-button>
                    <el-button :type="button_type == 2 ? 'primary':''"  style="width: 120px;margin-right: 15px;" @click="reds(2)">链接推广</el-button>
                    <el-button :type="button_type == 3 ? 'primary':''"  style="width: 120px;margin-right: 15px;" @click="reds(3)">图文推广</el-button>
                </el-button-group>
            </el-row><br />
            <br />
            <div class="book-seller-list-body">
                <el-form ref="stackRoomForm" :model="book_seller_list_condition" :rules="book_seller_list_rules" class="book-seller-list-form" label-width="80px" >
                    <el-form-item label="渠道名称" label-width="110px" prop="author">
                        <el-input v-model="book_seller_list_condition.author"></el-input>
                    </el-form-item>
                    <el-form-item label="创建时间" label-width="110px">
                        <el-col :span="11" class="startTime">
                            <el-form-item  prop="update_start_time">
                                <el-date-picker
                                        type="date"
                                        format="yyyy-MM-dd"
                                        placeholder="起始时间"
                                        v-model="book_seller_list_condition.update_start_time"
                                        :picker-options="pickerBeginDateBefore"
                                        style="width: 100%;"
                                ></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <!--<el-col class="line" :span="2" style="text-align:center">至</el-col>-->
                        <el-col class="line" style="width:20px;text-align:center">至</el-col>
                        <el-col :span="11" class="endTime">
                            <el-form-item prop="update_end_time">
                                <el-date-picker
                                        type="date"
                                        format="yyyy-MM-dd"
                                        placeholder="结束时间"
                                        v-model="book_seller_list_condition.update_end_time"
                                        :picker-options="pickerBeginDateAfter"
                                        style="width: 100%;"
                                ></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item style="float: right;">
                        <el-button type="info" size="small" style="width: 70px;" @click="clearData">清空</el-button>
                        <el-button type="primary" size="small" style="width: 70px;" @click="getBannerAppLists">查找</el-button>
                        <!--<el-button type="warning" @click="getBannerAppLists">批量上架</el-button>-->
                        <!--<el-button type="danger" @click="getBannerAppLists">批量下架</el-button>-->
                    </el-form-item>
                </el-form>
                <el-row>
                    <el-button-group style="float: right">
                        <el-button type="danger" size="mini" style="width: 70px" @click="reds(1)">导出</el-button>
                    </el-button-group>
                </el-row>
                <el-table :data="tableData" style="width:100%;"
                          :default-sort = "{prop: 'updateTime', order: 'descending'}"
                          stripe border
                          @sort-change='sortChange'>
                    <el-table-column v-if="false" type="selection" width="40">
                    </el-table-column>
                    <el-table-column v-if="false" label="序号" width="40" align="center">
                        <template slot-scope="scope">
                            <span>{{scope.$index+(pageNo - 1) * pageSize + 1}} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="channelName" label="渠道名称" width="100" align="center"></el-table-column>
                    <el-table-column label="渠道名称" width="180" align="center">
                        <template slot-scope="scope">
                            <span style="padding: 10px 50px" @click="changeChanelName(scope.$index, scope.row)">
                              <i class="el-icon-edit"></i>
                              {{scope.row.channelName}}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="createTime" label="创建时间" width="160" align="center"></el-table-column>
                    <el-table-column prop="promotionPage" v-if="button_type == 1 ? true:false" label="推广页面" min-width="120" align="center"></el-table-column>
                    <el-table-column prop="promotionBook" v-if="button_type > 1 ? true:false" label="推广书籍" min-width="120" align="center"></el-table-column>
                    <el-table-column prop="turnSet" v-if="button_type > 1 ? true:false" label="强关设置" width="80" align="center"></el-table-column>
                    <el-table-column prop="turnChapter" v-if="button_type > 1 ? true:false" label="强关章节" width="80" align="center"></el-table-column>
                    <el-table-column prop="qrcode" v-if="button_type > 1 ? true:false" label="底部二维码" width="100" align="center"></el-table-column>
                    <el-table-column prop="pv" v-if="button_type > 1 ? true:false" label="PV" width="80" align="center"></el-table-column>
                    <el-table-column prop="uv" v-if="button_type > 1 ? true:false" label="UV" width="80" align="center"></el-table-column>
                    <el-table-column prop="newConcern" label="新增关注" width="80" align="center"></el-table-column>
                    <el-table-column prop="recharge" label="充值金额" width="80" align="center"></el-table-column>
                    <el-table-column prop="NumOfRecharge" label="充值笔数" width="80" align="center"></el-table-column>


                    <!--<el-table-column sortable='custom' :sort-orders="['ascending', 'descending']"-->
                                     <!--prop="updateTime" label="创建时间" width="180" align="center"></el-table-column>-->
                    <!--<el-table-column prop="bookType" label="创建人" width="180" align="center"></el-table-column>-->
                    <!--<el-table-column label="操作" min-width="250" align="center">-->
                    <!--<template slot-scope="scope">-->
                    <!--<el-button size="mini" type="danger" @click="handleOffLine(scope.$index, scope.row)">下架</el-button>-->
                    <!--<el-button size="mini" type="primary" @click="handleOnLine(scope.$index, scope.row)">上架</el-button>-->
                    <!--<el-button size="mini" type="warning" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
                    <!--<el-button size="mini" type="info" @click="handleDetail(scope.$index, scope.row)">详情</el-button>-->
                    <!--</template>-->
                    <!--</el-table-column>-->
                    <el-table-column label="操作" min-width="60" align="center">
                        <template slot-scope="scope">
                            <el-button size="mini" type="primary" @click="handleDetail(scope.$index, scope.row)">数据明细</el-button>
                            <el-button size="mini" type="danger" @click="handleOffLine(scope.$index, scope.row)">删除</el-button>
                            <!--<el-button size="mini" v-if="scope.row.status != '正常'? true:false" type="primary" @click="handleOnLine(scope.$index, scope.row)">启用</el-button>-->
                            <el-button size="mini" v-if="button_type < 3 ? true:false" type="success" @click="copyUrl(scope.$index, scope.row)">复制链接</el-button>
                            <el-button size="mini" v-if="button_type == 3 ? true:false" type="success" @click="viewText(scope.$index, scope.row)">查看图文</el-button>
                            <el-button size="mini" type="success" @click="handelQrcode(scope.$index, scope.row)">二维码</el-button>
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
                <div class="dialog-div">
                    <el-dialog title="" :visible.sync="offlineDialog" width="500px" center>
                        <span>你确认{{tmpAction}}“{{tmpBookSellerName}}”删除吗？</span>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="offlineDialog = false">取 消</el-button>
                            <el-button type="primary" @click="offlineDialog = false">确 认</el-button>
                        </span>
                    </el-dialog>
                </div>
                <div class="dialog-div">
                    <el-dialog title="修改渠道名称" :visible.sync="editChanelDialog" width="500px" center>
                        <el-form  label-width="12px" size="small" class="account-info-form" label-position="left">
                            <el-form-item label="渠道名称" required  label-width="110px">
                                <el-input v-model="tmpChanelName">222</el-input>
                            </el-form-item>
                        </el-form>
                        <!--<el-input-->
                        <!--type="textarea"-->
                        <!--:rows="3"-->
                        <!--resize="none"-->
                        <!--maxlength='50'-->
                        <!--placeholder="请输入下线原因（不得少于5个汉字）"-->
                        <!--@keyup.native = "watchSize"-->
                        <!--v-model="reason">-->
                        <!--</el-input>-->
                        <!--<p style="margin: 0;"><span style="text-align: right;">{{textSize}}/50</span></p>-->
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="editChanelDialog = false">取 消</el-button>
                            <el-button type="primary" @click="editChannelConfirm">确 认</el-button>
                        </span>
                    </el-dialog>
                </div>
            </div>

            <br />
            <br />
        </div>
    </div>
</template>
<script>

  import ElRow from 'element-ui/packages/row/src/row'

  const cityOptions = ['上海', '北京', '广州', '深圳'];


  import {orgModuleApi} from '../../api/main'
  export default {
    name: 'promotionStatistics',
    data() {
      return {
        book_seller_list_condition: {
          bookType: '999',
          author: '',
          charge_ways: '999',
          status: '999',
          bookStatus: '999',
          update_start_time: '',
          update_end_time: '',
          category: '999',
          bookman: '999',
        },
        book_seller_list_rules: {
          bookType: '999',
          author: '',
          charge_ways: '999',
          status: '999',
          bookStatus: '999',
          update_start_time: '',
          update_end_time: '',
          category: '999',
          bookman: '999',
        },
        tmpBookSellerName:'xxxx',
        tmpAction:'',
        pickerBeginDateBefore:{
          disabledDate: (time) => {
            let beginDateVal = this.book_seller_list_condition.update_end_time;
            if (beginDateVal) {
              return time.getTime() > beginDateVal;
            }
          }
        },
        pickerBeginDateAfter:{
          disabledDate: (time) => {
            let beginDateVal = this.book_seller_list_condition.update_start_time;
            if (beginDateVal) {
              return time.getTime() < beginDateVal;
            }
          }
        },
        button_type:1,
        changeRed:0,
        tableData: [
          {
            'channelName':'渠道2',
            'createTime':'2019-05-16 15:56',
            'promotionPage':'首页',
            'promotionBook':'鬼吹灯',
            'turnSet':'x',
            'turnChapter':'',
            'qrcode':'',
            'pv':'',
            'uv':'',
            'newConcern':'5',
            'recharge':'15.23',
            'NumOfRecharge':'',
          },
          {
            'channelName':'渠道1',
            'createTime':'2019-05-15 15:56',
            'promotionPage':'最近阅读',
            'promotionBook':'三体',
            'turnSet':'x',
            'turnChapter':'',
            'qrcode':'',
            'pv':'',
            'uv':'',
            'newConcern':'3',
            'recharge':'48.00',
            'NumOfRecharge':'',
          },
        ],
        pageNo: 1,
        pageSize: 10,
        currentPage: 1,
        totalSize: 0,
        offlineDialog: false,
        sort_prop: 'updateTime',
        sort_order: 'desc',
        editChanelDialog:false,
        tmpChanelName:'',
      }
    },
    mounted() {
    },
    methods: {
      changeChanelName(index,row){
        this.editChanelDialog = true;
        this.tmpChanelName = row.channelName
        console.log('channel:'+index)
      },
      editChannelConfirm(){
        this.editChanelDialog = false;
        console.log('提交成功')
      },
      handleOffLine(index, row){
        this.offlineDialog = true
        this.tmpAction = ''
        this.tmpBookSellerName = row.booksellerName;
      },
      handleOnLine(index, row){
        this.offlineDialog = true
        this.tmpAction = '启用'
        this.tmpBookSellerName = row.booksellerName;
      },
      handleDetail(index,row){
        this.$router.push({
          path:'/data-detail'
        })
      },
      handelQrcode(index,row){

      },
      copyUrl(index,row){
        console.log('copy start')
        window.copy("http://www.baidu.com")
      },
      viewText(){
//        this.$router.push({
//          path:'/book-seller-detail'
//        })
      },
      reds:function(index){
        this.button_type = index;
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.getStackRoomLists()
      },
      handleCurrentChange(val) {
        this.pageNo = val
        this.getStackRoomLists()
      },
      clearData() {
        this.$refs.stackRoomForm.resetFields()
      },
      sortChange: function(column, prop, order) {
        this.sort_prop = column.prop
        this.sort_order = column.order.replace('ending','')
        this.getStackRoomLists()
      },
    }
  }
</script>
<style lang="scss" scoped>

    .el-row {
        margin-bottom: 20px;
        &:last-child {
            margin-bottom: 0;
        }
    }
    .el-col {
        border-radius: 4px;
    }
    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple {
        /*background: #d3dce6;*/
        background: white;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        border-radius: 4px;
        padding: 10px 5px;
        text-align: center;
        min-height: 36px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }


    .accountInfo-page{
        .accountInfo-header{
            height: 50px;
            padding-left: 15px;
            .el-breadcrumb{
                font-size: 16px;
                margin-top: 15px;
            }
        }
        .accountInfo-body{
            margin-left: 15px;
            margin-right: 15px;
        }
        .el-input{
            width: 300px;
        }
        /*.el-button{*/
            /*width: 200px;*/
        /*}*/
    }

    .book-seller-list-body{
        margin-left: 15px;
        margin-right: 15px;
        .book-seller-list-form{
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
        }
    }
    .el-dialog__header{
        padding: 0!important;
    }
    .el-dialog__body{
        span{
            display: block;
            text-align: center;
            margin-bottom: 10px;
        }
    }
</style>
