<template>
  <div>
    <div class="player_navbar" v-if="status == '1'">
      <div class="player_navbar_l flex_default">
        <div class="flex_default">
          <img src="@/assets/images/playing.png" alt srcset />
          <span class="red">直播中...</span>
          <span>|</span>
          <span class="study_num">{{peopleNum}} 人次</span>
        </div>
        <div class="player_navbar_r flex_default">
          {{titleClass}}
        </div>
      </div>
    </div>
    <!--  -->
    <div class="player_navbar" v-if="status == '2'">
      <div class="player_navbar_l flex_default">
        <div class="flex_default">
          <img src="@/assets/images/backLive.png" alt srcset />
          <span class="green">回放</span>
          <span>|</span>
          <span class="study_num">{{peopleNum}} 人已学习</span>
        </div>
        <div class="player_navbar_r flex_default">
          {{titleClass}}
          <!-- <img src="@/assets/images/beisu.png" alt srcset />倍数 -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "player-navbar",
  /**
   * @param:{ status } { String } @description   1为直播中 2 为回放
   * @param:{ peopleNum } { 在线人数 } @description   1为直播中 2 为回放
   * @description description
   */

  props: {
    status: {
      type: String,
      default: "1"
    },
    peopleNum: {
      type: Number,
      default: 0
    },
    titleClass: {
      type: String,
      default: ""
    }
  },
  mounted() {
  	console.log(this.$props)
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/global.scss";
.player_navbar {
  width: 750px;
  height: 74px;
  border-bottom: 1px solid #f1f1f1;
  padding: 0 49px 0 52px;
  box-sizing: border-box;
  background-color: #fff;
  .player_navbar_l {
    height: 100%;
    font-size: 22px;
    img {
      display: inline-block;
      height: 26px;
      width: 26px;
      align-self: center;
      margin-right: 11px;
    }
    .green {
      margin-right: 18px;
    }
    .study_num {
      margin-left: 18px;
    }
  }
  .player_navbar_r {
    img {
      width: 34px;
      height: 22px;
    }
  }
}
</style>
