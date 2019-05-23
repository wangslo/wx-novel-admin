<template>
  <el-container class="v-container" :class="{'mini-side': isCollapse,'hide-side': hideSide}">
    <el-aside class="v-side" :width="hideSide ? '0' : sideWidth + 'px'" :style="{background: theme.theme.backgroundColor}">
      <div class="v-header-logo-box" :style="{height: headerHeight + 'px', color: theme.theme.activeTextColor}" @click="toIndex">
        <img src="../assets/logo.png" alt="" class="header-logo">
        <span class="header-logo-text" >趣阅读管理后台</span>
      </div>
      <Vaside :collapse="isCollapse" :theme="theme.theme"></Vaside>
    </el-aside>
    <el-container style="overflow-x: auto">
      <el-header class="v-header" :height="headerHeight + 'px'">
        <Vheader @switch="handleSideSwitch"></Vheader>
      </el-header>
      <el-main class="v-main">
        <!--<keep-alive>-->
          <router-view></router-view>
        <!--</keep-alive>-->
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
  import Vaside from './v-aside'
  import Vheader from './v-header'
  export default {
    name: 'Main',
    data() {
      return {
        isCollapse: false,
        hideSide: false,
        sideWidth: 200,
        headerHeight: 50,
        theme: {theme: {}},
      }
    },
    components: {
      Vaside,
      Vheader,
    },
    methods: {
      handleSideSwitch (val) {
        this.isCollapse = val
        this.sideWidth = val ? 60 : 200
      },
      toIndex() {
        this.$router.push({path: '/'})
      },
    }
  }
</script>
<style>
  .v-container{
    margin: 0 auto;
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .v-header{
    padding: 0;
    background: #FC3D64;
    overflow: visible;
    z-index: 100;
  }
  .v-side{
    width: 200px;
    transition: all 0.5s ease;
  }
  .v-main{
    background: #ECF0F5;
    overflow: visible;
    padding: 0px;
  }
  .v-header-logo-box{
    padding: 15px;
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
  }
  .v-header-logo-box .header-logo{
    height: 42px;
    margin-top: -10px;
    margin-right: 5px;
    vertical-align: middle;
  }
  .v-header-logo-box .header-logo-text{
    font-size: 14px;
    font-weight: bold;
    opacity: 1;
  }
</style>
