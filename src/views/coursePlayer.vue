<template>
  <div>
    <div class="page">
      <div class="cover_img">
        <img :src="courseObj.imgSrc" alt srcset />
      </div>
      <div class="course_title">
        <p>{{courseObj.title}}</p>
        <p v-if="!isPublic">
          <span class="price_new">￥{{courseObj.price}}</span>
          <s class="price_old">￥{{courseObj.orginPrice}}</s>
        </p>
        <p v-else>
          <span class="publicCourse">公开课</span>
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
              <van-collapse v-model="activeNames">
                <template v-for="item in courseList">
                  <van-collapse-item
                    :title="item.liveCurriculaCatalogueTitle"
                    :name="item.liveCurriculaCatalogueId"
                    :key="item.liveCurriculaCatalogueId"
                  >
                    <template v-for="item1 in item.innerCourse">
                      <div class="directory_courses" :key="item1.creaTime">
                        <p class="lesson_title">
                          {{item1.liveTitle}}
                          <span v-if="item1.liveStatus === 1">
                            <img src="@/assets/images/playing.png" alt srcset />
                            <span class="red">直播中...</span>
                          </span>
                          <span @click="rePlay(item1,item)" v-else-if="item1.liveStatus === 2">
                            <img src="@/assets/images/backLive.png" alt srcset />
                            <span class="green">回放</span>
                          </span>
                          <span @click="$toast('直播还未开始呦')" v-else>
                            <img src="@/assets/images/untime.png" alt srcset />
                            <span class="gray">未开始</span>
                          </span>
                        </p>
                        <p class="lesson lesson_teacher">主讲老师：{{item1.teacherNames}}</p>
                        <p class="lesson lesson_create_time">{{item1.creaTime}}</p>
                      </div>
                    </template>
                  </van-collapse-item>
                </template>
              </van-collapse>
              <!-- <div class="directory_title" :key="item.liveCurriculaCatalogueId">
                  <div class="directory_title_text">{{item.liveCurriculaCatalogueTitle}}</div>
                  <div class="directory_title_sign">
                    <van-icon name="arrow-down" />
                  </div>
              </div>-->

              <!-- <div class="directory_courses" @click="joinStudio">
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
                    <span class="gray">未开始</span>
                  </span>
                </p>
                <p class="lesson lesson_teacher">主讲老师：王小花</p>
                <p class="lesson lesson_create_time">2020年8月3日│09：22</p>
              </div>-->
              <!-- </template> -->
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
        <div class="advisory_img flex_default" @click="consult">
          <img src="@/assets/images/advisory.png" alt srcset />
          <span>咨询</span>
        </div>
      </div>
      <div class="foot_right">
        <div class="buy" v-if="isPublic">加入直播课</div>
        <div class="buy" @click="goBuy" v-else>立即购买</div>
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
import formatDate from "../utils/formatDate.js";
export default {
  name: "cuursePlayer",
  data() {
    return {
      activeNames: [],
      // 上个页面传输课件对象
      courseObj: {
        id: "",
        title: "",
        imgSrc: "",
        price: "",
        orginPrice: ""
      },
      // 是否为公开课
      isPublic: false,
      // 目录详情
      courseList: [],
      active: 1,
      correct: true,
      showPopup: false,
      showAdvisory: false,
      psd: ""
    };
  },
  created() {
    let obj = this.$route.query;
    this.courseObj = obj;
    obj.price = obj.price + "";
    this.isPublic = obj.price === "0" ? true : false;
    // console.log(obj);
    this.getPageData();
  },
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
    // 获取页面数据(目录)
    async getPageData() {
      let id = this.courseObj.id;
      let p = this.$user();
      p.liveCurriculaId = id;
      // 获取目录
      let res = await this.$request.post("/app/live/catalogueList", p);
      if (res.code !== 200) return this.$toast("数据获取失败");
      let arr = res.data;
      // 获取内容
      let courseList = await Promise.all(
        arr.map(async item => {
          let id = item.liveCurriculaCatalogueId;
          p.liveCurriculaCatalogueId = id;
          let res = await this.$request.post("/app/live/courseList", p);
          if (res.code !== 200) return this.$toast("数据获取失败");
          res.data.forEach(item => {
            item.creaTime = formatDate(item.creaTime, "|");
          });
          item.innerCourse = res.data;
          // console.log(res);
          return item;
        })
      );
      this.courseList = courseList;
      this.activeNames[0] = courseList[0].liveCurriculaCatalogueId;
      console.log(courseList);
    },
    // 咨询
    consult() {
      if (this.isPublic) {
        this.showPopup = !this.showPopup;
      } else {
        this.showAdvisory = !this.showAdvisory;
      }
    },
    // 前往订单支付
    goBuy() {
      this.$router.push({
        path: "/courseorder",
        query: {
          id: this.$route.query.id
        }
      });
    },
    // 前往回放
    async rePlay(data, item) {
      console.log(data, item);
      // 判断公开课 true 前往回放 false 提示购买
      // if (!this.isPublic) return this.$toast("请先购买该课程！");
      console.log(data);
      let id = data.liveCurriculaCourseId;
      let p = this.$user();
      p.liveCurriculaCourseId = id;
      // 获取目录 , 是否上传视频
      let res = await this.$request.post("/app/live/recordList", p);
      if (res.code !== 200) return this.$toast("数据获取失败");
      console.log(res);
      if (res.data.length === 0) return this.$toast("老师还未上传视频呦");

      let { liveCurriculaTitle, liveCurriculaCourseId } = data;
      let { liveCurriculaCatalogueTitle, liveCurriculaCatalogueId } = item;
      this.$router.push({
        path: "/rePlay",
        query: {
          oneTitle: liveCurriculaTitle,
          twoTitle: liveCurriculaCatalogueTitle,
          twoId: liveCurriculaCatalogueId,
          threeId: liveCurriculaCourseId
        }
      });
    },
    // 前往直播间
    goLive() {
      this.$router.push("/playing");
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
  padding: 51px 0 0 0px;
  .lesson_title {
    font-size: 28px;
    color: #525252;
    margin-bottom: 24px;
    img {
      height: 26px;
      width: 26px;
      vertical-align: middle;
      margin-right: 8px;
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

.van-tab__pane,
.van-tab__pane-wrapper {
  padding-bottom: 1.333333rem;
}
.van-cell {
  height: 1.973333rem;
  padding: 0 1.066667rem;
  line-height: 1.973333rem;
}
.van-collapse-item__content {
  padding: 0;
  padding-left: 1.333333rem;
}
.van-cell__left-icon,
.van-cell__right-icon {
  line-height: 1.973333rem;
}
</style>