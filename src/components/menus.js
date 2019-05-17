const menus = [
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
      {id: 'authorization-manager', name: 'authorizationManager', label: '授权管理'},
      {id: 'menu-config', name: 'menuConfig', label: '菜单配置'},
      {id: 'create-wechat', name: 'createWechat', label: '开设公众号'},
    ]
  },
  {
    id: 'msg',
    icon: 'fa fa-telegram',
    label: '消息服务',
    submenu: [
      {id: 'replyMsg', name: 'replyMsg', label: '消息回复'},
    ]
  },

  {
    id: 'extension',
    icon: 'fa fa-telegram',
    label: '推广中心',
    submenu: [
      {id: 'novelPromotion', name: 'novelPromotion', label: '小说推广'},
    ]
  },
  {
    id: 'user',
    icon: 'fa fa-user-o',
    label: '用户管理',
    submenu: [
      {id: 'userManger', name: 'userManger', label: '用户列表'},
      {id: 'blacklist', name: 'blacklist', label: '黑名单'},
      // {id: 'blacklistInfo', name: 'blacklistInfo', label: '黑名单用户详情'},
    ]
  },
  // {
  //   id: 'bookCity',
  //   icon: 'fa fa-book',
  //   label: '书城管理',
  //   submenu: [
  //     {id: '', name: '', label: '书城管理'},
  //   ]
  // },
  {
    id: 'book',
    icon: 'fa fa-bookmark-o',
    label: '书库管理',
    submenu: [
      {id: 'stack-room', name: 'stackRoom', label: '书库列表'},
      {id: 'be-audited-list', name: 'beAuditedList', label: '待审核列表'},
      // {id: 'stack-room-detail', name: 'stackRoomDetail', label: '书籍详情'},
      // {id: '', name: '', label: '设置收费书籍'},
      // {id: '', name: '', label: '充值记录'},
      // {id: '', name: '', label: '消费记录'},
    ]
  },
  {
    id: 6000,
    icon: 'fa fa-hand-rock-o',
    label: '推荐管理',
    submenu: [
      {id: 6100, name: 'recommendBook', label: '推荐书籍'},
      // {id: 'recommend-banner', name: 'recommendBanner', label: 'banner管理'},
    ]
  },
  {
    id: 'dataStatistics',
    icon: 'fa fa-hand-rock-o',
    label: '数据统计',
    submenu: [
      {id: 'data-overview', name: 'dataOverview', label: '数据概览'},
      {id: 'promotion-statistics', name: 'promotionStatistics', label: '推广统计'},
      // {id: 'recommend-banner', name: 'recommendBanner', label: 'banner管理'},
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
    id: 'bannerManger',
    icon: 'fa fa-file-image-o',
    label: 'banner管理',
    submenu: [
      // {id: 'appBannerList', name: 'appBannerList', label: 'APP列表'},
      // {id: '', name: '', label: 'PC列表'},
      // {id: 'appBannerSetup', name: 'appBannerSetup', label: '设置APP'},
      // {id: '', name: '', label: '设置PC'},
      // {id: 'appBannerSortEdit', name: 'appBannerSortEdit', label: '更改APP排序'},
      // {id: '', name: '', label: '更改PC排序'},
      {id: 'wxBannerSetup', name: 'wxBannerSetup', label: '创建banner'},
      {id: 'wxBannerList', name: 'wxBannerList', label: 'banner列表'},
      {id: 'wxBannerSortEdit', name: 'wxBannerSortEdit', label: '更改banner排序'},
      // {id: 'wxBannerDetail', name: 'wxBannerDetail', label: 'wx banner 详情'},
    ]
  },
  {
    id: 'bookSeller',
    icon: 'fa fa-address-book-o',
    label: '书商管理',
    submenu: [
      {id: 'bookSellerList', name: 'bookSellerList', label: '书商列表'},
      // {id: 'bookSellerDetail', name: 'bookSellerDetail', label: '书商详情'},
      {id: 'createBookSeller', name: 'createBookSeller', label: '创建书商'},
    ]
  },
  {
    id: 'adver',
    icon: 'fa fa-map-signs',
    label: '广告管理',
    submenu: [
      {id: 'adver-data', name: 'adver-data', label: '广告数据'},
    ]
  },
  // {
  //   id: 'help',
  //   icon: 'fa fa-medkit',
  //   label: '帮助与反馈',
  //   submenu: [
  //     {id: '', name: '', label: '帮助列表'},
  //     {id: '', name: '', label: '反馈列表'},
  //   ]
  // },
  // {
  //   id: 'activity',
  //   icon: 'fa fa-play-circle-o',
  //   label: '活动管理',
  //   submenu: [
  //     {id: '', name: '', label: '活动管理'},
  //   ]
  // },
  // {
  //   id: 'userData',
  //   icon: 'fa fa-user-md',
  //   label: '用户数据',
  //   submenu: [
  //     {id: '', name: '', label: '用户数据'},
  //   ]
  // },
  // {
  //   id: 'message',
  //   icon: 'fa fa-comments-o',
  //   label: '消息管理',
  //   submenu: [
  //     {id: '', name: '', label: '消息管理'},
  //   ]
  // },
  // {
  //   id: 'recharge',
  //   icon: 'fa fa-money',
  //   label: '充值记录',
  //   submenu: [
  //     {id: '', name: '', label: '充值记录'},
  //   ]
  // },
]
export default menus
