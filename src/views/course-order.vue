<template>
  <div>
    <card :order="orderObj"></card>
    <van-cell title="优惠券" value="-￥9.00" :border="false" class="discounts" />
    <van-submit-bar button-text="立即支付" @submit="onSubmit">
      <template #default>
        <p class="price">
          实付金额：
          <span>￥99.00</span>
        </p>
      </template>
    </van-submit-bar>
  </div>
</template>
<script>
import card from "../components/card.vue";
export default {
  name: "courseorder",
  components: {
    card
  },
  data() {
    return {
      orderObj: {
        title: "少儿绘画-大大大大大大象与 小小小小象",
        imgSrc: require("../assets/images/banner.png"),
        isShowPrice: true,
        isPrice: true,
        price: "300.00",
        orginPrice: "500.00"
        // info: "主讲老师：王校花︱共30节"
      }
    };
  },
  methods: {
    onSubmit() {
      console.log("ok");
    }
  }
};
</script>
<style scoped lang="scss">
/* 优惠券 */
.discounts {
  margin-top: 0.8rem;
  font-size: 28px;
  color: #525252;
}
.van-cell__value {
  font-size: 0.746667rem;
  color: #525252;
}
/* 提交订单*/
.van-submit-bar {
  background-color: #f7f7f7;
}
.van-button--danger {
  color: #252525;
  background-color: #fed039;
  border: none;
}
.van-submit-bar__button--danger {
  background: #fed039;
}
.van-submit-bar__bar {
  justify-content: space-between;
}
.price {
  color: #252525;
  font-size: 28px;
  span {
    color: #f00;
    margin-left: 5px;
  }
}
</style>