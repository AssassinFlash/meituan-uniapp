<template>
  <view>
    <Search></Search>
    <Preference :preferData="preferData"></Preference>
    <Nearby></Nearby>
    <!-- 通过isfixed的改变动态绑定class属性 -->
    <Delicacy id="boxFixed" :class="{ is_fixed: isfixed }"></Delicacy>
    <Takeout></Takeout>
  </view>
</template>

<script>
import Search from "./components/search.vue";
import Preference from "./components/preference.vue";
import Nearby from "./components/nearby.vue";
import Delicacy from "./components/delicacy.vue";
import Takeout from "./components/takeout.vue";
// 引入请求地址
import { listing } from "../../api/api.js";
import { getpreferurl } from "../../api/request.js";
export default {
  components: {
    Search,
    Preference,
    Nearby,
    Delicacy,
    Takeout,
  },
  data() {
    return {
      menutop: "", // 筛选菜单和顶部的距离
      rect: "", // 页面滚动距离
      isfixed: false, // 筛选组件是否置顶
      preferData: [], // 为你优选
    };
  },
  onLoad() {
    this.preference();
    // 获取筛选组件距离顶部的距离
    const query = wx.createSelectorQuery();
    query.select("#boxFixed").boundingClientRect();
    query.exec((res) => {
      this.menutop = res[0].top; // 节点与顶部的距离
    });
  },
  // 监听页面滚动距离
  // 小程序提供的钩子：onPageScroll
  onPageScroll(event) {
    this.rect = event.scrollTop;
  },
  methods: {
    preference() {
      listing(getpreferurl).then((res) => {
        this.preferData = res;
      });
    },
  },
  computed: {
    // 计算属性自动执行，时刻监听数据的变化
    // 监听筛选组件置顶和不置顶
    namepage() {
      // 页面滚动高度大于筛选组件和顶部的距离，将筛选组件置顶
      if (this.rect > this.menutop) {
        this.isfixed = true;
      } else {
        this.isfixed = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.is_fixed {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
}
</style>
