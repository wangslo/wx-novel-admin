<template>
    <div class="banner-wx-page">
        <div class="banner-wx-header">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
                <el-breadcrumb-item >banner管理</el-breadcrumb-item>
                <el-breadcrumb-item >banner管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="banner-wx-body">
            <el-form ref="bannerWxForm" :model="banner_wx_condition" class="banner-wx-form" label-width="80px" size="small">
                <el-form-item label="状态" label-width="60px">
                    <el-select v-model="banner_wx_condition.status" placeholder="请选择状态">
                        <el-option label="全部" value="999"></el-option>
                        <el-option label="在线" value="0"></el-option>
                        <el-option label="已下线" value="1"></el-option>
                        <el-option label="未上线" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="位置" label-width="60px">
                    <el-select v-model="banner_wx_condition.position" placeholder="请选择位置">
                        <el-option label="全部" value="999"></el-option>
                        <el-option label="APP书城一位" value="0"></el-option>
                        <el-option label="APP书城二位" value="1"></el-option>
                        <el-option label="APP书城三位" value="2"></el-option>
                        <el-option label="APP我的一位" value="3"></el-option>
                        <el-option label="APP书架一位" value="4"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="发布时间">
                    <el-col :span="10" class="startTime">
                        <el-form-item  prop="create_start_time">
                            <el-date-picker
                                    type="date"
                                    format="yyyy-MM-dd"
                                    placeholder="起始时间"
                                    v-model="banner_wx_condition.create_start_time"
                                    :picker-options="pickerBeginDateBefore"
                                    style="width: 100%;"
                            ></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col class="line" style="width:20px;text-align:center">至</el-col>
                    <el-col :span="10" class="endTime">
                        <el-form-item prop="create_end_time">
                            <el-date-picker
                                    type="date"
                                    format="yyyy-MM-dd"
                                    placeholder="结束时间"
                                    v-model="banner_wx_condition.create_end_time"
                                    :picker-options="pickerBeginDateAfter"
                                    style="width: 100%;"
                            ></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="展示时间">
                    <el-col :span="10" class="startTime">
                        <el-form-item  prop="show_start_time">
                            <el-date-picker
                                    type="date"
                                    format="yyyy-MM-dd"
                                    placeholder="起始时间"
                                    v-model="banner_wx_condition.show_start_time"
                                    :picker-options="showPickerBeginDateBefore"
                                    style="width: 100%;"
                            ></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col class="line" style="width:20px;text-align:center">至</el-col>
                    <el-col :span="10" class="endTime">
                        <el-form-item prop="show_end_time">
                            <el-date-picker
                                    type="date"
                                    format="yyyy-MM-dd"
                                    placeholder="结束时间"
                                    v-model="banner_wx_condition.show_end_time"
                                    :picker-options="showPickerBeginDateAfter"
                                    style="width: 100%;"
                            ></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="banner名称" label-width="100px">
                    <el-input v-model="banner_wx_condition.bannerName"></el-input>
                </el-form-item>
                <el-form-item style="float: right;">
                    <el-button type="primary" @click="clearData">清空</el-button>
                    <el-button type="primary" @click="getBannerWxLists">查找</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="tableData" style="width:100%;"
                      :default-sort = "{prop: 'createTime', order: 'descending'}"
                      stripe border
                      @sort-change='sortChange'>
                <el-table-column label="序号" width="80" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.$index+(pageNo - 1) * pageSize + 1}} </span>
                    </template>
                </el-table-column>
                <el-table-column prop="bannerName" label="banner名称" width="180" align="center"></el-table-column>
                <el-table-column label="图片" width="90" align="center">
                    <template slot-scope="scope">
                        <img :src="scope.row.bannerImage" width="70" height="95"/>
                    </template>
                </el-table-column>
                <el-table-column prop="position" label="位置" width="180" align="center"></el-table-column>
                <el-table-column prop="bannerUrl" label="跳转位置或链接" width="180" align="center"></el-table-column>
                <el-table-column prop="showTime" label="展示时间" width="180" align="center"></el-table-column>
                <el-table-column sortable='custom' :sort-orders="['ascending', 'descending']"
                                 prop="createTime" label="发布时间" width="180" align="center"></el-table-column>
                <el-table-column prop="status" label="状态" width="180" align="center"></el-table-column>
                <el-table-column label="操作" min-width="250" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" :disabled="scope.row.status == 0 ? true:false" type="danger" @click="handleOffLine(scope.$index, scope.row)">下线</el-button>
                        <el-button size="mini" v-show = "scope.row.status != 1 ? true:false" type="primary" @click="handleOnLine(scope.$index, scope.row)">上线</el-button>
                        <el-button size="mini" v-show = "false" type="warning" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" type="info" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
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
            <div class="dialog-div">
                <el-dialog title="" :visible.sync="offlineDialog" width="500px" center>
                    <span>你确认要将“banner名称”下线吗？</span>
                    <span>下线后，将无法再次进行修改！</span>
                    <el-input
                            type="textarea"
                            :rows="3"
                            resize="none"
                            maxlength='50'
                            placeholder="请输入下线原因（不得少于5个汉字）"
                            @keyup.native = "watchSize"
                            v-model="reason">
                    </el-input>
                    <p style="margin: 0;"><span style="text-align: right;">{{textSize}}/50</span></p>
                    <span slot="footer" class="dialog-footer">
            <el-button @click="offlineDialog = false">取 消</el-button>
            <el-button type="primary" @click="offlineDialog = false">确 认</el-button>
          </span>
                </el-dialog>
            </div>
        </div>
    </div>
