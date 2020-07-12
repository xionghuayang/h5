<template>
  <div>
    <div class="playPhone">
      <div class="voide_part">
		<live-voide :videoObj="videoObj" v-if="videoObj.liveType==2"></live-voide>
        <div v-else><live-broadcast :videoObj="videoObj" v-if="showVideo" @initPageStyle="initPageStyle"></live-broadcast></div>
        <player-navbar :peopleNum="onLivePeople" :titleClass="titleClass"></player-navbar>
      </div>

      <div class="playing_tabs">
        <!-- swipeable -->
        <van-tabs v-model="active" color="transparent" :border="!correct" :animated="correct">
          <van-tab
            title-style="font-size:.293333rem;"
            v-for="(item,index) in tabs"
            :title="item"
            :key="index"
          >
            <div class="content chat_room" v-if="index==0">
              <chat-room
                :boxH="boxH"
                :videoObj="videoObj"
                v-if="showVideo"
                @listenerPeopleNum="listenerPeopleNum"
              ></chat-room>
            </div>
            <div
              class="content advisory_teacher"
              :style="{height:(boxH + 15) + 'px'}"
              v-show="index==1"
            >
              <p>{{teacher_school.name}} | {{teacher.name}}</p>
              <p v-if="teachers.name" class="qr_code" v-html="teachers.details"></p>
              <p v-else class="qr_code" v-html="teachers_school.teachers"></p>
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
              <div class="school" v-if="records.isSwitch2==1&&school_active==0">
                <div class="school_abstract" v-html="teachers_school.details"></div>
              </div>
              <div class="school" v-if="records.isSwitch3==1&&school_active==1">
                <div v-if="teachers.name" class="school_fx" v-html="teachers.orgDetails"></div>
                <div v-else class="school_fx" v-html="teachers_school.orgDescribe"></div>
              </div>
            </div>
            <div class="content" :style="{height:(boxH + 15) + 'px'}" v-show="index==3">
              <div class="proclamation">
                <div class="agTop1">
                  <img src="@/assets/images/agTop1.png" alt srcset />邀请榜TOP20
                </div>
              </div>
              <div v-if="invitation==''" class="top_list_wu">暂无被邀请人</div>
              <div v-else class="top_list_for" v-for="(item, index) in invitation" :key="index">
                <div class="top_list_header">
                  <!-- item.AVATAR -->
                  <img :src="$store.state.imagePrefix+item.AVATAR" alt srcset />
                </div>
                <div class="top_list_info">
                  <p>
                    {{item.NAME}}
                    <img
                      :src="topThreeImg[index].src"
                      v-if="index == 0 || index == 1 || index == 2"
                      alt
                      srcset
                    />
                  </p>
                  <p>
                    邀请
                    <span style="color: #FF6A5B;">{{item.receiveCount}}</span>位好友参与直播
                  </p>
                </div>
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
      <div class="double_img">
        <round-double
          :shareUrl="shareUrl"
          :teacherQrCode="teachers.details"
          :orgName="teacher_school.name"
          :orgId="String(teacher_school.userId)"
          :oneId="String($route.query.oneId)"
          :threeId="String($route.query.threeId)"
          :uId="uId"
        ></round-double>
      </div>
    </div>
  </div>
