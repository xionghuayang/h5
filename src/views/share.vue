<template>
  <div class="share">
    <div class="contentbox">
      <div id="canvas" style="position:absolute;">
        <img :src="canvasImg" alt class="shareImg" />
      </div>
      <div id="capture" class="content" :style="'background-color:'+bgImgObj.bgc">
        <img :src="require('../assets/images/' +bgImgObj.imgSrc)" alt class="shareImg" />
        <div class="main">
          <!-- 推荐 -->
          <div class="recommend">
            <img src="../assets/images/recommend.png" alt />
          </div>
          <!-- 头像 -->
          <div class="avatar">
            <img :src="$store.state.profilePicture + '?r=' + Math.random()" crossorigin="anonymous" />
          </div>
          <!-- 描述 -->
          <p class="desc">{{userName}}邀请你一起看直播课</p>
          <!-- 标题 -->
          <p class="title">{{parInfo.liveCurriculaTitle}}</p>
          <!-- 图片 -->
          <div class="mainImg">
            <img :src="info.imgSrc" alt crossorigin="anonymous" />
          </div>
          <!-- code -->
          <div class="qr">
            <div class="info">扫码看视频</div>
            <div class="code">
              <div v-html="$route.query.teacherQrCode"></div>
            </div>
            <div class="code-desc">来自『{{$route.query.orgName}}』</div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="toast">长按保存图片，邀请好友，传递知识</div>
      <div class="sharenum">
        <div class="circle">
          <div class="pass"></div>
        </div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="sharemethod">
          <van-button type="default" round class="btn" @click="showPopup = true">邀请方式</van-button>
          <!-- 弹出层 -->
          <van-popup v-model="showPopup" closeable position="bottom" class="sharePop">
            <p class="pop-title">邀请方式</p>
            <div class="pop-content">
              <div class="pop-item">
                <p class="pop-info">方式一</p>
                <div class="pop-desc">
                  <p>微信内直播方式</p>
                  <p>点击微信右商家三个点“…”</p>
                  <p>通过【发送给朋友】【分享到朋友圈】</p>
                </div>
              </div>
              <div class="pop-item">
                <p class="pop-info">方式二</p>
                <div class="pop-desc">
                  <p>复制一下链接，转发：</p>
                  <p class="van-ellipsis link">{{link}}</p>
                  <van-button
                    type="default"
                    round
                    class="btn copyBtn"
                    :data-clipboard-text="link"
                    @click="copyLink"
                  >复制链接</van-button>
                </div>
              </div>
            </div>
          </van-popup>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Clipboard from "clipboard";
import Canvas from "html2canvas";
import Share from "../assets/js/share";
let mapImg = [
  {
    bgc: "#060619",
    imgSrc: "share2.png"
  },
  {
    bgc: "#DEB9A6",
    imgSrc: "share5.png"
  },
  {
    bgc: "#F2B5B8",
    imgSrc: "share8.png"
  },
  {
    bgc: "#D57140",
    imgSrc: "share1.png"
  },
  {
    bgc: "#75BE5B",
    imgSrc: "share9.png"
  },
  {
    bgc: "#8F291B",
    imgSrc: "share3.png"
  },
  {
    bgc: "#C25A52",
    imgSrc: "share6.png"
  }
];

