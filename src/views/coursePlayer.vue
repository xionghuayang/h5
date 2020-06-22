<template>
  <div>
    <div class="page">
      <div class="cover_img">
        <img :src="courseObj.imgSrc" alt srcset />
      </div>
      <div class="course_title">
        <p>{{courseObj.title}}</p>
        <div v-show="isPay == 0">
          <p v-if="!isPublic">
            <span class="price_new">￥{{courseObj.price}}</span>
            <s class="price_old">￥{{courseObj.orginPrice}}</s>
          </p>
          <p v-else>
            <span class="publicCourse">公开课</span>
          </p>
        </div>
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
          <van-tab title="课程介绍" title-style="font-size:.906667rem;">
            <div v-html="courseObj.courseInfo || '暂无课程介绍'"></div>
          </van-tab>
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
                        <div class="lesson_title">
                          <!-- 直播中 --  -->
                          <div
                            v-if="item1.liveStatus === 1"
                            @click="joinStudio(item1.liveCurriculaCourseId)"
                          >
                            {{item1.liveTitle}}
                            <span>
                              <img src="@/assets/images/playing.png" alt srcset />
                              <span class="red">直播中...</span>
                            </span>
                          </div>
                          <!-- 回放 -->
                          <div @click="rePlay(item1,item)" v-else-if="item1.liveStatus === 2">
                            {{item1.liveTitle}}
                            <span>
                              <img src="@/assets/images/backLive.png" alt srcset />
                              <span class="green">回放</span>
                            </span>
                          </div>
                          <!-- 未开始 -->
                          <div @click="$toast('直播还未开始呦')" v-else>
                            {{item1.liveTitle}}
                            <span>
                              <img src="@/assets/images/untime.png" alt srcset />
                              <span class="gray">未开始</span>
                            </span>
                          </div>
                        </div>
                        <p class="lesson lesson_teacher">主讲老师：{{item1.teacherNames}}</p>
                        <p class="lesson lesson_create_time">{{item1.creaTime}}</p>
                      </div>
                    </template>
                  </van-collapse-item>
                </template>
              </van-collapse>
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
        <!-- <div
          class="buy"
          v-if="isPublic"
          @click="joinInCourse(courseObj.id,courseObj.removeId)"
        >{{btnState[btnIndex]}}</div>
        <div
          class="buy"
          @click="joinInCourse(courseObj.id,courseObj.removeId)"
          v-else
        >{{btnState[btnIndex]}}</div>-->
        <div
          class="buy"
          @click="joinInCourse(courseObj.id,courseObj.removeId)"
        >{{btnState[btnIndex]}}</div>
      </div>
    </div>

    <div v-show="showPopup">
      <van-popup v-model="showPopup" :round="correct" class="pop_box">
        <div class="pop_content">
          <van-field v-model="psd" clearable placeholder="请输入直播室密码" class="input" />
          <p class="sign_text">请点击课程中的“咨询”按钮联系客服获取密码</p>
          <div class="pop_btn flex_default">
            <div @click="showPopup=!showPopup">取消</div>
            <div @click="goLive(courseObj.id)">确定</div>
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
          <a href="tel:18548615548">{{courseObj.phoneNum}}</a>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
