<template>
  <div class="orderlist">
    <van-tabs v-model="active" @click="handleTabClick">
      <van-tab title="全部订单">
        <template v-for="item in allOrderList">
          <order-card :key="item.orderIndex" :order="item"></order-card>
        </template>
        <!-- <order-card :order="orderObj"></order-card> -->
      </van-tab>
      <van-tab title="待支付">
        <template v-for="item in pendingPayList">
          <order-card :key="item.orderIndex" :order="item"></order-card>
        </template>
      </van-tab>
      <van-tab title="交易成功">
        <template v-for="item in passPayList">
          <order-card :key="item.orderIndex" :order="item"></order-card>
        </template>
      </van-tab>
      <van-tab title="交易关闭">
        <template v-for="item in canclePayList">
          <order-card :key="item.orderIndex" :order="item"></order-card>
        </template>
      </van-tab>
    </van-tabs>
    <div class="empty" v-show="isShowEmpty">
      <img src="../assets/images/notinfo.png" alt />
      <p>亲，您还没有订单呦</p>
    </div>
  </div>
</template>
<script>
import orderCard from "../components/order-card";
let map = {
  0: ["allOrderList", ""],
  1: ["pendingPayList", "error"],
  2: ["passPayList", "true"],
  3: ["canclePayList", "false"]
};
export default {
  name: "orderList",
  components: {
    orderCard
  },
  data() {
    return {
      active: 0,
      isShowEmpty: false,
      allOrderList: [
        {
          orderTime: "2020-10-10 19:20:20",
          orderIndex: "189496566464891",
          imgSrc: require("../assets/images/ordervip.png"),
          price: "100",
          orderPay: true,
          orderPass: "true"
        },
        {
          orderTime: "2020-10-10 19:20:20",
          orderIndex: "189496566464892",
          imgSrc: require("../assets/images/ordervip.png"),
          price: "100",
          orderPay: true,
          orderPass: "true"
        },
        {
          orderTime: "2020-10-10 19:20:20",
          orderIndex: "189496566464893",
          imgSrc: require("../assets/images/ordervip.png"),
          price: "100",
          orderPay: false,
          orderPass: "error"
        },
        {
          orderTime: "2020-10-10 19:20:20",
          orderIndex: "189496566464894",
          imgSrc: require("../assets/images/ordervip.png"),
          price: "100",
          orderPay: false,
          orderPass: "error"
        }
      ],
      pendingPayList: [],
      passPayList: [],
      canclePayList: []
    };
  },
  created() {
    this.isShowEmpty = this.allOrderList.length === 0 ? true : false;
  },

  methods: {
    handleTabClick(index, title) {
      // console.log(index, title);
      if (this.allOrderList.length === 0) {
        this.isShowEmpty = true;
        return;
      }
      if (index !== 0) {
        let arr = map[index][0];
        let flag = map[index][1];
        this[arr] = this.allOrderList.filter(item => item.orderPass === flag);
        this.isShowEmpty = this[arr].length === 0 ? true : false;
      }

      // console.log(this[arr]);
    }
  }
};
</script>
<style scoped lang="scss">
.orderlist {
  background-color: #f8f8f8;
  /deep/ .van-tabs__line {
    width: 4.8rem !important;
    background-color: rgb(254, 208, 57);
  }
}
.empty {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 640px;
  height: 550px;
  // background-color: red;
  img {
    width: 100%;
    height: 480px;
  }
  p {
    font-size: 30px;
    color: #999;
    text-align: center;
  }
}
</style>