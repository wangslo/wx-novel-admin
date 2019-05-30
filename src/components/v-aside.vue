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
      getSubMenu(qxlist) {
        var submenuList = []
        if(qxlist.children != undefined){
          if(qxlist.children.length > 0){
            for(var i in qxlist.children){
              this.getSubMenu(qxlist.children)
              var submenu = {
                id: qxlist.children[i].id,
                path: qxlist.children[i].url,
                label: qxlist.children[i].name
              }
              submenuList.push(submenu)
            }
          }
        }
        return submenuList
      },
      setMenuList() {
        var _this = this
        _this.qxlist = JSON.parse(sessionStorage.getItem('role'))
        for(var item in _this.qxlist){
          var submenuList = _this.getSubMenu(_this.qxlist[item])
          var arr = {
            id: _this.qxlist[item].id,
            icon: 'fa ' + _this.qxlist[item].icon,
            label: _this.qxlist[item].name,
            submenu: submenuList
          }
          _this.menuList.push(arr)
        }

        menus.map((item,index)=>{
          _this.menuList.push(item)
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
