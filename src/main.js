import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.prototype.axios = axios
// axios.defaults.timeout = 5000 // 请求超时
// // eslint-disable-next-line no-unused-expressions
// axios.defaults.headers['Content-Type']
axios.defaults.baseURL = 'http://39.97.33.178/api'
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
