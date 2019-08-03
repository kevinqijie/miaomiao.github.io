import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.prototype.axios = axios

// axios.defaults.baseURL = '/api/'
axios.defaults.baseURL = 'http://39.97.33.178'
axios.defaults.headers.common['Authorization'] = 'AUTH_TOKEN'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
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
