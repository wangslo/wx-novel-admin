<template>
    <div class="banner-wx-setup-page">
        <div class="banner-wx-setup-header">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
                <el-breadcrumb-item >banner管理</el-breadcrumb-item>
                <el-breadcrumb-item >创建banner</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div style="width: 100%">
            <div  style="margin-left: 15px;width : 50%;float: left" class="banner-wx-setup-body">
                <el-form ref="bannerWxSetupForm" :model="banner_wx_setup_condition" class="banner-wx-setup-form" label-width="140px" size="small">
                    <el-form-item label="banner名称：">
                        <el-input v-model="banner_wx_setup_condition.bannerName" placeholder="请输入banner名称（情况控制在20个汉字内）"></el-input>
                    </el-form-item>
                    <el-form-item label="选择位置：">
                        <el-select v-model="banner_wx_setup_condition.position" placeholder="请选择展示位置">
                            <el-option label="请选择展示位置" value="999"></el-option>
                            <el-option label="APP书城一位" value="0"></el-option>
                            <el-option label="APP书城二位" value="1"></el-option>
                            <el-option label="APP书城三位" value="2"></el-option>
                            <el-option label="APP我的一位" value="3"></el-option>
                            <el-option label="APP书架一位" value="4"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="上传图片：" class="banner-wx-setup-img">
                        <div class="img-box">
                            <img v-show="banner_wx_setup_condition.bannerImg != ''" :src="banner_wx_setup_condition.bannerImg"/>
                        </div>
                        <el-upload
                                class="banner-wx-img-upload"
                                action="http://test-dev.admin.dftoutiao.com/banner/upload"
                                :http-request="uploadBanner"
                                :on-success="getImg"
                                list-type="picture"
                                :show-file-list="false">
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="跳转位置或链接：">
                        <el-autocomplete
                                v-model="banner_wx_setup_condition.banner_url"
                                :fetch-suggestions="queryBannerUrl"
                                placeholder="请输入书籍名称检索或h5链接"
                                style="width: 420px;"
                                :hide-loading="loading"
                        ></el-autocomplete>
                    </el-form-item>
                    <el-form-item label="展示时间：">
                        <el-col :span="11" class="startTime">
                            <el-form-item>
                                <el-date-picker
                                        type="datetime"
                                        format="yyyy-MM-dd hh:mm:ss"
                                        placeholder="起始时间"
                                        v-model="banner_wx_setup_condition.show_start_time"
                                        :picker-options="showPickerBeginDateBefore"
                                        style="width: 100%;"
                                ></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col class="line" :span="2" style="text-align:center">至</el-col>
                        <el-col :span="11" class="endTime">
                            <el-form-item>
                                <el-date-picker
                                        type="datetime"
                                        format="yyyy-MM-dd hh:mm:ss"
                                        placeholder="结束时间"
                                        v-model="banner_wx_setup_condition.show_end_time"
                                        :picker-options="showPickerBeginDateAfter"
                                        style="width: 100%;"
                                ></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item style="text-align: center;">
                        <el-button type="primary" style="width: 100px;" @click="saveBannerWx">提交</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div style="margin-left: 15px;width : 40%;float: left">

                <el-form ref="recommendForm" :model="recommend_condition2" class="recommend-form" :rules="recommendRules2" label-width="10px" size="small">
                    <el-form-item label="书籍搜索结果" prop="keyword" label-width="100px">
                        <!--<el-input v-model="xx"></el-input>-->
                    </el-form-item>
                    <!--<el-form-item style="float: right;" label-width="30px" >-->
                        <!--<el-button type="primary" @click="onsubmit">搜索</el-button>-->
                    <!--</el-form-item>-->
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
                    <el-table-column label="操作" min-width="80" align="center">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleSearch(scope.$index, scope.row)">确认</el-button>
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
        </div>

    </div>
</template>
<script>
    import {uploadModuleApi} from '../../api/main'
    export default {
        name: 'wxBannerSetup',
        data() {
            return {
                search_banner_url: [],
                loading: false,
                banner_wx_setup_condition: {
                    bannerName: '',
                    position: '999',
                    bannerImg: '',
                    banner_url: '',
                    show_start_time: '',
                    show_end_time: '',
                },
                showPickerBeginDateBefore:{
                    disabledDate: (time) => {
                        let beginDateVal = this.banner_wx_setup_condition.show_end_time;
                        if (beginDateVal) {
                            return time.getTime() > beginDateVal;
                        }
                    }
                },
                showPickerBeginDateAfter:{
                    disabledDate: (time) => {
                        let beginDateVal = this.banner_wx_setup_condition.show_start_time;
                        if (beginDateVal) {
                            return time.getTime() < beginDateVal;
                        }
                    }
                },
            }
        },
        methods: {
            getImg(res, file, fileList) {
                this.$message.success('图片上传成功')
                this.banner_wx_setup_condition.bannerImg = file.url
            },
            uploadBanner(e){
                let uploadData = new FormData();
                uploadData.wxend('file', e.file);
                uploadModuleApi.uploadImg(uploadData).then(res=>{
                    console.log(res)
                })
            },
            queryBannerUrl(params,cb) {
                if(params != ''){
                    this.loading = false
                    this.search_banner_url = [{value:'gggfffdddsss'}]
                }else {
                    this.loading = true
                    this.search_banner_url = []
                }
                setTimeout(() => {
                    cb(this.search_banner_url);
                }, 300);
            },
            saveBannerWx() {
                console.log(this.banner_wx_setup_condition.banner_url)
            }
        }
    }
</script>
<style lang="scss">
    .banner-wx-setup-page{
        .banner-wx-setup-header{
            height: 50px;
            padding-left: 15px;
            .el-breadcrumb{
                font-size: 16px;
                margin-top: 15px;
            }
        }
        .banner-wx-setup-body{
            margin-left: 15px;
            margin-right: 15px;
            .banner-wx-setup-form{
                width: 560px;
                .banner-wx-setup-img{
                    .img-box{
                        width: 100px;
                        height: 100px;
                        border: 1px solid #e0e0e0;
                        float: left;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .banner-wx-img-upload{
                        float: left;
                        margin-top: 35px;
                        margin-left: 20px;
                        .el-button{
                            width: 100px;
                        }
                    }
                }

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
