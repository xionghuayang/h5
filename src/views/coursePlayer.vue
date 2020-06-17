<template>
  <div>
      <div class="page">
          <div class="cover_img">
              <img src="@/assets/images/img0.png" alt="" srcset="">
          </div>
          <div class="course_title">
            <p>白泽在线测试直播专题课程（三）</p>
            <p> <span class="price_new">￥100</span> <s class="price_old">￥200.00</s> </p>
          </div>
          <div class="tab_box">
            <van-tabs v-model="active" color="#FED03A" line-width="20px" title-active-color="#262626" title-inactive-color="#262626">
              <van-tab title="课程介绍">课程介绍</van-tab>
              <van-tab title="课程目录">课程目录</van-tab>
            </van-tabs>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: "cuursePlayer",
  data() {
    return {
      active: 0,
    }
  },
  created() {},
  mounted() {
  },
  methods: {}
};
</script>

<style lang="scss">
.cover_img{
  width: 100%;
  height: 372px;
  img{
    width: 100%;
    height: 372px;
  }
}
.course_title{
  color: #262626;
  font-size: 34px;
  font-weight:bold;
  margin-top: 31px;
  padding-bottom: 41px;
  border-bottom: 1Px solid #F1F1F1;
  p{
    margin-left: 41px;
  }
}
.price_new{
  color: #FF0000;
  // font-size:22px;
}
.price_old{
  margin-left: 27px;
  color: #BCBCBC;
  // font-size:22px;
}
.tab_box{
  // font-size:34px;
  padding: 24px 0 19px 0;
  }
  .van-tab{
    // font-size:34px;
  }
</style>