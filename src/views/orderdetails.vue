<template>
  <div class="orderdetails">
    <div class="nav_bg">
      <div v-if="details.status==2">
        <div>等待卖家付款</div>
        <div>{{timer}}</div>
      </div>
      <div v-else-if="details.status==3">
        <div>交易完成</div>
        <div>该订单交易已完成</div>
      </div>
      <div v-else>
        <div>交易取消</div>
        <div>该订单未支付，交易关闭</div>
      </div>
    </div>
    <div class="orderbody" @click="goCourseInfo">
      <div class="orderimg">
        <img :src="details.imagePrefix+details.liveCurriculaCover" alt />
        <div>
          <div class="title">{{details.liveCurriculaTitle}}</div>
          <div class="price">￥{{details.money}}</div>
        </div>
      </div>
      <div class="order-content">
        <div class="header">产品详情</div>
        <div class="bodys">
          <span>学习时限</span>
          <span class="float">永久</span>
        </div>
        <div class="bodys">
          <span>实付款</span>
          <span class="float">￥{{details.money}}</span>
        </div>
        <div class="header">订单信息</div>
        <div class="bodys">
          <span>订单编号</span>
          <span class="float">{{details.liveCurriculaPayId}}</span>
        </div>
        <div class="bodys" v-if="details.status==3">
          <span>微信交易号</span>
          <span class="float">{{details.tradeNo}}</span>
        </div>
        <div class="bodys">
          <span>创建时间</span>
          <span class="float">{{details.creaTime}}</span>
        </div>
        <div class="bodys" v-if="details.status==3">
          <span>付款时间</span>
          <span class="float">{{details.endTime}}</span>
        </div>
      </div>
    </div>
    <div class="nav-foot">
      <div v-if="details.status==3">
        <div>已购买</div>
      </div>
      <div v-else-if="details.status==2">
        <div>交易中</div>
        <button @click.stop="gopay">立即支付</button>
      </div>
      <div v-else>
        <div>交易取消</div>
        <button @click.stop="delFn(details.liveCurriculaPayId)">删除订单</button>
      </div>
    </div>
  </div>
</template>
<script>
// import orderCard from "../components/order-card";
import Pay from "../assets/js/pay.js";
export default {
  name: "orderdetails",
  components: {
    // orderCard
  },
  data() {
    return {
      details: {},
      imgSrc: require("../assets/images/ordervip.png"),
      timer: ""
    };
  },
  mounted() {
    this.detailsFn();
    let that = this;
    setInterval(() => {
      that.timeout();
    }, 1000);
  },

  methods: {
    goCourseInfo() {
      this.$router.push({
        path: "/courseplayer",
        query: {
          id: this.details.liveCurriculaId
        }
      });
    },
    zero(time) {
      if (time < 10) {
        time = "0" + time;
      }
      return time;
    },
    timeout() {
      if (this.details.status == 2) {
        const endDate =
          new Date(this.details.endTime).getTime() - new Date().getTime();
        let minutes = Math.floor(endDate / (60 * 1000));

        let seconds = Math.floor((endDate % (60 * 1000)) / 1000);
        this.timer =
          "倒计时：" + this.zero(minutes) + "分钟" + this.zero(seconds) + "秒";
        if (endDate < 0) {
          this.$router.go();
        }
      }
    },
    gopay() {
      // console.log(this.details);
      let data = JSON.parse(this.details.liveCurriculaParameters);
      // console.log(data);
      let wxPay = new Pay({});
      // @param:{data }  --->  预下单参数  重新拉起支付
      wxPay
        .payment(data)
        .then(res => {
          // alert("then");
          // alert(JSON.stringify(res));
          this.$toast("支付成功");
          this.$router.push({
            path: "/courseplayer",
            query: {
              id: this.details.liveCurriculaId
            }
          });
        })
        .catch(err => {
          // alert("error");
          // alert(JSON.stringify(err));
          this.$toast("取消支付");
          // location.reload();
        });
    },
    delFn(id) {
      let p = {};
      p.liveCurriculaPayId = id;
      this.$dialog
        .alert({
          title: "确定删除该订单么", //加上标题
          // message: "hello world", //改变弹出框的内容
          showCancelButton: true //展示取水按钮
        })
        .then(() => {
          //点击确认按钮后的调用
          this.$request.post("/app/live/myLivePayDel", p).then(res => {});
          this.$router.go(-1);
        });
    },
    detailsFn() {
      let p = this.$user();
      let id = this.$route.query.liveCurriculaPayId;
      this.$request.post("/app/live/myLivePayList", p).then(res => {
        if (res.code == 200) {
          let obj = res.data.records.filter(
            item => item.liveCurriculaPayId == id
          );
          (this.details = obj[0]), console.log(this.details);
        }
      });
    }
  }
};
</script>
<style scoped lang="scss">
.nav_bg {
  height: 4.8rem;
  width: 100%;
  display: block;
  background-image: url(../assets/images/orderdetails.jpg);
  background-size: 100% 100%;
  > div {
    padding: 0.53rem 0 0 1.3rem;
    div:first-of-type {
      font-size: 1.1rem;
      font-weight: 700;
      height: 2.4rem;
      line-height: 3.3rem;
    }
    div:last-of-type {
      font-size: 0.64rem;
      color: #666;
    }
  }
}
.orderbody {
  width: 90%;
  margin: 0.53rem auto;
  .orderimg {
    display: flex;
    img {
      display: flex;
      // width: 8rem;
      // height: 5.333rem;
      width: 7.466667rem;
      height: 5.066667rem;
    }
    > div {
      margin-left: 0.53rem;
      .title {
        font-size: 0.74rem;
        height: 3.75rem;
      }
      .price {
        color: red;
        font-size: 1rem;
      }
    }
  }
  .order-content {
    .header {
      margin-top: 0.64rem;
      font-size: 0.9rem;
      font-weight: 700;
    }
    .bodys {
      padding: 0.5rem 0;
      font-size: 0.7rem;
      .float {
        float: right;
      }
    }
  }
}
.nav-foot {
  padding: 0 0.5rem;
  height: 2.4rem;
  position: fixed;
  bottom: 0;
  width: 100%;
  line-height: 2.4rem;
  background-color: #eee;
  > div {
    display: flex;
    font-size: 0.8rem;
    justify-content: space-between;
    button {
      border: 1px solid #eee;
      height: 2rem;
      width: 4rem;
      line-height: 2rem;
      border-radius: 0.8rem;
      margin: 0.3rem 1.5rem 0 0;
      background-color: #fff;
    }
  }
}
</style>