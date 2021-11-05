import App from './App'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
// 引入uView框架
import uView from 'uview-ui'
Vue.use(uView)
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif