<template>
  <div>
    <div class="page">
      <div class="cover_img">
        <img src="@/assets/images/img0.png" alt srcset />
      </div>
      <div class="course_title">
        <p>白泽在线测试直播专题课程（三）</p>
        <p>
          <span class="publicCourse">公开课</span>
          <!-- <s class="price_old">￥200.00</s> -->
        </p>
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
          <van-tab title="课程介绍" title-style="font-size:.906667rem;">课程介绍</van-tab>
          <van-tab title="课程目录" title-style="font-size:.906667rem;">
            <div class="directory_content">
              <div class="directory_title">
                <div class="directory_title_text">01 素描课</div>
                <div class="directory_title_sign">
                  <van-icon name="arrow-down" />
                </div>
              </div>
              <div class="directory_courses">
                <p class="lesson_title">
                  《素描作画思维拓展》--第一节
                  <span @click="rePlay">
                    <img src="@/assets/images/backLive.png" alt srcset />
                    <span class="green">回放</span>
                  </span>
                </p>
                <p class="lesson lesson_teacher">主讲老师：王小花</p>
                <p class="lesson lesson_create_time">2020年8月3日│09：22</p>
              </div>
              <div class="directory_courses" @click="joinStudio">
                <p class="lesson_title">
                  《素描作画思维拓展》--第一节
                  <span>
                    <img src="@/assets/images/playing.png" alt srcset />
                    <span class="red">直播中...</span>
                  </span>
                </p>
                <p class="lesson lesson_teacher">主讲老师：王小花</p>
                <p class="lesson lesson_create_time">2020年8月3日│09：22</p>
              </div>
              <div class="directory_courses">
                <p class="lesson_title">
                  《素描作画思维拓展》--第一节
                  <span>
                    <img src="@/assets/images/untime.png" alt srcset />
                    <span class="gray">回放</span>
                  </span>
                </p>
                <p class="lesson lesson_teacher">主讲老师：王小花</p>
                <p class="lesson lesson_create_time">2020年8月3日│09：22</p>
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>

    <div class="footer flex_default">
      <div class="foot_left flex_default">
        <!-- <div class="collect_img">
          <van-icon name="like" />
          收藏
        </div>-->
        <div class="advisory_img flex_default" @click="showAdvisory=!showAdvisory">
          <img src="@/assets/images/advisory.png" alt srcset />
          <span>咨询</span>
        </div>
      </div>
      <div class="foot_right">
        <div class="buy">加入直播课</div>
      </div>
    </div>

    <div v-show="showPopup">
      <van-popup v-model="showPopup" :round="correct" class="pop_box">
        <div class="pop_content">
          <van-field v-model="psd" clearable placeholder="请输入直播室密码" class="input" />
          <p class="sign_text">请点击课程中的“咨询”按钮联系客服获取密码</p>
          <div class="pop_btn flex_default">
            <div @click="showPopup=!showPopup">取消</div>
            <div @click="goLive">确定</div>
          </div>
        </div>
      </van-popup>
    </div>
    <div v-show="showAdvisory">
      <van-popup
        v-model="showAdvisory"
        :round="correct"
        :closeable="correct"
        class="pop_advisory flex_default"
      >
        <div>
          <p>课程咨询电话</p>
          <a href="tel:18548615548">18548615548</a>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
export default {
  name: "cuursePlayer",
  data() {
    return {
      active: 1,
      correct: true,
      showPopup: false,
      showAdvisory: false,
      psd: ""
    };
  },
  created() {},
  mounted() {},
  methods: {
    joinStudio() {
      /**
       * @param:{ name1 } { String } @description
       * @param:{ name2 } { String } @description
       * @return any... { String }
       * @description 进入直播间
       */
      this.showPopup = !this.showPopup;
    },
    // 前往直播间
    goLive() {
      this.$router.push("/playing");
    },
    // 前往回放
    rePlay() {
      this.$router.push("/rePlay");
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/global.scss";
.publicCourse {
  font-size: 22px;
  color: #05c600;
}

.cover_img {
  width: 100%;
  height: 372px;
  img {
    width: 100%;
    height: 372px;
  }
}
.course_title {
  color: #262626;
  font-size: 34px;
  font-weight: bold;
  margin-top: 31px;
  padding-bottom: 41px;
  border-bottom: 1px solid #f1f1f1;
  p {
    margin-left: 41px;
    .price_new {
      color: $red;
    }
    .price_old {
      margin-left: 27px;
      color: #bcbcbc;
    }
  }
}

.directory_title {
  width: 100%;
  height: 74px;
  background: #f9f9f9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 56px 0 54px;
  box-sizing: border-box;
  .directory_title_text {
    color: #252525;
    font-size: 28px;
    font-weight: bold;
  }
}
.directory_courses {
  height: 191px;
  border-bottom: 1px solid #f1f1f1;
  padding: 51px 0 0 54px;
  .lesson_title {
    font-size: 28px;
    color: #525252;
    margin-bottom: 24px;
    img {
      height: 26px;
      width: 26px;
    }
  }
  .lesson {
    margin-bottom: 13px;
    color: #bbbbbb;
    font-size: 22px;
    margin-left: 16px;
  }
}
.pop_box {
  top: 30%;
}
.pop_content {
  width: 584px;
  background: rgba(255, 255, 255, 1);
  border-radius: 30px;
  padding-bottom: 57px;
  .input {
    width: 515px;
    height: 78px;
    background: rgba(247, 247, 251, 1);
    border-radius: 20px;
    margin: 0 auto;
    margin-top: 57px;
  }
  .sign_text {
    font-size: 22px;
    color: #515151;
    text-align: center;
    margin-top: 23px;
  }
  .pop_btn {
    margin-top: 39px;
    padding: 0 35px;
    box-sizing: border-box;
    div {
      width: 40%;
      width: 239px;
      height: 72px;
      line-height: 72px;
      text-align: center;
      background: rgba(247, 247, 251, 1);
      border-radius: 36px;
      font-size: 26px;
      color: #616161;
      &:nth-of-type(2) {
        background: $theme;
      }
    }
  }
}
.pop_advisory {
  top: 25%;
  width: 459px;
  height: 230px;
  background: rgba(255, 255, 255, 1);
  border-radius: 30px;
  div {
    width: max-content;
    margin: 0 auto;
    text-align: center;
  }
  p {
    color: #515151;
    font-size: 28px;
    margin-bottom: 32px;
  }
  a {
    font-size: 28px;
    color: #13bfff;
  }
}
.footer {
  position: fixed;
  bottom: 0;
  height: 100px;
  width: 100%;
  background: #f7f7f7;
  padding: 0 35px 0 53px;
  box-sizing: border-box;
  .collect_img {
    font-size: 28px;
    color: $theme;
  }
  .advisory_img {
    margin-left: 40px;
    height: 33px;
    img {
      height: 33px;
      width: 33px;
      display: inline-block;
    }
    span {
      color: $gray;
      font-size: 28px;
      margin-left: 16px;
    }
  }
  .buy {
    width: 40%;
    width: 239px;
    height: 72px;
    line-height: 72px;
    text-align: center;
    background: $theme;
    border-radius: 36px;
    font-size: 26px;
    color: #616161;
  }
}
</style>