export default {
  name: "share",
  mounted() {},
  data() {
    return {
      bgImgObj: {
        bgc: " #060606",
        imgSrc: "share2.png"
      },
      showPopup: false,
      link: this.$route.query.shareUrl,
      // shareObj: {
      //   desc: "杜拉拉邀请你一起看直播课",
      //   title: "白泽在线素描人物测试直播专题课 程（三）",
      //   imgSrc: require("../assets/images/sharecontent.png"),
      //   code: require("../assets/images/qrcode.png")
      // },
      canvasImg: "", //图片
      info: [],
      parInfo: [],
      userName: ""
    };
  },
  created() {
    this.$public.loginByToken();
    this.$store.commit("getUserProfilePicture");
    // console.log(this.$store.state.$userInfo);
    // console.log(this.$route.query.teacherQrCode);
    this.userName = this.$store.state.$userInfo.nickname;
    this.randomBg();
    this.getCourseInfo(24);
    this.$toast.loading({
      message: "海报生成中...",
      forbidClick: true,
      loadingType: "spinner",
      duration: 0
    });
  },
  methods: {
    // 随机背景
    randomBg() {
      // 获取最小值到最大值之前的整数随机数
      function GetRandomNum(Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        return Min + Math.round(Rand * Range);
      }
      let index = GetRandomNum(0, 6);
      let obj = mapImg[index];
      this.bgImgObj = obj;
    },
    // 复制链接
    copyLink() {
      // console.log("ok");
      let _that = this;
      let clipboard = new Clipboard(".copyBtn");
      clipboard.on("success", function(e) {
        _that.$toast.success("复制成功");
        _that.showPopup = false;
        e.clearSelection();
      });
      clipboard.on("error", function(e) {
        _that.$toast.fail("复制失败");
      });
    },
    // 分享数据
    share(title, imgScr, desc) {
      // 获取页面数据
      let _obj = {
        title: title,
        imgScr: imgScr,
        desc: desc,
        link: this.$route.query.shareUrl
      };
      let wxShare = new Share();
      wxShare.init(_obj);
    },
    toImage() {
      Canvas(document.querySelector("#capture"), { useCORS: true })
        .then(canvas => {
          this.canvasImg = canvas.toDataURL("image/png");
          this.$toast.clear();
        })
        .catch(err => {
          this.$toast.clear();
        });
    },
    getCourseInfo(id) {
      let _this = this;
      let p = _this.$user();
      p.liveCurriculaCourseId = id;
      _this.$request.post("/app/live/courseInfo", p).then(res => {
        _this.info = res.data;
        // 上个页面传入的数据
        _this.getParImg(_this.info.liveCurriculaId).then(result => {
          let parInfo = (this.parInfo = result.data.records[0]);
          _this.info.imgSrc =
            parInfo.imagePrefix +
            parInfo.liveCurriculaCover +
            "?r=" +
            Math.random();
          // 拿到数据之后  进行分享
          _this.share(
            parInfo.liveCurriculaTitle,
            _this.info.imgSrc,
            parInfo.liveCurriculaTypeName
          );
          _this.$store.commit("getUserProfilePicture");
          _this.getImgToBase64(_this.info.imgSrc, uri => {
            _this.info.imgSrc = uri;
            _this.toImage();
          });
        });
      });
    },
    async getParImg(id) {
      let p = this.$user();
      p.liveCurriculaId = id;
      return await this.$request.post("/app/live/liveList", p);
    },
    getImgToBase64(url, callback) {
      var canvas = document.createElement("canvas");
      var ctx = canvas.getContext("2d");
      var img = new Image(); //通过构造函数来创建的 img 实例，在赋予 src 值后就会立刻下载图片，相比 createElement() 创建 <img> 省去了 append()，也就避免了文档冗余和污染
      img.crossOrigin = "Anonymous";
      //要先确保图片完整获取到，这是个异步事件
      img.onload = function() {
        canvas.height = img.height; //确保canvas的尺寸和图片一样
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0); //将图片绘制到canvas中
        var dataURL = canvas.toDataURL("image/png"); //转换图片为dataURL,传第二个参数可压缩图片,前提是图片格式jpeg或者webp格式的
        callback(dataURL); //调用回调函数
        canvas = null;
      };
      img.src = url;
    }
  }
};
</script>
<style scoped lang="scss">
#canvas {
  width: 660px;
  img {
    width: 100%;
  }
}
.share {
  // width: 100vw;
  // padding: 20px 45px 0;
  height: 90vh;
  background-color: #f9f9f9;
  box-sizing: border-box;
}
.contentbox {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 80vh;
  overflow: hidden;
}
.content {
  position: relative;
  left: 100%;
  width: 660px;
  height: 1020px;
  // background-color: #060606;
  border-radius: 10px;
  overflow: hidden;
  .shareImg {
    width: 660px;
    height: 378px;
  }
  .main {
    position: absolute;
    top: 190px;
    left: 50px;
    width: 560px;
    background: #fff;
    border-radius: 10px;
    padding: 32px 64px;
    box-sizing: border-box;
  }
}
.recommend {
  position: absolute;
  right: 47px;
  top: 0;
  width: 64px;
  height: 90px;
  img {
    width: 100%;
    height: 100%;
  }
}
.avatar {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  text-align: center;
  img {
    height: 100%;
    // transform: translate(-14px, 0px);
    // width: 100%;
    // height: 100%;
  }
}
.desc {
  font-size: 22px;
  color: #525252;
  text-align: center;
  margin-top: 90px;
  height: 48px;
}
.title {
  font-size: 28px;
  color: #0d0d0d;
  font-weight: bold;
}
.mainImg {
  width: 433px;
  height: 254px;
  border-radius: 6px;
  overflow: hidden;
  margin-top: 5px;
  img {
    width: 100%;
    border-radius: 6px;
    height: 100%;
  }
}
.qr {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 25px;
  .info {
    font-size: 20px;
    color: #525252;
  }
  .code {
    width: 140px;
    height: 140px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .code-desc {
    font-size: 20px;
    color: #060606;
    margin-top: 10px;
  }
}
.bottom {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  // margin-top: 66px;
  background-color: #fff;
  .toast {
    height: 64px;
    line-height: 64px;
    background-color: #fed039;
    text-align: center;
    font-size: 22px;
  }
  .sharenum {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100px;
    padding: 0 40px;
    box-sizing: border-box;
    .circle {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      background: url("../assets/images/sharecircle.png") no-repeat center
        center;
      display: flex;
      justify-content: center;
      align-items: center;
      background-size: 120%;
      .pass {
        // color: red;
        width: 36px;
        height: 36px;
        background: url("../assets/images/pass.png") no-repeat;
        background-size: 100% 100%;
      }
    }
    .sharemethod {
      width: 200px;
      height: 74px;
      .btn {
        width: 200px;
        height: 74px;
        border: 3px solid #fed039;
        font-size: 28px;
        color: #252525;
        box-sizing: border-box;
      }
    }
  }
}
.sharePop {
  height: 525px;
  .pop-title {
    height: 110px;
    line-height: 110px;
    font-size: 29px;
    color: #000;
    text-align: center;
  }
  .pop-content {
    .pop-item {
      display: flex;
      // justify-content: center;
      .pop-info {
        width: 150px;
        font-size: 24px;
        color: #7e8284;
        text-align: center;
      }
      .pop-desc {
        width: 460px;
        p {
          color: #7e8284;
          font-size: 22px;
          margin-bottom: 20px;
        }
        p:nth-of-type(1) {
          font-size: 24px;
          color: #000;
        }
        .link {
          margin-bottom: 36px;
        }
      }
    }
  }
}
</style>