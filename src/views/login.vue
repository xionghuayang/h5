<template>
  <div>
    <van-field v-model="tel" type="tel" label="手机号" />
    <van-field v-model="psw" type="password" label="密码" />
    <van-button type="primary" size="large" @click="login">大号按钮是登录</van-button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld
  },
  data() {
    return {
      tel: "",
      psw: ""
    };
  },
  created() {},
  mounted() {
    // this.$toast("???????");
  },
  methods: {
    login() {
      let p = {};
      p.username = Number(this.tel);
      p.password = this.psw;
      p.loginType = 0;
      let url = "app/home/userLogin";
      this.$request.post(url, p).then(res => {
        if (res.code == 200) {
          this.$store.commit("loginSuccess", res.data);
          this.$toast("登录成功");
          setTimeout(() => {
            this.$router.push({
              path: "/"
            });
          }, 700);
        } else {
          this.$toast(res.message);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.van-field{
  border: 1px solid red;
}
</style>