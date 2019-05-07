import Main from '@/components/main'
import Home from '@/pages/home'

const page = name => () => import('@/pages/' + name)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      children: [
        {path: '/',name: 'home',component: Home},
        {path: '/account-manger', name: 'accountManger', component: page('account/account-manger')},
        {path: '/open-account', name: 'openAccount', component: page('account/open-account')},
        {path: '/userManger', name: 'userManger', component: page('user/userManger')},
        {path: '/userInfo', name: 'userInfo', component: page('user/userInfo')},
        {path: '/blacklist', name: 'blacklist', component: page('user/blacklist')},
        {path: '/blacklistInfo', name: 'blacklistInfo', component: page('user/blacklistInfo')},
        {path: '/stack-room', name: 'stackRoom', component: page('books/stack-room')},
        {path: '/stack-room-detail', name: 'stackRoomDetail', component: page('books/stack-room-detail')},
        {path: '/adver-data', name: 'adver-data', component: page('adver')},
        {path: '/app-banner-list', name: 'appBannerList', component: page('banner/app-banner-list')},
        {path: '/app-banner-sort-edit', name: 'appBannerSortEdit', component: page('banner/app-banner-sort-edit')},
        {path: '/app-banner-setup', name: 'appBannerSetup', component: page('banner/app-banner-setup')},
        {path: '/banner-detail', name: 'bannerDetail', component: page('banner/banner-detail')},
        {path: '/wx-banner-setup', name: 'wxBannerSetup', component: page('banner/wx-banner-setup')},
        {path: '/wx-banner-list', name: 'wxBannerList', component: page('banner/wx-banner-list')},
        {path: '/wx-banner-sort-edit', name: 'wxBannerSortEdit', component: page('banner/wx-banner-sort-edit')},
        {path: '/wx-banner-detail', name: 'wxBannerDetail', component: page('banner/wx-banner-detail')},
        {path: '/book-seller-list', name: 'bookSellerList', component: page('bookseller/book-seller-list')},
        {path: '/loginInfo', name: 'loginInfo', component: page('loginInfo')},
        {path: '/recommend-book', name: 'recommendBook', component: page('recommend/recommend-book')},
      ]
    },
    {path: '/login', name: 'login', component: page('login')}
  ]
})
