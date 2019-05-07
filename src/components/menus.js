const menus = [
  {
    id: 'account',
    icon: 'fa fa-file-powerpoint-o',
    label: '权限管理',
    submenu: [
      {id: 'account-manger', name: 'accountManger', label: '账号管理'},
      {id: 'open-account', name: 'openAccount', label: '开设账号'},
    ]
  },
  // {
  //   id: 'user',
  //   icon: 'fa fa-user-o',
  //   label: '用户管理',
  //   submenu: [
  //     {id: 'userManger', name: 'userManger', label: '用户管理'},
  //     {id: 'blacklist', name: 'blacklist', label: '黑名单'},
  //   ]
  // },
  {
    id: 'bookCity',
    icon: 'fa fa-book',
    label: '书城管理',
    submenu: [
      {id: '', name: '', label: '书城管理'},
    ]
  },
  // {
  //   id: 'book',
  //   icon: 'fa fa-bookmark-o',
  //   label: '书籍管理',
  //   submenu: [
  //     {id: '', name: '', label: '待审核列表'},
  //     {id: 'stack-room', name: 'stackRoom', label: '书库管理'},
  //     {id: '', name: '', label: '设置收费书籍'},
  //     {id: '', name: '', label: '充值记录'},
  //     {id: '', name: '', label: '消费记录'},
  //   ]
  // },
  {
    id: 'recommend',
    icon: 'fa fa-hand-rock-o',
    label: '推荐管理',
    submenu: [
      {id: 'recommend-book', name: 'recommendBook', label: '推荐书籍'},
      // {id: 'recommend-banner', name: 'recommendBanner', label: 'banner管理'},
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
      {id: 'wxBannerSetup', name: 'wxBannerSetup', label: '设置wx'},
      {id: 'wxBannerList', name: 'wxBannerList', label: 'wx banner管理'},
      {id: 'wxBannerSortEdit', name: 'wxBannerSortEdit', label: '更改wx排序'},
      {id: 'wxBannerDetail', name: 'wxBannerDetail', label: 'wx banner 详情'},
    ]
  },
  {
    id: 'bookSeller',
    icon: 'fa fa-file-image-o',
    label: '书商管理',
    submenu: [
      {id: 'bookSellerList', name: 'bookSellerList', label: '书商列表'},
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
  {
    id: 'recharge',
    icon: 'fa fa-money',
    label: '充值记录',
    submenu: [
      {id: '', name: '', label: '充值记录'},
    ]
  },
]
export default menus
