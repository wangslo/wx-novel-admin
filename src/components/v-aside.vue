<template>

  <v-menu class="side-menu"
          :collapse="collapse"
          :default-active="defaultActive"
          :menus="menuList"
          router
          :background-color="theme.backgroundColor"
          :text-color="theme.textColor"
          :active-text-color="theme.activeTextColor">
  </v-menu>

</template>
<script type="text/javascript">
  import VMenu from './vmenu'
  import menus from './menus'
  export default {
    name: 'Vaside',
    props: {
      collapse: Boolean,
      theme: Object,
    },
    components: {
      VMenu
    },
    data () {
      return {
        menuList: [],
        qxlist: [],
        defaultActive: 'home',
      }
    },
    watch: {
      $route () {
        this.setCurrentRoute()
      }
    },
    created() {
      this.setCurrentRoute()
      this.setMenuList()
    },
    methods: {
      setCurrentRoute () {
        this.defaultActive = this.$route.name
      },
      setMenuList() {
        // this.qxlist = sessionStorage.getItem('role')
        var _this = this
        menus.map((item,index)=>{
          // if(_this.qxlist.indexOf(item.id) > -1){
            _this.menuList.push(item)
          // }
        })
      }
    }
  }
</script>
<style type="text/css">
  .el-menu.side-menu{
    border-right: none;
  }
  .el-menu .fa{
    font-size: 18px;
    margin-right: 7px;
    display: inline-block;
    width: 23px;
    text-align: center;
  }
  .el-menu.side-menu .el-menu-item.is-active {
    color: #FC3D64;
    border-right: solid 2px #FC3D64;
    background: #eef3f5;
  }
</style>
