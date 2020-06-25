<template>
  <div class="order" @click="goDetails(order.liveCurriculaPayId)">
    <div class="order-header">
      <p>{{order.creaTime}}</p>
      <p>订单号：{{order.liveCurriculaPayId}}</p>
    </div>
    <div class="order-content">
      <img :src="order.imgSrc" alt />
      <div class="content-right">
        <div class="van-multi-ellipsis--l2 content_title">{{order.liveCurriculaTitle}}</div>
        <p>
          <span>￥{{order.money}}</span>
        </p>
      </div>
    </div>
    <div class="order-pay">
      <p>
        <i v-if="order.status==3">
          已付款:
          <span>￥{{order.money}}</span>
        </i>
        <i v-else-if="order.status==2">
          待付款:
          <span>￥{{order.money}}</span>
        </i>
        <i v-else>实付:0</i>
      </p>
    </div>
    <div class="order-pass" v-if="order.status==3">交易成功</div>
    <div class="order-pass" v-else-if="order.status==2">
      <span>{{timer}}</span>
      <button @click.stop="gopay" class="pay">立即支付</button>
    </div>
    <div class="order-pass" v-else>
      <span>交易取消</span>
      <button @click.stop="delFn(order.liveCurriculaPayId)" class="del">删除订单</button>
    </div>
  </div>
</template>
<script>
import Pay from "../assets/js/pay.js";
export default {
  name: "orderCard",
  props: {
    order: {
      type: Object,
      default: function() {
        return {
          creaTime: "2020-0202 20:20:20",
          endTime: "2020-0202 20:20:20",
          liveCurriculaPayId: "000000111111",
          liveCurriculaTitle: "",
          imgSrc: require("../assets/images/ordervip.png"),
          money: "0",
          status: 3
        };
      }
    }
  },
  data() {
    return {
      timer: ""
    };
  },
  mounted() {
    let that = this;
    console.log(this.order);
    setInterval(() => {
      that.timeout();
    }, 1000);
  },
  methods: {
    zero(time) {
      if (time < 10) {
        time = "0" + time;
      }
      return time;
    },
    timeout() {
      if (this.order.status == 2) {
        const endDate =
          new Date(this.order.endTime).getTime() - new Date().getTime();
        let minutes = Math.floor(endDate / (60 * 1000));

        let seconds = Math.floor((endDate % (60 * 1000)) / 1000);
        this.timer =
          "倒计时：" + this.zero(minutes) + "分钟" + this.zero(seconds) + "秒";
        if (endDate < 0) {
          this.$router.go();
        }
      }
    },
    // 前往支付
    gopay() {
      // console.log(123);
      let data = JSON.parse(this.order.liveCurriculaParameters);
      console.log(data);
      let wxPay = new Pay({});
      // @param:{data }  --->  预下单参数  重新拉起支付
      wxPay
        .payment(data)
        .then(res => {
          alert("then");
          alert(JSON.stringify(res));
        })
        .catch(err => {
          alert("error");
          alert(JSON.stringify(err));
        });
    },
    delFn(id) {
      this.$dialog
        .confirm({
          title: "",
          message: "是否删除该订单？"
        })
        .then(res => {
          // on confirm
          let p = {};
          p.liveCurriculaPayId = id;
          this.$request.post("/app/live/myLivePayDel", p).then(res => {
            if (res.code == 200) {
              // this.$router.go();
              this.$toast("删除成功");
              this.$emit("reloadOrderList");
            }
          });
        })
        .catch(res => {
          // on cancel
          this.$toast("取消删除");
        });
    },
    goDetails(id) {
      this.$router.push({
        path: "/orderdetails",
        query: {
          liveCurriculaPayId: id
        }
      });
    }
    // goDetails(id){
    //  this.$router.push({
    //    path: "/orderdetails",
    //    query: {
    //      oneId: id,
    //      // imgSrc: this.courseObj.imgSrc
    //    }
    // }
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
    .content-right {
      margin-left: 0.53rem;
      height: 200px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .content_title {
        font-size: 28px;
        color: #333;
      }
    }
    p {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      font-size: 28px;
      color: red;
      height: 100px;
      span {
        margin-bottom: 50px;
        // margin-left: 30px;
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
    justify-content: space-between;
    button {
      width: 4.9rem;
      height: 1.6rem;
      border-radius: 0.8rem;
      border: none;
      background-color: #f8f8f8;
    }
    .pay {
      background-color: #fed039;
    }
  }
}
</style>