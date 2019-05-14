<template>
    <div class="banner-wx-sort-page">
        <div class="banner-wx-sort-header">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
                <el-breadcrumb-item >banner管理</el-breadcrumb-item>
                <el-breadcrumb-item >更改banner排序</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="banner-wx-sort-body">
            <div class="banner-wx-sort-position">
                <span>选择位置：</span>
                <el-radio v-model="position" label="1" @change="getPosition">男频</el-radio>
                <el-radio v-model="position" label="2" @change="getPosition">女频</el-radio>
                <span style="display: block;margin-top: 10px;color:#888888;">长按banner区域可进行拖动</span>
                <div class="banner-wx-sort-btn">
                    <el-button type="success" size="mini">保存</el-button>
                    <el-button type="warning" size="mini">取消</el-button>
                </div>
            </div>
            <div class="banner-wx-sort-img">
                <draggable v-model="banner_lists" :move="getdata" @update="datadragEnd" :options = "{animation:1000}">
                    <transition-group>
                        <div v-for="item in banner_lists" :key="item.url" class="drag-item">
                            <img :src="item.url"/>
                            <span>{{item.name}}</span>
                            <span>{{item.showTime}}</span>
                        </div>
                    </transition-group>
                </draggable>
            </div>
        </div>
    </div>
</template>
<script>
    import draggable from 'vuedraggable'
    export default {
        name: 'WxBannerSortEdit',
        data() {
            return {
                position:"1",
                banner_lists: [
                    {
                        name: '1',
                        url: 'http://up.enterdesk.com/edpic/8b/89/86/8b8986b40f7fc1ff4f7f6ea7b6c4447d.jpg',
                        showTime: '2019-05-03 12:12:12'
                    },
                    {
                        name: '2',
                        url: 'http://attach.bbs.miui.com/forum/201403/23/210134o8y38c7m8y4726xa.jpg',
                        showTime: '2019-05-03 12:12:12'
                    },
                    {
                        name: '3',
                        url: 'http://img3.redocn.com/tupian/20141017/tianyeweimeiyijing_3148673.jpg',
                        showTime: '2019-05-03 12:12:12'
                    },
                    {
                        name: '4',
                        url: 'http://img5.imgtn.bdimg.com/it/u=3300305952,1328708913&fm=26&gp=0.jpg',
                        showTime: '2019-05-03 12:12:12'
                    },
                    {
                        name: '5',
                        url: 'http://pic27.nipic.com/20130309/9527735_191152373000_2.jpg',
                        showTime: '2019-05-03 12:12:12'
                    },
                    {
                        name: '6',
                        url: 'http://pic11.nipic.com/20101208/6332275_140730007350_2.jpg',
                        showTime: '2019-05-03 12:12:12'
                    },
                ],
            }
        },
        components: {
            draggable
        },
        methods:{
            getdata (evt) {
                console.log(evt.draggedContext.element)
            },
            datadragEnd (evt) {
                evt.preventDefault();
                console.log('拖动前的索引 :' + evt.oldIndex)
                console.log('拖动后的索引 :' + evt.newIndex)
                console.log(this.banner_lists);
            },
            getPosition() {
                console.log(this.position)
            }
        },
        mounted () {
            document.body.ondrop = function (event) {
                event.preventDefault();
                event.stopPropagation();
            }
        }
    }
</script>
<style lang="scss" scoped>
    .banner-wx-sort-page{
        .banner-wx-sort-header{
            height: 50px;
            padding-left: 15px;
            .el-breadcrumb{
                font-size: 16px;
                margin-top: 15px;
            }
        }
        .banner-wx-sort-body{
            margin-left: 15px;
            margin-right: 15px;
            .banner-wx-sort-position{

            }
            .banner-wx-sort-img{
                width: 90%;
                height: auto;
                .drag-item{
                    width: 250px;
                    margin-top:20px;
                    float: left;
                    margin-left: 20px;
                    margin-right: 20px;
                    box-shadow: -5px 5px 20px #888888;
                    img{
                        width: 250px;
                        height: 150px;
                    }
                    span{
                        display: block;
                        text-align: center;
                    }
                }
            }
        }
        .banner-wx-sort-btn{
            width: 80%;
            text-align: right;
            margin-top: -20px;
        }
    }
</style>
