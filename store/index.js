import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const screendata = {
  // 存储筛选出的数据
  screenarr: []
}

// 数据仓库
export default new Vuex.Store({
  state: {
    screendata
  },
  mutations: {
    screenmuta(state, listdata) {
      // 存储到数据仓库
      state.screendata.screenarr = listdata
      console.log(state.screendata.screenarr)
    }
  }
})
