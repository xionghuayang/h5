<template>
  <div>
    <div v-if="window_" class="playPhone">
      <div class="voide_part">
        <live-broadcast :videoObj="videoObj" v-if="showVideo" @initPageStyle="initPageStyle"></live-broadcast>
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
              <chat-room :boxH="boxH" :videoObj="videoObj" v-if="showVideo"></chat-room>
            </div>
            <div
              class="content advisory_teacher"
              :style="{height:(boxH + 15) + 'px'}"
              v-show="index==1"
            >
              <p>招生教师——{{teacher.name}}</p>
              <!-- <img :src="teacher.avatar" alt=""> -->
              <p class="qr_code" v-html="teacher.details"></p>
            </div>
            <div class="content" :style="{height:(boxH + 15) + 'px'}" v-show="index==2">
              <div
                v-if="records.isSwitch2==1"
                :class="[school_active==0?'school_active':'']"
                @click="schoolActive(0)"
                class="school_"
              >{{tabschool[0]}}</div>
              <div
                v-if="records.isSwitch3==1"
                :class="[school_active==1?'school_active':'']"
                @click="schoolActive(1)"
                class="school_"
              >{{tabschool[1]}}</div>

              <div class="school" v-if="school_active==1">
                <div class="school_fx" v-html="teacher.orgDetails"></div>
              </div>
              <div class="school" v-else>
                <div class="school_abstract" v-html="teacher_school.details"></div>
              </div>
            </div>
            <div class="content" :style="{height:(boxH + 15) + 'px'}" v-show="index==3">
              <div class="proclamation">
                <div class="agTop1">
                  <img src="@/assets/images/agTop1.png" alt srcset />邀请榜TOP20
                </div>
              </div>
              <div class="top_list_for" v-for="(item, index) in invitation" :key="index">
                <div class="top_list_header">
                  <!-- item.AVATAR -->
                  <img :src="$store.state.imagePrefix+item.AVATAR" alt srcset />
                </div>
                <div class="top_list_info">
                  <p>
                    {{item.NAME}}
                    <img
                      :src="topThreeImg[0].src"
                      v-if="index == 0 || index == 1 || index == 2"
                      alt
                      srcset
                    />
                  </p>
                  <p>邀请{{item.receiveCount}}位好友参与直播</p>
                </div>
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
      <div class="double_img">
        <round-double
          :shareUrl="shareUrl"
          :teacherQrCode="teacher.details"
          :orgName="teacher_school.name"
          :orgId="String(teacher_school.userId)"
          :oneId="String($route.query.oneId)"
        ></round-double>
      </div>
    </div>
    <div v-else class="playing">
      <div class="voide_part">
        <live-broadcast :videoObj="videoObj" v-if="showVideo" @initPageStyle="initPageStyle"></live-broadcast>
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
              <chat-room :boxH="boxH" :videoObj="videoObj" v-if="showVideo"></chat-room>
            </div>
            <div
              class="content advisory_teacher"
              :style="{height:(boxH + 15) + 'px'}"
              v-show="index==1"
            >
              <p>招生教师——{{teacher.name}}</p>
              <!-- <img :src="teacher.avatar" alt=""> -->
              <p class="qr_code" v-html="teacher.details"></p>
            </div>
            <div class="content" :style="{height:(boxH + 15) + 'px'}" v-show="index==2">
              <div
                v-if="records.isSwitch2==1"
                :class="[school_active==0?'school_active':'']"
                @click="schoolActive(0)"
                class="school_"
              >{{tabschool[0]}}</div>
              <div
                v-if="records.isSwitch3==1"
                :class="[school_active==1?'school_active':'']"
                @click="schoolActive(1)"
                class="school_"
              >{{tabschool[1]}}</div>

              <div class="school" v-if="school_active==1">
                <div class="school_fx" v-html="teacher.orgDetails"></div>
              </div>
              <div class="school" v-else>
                <div class="school_abstract" v-html="teacher_school.details"></div>
              </div>
            </div>
            <div class="content" :style="{height:(boxH + 15) + 'px'}" v-show="index==3">
              <div class="proclamation">
                <div class="agTop1">
                  <img src="@/assets/images/agTop1.png" alt srcset />邀请榜TOP20
                </div>
              </div>
              <div class="top_list_for" v-for="(item, index) in invitation" :key="index">
                <div class="top_list_header">
                  <!-- item.AVATAR -->
                  <img :src="$store.state.imagePrefix+item.AVATAR" alt srcset />
                </div>
                <div class="top_list_info">
                  <p>
                    {{item.NAME}}
                    <img
                      :src="topThreeImg[0].src"
                      v-if="index == 0 || index == 1 || index == 2"
                      alt
                      srcset
                    />
                  </p>
                  <p>邀请{{item.receiveCount}}位好友参与直播</p>
                </div>
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
      <div class="double_img">
        <round-double
          :shareUrl="shareUrl"
          :teacherQrCode="teacher.details"
          :orgName="teacher_school.name"
          :orgId="String(teacher_school.userId)"
          :oneId="String($route.query.oneId)"
        ></round-double>
      </div>
    </div>
  </div>
