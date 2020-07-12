<template>
  <div class="replayBox">
    <player :play="player" v-if="isShowPlayer"></player>
    <div class="playerbox" v-else>
      <van-loading color="#fff" vertical>加载中...</van-loading>
    </div>
    <!-- <player :play="player"></player> -->
    <div class="player_navbar">
      <player-navbar :status="'2'" :peopleNum="replayNum" :titleClass="titleClass"></player-navbar>
    </div>
    <div class="tab_box">
      <van-tabs
        v-model="active"
        color="#FED03A"
        type="line"
        :border="!correct"
        :animated="correct"
        line-width="3.786667rem"
        title-active-color="#262626"
        title-inactive-color="#262626"
      >
        <van-tab title="课程目录" title-style="font-size:.906667rem;font-weight:bold;">
          <div class="re_play_directory">
            <div class="re_play_directory_title">
              <p>{{prePage.oneTitle}}</p>
              <p>
                {{prePage.twoTitle}}
                <!-- 下拉 -->
                <!-- <span class="arrow_up">
                  <van-icon name="arrow-up" />
                </span>-->
              </p>
            </div>
            <div class="re_play_directory_content">
              <template v-for="(item,index) in courseList">
                <div :key="index" v-if="item.innerCourse.length === 0"></div>
                <div :key="item.creaTime" class="content_item" v-else>
                  <p class="re_lesson_title">{{item.liveTitle}}</p>
                  <p class="re_lesson_time">主讲老师：{{item.teacherNames}}│{{item.creaTime}}</p>
                  <!-- <van-steps
                    direction="vertical"
                    :active="item.curActive"
                    active-color="#fed039"
                  @click-step="changeLesson($event,item.liveCurriculaCourseId)"
                  >-->
                  <!-- <div v-if="item.innerCourse.length === 0">
                    <p style="font-size: .586667rem; color: #525252;">暂无回放课程</p>
                  </div>-->
                  <!-- <div v-else-if="item.innerCourse.length === 1"></div> -->

                  <!-- <van-step v-for="(item1,index) in item.innerCourse" :key="index">
                        <h3>{{item.liveTitle}}（{{index + 1}}）</h3>
                  </van-step>-->
                  <div v-if="item.innerCourse.length === 1">
                    <player-title
                      @click.native="clc(0,item.innerCourse[0],item.liveTitle,true)"
                      :ref="'step' + item.innerCourse[0].liveCurriculaRecordId + 'player'"
                      class="playerTitleclc"
                    ></player-title>
                  </div>
                  <blockquote v-else>
                    <template v-for="(item1,index1) in item.innerCourse">
                      <div class="box" :key="index1">
                        <step
                          @click.native="clc(index1,item1,item.liveTitle)"
                          :ref="'step' + item1.liveCurriculaRecordId"
                        >
                          <p>{{item.liveTitle + '(' + (index1 - 0 +1) + ')'}}</p>
                        </step>
                        <div class="steps_line" v-show="item.innerCourse.length-1 !== index1"></div>
                      </div>
                    </template>
                  </blockquote>
                  <!-- </van-steps> -->
                </div>
              </template>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import playerTitle from "../components/playerTitle";
