<template>
  <div class="share">
    <div class="contentbox">
      <div class="content" :style="'background-color:'+bgImgObj.bgc">
        <img :src="require('../assets/images/' +bgImgObj.imgSrc)" alt class="shareImg" />
        <div class="main">
          <!-- 推荐 -->
          <div class="recommend">
            <img src="../assets/images/recommend.png" alt />
          </div>
          <!-- 头像 -->
          <div class="avatar">
            <img :src="shareObj.avatar" />
          </div>
          <!-- 描述 -->
          <p class="desc">{{shareObj.desc}}</p>
          <!-- 标题 -->
          <p class="title">{{shareObj.title}}</p>
          <!-- 图片 -->
          <div class="mainImg">
            <img :src="shareObj.imgSrc" alt />
          </div>
          <!-- code -->
          <div class="qr">
            <div class="info">扫码看视频</div>
            <div class="code">
              <img :src="shareObj.code" alt />
            </div>
            <div class="code-desc">来自『郑州八一画室』</div>
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
      link: "https://www.iconfont.cn/user/detail111/fafafa/fafaf/faasfaa",
      shareObj: {
        avatar: require("../assets/images/shareheader.png"),
        desc: "杜拉拉邀请你一起看直播课",
        title: "白泽在线素描人物测试直播专题课 程（三）",
        imgSrc: require("../assets/images/sharecontent.png"),
        code: require("../assets/images/qrcode.png")
      }
    };
  },
  created() {
    this.randomBg();
    this.share();
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
        // console.info("Action:", e.action);
        // console.info("Text:", e.text);
        // console.info("Trigger:", e.trigger);
        _that.$toast.success("复制成功");
        _that.showPopup = false;
        e.clearSelection();
      });
      clipboard.on("error", function(e) {
        // console.error("Action:", e.action);
        // console.error("Trigger:", e.trigger);
        // alert("复制失败");
        _that.$toast.fail("复制失败");
      });
    },
    // 分享数据
    share() {
      // 获取页面数据
      let _obj = {
        title: "小枫枫呀",
        imgScr: "https://www.baizezaixian.com/demo/img/img0.263ffcef.png",
        desc: "小枫枫是一个前端开发的弟中弟，踩坑的小白鼠",
        link: ""
      };
      let wxShare = new Share();
      wxShare.init(_obj);
    }
  }
};
</script>
<style scoped lang="scss">
.share {
  // width: 100vw;
  // padding: 20px 45px 0;
  height: 90vh;
  background-color: #f9f9f9;
  box-sizing: border-box;
}
.contentbox {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}
.content {
  position: relative;
  width: 660px;
  height: 950px;
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
    height: 714px;
    background: #fff;
    border-radius: 10px;
    padding: 0 64px;
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
    transform: translate(-14px, 0px);
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
  margin-top: 5px;
  img {
    width: 100%;
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