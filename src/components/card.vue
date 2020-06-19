
<template>
  <!-- 
    order {
      id 标识
      title 标题
      isShowPrice 是否显示价格区域
      isPrice  true指定价格或 false 显示priceInfo
      priceInfo 公开课 / 直播中
      price 实际价格
      orginPrice 原价
      info 主讲教师
    }
    border 下边框
  -->
  <div :class="border ? 'card van-hairline--bottom' : 'card'">
    <!-- <h1>order</h1> -->
    <van-card :title="order.title" :thumb="order.imgSrc" @click="handleClick(order.price,order.id)">
      <template #price>
        <div v-show="order.isShowPrice">
          <p class="price" v-if="order.isPrice">
            ￥{{order.price}}
            <span class="orgin-price">￥{{order.orginPrice}}</span>
          </p>
          <p class="price" v-else>
            <span class="img" v-show="order.priceInfo !== '公开课'"></span>
            <span>{{order.priceInfo}}</span>
          </p>
        </div>
      </template>
      <template #tags>
        <p
          class="info van-multi-ellipsis--l2"
          v-if="order.info"
        >主讲老师:{{order.info.tName}}︱共{{order.info.allNum}}节︱有{{order.info.num}}回放直播时间{{order.info.time}}</p>
      </template>
    </van-card>
  </div>
</template>
<script>
export default {
  name: "card",
  props: ["order", "border"],
  data() {
    return {};
  },
  mounted() {},
  methods: {
    // 点击前往页面
    handleClick(price, id) {
      console.log(id);
      // console.log(price);
      if (price === 0) {
        // console.log("前往公开课");
        // this.$router.push(`/publicCourse?id=${id}`);
        this.$router.push({
          path: "/publicCourse",
          query: {
            id
          }
        });
      } else {
        // console.log("前往课程详情");
        this.$router.push({
          path: "/coursePlayer",
          query: {
            id
          }
        });
      }
    }
  }
};
</script>
<style scoped lang="scss">
.card {
  padding: 35px;
  box-sizing: border-box;
}
// .border-bottom {
//   border-bottom: 1px solid #f1f1f1;
// }

// card
.van-card {
  height: 5.066667rem;
  font-size: 0.746667rem;
  color: #000;
  padding: 0;
  background-color: #fff;
}
// img
.van-card__thumb {
  width: 8rem;
  height: 5.066667rem;
}
.van-card__content {
  justify-content: flex-start;
}
.van-card__title {
  max-height: 36px;
  line-height: 18px;
  margin-bottom: 0.266667rem;
  font-size: 0.746667rem;
}
// 价格
.price {
  font-size: 22px;
  color: #f00;
  .orgin-price {
    color: #bbb;
    text-decoration: line-through;
    margin-left: 6px;
  }
  .img {
    display: inline-block;
    width: 24px;
    height: 25px;
    vertical-align: middle;
    background: url("../assets/images/playing.png") no-repeat;
    background-size: 100%;
    margin-right: 5px;
  }
}
// 讲师
.info {
  font-size: 22px;
  color: #bbb;
  margin-bottom: 0.08rem;
}
</style>