<template>
  <view>
    <Search></Search>
    <Preference :preferData="preferData"></Preference>
    <Nearby></Nearby>
    <!-- 通过isfixed的改变动态绑定class属性 -->
    <view @click="poll()" :catchtouchmove="true">
      <Delicacy id="boxFixed" :class="{ is_fixed: isfixed }"></Delicacy>
    </view>
    <view style="margin-top: 100rpx">
      <Takeout :takeshop="takeshop"></Takeout>
    </view>
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
import { getpreferurl, wxshopurl } from "../../api/request.js";
// 引入mapstate
import { mapState } from "vuex";
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
      takeshop: [], // 商家列表
    };
  },
  onLoad() {
    this.preference();
    // 获取筛选组件距离顶部的距离：wx.createSelectorQuery().select("..").boundingClientRect().exec(()=>{})
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
    // 获取首页数据
    preference() {
      // 批量并发请求多个接口：Promise.all，同时得到多个接口的数据
      Promise.all([listing(getpreferurl), listing(wxshopurl)])
        .then((res) => {
          this.preferData = res[0];
          this.takeshop = res[1];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 点击筛选菜单滚动到顶部：uni.pageScrollTo({ scrollTop: 0 })
    poll() {
      uni.pageScrollTo({
        scrollTop: this.menutop,
        duration: 200,
      });
    },
  },
  computed: {
    ...mapState(["screendata"]),
    count() {
      this.takeshop = this.screendata.screenarr;
    },
    // 计算属性自动执行，时刻监听数据的变化
    // 监听筛选组件置顶和不置顶
    // namepage() {
    //   // 页面滚动高度大于筛选组件和顶部的距离，将筛选组件置顶
    //   if (this.rect > this.menutop) {
    //     this.isfixed = true;
    //   } else {
    //     this.isfixed = false;
    //   }
    // },
  },
  // 使用监听属性也是可以的
  watch: {
    rect: function (newVal) {
      newVal > this.menutop ? (this.isfixed = true) : (this.isfixed = false);
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
