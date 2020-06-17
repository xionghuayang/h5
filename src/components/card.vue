<template>
  <div class="order">
    <!-- <h1>order</h1> -->
    <van-card :title="order.title" :thumb="order.imgSrc">
      <template #price>
        <p class="price" v-if="order.isPrice">
          ￥{{order.price}}
          <span class="orgin-price">￥{{order.orginPrice}}</span>
        </p>
        <p class="price" v-else>公开课</p>
      </template>
      <template #tags v-show="order.info">
        <p class="info van-multi-ellipsis--l2">{{order.info}}</p>
      </template>
    </van-card>
  </div>
</template>
<script>
export default {
  name: "Order",
  props: ["order"],
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
<style scoped lang="scss">
.order {
  padding: 20px 34px 0px;
  box-sizing: border-box;
}
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
  font-size: 26px;
  color: #f00;
  .orgin-price {
    color: #bbb;
    text-decoration: line-through;
    margin-left: 6px;
  }
}
// 讲师
.info {
  font-size: 0.64rem;
  color: #bbb;
  margin-bottom: 0.08rem;
}
</style>