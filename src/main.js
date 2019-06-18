// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/main.css'
import './assets/css/scrollbar.css'
import common from './assets/js/common'
Vue.prototype.common = common
Vue.use(ElementUI)

Vue.config.productionTip = false

var app = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
