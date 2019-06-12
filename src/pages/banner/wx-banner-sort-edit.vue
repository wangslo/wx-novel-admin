<template>
  <div class="banner-wx-sort-page">
    <div class="banner-wx-sort-header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>推荐管理</el-breadcrumb-item>
        <el-breadcrumb-item>更改banner排序</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="banner-wx-sort-body">
      <div class="banner-wx-sort-position">
        <span>选择位置：</span>
        <el-radio v-model="position" label="0" @change="getPosition">男频</el-radio>
        <el-radio v-model="position" label="1" @change="getPosition">女频</el-radio>
        <span style="display: block;margin-top: 10px;color:#888888;">长按banner区域可进行拖动</span>
      </div>
      <div class="banner-wx-sort-img">
        <draggable v-model="banner_lists" :move="getdata" @update="datadragEnd" :options="{animation:1000}">
          <transition-group>
            <div v-for="item in banner_lists" :key="item.url" class="drag-item">
              <img :src="item.url"/>
              <span v-if="item.name">{{item.name}}</span>
              <span v-else>&nbsp;</span>
              <span>{{item.showTime}}</span>
            </div>
          </transition-group>
        </draggable>
        <div class="banner-wx-sort-btn" v-if="banner_lists.length > 0">
          <el-button type="success" size="mini" @click="saveOrder">保存</el-button>
          <el-button type="warning" size="mini">取消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import draggable from 'vuedraggable'
  import {orgModuleApi} from "../../api/main";

  export default {
    name: 'WxBannerSortEdit',
    data() {
      return {
        position: "0",
        banner_lists: [],
      }
    },
    components: {
      draggable
    },
    created() {
      this.initBannerLists()
    },
    methods: {
      saveOrder() {
        var _this = this

        let orderMap = '{'
        this.banner_lists.map((item,idx)=>{
          orderMap += '"'+item.id+'":'+(idx+1)+','
        })
        orderMap += '}'
        orderMap = orderMap.replace(',}','}')

        var params = {
          bannerGroup: this.position,
          odrmap: JSON.parse(orderMap),
        }
        orgModuleApi.setBannerOrder(params).then(res=>{
          console.log(res)
          if(res.success){
            this.$message.success('保存成功！')
            _this.initBannerLists()
          }
        })
      },
      initBannerLists() {
        var _this = this
        var params = {
          bannerGroup: _this.position,
        }
        _this.banner_lists = []
        orgModuleApi.getOnlineBanner(params).then(res => {
          console.log(res)
          if (res.success) {
            res.data.map((item, index) => {
              _this.banner_lists.push({
                id: item.id,
                url: item.imgsrc,
                name: item.bookname,
                showTime: _this.common.getDate2(item.startDate) + '~' +_this.common.getDate2(item.endDate),
              })
            })
          }
        })
      },
      getdata(evt) {
        // console.log(evt.draggedContext.element)
      },
      datadragEnd(evt) {
        evt.preventDefault();
        // console.log('拖动前的索引 :' + evt.oldIndex)
        // console.log('拖动后的索引 :' + evt.newIndex)
        // console.log(this.banner_lists);
      },
      getPosition() {
        this.initBannerLists()
      }
    },
    mounted() {
      document.body.ondrop = function (event) {
        event.preventDefault();
        event.stopPropagation();
      }
    }
  }
</script>
<style lang="scss" scoped>
  .banner-wx-sort-page {
    .banner-wx-sort-header {
      height: 50px;
      padding-left: 15px;
      .el-breadcrumb {
        font-size: 16px;
        margin-top: 15px;
      }
    }
    .banner-wx-sort-body {
      margin-left: 15px;
      margin-right: 15px;
      position: relative;
      .banner-wx-sort-img {
        height: auto;
        position: absolute;
        .drag-item {
          width: 280px;
          margin-top: 20px;
          float: left;
          margin-left: 20px;
          margin-right: 20px;
          box-shadow: -5px 5px 20px #888888;
          img {
            width: 280px;
            height: 170px;
          }
          span {
            display: block;
            text-align: center;
          }
        }
      }
      .banner-wx-sort-btn {
        position: absolute;
        bottom: -100px;
        width: 80%;
        text-align: center;
      }
    }
  }
</style>
