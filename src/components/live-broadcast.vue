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
  props: {
    videoObj: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      url: "",
      player: {}, //TcPlayer实例
      startime: "", //开始时间
      newtimer: "" //播放时间
    };
  },

  mounted() {
    // 初始化盒子宽高
    _self = this;
    let url = `https://${this.videoObj.liveBDomain}/${this.videoObj.liveAppName}/${this.videoObj.liveStreamName}`;
    // console.log(url);
    this.url = url;
    // _self.starTimer();
    // setInterval(function() {
    //   _self.timer();
    // }, 1000);
    this.initPalyer(url);
  },
  // 页面销毁
  destroyed() {
    // 销毁播放器
    console.log("页面销毁销毁播放器");
    this.player.destroy();
    this.player = "";
  },
  methods: {
    starTimer() {
      let p = this.$user();
      // console.log(this.$route.query.threeId)
      p.liveCurriculaCourseId = this.$route.query.threeId;
      this.$request.post("/app/live/getLiveTime", p).then(res => {
        // console.log(res)
        if (res.code == 200) {
          this.startime = res.data.liveStartTime;
          // console.log(this.startime)
        }
      });
    },
    timer() {
      // console.log(this.startime)
      let timer = new Date().getTime() - new Date(this.startime).getTime();
      // let timer=new Date().getTime() - new Date('2020/07/01 16:00:00').getTime()
      // console.log(timer)
      let hours = Math.floor(timer / (60 * 60 * 1000));
      let minutes = Math.floor((timer % (60 * 60 * 1000)) / (60 * 1000));
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      let seconds = Math.floor(
        ((timer % (60 * 60 * 1000)) % (60 * 1000)) / 1000
      );
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      this.newtimer = hours + ":" + minutes + ":" + seconds;
      // console.log(this.newtimer)
    },
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
          try {
            let el = document.querySelector("#bz_player_video video");
            let btn_ = document.querySelector(
              "#bz_player_video .vcp-playtoggle"
            );
            let spantime = document.querySelector(
              "#bz_player_video .vcp-timelabel"
            );
            // _self.starTimer();
            // setInterval(function() {
            //   _self.timer();
            // }, 1000);
            // spantime.innerHTML = _self.newtimer;
            if (el && btn_) {
              if (el.paused) {
                btn_.click();
              }
            }
          } catch (error) {}

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

            let elVideo = document.querySelector("#bz_player_video video");
            elVideo.setAttribute("playsinline", "");
            elVideo.setAttribute("webkit-playsinline", "");
            elVideo.setAttribute("x5-playsinline", "");
            _self.$emit("initPageStyle");
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
.video_box {
  // height: 372px;
  height: 487px;
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
