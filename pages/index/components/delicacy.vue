<template>
  <view class="prefer-posi">
    <!-- 筛选区 -->
    <view class="delica-view">
      <view class="delica-list delica-grow" @click="multiple()">
        <text>{{ synthesize }}</text>
        <image src="../../../static/coen/paixu.png" mode="widthFix" />
      </view>
      <view class="delica-grow" @click="saLes()">销量高</view>
      <view class="delica-grow" @click="saLes()">速度快</view>
      <view class="delica-grow" @click="saLes()">津贴联盟</view>
      <view class="delica-list delica-right" @click="scReen()">
        <text>筛选</text>
        <image src="../../../static/coen/shaixuan.png" mode="widthFix" />
      </view>
    </view>
    <!-- 综合排序筛选 -->
    <view class="sortlist sortlistTitle" v-if="drop">
      <text
        v-for="(item, index) in sortlist"
        :key="index"
        @click="sortClick(item.name, index)"
        :class="{ activeb: num === index }"
        >{{ item.name }}</text
      >
    </view>
    <!-- 多个筛选区 -->
    <view class="sortlist sortlist-view" v-if="sortmen">
      <!-- 多选：商家特色 -->
      <view>
        <view class="sortlist-title">{{ screendata[0].title }}</view>
        <view class="sortlist-flex">
          <text
            class="Choice"
            v-for="(item, index) in screendata[0].datas"
            :key="index"
            >{{ item.name }}</text
          >
        </view>
      </view>
      <!-- 单选：人均价格 -->
      <view>
        <view class="sortlist-title">{{ person[0].title }}</view>
        <view class="sortlist-flex">
          <text
            class="Choice"
            v-for="(item, index) in person[0].datas"
            :key="index"
            >{{ item.name }}</text
          >
        </view>
      </view>
      <!-- 底部确认按钮 -->
      <view class="sortlist-bottom">
        <text>清空</text>
        <text>完成</text>
      </view>
    </view>
    <!-- 透明背景 -->
    <view class="yin" v-if="ying" @click="backClic()"></view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 排序菜单显示
      drop: false,
      // 筛选菜单显示
      sortmen: false,
      // 透明背景显示
      ying: false,
      // 综合排序
      synthesize: "综合排序",
      // 筛选项索引
      num: 0,
      // 排序数据
      sortlist: [
        {
          name: "综合排序",
          screen: "_id",
          nums: 1,
        },
        {
          name: "起送价最低",
          screen: "delivering",
          nums: 1,
        },
        {
          name: "配送费最低",
          screen: "physical",
          nums: 1,
        },
        {
          name: "人均高到低",
          screen: "capita",
          nums: -1,
        },
        {
          name: "人均低到高",
          screen: "capita",
          nums: 1,
        },
      ],
      // 商家特色
      screendata: [
        {
          title: "商家特色（可多选）",
          datas: [
            {
              id: 1,
              sign: "duration",
              name: "配送最快",
            },
            {
              id: 1,
              sign: "deliver",
              name: "0元起送",
            },
            {
              id: 1,
              sign: "physi",
              name: "免配送费",
            },
          ],
        },
      ],
      // 人均价格
      person: [
        {
          title: "人均价格",
          datas: [
            {
              name: "20元以下",
              per: {
                $lt: 20,
              },
            },
            {
              name: "20-40元",
              per: {
                $lte: 40,
                $gte: 20,
              },
            },
            {
              name: "40元以上",
              per: {
                $gt: 40,
              },
            },
          ],
        },
      ],
    };
  },
  methods: {
    // 点击显示筛选栏
    multiple() {
      this.drop = true;
      this.sortmen = false;
      this.backOne();
    },
    // 点击筛选菜单栏隐藏透明背景
    saLes() {
      this.backClic();
    },
    // 点击筛选按钮显示多个筛选
    scReen() {
      this.drop = false;
      this.sortmen = true;
      this.backOne();
    },
    // 点击筛选项更改筛选标题
    sortClick(name, index) {
      this.synthesize = name;
      this.num = index;
      this.backClic();
    },
    // 透明背景显示
    backOne() {
      this.ying = true;
    },
    // 透明背景隐藏
    backClic() {
      this.ying = false;
      this.sortmen = false;
      setTimeout(() => {
        this.drop = false;
      }, 100);
    },
  },
};
</script>

<style lang="scss" scoped>
// 筛选区
.prefer-posi {
  width: 100%;
  position: absolute;
  left: 0;
  right: 0;
  z-index: 99;

  .delica-view {
    height: 70rpx;
    padding: 0 20rpx;
    font-size: 30rpx;
    color: #666;
    display: flex;
    align-items: center;
    background: #fff;

    image {
      width: 30rpx;
      height: 30rpx;
      display: block;
    }

    .delica-list {
      display: flex;
      align-items: center;
    }

    .delica-grow {
      flex-grow: 1; // 索取父元素剩余空间的1/6
    }

    .delica-right {
      justify-content: flex-end; // 交叉线末端对齐，一般用于放到最右侧
      flex-grow: 5;
    }
  }

  .sortlist {
    background: #fff;
  }

  .sortlistTitle {
    text {
      display: block;
      height: 80rpx;
      line-height: 80rpx;
      padding: 0 20rpx;
      font-size: 30rpx;
      border-top: 1rpx solid #ededed;
    }
  }

  // 筛选
  .sortlist-view {
    height: 700rpx;
    overflow: hidden;
    overflow-y: scroll;
    position: relative;

    .sortlist-title {
      height: 60rpx;
      padding: 0 20rpx;
      line-height: 60rpx;
      font-size: 30rpx;
    }

    .sortlist-flex {
      margin-bottom: 30rpx;
      display: flex;
      align-items: center;
      flex-wrap: wrap;

      .Choice {
        width: calc((100% / 3) - 30rpx) !important;
        height: 55rpx;
        margin: 15rpx;
        border-radius: 6rpx;
        background: #f8f8f8;
        line-height: 55rpx;
        font-size: 28rpx;
        color: #666;
        text-align: center;
      }
    }

    .sortlist-bottom {
      height: 80rpx;
      background: #fff;
      border-top: 1rpx solid #e4e4e4;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      justify-content: space-around;
      align-items: center;

      text {
        flex-grow: 1;
        height: 80rpx;
        line-height: 80rpx;
        text-align: center;

        &:first-of-type {
          border-right: 1rpx solid #e4e4e4;
        }

        &:last-of-type {
          background: #ffd348;
        }
      }
    }
  }

  .yin {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba($color: #000000, $alpha: 0.5);
    z-index: -1;
  }
}

.activeb {
  color: #f89903 !important;
}
</style>