</template>
<script>
import liveBroadcast from "@/components/live-broadcast.vue";
import playerNavbar from "@/components/player-navbar.vue";
import chatRoom from "@/components/chat-room.vue";
import roundDouble from "@/components/round-double.vue";
import shareUrlJs from "../utils/shareUrl.js";
import Share from "../assets/js/share.js";
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
      correct1: true,
      active: 0,
      tabs: ["讨论区", "咨询老师", "校区介绍", "邀请榜"],
      boxH: 0,
      tabschool: ["总校介绍", "分校简介"],
      school_active: 0,
      teacher: {},
      invitation: {},
      videoObj: {},
      showVideo: false,
      teacher_school: {},
      topThreeImg: [
        {
          src: require("@/assets/images/sign_01.png")
        },
        {
          src: require("@/assets/images/sign_02.png")
        },
        {
          src: require("@/assets/images/sign_03.png")
        }
      ],
      window_: true,
      shareUrl: "",
      records: ""
    };
  },
  async created() {
    this.$toast.loading({
      message: "正在初始化直播间...",
      forbidClick: true,
      loadingType: "spinner",
      duration: 0
    });
    // console.log(location.href);
    // let res = await this.$public.loginByToken();
    // console.log(res);
    // let user = this.$user();
    // if (!user.token) {
    //   // 用户未登录
    //   this.$router.push({
    //     path: "/login"
    //   });
    //   return;
    // }
    let uId = await shareUrlJs(this);
    let shareUrl = location.href + "&rowid=" + uId;
    this.shareUrl = shareUrl;
    this.getDataByOneId();
    // console.log(this.shareUrl, ">>>>>>>>>>>>>");
  },
  mounted() {
    this.initPageStyle();
    this.consulting();
    this.windowFn();
    this.showplay();
    window.onresize = () => {
      return (() => {
        this.windowFn();
      })();
    };
  },
  methods: {
    // 判断用户是否拥有该课程
    isHaveCourse() {
      // 付费课没有拥有，前往上个页面
      let data = this.oneData;
      if (data.liveCurriculaPresentPrice !== 0 && !data.isLiveCurriculaUser) {
        this.$router.push({
          path: "/coursePlayer",
          id: this.$route.query.oneId
        });
        return;
      }
    },
    // 获取一级id数据
    async getDataByOneId() {
      let { oneId } = this.$route.query;
      let p = { liveCurriculaId: oneId };
      // console.log(p)
      let res = await this.$request.post("/app/live/liveList", p);
      console.log(res);
      if (res.code !== 200) return this.$toast("数据获取失败");
      this.oneData = res.data.records[0];
      this.share();
      this.isHaveCourse();
    },
    // 拼接share参数
    share() {
      let {
        liveCurriculaTitle,
        imagePrefix,
        liveCurriculaCover,
        liveCurriculaTypeName,
        liveCurriculaTeacher
      } = this.oneData;
      let _obj = {
        title: liveCurriculaTitle,
        imgScr: imagePrefix + liveCurriculaCover,
        desc: liveCurriculaTypeName + " " + liveCurriculaTeacher,
        link: this.shareUrl
      };
      // console.log(_obj);
      let wxShare = new Share();
      wxShare.init(_obj);
    },
    windowFn() {
      if (
        /Android|webOS|iPhone|iPod|iPad|BlackBerry/i.test(navigator.userAgent)
      ) {
        //移动端
        this.window_ = true;
      } else {
        //pc端
        this.window_ = false;
        //
        document.getElementsByTagName("html")[0].style.fontSize = "50px";
        console.log(document.getElementsByTagName("html")[0].style);
        console.log(window.location.href, ">>>>>>");
      }
    },
    showplay() {
      let { oneId } = this.$route.query;
      let p = { liveCurriculaId: oneId };
      this.$request.post("/app/live/liveList", p).then(res => {
        if (res.code == 200) {
          this.records = res.data.records[0];
          let arrtabs = document.querySelectorAll(".van-tab");
          if (this.records.isSwitch1 == 0) {
            arrtabs[1].style.display = "none";
          }
          if (this.records.isSwitch2 == 0 && this.records.isSwitch3 == 0) {
            arrtabs[2].style.display = "none";
          }
          if (this.records.isSwitch2 == 0) {
            this.schoolActive(1);
          }
          if (this.records.isSwitch5 == 0) {
            arrtabs[3].style.display = "none";
          }
        }
      });
    },
    schoolActive(i) {
      this.school_active = i;
    },
    initPageStyle() {
      setTimeout(() => {
        this.boxH = document.querySelector(".chat_room").style.height =
          window.innerHeight -
          (document.querySelector(".voide_part").clientHeight +
            document.querySelector(".playing_tabs .van-tabs__wrap")
              .clientHeight +
            15);
        // console.log(this.boxH);
      }, 0);
    },
    consulting() {
      // let p = this.$route.query;
      let { threeId } = this.$route.query;
      let p = { liveCurriculaCourseId: threeId };
      // console.log(p)
      this.$request.post("/app/live/courseInfo", p).then(res => {
        if (res.code == 200) {
          let p = {};
          let q = {};
          this.invitation = res.data;
          this.invitationFn();
          this.videoObj = {
            liveBDomain: res.data.liveBDomain,
            liveAppName: res.data.liveAppName,
            liveStreamName: res.data.liveStreamName
          };

          this.showVideo = !this.showVideo;
          this.$toast.clear();
          q.userId = res.data.createUser;
          p.userId = res.data.liveTeacher;
          // console.log(this.invitation)
          this.$request.post("/app/home/getUserInfoAll", p).then(res => {
            if (res.code == 200) {
              this.teacher = res.data.teachers;
              // console.log(res)
            }
          });
          this.$request.post("/app/home/getUserInfoAll", q).then(res => {
            if (res.code == 200) {
              this.teacher_school = res.data.organization;
            }
          });
        }
      });
    },
    invitationFn() {
      let p = this.$user();
      p.liveCurriculaId = this.$route.query.oneId;
      p.liveCurriculaCourseId = this.$route.query.threeId;
      this.$request.post("/app/live/live_share_rank", p).then(res => {
        if (res.code == 200) {
          this.invitation = res.data;
          if (this.invitation.length >= 20) {
            this.invitation.length = 20;
          }
          console.log(this.invitation);
        }
      });
    }
  }
};
</script>

