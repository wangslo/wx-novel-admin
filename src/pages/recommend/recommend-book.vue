<template>
    <div class="recommend-page">
        <div class="recommend-header">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
                <el-breadcrumb-item >推荐管理</el-breadcrumb-item>
                <el-breadcrumb-item >推荐书籍</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="recommend-body">
            <el-form ref="recommendForm" :model="recommend_condition" class="recommend-form" :rules="recommendRules" label-width="80px" size="small">
                <el-form-item label="推荐位置" label-width="80px" prop="position">
                    <el-cascader expand-trigger="hover"
                            :options="options"
                            change-on-select="false"
                    ></el-cascader>
                </el-form-item>
                <el-form-item style="float: right;">
                    <el-button type="primary" @click="clearData">清空</el-button>
                    <el-button type="primary" @click="onsubmit">查找</el-button>
                </el-form-item>
            </el-form>
            <div style="width: 100%">
                <div style="margin-left: 15px;width : 40%;float: left">

                    <el-form ref="recommendForm" :model="recommend_condition2" class="recommend-form" :rules="recommendRules2" label-width="150px" size="small">
                        <el-form-item label="书籍名称" prop="keyword" label-width="80px">
                            <el-input v-model="xx"></el-input>
                        </el-form-item>
                        <el-form-item style="float: right;" label-width="30px" >
                            <el-button type="primary" @click="onsubmit">搜索</el-button>
                        </el-form-item>
                    </el-form>

                    <el-table :data="tableData1"
                              :default-sort = "{prop: 'create_time', order: 'descending'}"
                              stripe border
                              @sort-change='sortChange'>
                        <el-table-column label="序号" width="50" align="center">
                            <template slot-scope="scope">
                                <span>{{scope.$index+(pageNo - 1) * pageSize + 1}} </span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="bookName" label="书籍名称" width="180" align="center"></el-table-column>
                        <el-table-column prop="author" label="作者" width="150" align="center"></el-table-column>
                        <el-table-column prop="source" label="来源" width="100" align="center"></el-table-column>
                        <el-table-column label="操作" min-width="120" align="center">
                            <template slot-scope="scope">
                                <el-button size="mini" @click="handleSearch(scope.$index, scope.row)">添加</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-sizes="[20, 50, 100, 150]"
                            background
                            :page-size="20"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="50">
                    </el-pagination>
                </div>
                <div style="margin-left: 15px;width : 50%;float: left">
                    <el-form ref="recommendForm" :model="recommend_condition2" class="recommend-form" :rules="recommendRules2" label-width="150px" size="small">
                        <el-form-item style="float: right;" label-width="5px">
                            <el-button type="primary" @click="defriendDialogAll = true">全部删除</el-button>
                            <el-button type="primary" @click="onsubmit">提交</el-button>
                        </el-form-item>
                    </el-form>

                    <el-table :data="tableData2"
                              :default-sort = "{prop: 'create_time', order: 'descending'}"
                              stripe border
                              @sort-change='sortChange'>
                        <el-table-column label="序号" width="50" align="center">
                            <template slot-scope="scope">
                                <span>{{scope.$index+(pageNo - 1) * pageSize + 1}} </span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="bookName" label="书籍名称" width="180" align="center"></el-table-column>
                        <el-table-column prop="author" label="作者" width="180" align="center"></el-table-column>
                        <el-table-column prop="source" label="来源" width="180" align="center"></el-table-column>
                        <el-table-column label="操作" min-width="250" align="center">
                            <template slot-scope="scope">
                                <el-button size="mini" :disabled="scope.$index == 0 ? true:false" @click="moveup(scope.$index, scope.row)">上移</el-button>
                                <el-button size="mini" :disabled="scope.$index == (allLine-1) ? true:false" @click="movedown(scope.$index, scope.row)">下移</el-button>
                                <el-button size="mini" @click="movedelete(scope.$index, scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!--<el-pagination-->
                            <!--@size-change="handleSizeChange"-->
                            <!--@current-change="handleCurrentChange"-->
                            <!--:current-page="currentPage"-->
                            <!--:page-sizes="[20, 50, 100, 150]"-->
                            <!--background-->
                            <!--:page-size="20"-->
                            <!--layout="total, sizes, prev, pager, next, jumper"-->
                            <!--:total="400">-->
                    <!--</el-pagination>-->
                </div>
            </div>

            <div class="dialog-div">
                <el-dialog title="" :visible.sync="defriendDialog" width="300px" center>
                    <span>确定删除“{{tmpRow.bookName}}”吗?</span>
                    <!--<el-input-->
                            <!--type="textarea"-->
                            <!--:rows="3"-->
                            <!--resize="none"-->
                            <!--maxlength='100'-->
                            <!--placeholder="请输入原因"-->
                            <!--@keyup.native = "watchSize"-->
                            <!--v-model="reason">-->
                    <!--</el-input>-->
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="defriendDialog = false;dialogBool=false">取 消</el-button>
                        <el-button type="primary" @click="confirmdelete">确 认</el-button>
                    </span>
                </el-dialog>
                <el-dialog title="" :visible.sync="defriendDialogAll" width="300px" center>
                    <span>确定全部删除吗?</span>
                    <!--<el-input-->
                    <!--type="textarea"-->
                    <!--:rows="3"-->
                    <!--resize="none"-->
                    <!--maxlength='100'-->
                    <!--placeholder="请输入原因"-->
                    <!--@keyup.native = "watchSize"-->
                    <!--v-model="reason">-->
                    <!--</el-input>-->
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="defriendDialogAll = false;">取 消</el-button>
                        <el-button type="primary" @click="confirmdeleteall">确 认</el-button>
                    </span>
                </el-dialog>
                <el-dialog title="" :visible.sync="defriendDialogSubmit" width="300px" center>
                    <span>确定全部删除吗?</span>
                    <!--<el-input-->
                    <!--type="textarea"-->
                    <!--:rows="3"-->
                    <!--resize="none"-->
                    <!--maxlength='100'-->
                    <!--placeholder="请输入原因"-->
                    <!--@keyup.native = "watchSize"-->
                    <!--v-model="reason">-->
                    <!--</el-input>-->
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="defriendDialogSubmit = false;">取 消</el-button>
                        <el-button type="primary" @click="confirmsubmit">确 认</el-button>
                    </span>
                </el-dialog>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'recommend',
        data() {
            return {
                reason: '',
                textSize: 0,
                recommend_condition: {
                    accid: '',
                    phone: '',
                    nickName: '',
                    loginType: '999',
                    create_start_time: '',
                    create_end_time: '',
                    login_start_time: '',
                    login_end_time: '',
                    status: '999',
                },
                recommendRules: {
                    accid: '',
                    phone: '',
                    nickName: '',
                    loginType: '999',
                    create_start_time: '',
                    create_end_time: '',
                    login_start_time: '',
                    login_end_time: '',
                    status: '999',
                },
                pickerBeginDateBefore:{
                    disabledDate: (time) => {
                        let beginDateVal = this.recommend_condition.create_end_time;
                        if (beginDateVal) {
                            return time.getTime() > beginDateVal;
                        }
                    }
                },
                pickerBeginDateAfter:{
                    disabledDate: (time) => {
                        let beginDateVal = this.recommend_condition.create_start_time;
                        if (beginDateVal) {
                            return time.getTime() < beginDateVal;
                        }
                    }
                },
                loginBeginDateBefore:{
                    disabledDate: (time) => {
                        let beginDateVal = this.recommend_condition.login_end_time;
                        if (beginDateVal) {
                            return time.getTime() > beginDateVal;
                        }
                    }
                },
                loginBeginDateAfter:{
                    disabledDate: (time) => {
                        let beginDateVal = this.recommend_condition.login_start_time;
                        if (beginDateVal) {
                            return time.getTime() < beginDateVal;
                        }
                    }
                },
                tableData1: [
                    {"bookName":"张三三的20岁","author":"张三","source":"xxxx"},
                    {"bookName":"盛世骑兵","author":"张三","source":"xxxx"},
                    {"bookName":"盛世骑兵4","author":"张三","source":"xxxx"}
                    ],
                tableData2: [
                    {"bookName":"张三三的20岁","author":"张三","source":"xxxx"},
                    {"bookName":"盛世骑兵","author":"张三","source":"xxxx"},
                    {"bookName":"盛世骑兵4","author":"张三","source":"xxxx"},
                    {"bookName":"张三三的20岁","author":"张三","source":"xxxx"},
                    {"bookName":"盛世骑兵","author":"张三","source":"xxxx"},
                    {"bookName":"盛世骑兵4","author":"张三","source":"xxxx"},
                    {"bookName":"张三三的20岁","author":"张三","source":"xxxx"},
                    {"bookName":"盛世骑兵","author":"张三","source":"xxxx"},
                    {"bookName":"盛世骑兵4","author":"张三","source":"xxxx"},
                    ],
                pageNo: 1,
                pageSize: 10,
                currentPage: 1,
                allLine: 9,
                defriendDialog:false,
                dialogBool:false,
                defriendDialogAll:false,
                defriendDialogSubmit:false,
                options: [
                    {
                        value: '火爆热书',
                        label: '火爆热书',
                        children: [
                                        {
                                        value: '热门书单',
                                        label: '热门书单',
                                        },
                                    ],
                    },
                    {
                            value: '热门书单（排行榜）',
                            label: '热门书单（排行榜）',
                            children: [{
                                        value: '女频榜',
                                        label: '女频榜',
                                    }, {
                                        value: '男频榜',
                                        label: '男频榜',
                                    },{
                                        value: '总榜',
                                        label: '总榜',
                                    }, ]
                    },
                ],
                tmpIdx:999,
                tmpRow:{},
            }
        },
        methods: {
            watchSize() {
                if(this.reason.length == 100){
                    this.textSize = 100
                    return false
                }else {
                    this.textSize = this.reason.length
                }
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            handleDefriend(idx,row) {
                this.defriendDialog = true
            },
            moveup(idx,row) {
                console.log(idx,row);
                var $tmp = this.tableData2[idx-1]
                this.tableData2[idx-1] = row
                this.tableData2[idx] = $tmp
                //this.tableData2[0] = $tmp
//                this.$router.push({
//                    name:'recommendInfo'
//                })
            },
            movedown(idx,row) {
                console.log(idx,row);
                var $tmp = this.tableData2[idx+1]
                this.tableData2[idx+1] = row
                this.tableData2[idx] = $tmp
                //this.tableData2[0] = $tmp
//                this.$router.push({
//                    name:'recommendInfo'
//                })
            },
            movedelete(idx,row) {
                this.defriendDialog = true
                console.log(this.dialogBool)
                this.tmpIdx = idx
                this.tmpRow = row
            },
            confirmdelete(){
                this.defriendDialog = false
                this.tableData2.splice(this.tmpIdx,1)
                this.allLine = this.allLine -1;
                this.tmpIdx = 999
            },
            confirmdeleteall(){
                this.defriendDialog = false
                this.tableData2.splice(this.tmpIdx,1)
                this.allLine = this.allLine -1;
                this.tmpIdx = 999
            },
            confirmsubmit(){

            },
            handleSearch(idx,row) {
                this.$router.push({
                    name:'recommendInfo'
                })
            },
            clearData() {
                this.$refs.recommendForm.resetFields()
            },
            sortChange: function(column, prop, order) {
                console.log(column.prop + '-' + column.order)
            },
            onsubmit() {
                this.tableData = [
                    {
                        headerImg: 'http://img5.duitang.com/uploads/item/201409/23/20140923094045_BNYji.thumb.700_0.png',
                        phone: '1233',
                        nickName: 'asa',
                        loginType: 'QQ',
                        accid: '',
                        login_time: '',
                        create_time: '',
                        status: '',
                        bookMoney: '',
                    },
                    {
                        headerImg: '',
                        phone: '111',
                        nickName: '',
                        loginType: '',
                        accid: '',
                        login_time: '',
                        create_time: '',
                        status: '',
                        bookMoney: '',
                    }
                ]
            },
        }
    }
</script>
<style lang="scss" scoped>
    .recommend-page{
        .recommend-header{
            height: 50px;
            padding-left: 15px;
            .el-breadcrumb{
                font-size: 16px;
                margin-top: 15px;
            }
        }
        .recommend-body{
            margin-left: 15px;
            margin-right: 15px;
            .recommend-form{
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
            }
        }
        .el-dialog__body{
            span{
                display: block;
                text-align: center;
            }
        }
    }
</style>
