<template>
  <div>
    <div v-for="(item, index) in 3" :key="index">
      <van-button color="linear-gradient(to right, #4bb0ff, #6149f6)" @click="go(index)">跳转{{index}}</van-button>
    </div>
    <van-button color="linear-gradient(to right, #4bb0ff, #6149f6)" @click="buy()">买买买</van-button>
  </div>
</template>

<script>
// import Pay from "../assets/js/pay";
export default {
  name: "Home",
  created() {},
  mounted() {},
  methods: {
    go(index) {
      switch (index) {
        case 0:
          this.$router.push({
            path: "/liveClass"
          });
          break;
        case 1:
          this.$router.push({
            path: "/myLiveClass"
          });
          break;
        case 2:
          this.$router.push({
            path: "/yuyueInfo"
          });
          break;
        default:
          break;
      }
    },
    buy() {
      let _obj = this.$user();
      _obj.price=222,
      _obj.liveCurriculaId=4
      console.log(_obj);
      let wxPay = new Pay(_obj);
      wxPay.getPaySign().then(res=>{
        alert("then")
        alert(JSON.stringify(res))
      }).catch(err=>{
        alert("error")
        alert(JSON.stringify(err))
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.page {
  height: 370px;
  background: red;
  width: 750px;
}
</style>