<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  mounted() {
    this.windowFn();
    window.onresize = () => {
      return (() => {
        this.windowFn();
      })();
    };
  },
  methods: {
    windowFn() {
      if (
        /phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone/i.test(
          navigator.userAgent
        )
      ) {
        console.log("11");
      } else {
        //pc端
        document.querySelector("html").style.fontSize = "24px";
        document.querySelector("body").style.backgroundColor = "#696969";
        document.querySelector("body").style.width = "480px";
        document.querySelector("body").style.margin = "0 auto";
        document.querySelector("body").style.height = window.innerHeight + "px";
        document.querySelector("body").style.overflowY = "auto";
        document.querySelector("body").style.overflowX = "auto";
        document.querySelector("#app").style.backgroundColor = "#fff";
        document.querySelector("#app").style.minHeight = "100vh";
      }
    }
  }
};
</script>
<style lang="scss">
body {
  position: relative;
}
</style>
