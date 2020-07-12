<template>
  <div>
    <card :order="orderCard"></card>
    <!-- <van-cell title="优惠券" :value="discountsVal" :border="false" class="discounts" /> -->
    <div class="discounts">
      <p>优惠券</p>
      <p>{{discountsVal}}</p>
    </div>
    <van-submit-bar button-text="立即支付" @submit="onSubmit">
      <template #default>
        <p class="price">
          实付金额：
          <span>￥{{orderCard.price}}</span>
        </p>
      </template>
    </van-submit-bar>
  </div>
</template>
<script>
import card from "../components/card.vue";
import Pay from "../assets/js/pay";
export default {
  name: "courseorder",
  components: {
    card
  },
  data() {
    return {
      // orderObj: {
      //   title: "少儿绘画-大大大大大大象与 小小小小象",
      //   imgSrc: require("../assets/images/banner.png"),
      //   isShowPrice: true,
      //   isPrice: true,
      //   price: "300.00",
      //   orginPrice: "500.00"
      //   // info: "主讲老师：王校花︱共30节"
      // },
      orderCard: {},
      discountsVal: "暂无可用优惠券"
    };
  },
  created() {
    this.orderCard = this.$route.query;
    this.orderCard.isShowPrice = true;
    this.orderCard.isPrice = true;
    this.orderCard.state = 1;
    // console.log(orderCard);
  },
  methods: {
    // 点击支付
    onSubmit() {
      // console.log("ok");
      let _that = this;
      let _obj = this.$user();
      _obj.price = this.orderCard.price;
      _obj.liveCurriculaId = this.orderCard.id;
      // console.log(_obj);
      let wxPay = new Pay(_obj);
      wxPay
        .getPaySign()
        .then(res => {
          // console.log(res);
          // alert("then");
          // alert(JSON.stringify(res));
          // _that.$router.push({
          //   path: "/myliveclass"
          // });
          _that.$toast("支付成功");
          _that.$router.go(-1);
        })
        .catch(err => {
          // console.log(res);
          // alert("error");
          // alert(JSON.stringify(err));
          _that.$toast("取消支付");
          _that.$router.go(-1);
        });
    }
  }
};
</script>
<style scoped lang="scss">
/* 优惠券 */
// .discounts {
//   margin-top: 0.8rem;
//   font-size: 28px;
//   color: #525252;
//   background-color: #fff;
// }
.discounts {
  display: flex;
  justify-content: space-between;
  // margin-top: 0.8rem;
  font-size: 28px;
  color: #525252;
  padding: 30px 40px;
}
.van-cell {
  background-color: #fff;
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