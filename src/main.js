// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/main.css'
import './assets/css/scrollbar.css'
import './assets/font-awesome-4.7.0/css/font-awesome.min.css'
import NProgress from 'nprogress'
import common from './assets/js/common'
Vue.prototype.common = common
import fetch from './api/fetch'
Vue.prototype.fetch = fetch
Vue.use(ElementUI)

Vue.config.productionTip = false

router.beforeEach((to,from,next)=>{
  NProgress.start()
  var token = sessionStorage.getItem('token')
  if(!token && to.name != 'login'){
    app && app.$message.warning('未授权,请登录后继续')
    NProgress.done()
    return next({name: 'login'})
  }
  return next()
})
router.afterEach(transition => {
  setTimeout(() => {
    NProgress.done()
  })
})

var app = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
