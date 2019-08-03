import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.prototype.axios = axios

Vue.config.productionTip = false
Vue.filter('setWH', (url, num) => {
  return url.replace(/w\.h/, num)
  // 过滤器
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
