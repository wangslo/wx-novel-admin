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
        /*_this.menuList.push(
          {
            id: 1000,
            icon: 'fa fa-home',
            label: '首页',
            submenu: [
              {id: 1100, name: 'home2', label: '首页'},
            ]
          },
          {
            id: 2000,
            icon: 'fa fa-file-powerpoint-o',
            label: '权限管理',
            submenu: [
              {id: 2100, name: 'accountManger', label: '账号管理'},
              {id: 'open-account', name: 'openAccount', label: '开设账号'},
            ]
          },
          {
            id: 'wechatPublic',
            icon: 'fa fa-telegram',
            label: '公众号管理',
            submenu: [
              {id: 'wechat-list', name: 'wechatList', label: '公众号列表'},
              {id: 'create-wechat', name: 'createWechat', label: '开设公众号'},
            ]
          },
          {
            id: 'msg',
            icon: 'fa  fa-commenting-o',
            label: '消息服务',
            submenu: [
              {id: 'replyMsg', name: 'replyMsg', label: '消息回复'},
            ]
          },
          {
            id: 'extension',
            icon: 'fa fa-expand',
            label: '推广中心',
            submenu: [
              {id: 'novelPromotion', name: 'novelPromotion', label: '小说推广'},
            ]
          },
          {
            id: 'bookcoins',
            icon: 'fa fa-money',
            label: '书币管理',
            submenu: [
              {id: 'recharge-list', name: 'rechargeList', label: '充值列表'},
            ]
          },
          {
            id: 'dataStatistics',
            icon: 'fa fa-database',
            label: '数据统计',
            submenu: [
              {id: 'promotion-statistics', name: 'promotionStatistics', label: '推广统计'},
            ]
          },
        )*/
        /*menus.map((item,index)=>{
          _this.menuList.push(item)
        })*/
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
