<template>
  <div class="orderlist">
    <van-tabs v-model="active" @click="handleTabClick">
      <van-tab title="全部订单">
        <template v-for="item in allOrderList">
          <order-card :key="item.liveCurriculaPayId" :order="item" @reloadOrderList="orderlist"></order-card>
        </template>
        <!-- <order-card :order="orderObj"></order-card> -->
      </van-tab>
      <van-tab title="待支付">
        <template v-for="item in pendingPayList">
          <order-card :key="item.liveCurriculaPayId" :order="item"></order-card>
        </template>
      </van-tab>
      <van-tab title="交易成功">
        <template v-for="item in passPayList">
          <order-card :key="item.liveCurriculaPayId" :order="item"></order-card>
        </template>
      </van-tab>
      <van-tab title="交易关闭">
        <template v-for="item in canclePayList">
          <order-card
            :key="item.liveCurriculaPayId"
            :order="item"
            @reloadOrderList="orderCancleList"
          ></order-card>
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
// let map = {
//   0: ["allOrderList", ""],
//   1: ["pendingPayList", "2"],
//   2: ["passPayList", "3"],
//   3: ["canclePayList", "4"]
// };
export default {
  name: "orderList",
  components: {
    orderCard
  },
  data() {
    return {
      active: 0,
      isShowEmpty: false,
      allOrderList: [],
      pendingPayList: [],
      passPayList: [],
      canclePayList: []
    };
  },
  async created() {
    // 验证登录
    let res = await this.$public.loginByToken();
  },
  mounted() {
    this.orderlist();
  },

  methods: {
    handleTabClick(index, title) {
      // console.log(index, title);
      // this.isShowEmpty = false;
      // if (this.allOrderList.length === 0) {
      //   this.isShowEmpty = true;
      //   return;
      // }
      this.isShowEmpty = false;
      if (index === 0) {
        // 全部订单
        this.orderlist();
      }
      if (index === 1) {
        // 待支付
        this.orderInlist();
      }
      if (index === 2) {
        // 交易成功
        this.orderSuccessList();
      }
      if (index === 3) {
        // 交易取消
        this.orderCancleList();
      }
    },
    // 订单查询
    async getOrderList(status = " ") {
      let p = this.$user();
      p.status = status; // " " 全部 ，2 待支付 ，  3 交易完成 4 交易取消
      let res = await this.$request.post("/app/live/myLivePayList", p);
      if (res.code !== 200) return this.$toast("订单信息获取失败！");
      // console.log(res);
      let arr = res.data.records.map(item => {
        let {
          creaTime,
          endTime,
          imagePrefix,
          liveCurriculaCover,
          liveCurriculaId,
          liveCurriculaParameters,
          liveCurriculaPayId,
          liveCurriculaTitle,
          money,
          status
        } = item;
        return {
          liveCurriculaParameters,
          liveCurriculaTitle,
          creaTime,
          endTime,
          liveCurriculaPayId,
          liveCurriculaTitle,
          imgSrc: imagePrefix + liveCurriculaCover,
          money,
          status
        };
      });
      // console.log(arr);
      return arr;
    },
    // 全部订单
    async orderlist() {
      let res = await this.getOrderList();
      // console.log(res);
      if (res.length === 0) {
        this.isShowEmpty = true;
      }
      this.allOrderList = res;
    },
    // 待支付
    async orderInlist() {
      let res = await this.getOrderList("2");
      if (res.length === 0) {
        this.isShowEmpty = true;
      }
      // console.log(res);
      this.pendingPayList = res;
    },
    // 交易成功
    async orderSuccessList() {
      let res = await this.getOrderList("3");
      if (res.length === 0) {
        this.isShowEmpty = true;
      }
      this.passPayList = res;
    },
    // 交易取消
    async orderCancleList() {
      let res = await this.getOrderList("4");
      if (res.length === 0) {
        this.isShowEmpty = true;
      }
      this.canclePayList = res;
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
  .van-tab__pane {
    padding: 0;
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