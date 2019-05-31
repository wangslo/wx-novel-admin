import Main from '@/components/main'

const page = name => () => import('@/pages/' + name)

export default new VueRouter({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      children: [
        {path: '/',name: 'home',component: page('home')},
        {path: '/home',name: 'home2',component: page('home')},

        {path: '/account-manger', name: 'accountManger', component: page('account/account-manger')},
        {path: '/open-account', name: 'openAccount', component: page('account/open-account')},
        {path: '/accountInfo/:id', name: 'accountInfo', component: page('account/accountInfo')},

        {path: '/userManger', name: 'userManger', component: page('user/userManger')},
        {path: '/userInfo', name: 'userInfo', component: page('user/userInfo')},
        {path: '/blacklist', name: 'blacklist', component: page('user/blacklist')},
        {path: '/blacklistInfo', name: 'blacklistInfo', component: page('user/blacklistInfo')},
        //书库管理
        {path: '/stack-room', name: 'stackRoom', component: page('books/stack-room')},
        {path: '/stack-room-detail', name: 'stackRoomDetail', component: page('books/stack-room-detail')},
        {path: '/subscription-details', name: 'subscription-details', component: page('books/subscription-details')},
        {path: '/be-audited-list', name: 'beAuditedList', component: page('books/be-audited-list')},
        {path: '/book-detail', name: 'bookDetail', component: page('books/book-detail')},

        {path: '/replyMsg', name: 'replyMsg', component: page('message/replyMsg')},
        {path: '/create-msg', name: 'create-msg', component: page('message/create-msg')},

        {path: '/novelPromotion', name: 'novelPromotion', component: page('extensionCentre/novelPromotion')},
        {path: '/promotionDetail', name: 'promotionDetail', component: page('extensionCentre/promotionDetail')},
        {path: '/pagePromotion', name: 'pagePromotion', component: page('extensionCentre/pagePromotion')},

        {path: '/adver-data', name: 'adver-data', component: page('adver')},

        {path: '/wx-banner-setup', name: 'wxBannerSetup', component: page('banner/wx-banner-setup')},
        {path: '/wx-banner-list', name: 'wxBannerList', component: page('banner/wx-banner-list')},
        {path: '/wx-banner-sort-edit', name: 'wxBannerSortEdit', component: page('banner/wx-banner-sort-edit')},
        {path: '/wx-banner-detail', name: 'wxBannerDetail', component: page('banner/wx-banner-detail')},

        {path: '/book-seller-list', name: 'bookSellerList', component: page('bookseller/book-seller-list')},
        {path: '/book-seller-detail', name: 'bookSellerDetail', component: page('bookseller/book-seller-detail')},
        {path: '/create-book-seller', name: 'createBookSeller', component: page('bookseller/create-book-seller')},

        {path: '/loginInfo', name: 'loginInfo', component: page('loginInfo')},
        {path: '/recommend-book', name: 'recommendBook', component: page('recommend/recommend-book')},
        //公众号
        {path: '/wechat-list', name: 'wechatList', component: page('wechat/wechatlist')},
        {path: '/authorization-manager', name: 'authorizationManager', component: page('wechat/authorization-manager')},
        {path: '/menu-config', name: 'menuConfig', component: page('wechat/menu-config')},
        {path: '/create-wechat', name: 'createWechat', component: page('wechat/create-wechat')},
        //书币管理
        {path: '/recharge-list', name: 'rechargeList', component: page('bookcoins/recharge-list')},

        //数据统计
        {path: '/data-overview', name: 'dataOverview', component: page('datastatistics/data-overview')},
        {path: '/promotion-statistics', name: 'promotionStatistics', component: page('datastatistics/promotion-statistics')},
        {path: '/data-detail', name: 'dataDetail', component: page('datastatistics/data-detail')},
        {path: '/re-recharge-rate-first', name: 'reRechargeRateFirst', component: page('datastatistics/re-recharge-rate-first')},
        {path: '/re-recharge-rate', name: 'reRechargeRate', component: page('datastatistics/re-recharge-rate')},

        //计费管理
        {path: '/recharge-position', name: 'rechargePosition', component: page('billingmanagement/recharge-position2')},
        {path: '/recharge-position-setup', name: 'rechargePositionSetup', component: page('billingmanagement/recharge-position-setup')},
      ]
    },
    {path: '/login', name: 'login', component: page('login')},
    {path: '/imgPromotion', name: 'imgPromotion', component: page('extensionCentre/imgPromotion')},
    {path: '/promotion', name: 'promotion', component: page('extensionCentre/promotion')},
  ]
})
