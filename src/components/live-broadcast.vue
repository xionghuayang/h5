<template>
  <div>
    <div class="video_box">
      <div id="bz_player_video"></div>
    </div>
  </div>
</template>
<script>
var _self = this;
export default {
  // pagename:直播播放器
  data() {
    return {
      url: "",
      player: {} //TcPlayer实例
    };
  },

  mounted() {
    // 初始化盒子宽高
    _self = this;
    let Obj = this.$route.query;
    let url = `http://${Obj.liveBDomain}/${Obj.liveAppName}/${Obj.liveStreamName}`;
    console.log(url);
    this.url = url;
    this.initPalyer('http://baizezaixian.com/liveCurriculaId_5/i5txWdSP.m3u8');
  },
  // 页面销毁
  destroyed() {
    // 销毁播放器
    console.log("页面销毁销毁播放器");
    this.player.destroy();
    this.player = "";
  },
  methods: {
    initPalyer(url) {
      // 执行
      let _self = this;
      this.player = new TcPlayer("bz_player_video", {
        m3u8: _self.url + ".m3u8",
        flv: url + ".flv",
        autoplay: true, //iOS 下 safari 浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的
        width: "100%", //视频的显示宽度，请尽量使用视频分辨率宽度
        height: "100%", //视频的显示高度，请尽量使用视频分辨率高度
        live: true, //设置视频是否为直播类型
        wording: {
          // 2: "老师还没开播",
          // 1002: "老师还没开播"
        },
        clarityLabel: { od: "蓝光", hd: "高清", sd: "标清" },
        listener: function(msg) {
          // if (!log) {
          //   return;
          // }
          if (msg.type != "timeupdate") {
            // console.log("timeupdate", msg);
          }
          if (msg.type == "load") {
            // console.log("load", msg);
            // 暂停？？暂停个毛线啊 这特么是直播！
            // document.querySelector(".vcp-playtoggle").remove();
          }
          if (msg.type == "error") {
            console.log("报错了");
            window.setTimeout(() => {
              if (_self.player) {
                _self.player.load(); //进行重连
              }
            }, 5000);
          }
          if (msg.type == "ended") {
            alert("结束了");
          }
          if (msg.type == "fullscreen") {
            console.log(msg);
          }
        }
      });
    },

    /**
     * @param:{
     *         name1... { Object } @description
     *        }
     * @return any... { String }
     * @description 预加载监听事件
     */
    monitorPlayer() {
      this.player.onload(function() {});
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.video_box{
    height: 372px;
    width: 100%;
}
.video_box /deep/ .vcp-player {
  display: flex;
}
#bz_player_video {
  height: 100%;
  width: 100%;
}
video {
  height: 100%;
  width: 100%;
}
</style>
