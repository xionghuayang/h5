<template>
  <div>
    <video
      style="width:100%;height:100%;"
      id="bz_video"
      preload="auto"
      playsinline
      webkit-playsinline
      x5-playsinline
    ></video>
  </div>
</template>
<script>
export default {
  props: ["play"],
  // pagename:播放器
  data() {
    return {
      player: {} //TcPlayer实例
    };
  },
  beforeCreate() {
    if (this.$store.state.reloadPage) {
      location.reload();
      // this.$store.commit("reloadPage", false);
    }
  },

  // deactivated() {
  //   console.log("销毁");
  //   // 销毁
  //   this.player.dispose();
  // },
  beforeDestroy() {
    console.log("销毁");
    // 销毁
    this.player.dispose();
  },
  mounted() {
    console.log(this.play);
    // let Obj = this.$route.query;
    // let Obj = {
    //   fileId: "5285890803487701514",
    //   appID: "1257801634"
    // };
    let Obj = this.play;
    if (Obj.videoTit) document.title = Obj.videoTit;
    this.initVideo(Obj.fileId, Obj.appID);
  },
  watch: {
    play() {
      console.log(this.play);
      console.log(this.player);
      let Obj = this.play;
      if (Obj.videoTit) document.title = Obj.videoTit;
      this.player.loadVideoByID({
        fileID: Obj.fileId, // 请传入需要播放的视频 filID（必须）
        appID: Obj.appID // 请传入点播账号的 appID（必须）
      });
      this.player.on("canplay", res => {
        // 做一些处理
        // console.log(123);
        this.player.play();
      });
    }
  },
  methods: {
    initVideo(fileId, appID) {
      // 执行
      console.log(fileId, appID);
      this.player = TCPlayer("bz_video", {
        fileID: fileId, // 请传入需要播放的视频 filID（必须）
        appID: appID, // 请传入点播账号的 appID（必须）
        playbackRates: [0.5, 1, 1.25, 1.5, 2], // 设置变速播放倍率选项，仅 HTML5 播放模式有效
        posterImage: "", //封面
        plugins: {
          ContinuePlay: {
            // 开启续播功能
            // auto: true, //[可选] 是否在视频播放后自动续播
            text: "上次播放至 " //[可选] 提示文案
            // btnText: '恢复播放' //[可选] 按钮文案
          }
        }
      });
      this.player.on("ready", res => {
        // 做一些处理
        // console.log(123);
        this.player.play();
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
#bz_video {
  // height: 372px !important;
  height: 487px !important;
}
</style>