import step from "../components/steps.vue";
import player from "@/components/player.vue";
import playerNavbar from "@/components/player-navbar.vue";
import Share from "../assets/js/share.js";
import shareUrl from "../utils/shareUrl.js";
export default {
  name: "rePlay",
  components: {
    player,
    playerNavbar,
    step,
    playerTitle
  },
  data() {
    return {
      currentList: [],
      titleClass: "",
      replayNum: 0,
      isShowPlayer: false,
      active: 0,
      correct: true,
      // 上个页面传入数据
      prePage: {},
      // 三四级列表数据
      courseList: [],
      // 视频对象
      player: {
        fileId: "",
        appID: "",
        videoTit: ""
      },
      // 分享数据
      link: ""
    };
  },
  async created() {
    // 分享链接进入
    let uId = await shareUrl(this);
    this.isHaveCourse();
    // console.log(uId, "000000");
    // let { oneId, threeId } = this.$route.query;
    this.link = `${location.href}&rowid=${uId}`;
    // console.log(location.href);
    this.prePage = this.$route.query;
    // this.getTwoData();
    this.getData();
    this.getJIGOU();
  },
  mounted() {},
  methods: {
    // console.log(this.$route.query, "------");
    // 判断用户是否拥有该课程
    async isHaveCourse() {
      let p = this.$user();
      p.liveCurriculaId = this.$route.query.oneId;
      let res = await this.$request.post("/app/live/liveList", p);
      // console.log(res);
      if (res.code !== 200) return this.$toast("数据获取失败");
      let data = res.data.records[0];
      // console.log(data);
      // 付费课没有拥有，前往上个页面
      if (
        data.liveCurriculaPresentPrice !== 0 &&
        data.isLiveCurriculaUser.toString() == "false"
      ) {
        this.$router.push({
          path: "/coursePlayer",
          id: this.$route.query.oneId
        });
        return;
      }
    },
    // 分享数据
    share() {
      // 获取页面数据
      let {
        imagePrefix,
        liveCurriculaCover,
        liveTitle,
        teacherNames
      } = this.courseList[0];
      let _obj = {
        title: this.prePage.oneTitle,
        imgScr: imagePrefix + liveCurriculaCover,
        desc: liveTitle + " " + teacherNames,
        link: this.link
      };
      console.log(_obj);
      let wxShare = new Share();
      wxShare.init(_obj);
    },

    // 切换课程
    async changeLesson(index, id) {
      // console.log(index, id);
      let arr = this.courseList.filter(
        item => item.liveCurriculaCourseId === id
      );
      this.courseList.forEach(item => (item.curActive = -1));
      arr[0].curActive = index;
      // 获取当前视频所需数据
      let { appID, fileId, liveCurriculaViews } = arr[0].innerCourse[index];
      let videoTit = `${arr[0].liveTitle}(${index + 1})`;
      this.player = { appID, fileId, videoTit };
      this.replayNum = liveCurriculaViews;
      // console.log(appID, fileId, videoTit);
    },
    // 获取机构名称
    async getJIGOU() {
      let { oneId } = this.prePage;
      let p = this.$user();
      p.liveCurriculaId = oneId;
      let res = await this.$request.post("/app/live/liveList", p);
      if (res.code !== 200) return this.$toast("数据获取失败");
      // console.log(res, "-----185");
      let q = {};
      q.userId = res.data.records[0].createUser;
      this.$request.post("/app/home/getUserInfoAll", q).then(res => {
        if (res.code == 200) {
          this.titleClass = res.data.nickname;
        }
      });
    },
    // 获取三四级目录数据
    async getData() {
      let { twoId } = this.prePage;
      let p = this.$user();
      p.liveCurriculaCatalogueId = twoId;
      let res = await this.$request.post("/app/live/courseList", p);
      if (res.code !== 200) return this.$toast("数据获取失败");
      console.log(res, "-----202");

      // 只保留回放数据
      let replayArr = res.data.filter(item => item.liveStatus === 2);
      // console.log(replayArr);
      // replayArr.forEach((item, index) => {
      // console.log(item, index, "----191");
      // item.curActive = -1;
      // if (item.liveCurriculaCourseId + "" === this.prePage.threeId + "") {
      //   item.curActive = 0;
      // }
      // if (item.liveCurriculaCourseId + "" === this.prePage.threeId) {
      //   console.log(123);
      //   item.curActive = 0;
      // }
      // });

      // let arr = res.data;
      let courseData = await Promise.all(
        replayArr.map(async item => {
          let id = item.liveCurriculaCourseId;
          p.liveCurriculaCourseId = id;
          let res = await this.$request.post("/app/live/recordList", p);
          if (res.code !== 200) return this.$toast("数据获取失败");
          // console.log(res);
          item.innerCourse = res.data;
          return item;
        })
      );
      this.courseList = courseData;
      // 首次进入加载课程
      let curr = this.courseList.filter(
        item => item.liveCurriculaCourseId + "" === this.prePage.threeId + ""
      );

      if (curr[0].innerCourse.length === 1) {
        let clcitem = curr[0].innerCourse[0];
        this.$nextTick(() => {
          this.clc(0, clcitem, curr[0].liveTitle, true);
        });
      } else {
        let clcitem = curr[0].innerCourse[0];
        this.$nextTick(() => {
          this.clc(0, clcitem, curr[0].liveTitle);
        });
      }

      console.log(curr, "---219");
      // console.log(courseData);

      let curArr = courseData.filter(
        item => item.liveCurriculaCourseId + "" === this.prePage.threeId + ""
      );
      // console.log(curArr);
      // 获取当前视频所需数据
      let { appID, fileId, liveCurriculaViews } = curArr[0].innerCourse[0];
      let videoTit = `${curArr[0].liveTitle}(1)`;
      this.player = { appID, fileId, videoTit };
      // console.log(this.player);
      this.isShowPlayer = true;
      this.replayNum = liveCurriculaViews;
      // 初始化分享
      this.share();
    },
    // 更新版切换课程
    clc(index1, item1, title, titclc) {
      console.log(index1, item1, title, titclc);
      let current = "";
      if (titclc) {
        current = "step" + item1.liveCurriculaRecordId + "player";
      } else {
        current = "step" + item1.liveCurriculaRecordId;
      }
      if (this.currentList.length >= 2) {
        this.currentList.shift();
        this.currentList.push(current);
      } else {
        this.currentList.push(current);
      }
      console.log(this.currentList);
      if (this.currentList.length === 1) {
        if (this.currentList[0].endsWith("player")) {
          let dom = this.$refs[this.currentList[0]][0].$el;
          let title = dom.parentNode.previousSibling.previousSibling;
          let info = dom.parentNode.previousSibling;
          title.style.color = "#FFD322";
          // info.style.color = "#FFD322";
        } else {
          let dom = this.$refs[this.currentList[0]][0].$el;
          let content = dom.querySelector(".content");
          let dot = dom.querySelector(".dot");
          content.style.color = "#FFD322";
          dot.style.backgroundColor = "#FFD322";
        }
      } else {
        if (this.currentList[0].endsWith("player")) {
          let dom = this.$refs[this.currentList[0]][0].$el;
          let title = dom.parentNode.previousSibling.previousSibling;
          let info = dom.parentNode.previousSibling;
          title.style.color = "#525252";
          // info.style.color = "#bbb";
        } else {
          let dom = this.$refs[this.currentList[0]][0].$el;
          let content = dom.querySelector(".content");
          let dot = dom.querySelector(".dot");
          content.style.color = "#525252";
          dot.style.backgroundColor = "#bbb";
        }
        if (this.currentList[1].endsWith("player")) {
          let dom = this.$refs[this.currentList[1]][0].$el;
          let title = dom.parentNode.previousSibling.previousSibling;
          let info = dom.parentNode.previousSibling;
          title.style.color = "#FFD322";
          // info.style.color = "#FFD322";
        } else {
          let dom1 = this.$refs[this.currentList[1]][0].$el;
          let content1 = dom1.querySelector(".content");
          let dot1 = dom1.querySelector(".dot");
          content1.style.color = "#FFD322";
          dot1.style.backgroundColor = "#FFD322";
        }
      }

      // 获取当前视频所需数据
      let { appID, fileId, liveCurriculaViews } = item1;
      let videoTit = `${title}(${index1 + 1})`;
      this.player = { appID, fileId, videoTit };
      this.replayNum = liveCurriculaViews;
      // console.log(index);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/global.scss";
.playerTitleclc {
  position: absolute;
  top: 0;
  left: 20px;
  width: 100%;
  height: 300px;
}
.replayBox {
  height: 100vh;
  background-color: #f9f9f9;
}
.box {
  position: relative;
}
.steps_line {
  /* width: 5px; */
  position: absolute;
  top: 18px;
  left: 6px;
  height: 36px;
  border-left: 1px dashed #bbb;
}

.playerbox {
  height: 487px;
  background-color: #000;
  .van-loading {
    top: 50%;
    transform: translateY(-50%);
    text-align: center;
  }
}
.re_play_directory_title {
  background: #f9f9f9;
  padding: 29px 56px 29px 0;
  box-sizing: border-box;
  p {
    &:first-of-type {
      color: #525252;
      font-size: 28px;
      margin: 0 0 0 42px;
    }
    &:nth-of-type(2) {
      font-size: 28px;
      color: #252525;
      margin-top: 15px;
      margin-left: 54px;
      font-weight: bold;
    }
  }
  .arrow_up {
    float: right;
  }
}
.re_play_directory_content {
  width: 100%;
  // padding: 0px 0 0px 54px;
  box-sizing: border-box;
  // border-bottom: 1px solid #f1f1f1;
  .content_item {
    padding: 50px 0 24px 54px;
    box-sizing: border-box;
    border-bottom: 1px solid #f1f1f1;
    background-color: #fff;
    position: relative;
  }
  .re_lesson_title {
    // margin-left: -13px;
    font-size: 28px;
    color: #525252;
  }
  .re_lesson_time {
    font-size: 22px;
    color: #bbbbbb;
    margin: 23px 0 26px 0;
  }
  /deep/ .van-step__icon--active {
    background: #fed039;
    border-radius: 50%;
    height: 0.32rem;
    width: 0.32rem;
    // -webkit-tap-highlight-color: transparent;
    // font-family: sans-serif;
    // top: 1px;
  }
  /deep/ .van-icon-checked::before {
    content: " ";
  }
  /deep/ .van-step__circle {
    border-radius: 50%;
    // font-size: 16px;
    height: 0.32rem;
    width: 0.32rem;
  }
}

// 样式
.tab_box {
  /deep/ .van-tab {
    justify-content: left;
    padding-left: 1.066667rem;
  }
  /deep/ .van-tabs__line {
    transform: translateX(0.96rem) !important;
  }
  /deep/ .van-steps--vertical {
    // padding: 0 0 0 1.066667rem;
    padding: 0;
  }
  [class*="van-hairline"]::after {
    border: 0;
  }
  /deep/ .van-step--vertical .van-step__circle-container {
    top: 0.906667rem;
  }
  /deep/ .van-step--vertical {
    padding: 0.373333rem 0.533333rem 0.373333rem 0;
    line-height: 0.64rem;
  }
  /deep/ .van-step__title {
    font-size: 0.586667rem;
    margin-left: -0.266667rem;
  }
  /deep/ .van-tab__pane-wrapper {
    background: #f9f9f9;
  }
}
</style>