import formatDate from "../utils/formatDate.js";
import getCourse from "../utils/course";
import Pay from "../assets/js/pay";
let btnState = {
  0: "加入直播课",
  1: "立即购买",
  2: "已加入",
  3: "待支付"
};
export default {
  name: "cuursePlayer",
  data() {
    return {
      activeNames: [],
      // 页面中一级id课件对象
      courseObj: {},
      // 是否为公开课
      isPublic: false,
      btnState,
      btnIndex: 0,
      // 用户已购买(拥有)课程
      isPay: 0, // 0 未拥有 1 已拥有
      // 目录详情
      courseList: [],
      active: 1,
      correct: true,
      showPopup: false,
      showAdvisory: false,
      // 直播室密码
      psd: "",
      // 待支付参数
      Payparams: {},
      newPwd: "",
      liveId: ""
    };
  },
  async created() {
    // 清空课程路径
    localStorage.removeItem("coursePath");
    // 获取链接数据
    let { id } = this.$route.query;
    // 根据一级id获取数据 courseObj
    this.getDataByOneId(id);
  },
  mounted() {},
  methods: {
    // 根据一级id获取数据 id
    async getDataByOneId(id) {
      let p = this.$user();
      p.liveCurriculaId = id;
      // 获取目录
      let res = await getCourse("/app/live/liveList", p);
      console.log(res, "-----");
      res[0].price = res[0].price + "";
      this.courseObj = res[0];
      // 判断是否为公开课
      this.isPublic = this.courseObj.price === "0" ? true : false;
      this.btnIndex = this.isPublic ? 0 : 1;
      // console.log(obj);
      // 获取目录数据
      this.getPageData();
      // 登录用户数据更改
      this.isLogin(id);
    },
    // 判断用户是否登录
    isLogin(id) {
      let user = this.$user();
      // let id = this.courseObj.id;
      if (user.token) {
        // 用户已登录,获取用户拥有该课程数据
        this.getUserCourse(id);
        // 待支付状态
        this.getPayPending(id);
      }
    },
    // 获取待支付
    async getPayPending(id) {
      // 获取待支付状态
      let p = this.$user();
      p.liveCurriculaId = id;
      let res = await this.$request.post("/app/live/myLivePayInfo", p);
      if (res.code !== 200) return this.$toast("数据获取失败");
      let status = res.data.status; // 2 待支付
      if (status === 2) {
        this.btnIndex = 3;
        try {
          this.Payparams = JSON.parse(res.data.liveCurriculaParameters);
        } catch (res) {
          console.log(res, "-----");
        }
      }
    },
    // 进入直播间
    joinStudio(id) {
      /**
       * @param:{ name1 } { String } @description
       * @param:{ name2 } { String } @description
       * @return any... { String }
       * @description 进入直播间
       */
      this.liveId = id;
      if (this.isPublic) {
        // 公共课，输入密码前往直播间观看
        this.getLivePwd(id);
      } else if (this.isPay == 0) {
        // 付费课未购买
        this.$toast("请购买后观看直播");
      } else {
        // 已购买，直接前往直播间
        this.goLive(this.courseObj.id);
      }
    },
    // 获取直播间密码
    async getLivePwd(id) {
      let p = this.$user();
      p.liveCurriculaCourseId = id;
      // 获取目录
      let res = await this.$request.post("/app/live/courseInfo", p);
      // console.log(res, "======");
      if (res.code !== 200) return this.$toast("密码获取失败");
      this.newPwd = res.data.livePassword;
      if (this.newPwd) {
        // 有密码，输入密码
        this.showPopup = !this.showPopup;
      } else {
        // 没有密码，直接观看
        this.goLive(this.courseObj.id);
      }
    },
    // 前往直播间
    goLive(id) {
      // console.log(id);
      // 公开课，需要密码 ，密码错误
      if (this.isPublic && this.newPwd && this.psd.trim() != this.newPwd) {
        this.showPopup = !this.showPopup;
        this.psd = "";
        return this.$toast("密码输入错误");
      }
      // 密码正确，已付费课，不用密码
      this.$router.push({
        path: "/playing",
        query: {
          oneId: id,
          liveCurriculaCourseId: this.liveId
          // imgSrc: this.courseObj.imgSrc
        }
      });
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
          console.log(item.innerCourse);
          // console.log(res);
          return item;
        })
      );
      this.courseList = courseList;
      this.activeNames[0] = courseList[0].liveCurriculaCatalogueId;
      // console.log(courseList);
    },
    // 获取登录用户的是否购买该课程
    async getUserCourse(id) {
      this.isPay = this.courseObj.isHaveCourse + "" == "false" ? 0 : 1;
      // console.log(this.isPay);
      if (this.isPay == 1) {
        this.btnIndex = 2;
      } else {
        if (this.isPublic) {
          this.btnIndex = 0;
        } else {
          this.btnIndex = 1;
        }
      }
    },
    // 加入我的课程
    async joinInCourse(id, rid) {
      console.log(id, rid);
      // 已购买的付费课
      if (!this.isPublic && this.isPay == 1) {
        this.$toast("该课程为付费课");
        return;
      }
      // 公开课已加入学习
      if (this.isPublic && this.btnIndex === 2) {
        this.$dialog
          .confirm({
            title: "",
            message: "是否移除该课程？"
          })
          .then(res => {
            // on confirm
            this.removeCourse(rid);
            this.btnIndex = 0;
            this.isPay = 0;
          })
          .catch(res => {
            // on cancel
            this.$toast("取消移除");
          });
      } else if (this.isPublic && this.btnIndex === 0) {
        // 公开课未加入学习，加入学习
        this.addCourse(id);
        this.btnIndex = 2;
        this.isPay = 1;
      } else {
        // 付费课,前往支付

        if (this.btnIndex === 3) {
          // 待支付，立即支付
          this.buy();
        } else {
          this.goBuy();
        }
      }
    },
    // 加入课程
    async addCourse(id) {
      let p = this.$user();
      p.liveCurriculaId = id;
      let res = await this.$request.post("/app/live/userSignUp", p);
      console.log(res);
      if (res.code !== 200) return this.$toast("请登录");
      this.$toast.success("加入成功");
    },
    // 移除课程
    async removeCourse(id) {
      let p = this.$user();
      p.liveCurriculaUserId = id;
      let res = await this.$request.post("/app/live/noUserSignUp", p);
      console.log(res);
      if (res.code !== 200) return this.$toast("移除失败");
      this.$toast.success("移除成功");
    },
    // 咨询
    consult() {
      this.showAdvisory = !this.showAdvisory;
    },
    // 前往订单支付
    goBuy() {
      let user = this.$user();
      let { id, title, imgSrc, price, orginPrice } = this.courseObj;
      if (user.token) {
        // 用户已登录,前往支付

        this.$router.push({
          path: "/courseorder",
          query: { id, title, imgSrc, price, orginPrice }
        });
      } else {
        // 前往登录
        let link = location.href;
        localStorage.setItem("coursePath", link);
        this.$router.push("/login");
      }
    },
    // 立即支付
    buy() {
      // console.log(123);
      let data = this.Payparams;
      let wxPay = new Pay({});
      // @param:{data }  --->  预下单参数  重新拉起支付
      wxPay
        .payment(data)
        .then(res => {
          alert("then");
          alert(JSON.stringify(res));
        })
        .catch(err => {
          alert("error");
          alert(JSON.stringify(err));
        });
    },
    // 前往回放
    async rePlay(data, item) {
      // console.log(data, item);
      // 判断公开课 true 前往回放 false 提示购买
      if (!this.isPublic && this.isPay == 1)
        return this.$toast("请先购买该课程！");

      // console.log(data);
      let id = data.liveCurriculaCourseId;
      let p = this.$user();
      p.liveCurriculaCourseId = id;
      // 获取目录 , 判断有无上传视频
      let res = await this.$request.post("/app/live/recordList", p);
      if (res.code !== 200) return this.$toast("数据获取失败");
      console.log(res);
      if (res.data.length === 0) return this.$toast("老师还未上传视频呦");

      let { liveCurriculaTitle, liveCurriculaCourseId } = data;
      let { liveCurriculaCatalogueTitle, liveCurriculaCatalogueId } = item;
      // 刷新回放页面
      this.$store.commit("reloadPage", true);
      // 前往回放
      this.$router.push({
        path: "/rePlay",
        query: {
          oneTitle: liveCurriculaTitle,
          twoTitle: liveCurriculaCatalogueTitle,
          twoId: liveCurriculaCatalogueId,
          threeId: liveCurriculaCourseId
        }
      });
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
  // border-bottom: 1px solid #f1f1f1;
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
  overflow: hidden;
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