</template>
<script>
import liveBroadcast from "@/components/live-broadcast.vue";
import playerNavbar from "@/components/player-navbar.vue";
import liveVoide from "../components/live-voide.vue";
import chatRoom from "@/components/chat-room.vue";
import roundDouble from "@/components/round-double.vue";
import shareUrlJs from "../utils/shareUrl.js";
import Share from "../assets/js/share.js";
export default {
  name: "playing",
  components: {
    liveBroadcast,
    playerNavbar,
	liveVoide,
    chatRoom,
    roundDouble
  },
  data() {
    return {
      oneData: {},
      correct: true,
      correct1: true,
      active: 0,
      tabs: ["讨论区", "咨询老师", "校区介绍", "邀请榜"],
      boxH: 0,
      tabschool: ["总校介绍", "分校简介"],
      school_active: 0,
      teacher: {},
      teachers: {},
      invitation: {},
      videoObj: {},
      showVideo: false,
      teacher_school: {},
      teachers_school: {},
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
      shareUrl: "",
      records: "",
      uId: "",
      // records: "",
      titleClass: "",
      peopleNum: 0,
      onLivePeople: 0
    };
  },
  async created() {
    let that = this;
    window.addEventListener("resize", that.initPageStyle);
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
    this.uId = uId.toString();
    let shareUrl = location.href + "&rowid=" + uId;
    this.shareUrl = shareUrl;
    this.getDataByOneId();
    // 存在分享判断
    if (this.$route.query.rowid) {
      this.isHaveCourse();
    }

    // console.log(this.shareUrl, ">>>>>>>>>>>>>");
  },
  mounted() {
    this.initPageStyle();
    this.consulting();
    this.showplay();
  },
  beforeDestroy() {
    let that = this;
    window.removeEventListener("resize", that.initPageStyle);
  },
  methods: {
    // 判断用户是否拥有该课程
    async isHaveCourse() {
      // 付费课没有拥有，前往上个页面
      let p = this.$user();
      p.liveCurriculaId = this.$route.query.oneId;
      let res = await this.$request.post("/app/live/liveList", p);
      // console.log(res, "-----82");
      let data = res.data.records[0];
      // console.log(data, "----------280");
      if (data.liveCurriculaPresentPrice !== 0 && !data.isLiveCurriculaUser) {
        this.$toast("请先购买该课程");
        this.$router.push({
          path: "/coursePlayer",
          query: {
            id: this.$route.query.oneId
          }
        });
        return;
      }
      let threeIdInfo = await this.$request.post("/app/live/courseInfo", {
        liveCurriculaCourseId: this.$route.query.threeId
      });
      // 公开课需要密码 || 付费课已拥有需要密码
      if (threeIdInfo.data.livePassword.trim().length > 0) {
        this.$toast("请输入密码后观看");
        this.$router.push({
          path: "/coursePlayer",
          query: {
            id: this.$route.query.oneId
          }
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
    showplay() {
      let { oneId } = this.$route.query;
      let p = { liveCurriculaId: oneId };
      this.$request.post("/app/live/liveList", p).then(res => {
        if (res.code == 200) {
          // console.log(res.data)
          //       let q = {};
          //       q.userId = res.data.records[0].createUser;
          //       this.$request.post("/app/home/getUserInfoAll", q).then(res => {
          //         if (res.code == 200) {
          // console.log(res.data)
          //           this.titleClass = res.data.nickname;
          //         }
          //       });
          this.records = res.data.records[0];
          let arrtabs = document.querySelectorAll(".van-tab");
          if (this.records.isSwitch1 == 0) {
            arrtabs[1].style.display = "none";
          }
          if (this.records.isSwitch2 == 0 && this.records.isSwitch3 == 0) {
            arrtabs[2].style.display = "none";
          } else if (
            this.records.isSwitch2 == 0 &&
            this.records.isSwitch3 == 1
          ) {
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
        console.log(document.querySelector(".van-tabs__content").style.height);
		// document.querySelector('.playing_tabs').style.paddingTop=document.querySelector(".voide_part").clientHeight+'px'
		document.querySelector(".van-tabs__content").style.height = this.boxH + 15 + "px";
		if (/phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone/i.test(navigator.userAgent)) {
		} else {
			this.boxH=530;
			document.querySelector(".van-tabs__content").style.height =this.boxH + 15 + "px";
			var double = document.querySelector('.double')
			double.style.right='calc(50% - 220px)'
		}
        console.log(this.boxH);
      }, 0);
    },
    consulting() {
      // let p = this.$route.query;
      let { threeId } = this.$route.query;
      let p = { liveCurriculaCourseId: threeId };
      // console.log(p)
      this.$request.post("/app/live/courseInfo", p).then(res => {
        if (res.code == 200) {
          this.invitationFn();
          this.videoObj = {
			liveCurriculaCourseId:res.data.liveCurriculaCourseId,
            liveBDomain: res.data.liveBDomain,
            liveAppName: res.data.liveAppName,
            liveStreamName: res.data.liveStreamName,
			roomId:res.data.liveRoomId,
			userId:this.$user().rowid,
			liveType:res.data.liveType
          };
          this.peopleNum = res.data.livePeopleNum;
          this.showVideo = !this.showVideo;
          this.$toast.clear();
          let p = {};
          p.userId = res.data.liveTeacher;
          // console.log(this.invitation)
          this.$request.post("/app/home/getUserInfoAll", p).then(res => {
            if (res.code == 200) {
              this.teacher = res.data;
              this.teachers = res.data.teachers;
              console.log(this.teachers);
            }
          });
          p.userId = res.data.createUser;
          this.$request.post("/app/home/getUserInfoAll", p).then(res => {
            if (res.code == 200) {
              this.teacher_school = res.data;
              this.teachers_school = res.data.organization;
              this.titleClass = res.data.nickname;
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
          // if (!this.invitation[0].receiveCount) {
          //   this.invitation = "";
          // }
        }
      });
    },
    listenerPeopleNum(length, msg) {
      console.log(length, msg, "------------------");
      this.onLivePeople = length;
      let p = this.$user();
      // console.log(this.peopleNum);
      if (parseInt(msg.sender) === p.rowid) {
        // 超出限制，踢出房间
        if (length > this.peopleNum) {
          this.$dialog.alert({
            message: "直播间人数已满,请联系老师或机构客服进入直播间"
          });
          setTimeout(() => {
            this.$dialog.close();
            this.$router.go(-1);
          }, 2000);
        }
      }
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
	height: 561px;
	
    z-index: 2;
  }
  .van-tab {
    font-size: 18px !important;
  }
}
.chat_room {
  .van-cell {
    padding: 10px 16px !important;
  }
}
.content {
  background: #f9f9f9;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    /*隐藏滚轮*/
    display: none;
  }
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
    margin: 0 auto;
    img {
      width: 100%;
    }
  }
}

.school_ {
  background-color: #fff;
  display: inline-block;
  width: 50%;
  text-align: center;
  height: 72px;
  line-height: 72px;
  font-size: 32px;
}

.school_active {
  font-weight: 700;
}

.school_abstract {
  font-size: 0.75rem;
  margin: 0 20px;
  img {
    width: 100%;
  }
}

.school_fx {
  font-size: 0.75rem;
  margin: 0 20px;
  span {
    display: block;
    text-align: left !important;
  }
}
.top_list_wu {
  text-align: center;
  font-size: 28px;
  color: #666;
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
    width: 24px !important;
    height: 30px !important;
  }
}
</style>
