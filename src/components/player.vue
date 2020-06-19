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
  // pagename:播放器
  data() {
    return {
      player: {} //TcPlayer实例
    };
  },
  beforeCreate() {
    if (this.$store.state.reloadPage) {
      location.reload();
    }
  },
  deactivated() {
    console.log("销毁");
    // 销毁
    this.player.dispose();
  },
  mounted() {
    // let Obj = this.$route.query;
    let Obj = {
        fileId:'5285890803523648557',
        appID:'1257801634'
    }
    if (Obj.videoTit) document.title = Obj.videoTit;
    this.initVideo(Obj.fileId, Obj.appID);
  },
  methods: {
    initVideo(fileId, appID) {
      // 执行
      console.log(fileId, appID);
      this.player = TCPlayer("bz_video", {
        fileID: fileId, // 请传入需要播放的视频 filID（必须）
        appID: appID, // 请传入点播账号的 appID（必须）
        playbackRates: [0.5, 1, 1.25, 1.5, 2], // 设置变速播放倍率选项，仅 HTML5 播放模式有效
        posterImage: "" //封面
      });
      this.player.on("ready", res => {

        // 做一些处理
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
#bz_video{
    height: 372px !important;
}
</style>
