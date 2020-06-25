<template>
  <div>
    <player :play="player" v-if="isShowPlayer"></player>
    <!-- <player :play="player"></player> -->
    <div class="player_navbar">
      <player-navbar :status="'2'" :peopleNum="2"></player-navbar>
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
              <template v-for="item in courseList">
                <div :key="item.creaTime" class="content_item">
                  <p class="re_lesson_title">{{item.liveTitle}}</p>
                  <p class="re_lesson_time">主讲老师：{{item.teacherNames}}│{{item.creaTime}}</p>
                  <van-steps
                    direction="vertical"
                    :active="item.curActive"
                    active-color="#fed039"
                    @click-step="changeLesson($event,item.liveCurriculaCourseId)"
                  >
                    <blockquote>
                      <van-step v-for="(item1,index) in item.innerCourse" :key="index">
                        <h3>{{item.liveTitle}}（{{index + 1}}）</h3>
                      </van-step>
                    </blockquote>
                  </van-steps>
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
import player from "@/components/player.vue";
import playerNavbar from "@/components/player-navbar.vue";
import Share from "../assets/js/share.js";
import shareUrl from "../utils/shareUrl.js";
export default {
  name: "rePlay",
  components: {
    player,
    playerNavbar
  },
  data() {
    return {
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
    this.getData();
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
      if (data.liveCurriculaPresentPrice !== 0 && !data.isLiveCurriculaUser) {
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
    changeLesson(index, id) {
      // console.log(index, id);
      let arr = this.courseList.filter(
        item => item.liveCurriculaCourseId === id
      );
      this.courseList.forEach(item => (item.curActive = -1));
      arr[0].curActive = index;
      // 获取当前视频所需数据
      let { appID, fileId } = arr[0].innerCourse[index];
      let videoTit = `${arr[0].liveTitle}(${index + 1})`;
      this.player = { appID, fileId, videoTit };
      // console.log(appID, fileId, videoTit);
    },
    // 获取三四级目录数据
    async getData() {
      let { twoId } = this.prePage;
      let p = this.$user();
      p.liveCurriculaCatalogueId = twoId;
      let res = await this.$request.post("/app/live/courseList", p);
      if (res.code !== 200) return this.$toast("数据获取失败");
      // console.log(res, "-----");
      // 只保留回放数据
      let replayArr = res.data.filter(item => item.liveStatus === 2);
      // console.log(replayArr);
      replayArr.forEach((item, index) => {
        // console.log(item, index);
        item.curActive = -1;
        if (item.liveCurriculaCourseId + "" === this.prePage.threeId + "") {
          item.curActive = 0;
        }
        // if (item.liveCurriculaCourseId + "" === this.prePage.threeId) {
        //   console.log(123);
        //   item.curActive = 0;
        // }
      });

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
      // console.log(courseData);
      let curArr = courseData.filter(
        item => item.liveCurriculaCourseId + "" === this.prePage.threeId + ""
      );
      // console.log(curArr);
      // 获取当前视频所需数据
      let { appID, fileId } = curArr[0].innerCourse[0];
      let videoTit = `${curArr[0].liveTitle}(1)`;
      this.player = { appID, fileId, videoTit };
      // console.log(this.player);
      this.isShowPlayer = true;
      // 初始化分享
      this.share();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/global.scss";
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
    padding: 50px 0 40px 54px;
    box-sizing: border-box;
    border-bottom: 1px solid #f1f1f1;
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
    height: 10px;
    width: 10px;
    // -webkit-tap-highlight-color: transparent;
    font-family: sans-serif;
  }
  /deep/ .van-icon-checked::before {
    content: " ";
  }
  /deep/ .van-step__circle {
    border-radius: 50%;
    font-size: 16px;
    height: 10px;
    width: 10px;
  }
}
</style>