<style lang="scss">
.playing_tabs /deep/ .van-tab--active {
  font-weight: bold;
}
.playPhone {
  .voide_part {
    position: fixed;
    width: 100%;
    height: 11.893333rem;
    z-index: 2;
  }
  .playing_tabs {
    padding-top: 11.893333rem;
    .van-tabs__content {
      height: calc(100vh - (11.8933 * 18.75px + 44px));
    }
  }
}
.playing {
  height: 13.34rem;
  width: 7.45rem;
  font-size: 0.24rem;
  margin: auto;
  position: relative;
  .voide_part {
    height: 4.46rem;
    .video_box {
      height: 3.72rem;
      #bz_player_video {
        width: 100%;
        height: 100%;
      }
    }
    .player_navbar {
      padding: 0 0.5rem;
      width: 100%;
      height: 0.74rem;
      div {
        font-size: 0.24rem;
      }
      img {
        width: 0.24rem;
        height: 0.25rem;
        margin-right: 0.1rem;
      }
      .study_num {
        margin: 0 0.2rem;
      }
      span {
        font-size: 0.24rem;
      }
    }
  }
  .playing_tabs {
    .van-tab__pane-wrapper {
      .advisory_teacher {
        > p {
          padding-top: 0.66rem;
          font-size: 0.24rem;
        }
        .qr_code {
          width: 4.2rem;
          height: 4.2rem;
        }
      }
    }
    height: 8.8rem;
    .van-tabs {
      height: 8.8rem;
      .van-tabs__content {
        height: 7.92rem;
        .web_room_allMsg {
          height: 7.92rem !important;
        }
      }
    }
  }

  .school_ {
    font-size: 0.24rem;
    height: 0.8rem;
    line-height: 0.8rem;
  }
  .school {
    font-size: 0.24rem;
    padding: 0 0.24rem;
    p {
      font-size: 0.24rem;
    }
  }
  .school_abstract {
    font-size: 0.24rem;
  }
  .agTop {
    .proclamation {
      font-size: 0.24rem;
      padding: 0.32rem 0 0.28rem;
      img {
        width: 0.28rem;
        height: 0.4rem;
      }
    }
    .top_list_for {
      padding: 0.42rem 0 0.42rem 0.58rem;
      .top_list_header {
        img {
          width: 0.6rem;
          height: 0.6rem;
        }
      }
      .top_list_info {
        p {
          font-size: 0.28rem;
          img {
            width: 0.3rem;
            height: 0.24rem;
          }
        }
        p:last-of-type {
          font-size: 0.24rem;
        }
      }
    }
  }
  .chat_room {
    .web_room {
      padding: 0.1rem 0.3rem;
      // font-size: 0.24rem ;

      .web_room_allMsg {
        padding: 0;
        .for_list {
          margin-bottom: 0.3rem;
        }
        p {
          font-size: 0.24rem;
        }
        .user_avatar {
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 50%;
        }
        .user_news {
          font-size: 0.24rem;
          border-radius: 2px;
          padding: 0.24rem 0.54rem 0.26rem 0.24rem;
        }
      }
    }
    .web_send_msg_foot {
      position: absolute;
      bottom: 0;
      padding: 0 0.3rem;
      height: 1rem;
      span {
        font-size: 0.24rem;
      }
      .user_input_msg {
        width: 5.8rem;
        .van-cell {
          width: 100%;
          padding: 0.2rem 0.3rem;
        }
      }
    }
  }
  .content {
    .proclamation {
      padding: 0.25rem 0;
      .agTop1 {
        font-size: 0.24rem;
        img {
          width: 0.3rem;
          height: 0.4rem;
          margin: 0 5px 0 0;
        }
      }
    }
    .top_list_for {
      padding: 0.4rem 0 0.4rem 0.6rem;
      img {
        width: 0.6rem;
        height: 0.6rem;
      }
      p {
        font-size: 0.24rem;
        img {
          width: 0.3rem;
          height: 0.3rem;
        }
      }
    }
  }

  .double {
    height: 2.4rem;
    width: 1rem;
    position: absolute;
    top: 70%;
    right: 0.5rem;
    img {
      height: 1rem;
    }
  }
}
.chat_room {
  .van-cell {
    padding: 10px 16px !important;
  }
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
  > p {
    font-size: 26px;
    text-align: center;
    padding-top: 67px;
  }

  .qr_code {
    width: 418px;
    height: 418px;
    margin: 0 auto;

    p {
      img {
        width: 100%;
      }
    }
  }
}

.school_ {
  background-color: #fff;
  display: inline-block;
  width: 50%;
  text-align: center;
  height: 2rem;
  line-height: 2rem;
  font-size: 0.75rem;
}

.school_active {
  font-weight: 700;
}

.school_abstract {
  font-size: 0.75rem;
}

.school_fx {
  font-size: 0.75rem;
  span {
    display: block;
    text-align: left !important;
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
