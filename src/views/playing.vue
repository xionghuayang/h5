<template>
  <div>
    <div class="voide_part">
      <live-broadcast></live-broadcast>
      <player-navbar :peopleNum="999"></player-navbar>
    </div>

    <div class="playing_tabs">
      <van-tabs
        v-model="active"
        swipeable
        color="transparent"
        :border="!correct"
        :animated="correct"
      >
        <van-tab
          title-style="font-size:.293333rem;"
          v-for="(item,index) in tabs"
          :title="item"
          :key="index"
        >
          <div class="content chat_room" v-if="index==0">
            <chat-room :boxH="boxH"></chat-room>
          </div>
          <div
            class="content advisory_teacher"
            :style="{height:(boxH + 15) + 'px'}"
            v-show="index==1"
          >
            <p>八一画室│郝老师</p>

            <div class="qr_code">
              <img src="@/assets/images/qrcode.png" alt srcset />
            </div>
          </div>
          <div class="content" :style="{height:(boxH + 15) + 'px'}" v-show="index==2">{{ item }}</div>
          <div class="content" :style="{height:(boxH + 15) + 'px'}" v-show="index==3">
            <div class="proclamation">
              <div class="agTop1">
                <img src="@/assets/images/agTop1.png" alt srcset />邀请榜TOP20
              </div>
            </div>
            <div class="top_list_for" v-for="(item, index) in topThreeImg" :key="index">
              <div class="top_list_header">
                <img src="@/assets/images/invite.png" alt srcset />
              </div>
              <div class="top_list_info">
                <p>
                  八一画室│萨达姆
                  <img
                    :src="index == 0?topThreeImg[0].src:index==1?topThreeImg[1].src:index==2?topThreeImg[2].src:''"
                    v-if="index == 0 || index == 1 || index == 2"
                    alt
                    srcset
                  />
                </p>
                <p>邀请832位好友参与直播</p>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <div class="double_img">
      <round-double></round-double>
    </div>
  </div>
</template>
<script>
import liveBroadcast from "@/components/live-broadcast.vue";
import playerNavbar from "@/components/player-navbar.vue";
import chatRoom from "@/components/chat-room.vue";
import roundDouble from "@/components/round-double.vue";
export default {
  name: "playing",
  components: {
    liveBroadcast,
    playerNavbar,
    chatRoom,
    roundDouble
  },
  data() {
    return {
      correct: true,
      active: 0,
      tabs: ["讨论区", "咨询老师", "校区介绍", "邀请榜"],
      boxH: 0,
      topThreeImg: [
        { src: require("@/assets/images/sign_01.png") },
        { src: require("@/assets/images/sign_02.png") },
        { src: require("@/assets/images/sign_03.png") }
      ]
    };
  },
  created() {},
  mounted() {
    this.initPageStyle();
  },
  methods: {
    initPageStyle() {
      setTimeout(() => {
        this.boxH = document.querySelector(".chat_room").style.height =
          window.innerHeight -
          (document.querySelector(".voide_part").clientHeight +
            document.querySelector(".playing_tabs .van-tabs__wrap")
              .clientHeight +
            15);
        console.log(this.boxH);
      }, 0);
    }
  }
};
</script>

<style lang="scss" scoped>
.playing_tabs /deep/ .van-tab--active {
  font-weight: bold;
}

.content {
  background: #f9f9f9;
  .chat_room {
    height: 500px;
    width: 100%;
    border: 1px solid red;
    box-sizing: border-box;
  }
  .proclamation {
    background: #f9f9f9;
    font-size: 24px;
    color: #353434;
    padding: 32px 0 28px 0;
    .agTop1 {
      display: flex;
      align-items: center;
      text-align: center;
      width: max-content;
      margin: 0 auto;
    }
    img {
      display: inline-block;
      height: 39px;
      width: 31px;
      margin-right: 12px;
    }
  }
}
.advisory_teacher {
  p {
    font-size: 26px;
    text-align: center;
    padding-top: 67px;
  }
  .qr_code {
    width: 418px;
    height: 418px;
    margin: 0 auto;
    img {
      margin-top: 19px;
      width: 418px;
      height: 418px;
    }
  }
}
.top_list_for {
  padding: 42px 0 43px 58px;
  box-sizing: border-box;
  background: white;
  display: flex;
  align-content: center;
  .top_list_header {
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
  }
}
.top_list_info {
  margin-left: 21px;
  p {
    &:nth-of-type(1) {
      color: #181818;
      font-size: 28px;
    }
    &:nth-of-type(2) {
      color: #a6a6a6;
      font-size: 22px;
    }
  }
  img {
    width: 24px;
    height: 30px;
  }
}
</style>