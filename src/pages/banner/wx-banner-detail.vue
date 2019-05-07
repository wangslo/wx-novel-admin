<template>
    <div class="banner-detail-page">
        <div class="banner-detail-header">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{path: '/app-banner-list'}">banner管理</el-breadcrumb-item>
                <el-breadcrumb-item >***详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="banner-detail-body">
            <div class="banner-detail-box">
                <div class="banner-detail-item">
                    <span class="item-name">banner名称：</span>
                    <span class="item-value">XXXXXXX</span>
                </div>
                <div class="banner-detail-item">
                    <span class="item-name">位置：</span>
                    <span class="item-value">XXXXXXX</span>
                </div>
                <div class="banner-detail-item">
                    <span class="item-name">展示时间：</span>
                    <span class="item-value">2019-04-04 12:00 至 2019-05-01 12:00</span>
                </div>
                <div class="banner-detail-item">
                    <span class="item-name">跳转位置或链接：</span>
                    <span class="item-value">书籍名称或跳转链接</span>
                </div>
                <div class="banner-detail-item">
                    <span class="item-name">发布时间：</span>
                    <span class="item-value">2019-04-06 12:00:00</span>
                </div>
                <div class="banner-detail-item">
                    <span class="item-name">状态：</span>
                    <span class="item-value">在线</span>
                </div>
            </div>
            <div class="banner-detail-item">
                <span class="item-name head-img-title">banner图：</span>
                <div class="head-img-url">
                    <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1222929928,1326821480&fm=26&gp=0.jpg"/>
                    <div class="banner-detail-btn-box">
                        <el-button type="warning" size="mini" class="banner-detail-btn">编辑</el-button>
                        <el-button type="danger" size="mini" class="banner-detail-btn">下线</el-button>
                    </div>
                </div>
            </div>
            <div class="line"></div>
            <div class="banner-detail-item operat-info">
                <span class="item-name operat-title">操作详情：</span>
                <div class="operat-reason">
                    <span class="item-value">XXXX与2019-04-10 12:00:00进行下线操作  原因：因点击量小无法满足运营需求</span>
                    <span class="item-value">XXXX与2019-04-10 12:00:00进行下线操作  原因：因点击量小无法满足运营需求</span>
                    <span class="item-value">XXXX与2019-04-10 12:00:00进行下线操作  原因：因点击量小无法满足运营需求</span>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .banner-detail-box{
        width: 95%;
        margin: 0 auto;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin-top: 20px;
    }
    .banner-detail-item{
        margin-right: 20px;
        margin-bottom: 10px;
        .item-name{
            font-size: 14px;
            font-weight: 600;
        }
    }
    .operat-info{
        margin-top: 20px;
        .operat-title{
            display: block;
            float: left;
        }
        .operat-reason{
            float: left;
            span{
                display: block;
            }
        }
    }
    .head-img-title{
        margin-top: 2px;
        display: block;
        float: left;
    }
    .head-img-url{
        display: inline-block;
        text-align: center;
        img{
            width: 100px;
            height: 100px;
        }
        .banner-detail-btn-box{
            margin-top: 20px;
            margin-bottom: 20px;
            .banner-detail-btn{
                display: inline-block;
            }
        }
    }
    .line{
        width: 100%;
        height: 2px;
        background: #e0e0e0;
    }
</style>
