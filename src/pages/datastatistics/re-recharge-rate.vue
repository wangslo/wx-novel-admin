<template>
    <div class="menu-config-page">
        <div class="menu-config-header">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
                <el-breadcrumb-item >数据统计</el-breadcrumb-item>
                <el-breadcrumb-item >复充率</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-row style="width: 95%;margin: 0 50px;">
            <el-button-group >
                <el-button :type="button_type == 1 ? 'primary':''"  style="width: 180px;margin-right: 15px;" @click="reds(1)">全量用户复充数据</el-button>
                <el-button :type="button_type == 2 ? 'primary':''"  style="width: 180px;margin-right: 15px;" @click="reds(2)">新注册用户复充数据</el-button>
            </el-button-group>
        </el-row><br />
        <el-row v-if="button_type == 1 ? true:false">
            <div style="margin-left: 50px;font-weight:bold;background-color: #d9edf7;border-color: #bce8f1;color: #31708f;padding: 20px;">
                <i class="el-icon-thumb"></i>
                *报表说明：展示选中日期当天总充值用户数、该用户群当天充值总金额；其中在后第1天充值的用户数（总金额）；
                其中在后第2天充值的用户数（总金额）...其中在后第7天充值的用户数（总金额）、其中在后第7天至昨天充值的用户数（总金额）。
            </div>
        </el-row>
        <el-row v-if="button_type == 2 ? true:false">
            <div style="margin-left: 50px;font-weight:bold;background-color: #d9edf7;border-color: #bce8f1;color: #31708f;padding: 20px;">
                <i class="el-icon-thumb"></i>
                *报表说明：展示选中日期当天新注册充值用户数、该用户群当天充值总金额；其中在后第1天充值的用户数（总金额）；
                其中在后第2天充值的用户数（总金额）...其中在后第7天充值的用户数（总金额）、其中在后第7天至昨天充值的用户数（总金额）。
            </div>
        </el-row>
        <br />
        <el-row style="width: 95%;margin: 0 50px;">
            <div class="block">
                <span class="demonstration">更改日期:</span>
                <el-date-picker
                        v-model="dateNum"
                        type="date"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                        @change="pickerDateAfter"
                >
                </el-date-picker>
            </div>
        </el-row>
        <br />
        <el-table :data="tableData" style="width: 95%;margin: 0 50px;"
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
            <el-table-column prop="dateNum" label="日期" min-width="100" align="center">
            </el-table-column>
            <el-table-column  label="当天（T+0）" width="150" align="center">
                <template slot-scope="scope">
                    {{scope.row.T0.people}}人,{{scope.row.T0.num}}笔
                    <br />
                    {{scope.row.T0.money}}元
                </template>
            </el-table-column>
            <el-table-column prop="T+1" label="次日（T+1）" width="150" align="center"></el-table-column>
            <el-table-column prop="T+2" label="后第2天（T+2）" width="150" align="center"></el-table-column>
            <el-table-column prop="T+3" label="后第3天（T+3）" width="150" align="center"></el-table-column>
            <el-table-column prop="T+4" label="后第4天（T+4）" width="150" align="center"></el-table-column>
            <el-table-column prop="T+5" label="后第5天（T+5）" width="150" align="center"></el-table-column>
            <el-table-column prop="T+6" label="后第6天（T+6）" width="150" align="center"></el-table-column>
            <el-table-column prop="T+7" label="后第7天（T+7）至昨日" width="180" align="center"></el-table-column>
            <el-table-column v-if = "false" label="渠道名称" width="180" align="center">
                <template slot-scope="scope">
                            <span style="padding: 10px 50px" @click="changeChanelName(scope.$index, scope.row)">
                              <i class="el-icon-edit"></i>
                              {{scope.row.channelName}}
                            </span>
                </template>
            </el-table-column>


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
            <el-table-column v-if = "false" label="操作" min-width="60" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="handleDetail(scope.$index, scope.row)">数据明细</el-button>
                    <el-button size="mini"  type="danger" @click="handleOffLine(scope.$index, scope.row)">删除</el-button>
                    <!--<el-button size="mini" v-if="scope.row.status != '正常'? true:false" type="primary" @click="handleOnLine(scope.$index, scope.row)">启用</el-button>-->
                    <el-button size="mini" type="success" @click="handleDetail(scope.$index, scope.row)">查看图文</el-button>
                    <el-button size="mini" type="success" @click="handleDetail(scope.$index, scope.row)">二维码</el-button>
                </template>
            </el-table-column>
        </el-table>

    </div>
</template>

