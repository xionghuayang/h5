<template>
  <div class="order">
    <div class="order-header">
      <p>{{order.orderTime}}</p>
      <p>订单号：{{order.orderIndex}}</p>
    </div>
    <div class="order-content">
      <img :src="order.imgSrc" alt />
      <p>
        <span>￥{{order.price}}</span>
      </p>
    </div>
    <div class="order-pay">
      <p>
        <i v-if="order.orderPay">已付款:</i>
        <i v-else>待付款:</i>
        <span>￥{{order.price}}</span>
      </p>
    </div>
    <div class="order-pass" v-if="order.orderPass=== 'true'">交易成功</div>
    <div class="order-pass" v-else-if="order.orderPass === 'error'">待付款</div>
    <div class="order-pass" v-else>交易取消</div>
  </div>
</template>
<script>
export default {
  name: "orderCard",
  props: {
    order: {
      type: Object,
      default: function() {
        return {
          orderTime: "2020-0202 20:20:20",
          orderIndex: "000000111111",
          imgSrc: require("../assets/images/ordervip.png"),
          price: "0",
          orderPay: true, // true 成功 false 失败
          orderPass: "true" // string  true 成功 false 取消 error 未付款
        };
      }
    }
  },
  created() {
    // console.log(this.order);
  }
};
</script>
<style scoped lang="scss">
.order {
  height: 500px;
  // background-color: red;
  .order-header {
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
    color: #bbb;
    background-color: #fff;
    padding: 0 34px;
  }
  .order-content {
    height: 260px;
    display: flex;
    align-items: center;
    padding: 0 30px;
    img {
      width: 300px;
      height: 200px;
    }
    p {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      font-size: 28px;
      color: red;
      height: 200px;
      span {
        margin-bottom: 50px;
        margin-left: 30px;
      }
    }
  }
  .order-pay {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 80px;
    background-color: #fff;
    padding: 0 40px;
    border-bottom: 2px solid #f2f2f2;
    font-weight: 100;
    p {
      font-size: 28px;
      i {
        font-style: normal;
      }
      span {
        color: red;
      }
    }
  }
  .order-pass {
    display: flex;
    align-items: center;
    height: 100px;
    padding: 0 30px;
    background-color: #fff;
    font-size: 28px;
    font-weight: 100;
  }
}
</style>