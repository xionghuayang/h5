<template>
  <div>
    <player></player>
    <div class="player_navbar">
        <player-navbar :status="2" :peopleNum="2"></player-navbar>
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
              <p>白泽在线测试直播专题课程（三）</p>
              <p>
                01 素描课
                <span class="arrow_up">
                  <van-icon name="arrow-up" />
                </span>
              </p>
            </div>
            <div class="re_play_directory_content">
              <p class="re_lesson_title">《素描作画思维拓展》--第一节</p>
              <p class="re_lesson_time">主讲老师：王小花│2020年8月3日│09：22</p>
              <van-steps
                direction="vertical"
                :active="0"
                active-color="#fed039"
                @click-step="changeLesson"
              >
                <van-step>
                  <h3>《素描作画思维拓展》--第一节（1）</h3>
                </van-step>
                <van-step>
                  <h3>《素描作画思维拓展》--第一节（2）</h3>
                </van-step>
              </van-steps>
            </div>
            <!--  -->
            <div class="re_play_directory_content">
              <p class="re_lesson_title">《素描作画思维拓展》--第一节</p>
              <p class="re_lesson_time">主讲老师：王小花│2020年8月3日│09：22</p>
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
export default {
  name: "rePlay",
  components: {
    player,
    playerNavbar
  },
  data() {
    return {
      active: 0,
      correct: true
    };
  },
  created() {},
  mounted() {},
  methods: {
    changeLesson(index) {
      console.log(index);
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
  padding: 50px 0 54px 54px;
  box-sizing: border-box;
  border-bottom: 1px solid #f1f1f1;
  .re_lesson_title {
    margin-left: -13px;
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
    font-family:sans-serif;
  }
  /deep/ .van-step__circle{
    border-radius: 50%;
    font-size: 16px;
    height: 10px;
    width: 10px;
  }
}
</style>