<script>
    import ElRow from 'element-ui/packages/row/src/row'
    import {orgModuleApi} from '../../api/main'
    export default {
      components: {ElRow},
      name: 'promotionStatistics',
        data() {
        return {
            dateNum:'2019-05-16',
            pickerBeginDateBefore:{
                disabledDate: (time) => {
                let beginDateVal = this.book_seller_list_condition.update_end_time;
                if (beginDateVal) {
                    return time.getTime() > beginDateVal;
                }
                }
            },

            button_type:1,
            changeRed:0,
              tableData: [
                {
                  'dateNum':'5月10日',
                  'T0':{
                    people:69,
                    num:71,
                    money:9641,
                  },
                  'T+1':"0人，0笔  0元",
                  'T+2':"0人，0笔  0元",
                  'T+3':"0人，0笔  0元",
                  'T+4':"0人，0笔  0元",
                  'T+5':"0人，0笔  0元",
                  'T+6':"0人，0笔  0元",
                  'T+7':"",
                },
                {
                  'dateNum':'5月11日',
                  'T0':{
                    people:69,
                    num:71,
                    money:9641,
                  },
                  'T+1':"0人，0笔  0元",
                  'T+2':"0人，0笔  0元",
                  'T+3':"0人，0笔  0元",
                  'T+4':"0人，0笔  0元",
                  'T+5':"0人，0笔  0元",
                  'T+6':"",
                  'T+7':"",
                },
                {
                  'dateNum':'5月12日',
                  'T0':{
                    people:69,
                    num:71,
                    money:9641,
                  },
                  'T+1':"0人，0笔  0元",
                  'T+2':"0人，0笔  0元",
                  'T+3':"0人，0笔  0元",
                  'T+4':"0人，0笔  0元",
                  'T+5':"",
                  'T+6':"",
                  'T+7':"",
                },
                {
                  'dateNum':'5月13日',
                  'T0':{
                    people:69,
                    num:71,
                    money:9641,
                  },
                  'T+1':"0人，0笔  0元",
                  'T+2':"0人，0笔  0元",
                  'T+3':"0人，0笔  0元",
                  'T+4':"",
                  'T+5':"",
                  'T+6':"",
                  'T+7':"",
                },
                {
                  'dateNum':'5月14日',
                  'T0':{
                    people:69,
                    num:71,
                    money:9641,
                  },
                  'T+1':"0人，0笔  0元",
                  'T+2':"0人，0笔  0元",
                  'T+3':"",
                  'T+4':"",
                  'T+5':"",
                  'T+6':"",
                  'T+7':"",
                },
                {
                  'dateNum':'5月15日',
                  'T0':{
                    people:69,
                    num:71,
                    money:9641,
                  },
                  'T+1':"0人，0笔  0元",
                  'T+2':"",
                  'T+3':"",
                  'T+4':"",
                  'T+5':"",
                  'T+6':"",
                  'T+7':"",
                },
                {
                  'dateNum':'5月16日',
                  'T0':{
                    people:69,
                    num:71,
                    money:9641,
                  },
                  'T+1':"",
                  'T+2':"",
                  'T+3':"",
                  'T+4':"",
                  'T+5':"",
                  'T+6':"",
                  'T+7':"",
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
    pickerDateAfter(val){
      console.log('dosomething ! dateNum:'+val)
      console.log(this.dateNum)
    },
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
        this.tmpAction = '停用'
        this.tmpBookSellerName = row.booksellerName;
    },
    handleOnLine(index, row){
        this.offlineDialog = true
        this.tmpAction = '启用'
        this.tmpBookSellerName = row.booksellerName;
    },
    handleDetail(index,row){
        this.$router.push({
        path:'/book-seller-detail'
        })
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
    .menu-config-page{
        .menu-config-header{
            height: 50px;
            padding-left: 15px;
            .el-breadcrumb{
                font-size: 16px;
                margin-top: 15px;
            }
        }
        .menu-config-body{
            .menu-config-box{
                width: 95%;
                margin: 10px 0 0 40px;
                font-weight:bold;
                /*margin: 0 auto;*/
                /*margin-top: 20px;*/
                .menu-config-item{
                    margin-bottom: 20px;
                    .head-img-url{
                        display: inline-block;
                        width: 100px;
                        height: 100px;
                        img{
                            width: 100%;
                            height: 100%;
                            vertical-align:middle;
                        }
                    }
                }
            }
            .use-btn{
                margin-left: 2.5%;
                width: 100px;
                margin-bottom: 40px;
            }
            .el-dialog__body{
                span{
                    display: block;
                    text-align: center;
                }
            }
        }
    }
    .menu-check {
        width: 70px;
        height: 50px;
        margin: 50% auto;
        font-size: 90px;
        color: #00AA00;
        text-align: center;
        display: none;
    }
    .menu-pic {
        width: 300px;
        margin: 30px 1px 30px 160px;
        height: 530px;
        float: left;
        cursor: pointer;
        background-size: 100%;
        background-repeat: no-repeat;
    }
    .el-row {
        margin-bottom: 20px;
        &:last-child {
            margin-bottom: 0;
        }
    }
    .el-col {
        border-radius: 4px;
    }
</style>
