<template>
  <div>
    <div v-if="window_" class="playPhone">
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
              <p>招生教师——{{teacher.name}}</p>
              <!-- <img :src="teacher.avatar" alt=""> -->
              <p class="qr_code" v-html="teacher.details"></p>
            </div>
            <div class="content" :style="{height:(boxH + 15) + 'px'}" v-show="index==2">
              <div
                @click="schoolFn(i)"
                :class="[school_active==i?'school_active':'']"
                class="school"
                v-for="(item1,i) in tabschool"
                :key="i"
              >{{item1}}</div>
              <div class="school_abstract" v-html="teacher_school.details" v-if="school_active==0"></div>
              <div class="school_fx" v-html="teacher.orgDetails" v-else></div>
            </div>
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
    <div class="playing" v-else>
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
              <p>招生教师——{{teacher.name}}</p>
              <!-- <img :src="teacher.avatar" alt=""> -->
              <p class="qr_code" v-html="teacher.details"></p>
            </div>
            <div class="content school_" :style="{height:(boxH + 15) + 'px'}" v-show="index==2">
              <div
                @click="schoolFn(i)"
                :class="[school_active==i?'school_active':'']"
                class="school"
                v-for="(item1,i) in tabschool"
                :key="i"
              >{{item1}}</div>
              <div class="school_abstract" v-html="teacher_school.details" v-if="school_active==0"></div>
              <div class="school_fx" v-html="teacher.orgDetails" v-else></div>
            </div>
            <div class="content agTop" :style="{height:(boxH + 15) + 'px'}" v-show="index==3">
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
      correct1: true,
      active: 0,
      tabs: ["讨论区", "咨询老师", "校区介绍", "邀请榜"],
      boxH: 0,
      tabschool: ["校区介绍", "分校简介"],
      school_active: 0,
      teacher: {},
      invitation: {},
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
      window_: true
    };
  },
  created() {},
  mounted() {
    this.initPageStyle();
    this.consulting();
    this.windowFn();
    window.onresize = () => {
      return (() => {
        this.windowFn();
      })();
    };
  },
  methods: {
    windowFn() {
      if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
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
      let p = this.$route.query;
      // console.log(p)
      this.$request.post("/app/live/courseInfo", p).then(res => {
        if (res.code == 200) {
          let p = {};
          let q = {};
          this.invitation = res.data;
          this.invitationFn();
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
              // console.log(res)
            }
          });
        }
      });
    },
    schoolFn(i) {
      this.school_active = i;
    },
    invitationFn() {
      let p = this.$route.query;
      p.liveCurriculaId = this.invitation.liveCurriculaId;
      console.log(p);
      this.$request.post("/app/live/live_share_rank", p).then(res => {
        if (res.code == 200) {
          this.invitation = res.data;
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
    > div {
      font-size: 0.24rem;
    }
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
  .double {
    height: 2.4rem;
    width: 1rem;
    position: absolute;
    top: 75%;
    right: 0.5rem;
    img {
      height: 1rem;
    }
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

.school {
  display: inline-block;
  font-size: 0.75rem;
  padding: 10px 20px;
}

.school_active {
  background-color: #fff;
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