</template>
<script>
    import {orgModuleApi} from '../../api/main'
    export default {
        name: 'bannerWxList',
        data() {
            return {
                banner_wx_condition: {
                    status: '999',
                    position: '999',
                    create_start_time: '',
                    create_end_time: '',
                    show_start_time: '',
                    show_end_time: '',
                    bannerName: '',
                },
                pickerBeginDateBefore:{
                    disabledDate: (time) => {
                        let beginDateVal = this.banner_wx_condition.create_end_time;
                        if (beginDateVal) {
                            return time.getTime() > beginDateVal;
                        }
                    }
                },
                pickerBeginDateAfter:{
                    disabledDate: (time) => {
                        let beginDateVal = this.banner_wx_condition.create_start_time;
                        if (beginDateVal) {
                            return time.getTime() < beginDateVal;
                        }
                    }
                },
                showPickerBeginDateBefore:{
                    disabledDate: (time) => {
                        let beginDateVal = this.banner_wx_condition.show_end_time;
                        if (beginDateVal) {
                            return time.getTime() > beginDateVal;
                        }
                    }
                },
                showPickerBeginDateAfter:{
                    disabledDate: (time) => {
                        let beginDateVal = this.banner_wx_condition.show_start_time;
                        if (beginDateVal) {
                            return time.getTime() < beginDateVal;
                        }
                    }
                },
                tableData: [
                    {"bannerName":"xxxx","bannerImage":"http://images01.mopimg.cn/imgs/20180702/20180702_c12a04208c276a5f9adef630bda4dd61.JPEG",
                        "position":"男频","bannerUrl":"鬼吹灯","showTime":"2019-05-07 ~ 2019-09-15","createTime":"2019-05-07","status":"在线"
                    },
                    {"bannerName":"xxxx","bannerImage":"http://images01.mopimg.cn/imgs/20180706/20180706_8c97b34a6c53fe256c5dc07493541df9.JPEG",
                        "position":"女频","bannerUrl":"鬼吹灯1","showTime":"2019-05-07 ~ 2019-09-15","createTime":"2019-05-07","status":"在线"
                    },
                ],
                pageNo: 1,
                pageSize: 10,
                currentPage: 1,
                totalSize: 0,
                offlineDialog: false,
                offlineDialog2: true,
                sort_prop: 'createTime',
                sort_order: 'desc',
                reason: '',
                textSize: 0,
            }
        },
        created() {
            this.getBannerWxLists()
        },
        methods: {
            watchSize() {
                if(this.reason.length == 50){
                    this.textSize = 50
                    return false
                }else {
                    this.textSize = this.reason.length
                }
            },
            getBannerWxLists() {

            },
            handleSizeChange(val) {
                this.pageSize = val
                this.getBannerWxLists()
            },
            handleCurrentChange(val) {
                this.pageNo = val
                this.getBannerWxLists()
            },
            clearData() {
                this.$refs.bannerWxForm.resetFields()
                this.banner_wx_condition.status = '999'
                this.banner_wx_condition.bannerName = ''
                this.banner_wx_condition.position = '999'
            },
            sortChange: function(column, prop, order) {
                this.sort_prop = column.prop
                this.sort_order = column.order.replace('ending','')
                this.getBannerWxLists()
            },
        }
    }
</script>
<style lang="scss">
    .banner-wx-page{
        .banner-wx-header{
            height: 50px;
            padding-left: 15px;
            .el-breadcrumb{
                font-size: 16px;
                margin-top: 15px;
            }
        }
        .banner-wx-body{
            margin-left: 15px;
            margin-right: 15px;
            .banner-wx-form{
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
    }
</style>
