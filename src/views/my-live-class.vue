<template>
  <div class="my-class">
    <van-tabs v-model="active" @click="clc">
      <van-tab title="全部">
        <template v-for="item in allList">
          <card :order="item" :border="true" :key="item.id"></card>
        </template>
        <div class="inToast" v-show="allList.length === 0">您还没有加入的课程</div>
      </van-tab>
      <van-tab title="未完结">
        <template v-for="item in inList">
          <card :order="item" :border="true" :key="item.id"></card>
        </template>
        <div class="inToast" v-show="inList.length === 0">没有正在进行的课程</div>
      </van-tab>
      <van-tab title="已结束">
        <template v-for="item in overList">
          <card :order="item" :border="true" :key="item.id"></card>
        </template>
        <div class="inToast" v-show="overList.length === 0">没有已结束的课程</div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import card from "../components/card.vue";
import getCourse from "../utils/course";
export default {
  name: "myClass",
  components: {
    card
  },
  async created() {
    let res = await this.$public.loginByToken();

    this.getAllList();
  },
  data() {
    return {
      active: 0,
      allList: [],
      inList: [],
      overList: []
    };
  },
  methods: {
    // tab Click
    clc(index, title) {
      console.log(index, title);
      if (index == 0) {
        this.getAllList();
      }
      if (index == 1) {
        this.getInList();
      }
      if (index == 2) {
        this.getOverList();
      }
    },
    // 获取全部课程
    async getAllList() {
      let p = this.$user();
      p.status = " ";
      let res = await getCourse("/app/live/liveUserList", p);
      console.log(res);
      let newArr = res.map(item => {
        if (item.isPrice) {
          item.isShowPrice = false;
        }
        // 直播中
        if (item.status > 0) {
          console.log(item);
          item.isPrice = false;
          item.isShowPrice = true;
          item.priceInfo = "直播中";
        }
        return item;
      });
      this.allList = newArr;
    },
    // 直播中（未完结）
    // getInList() {
    //   this.inList = this.allList.filter(item => item.status === 1);
    // },
    async getInList() {
      let p = this.$user();
      p.status = "0";
      let res = await getCourse("/app/live/liveUserList", p);
      console.log(res);
      // 处理卡片显示格式-- 不显示价格 -- 不显示时间
      let newArr = res.map(item => {
        if (item.isPrice) {
          item.isShowPrice = false;
        }
        item.info.time = null;
        return item;
      });
      this.inList = res;
    },
    // 已结束
    async getOverList() {
      let p = this.$user();
      p.status = "1";
      // let p = {
      //   status: "1",
      //   roleId: "7",
      //   rowid: 2376,
      //   token: "ImkxM7Sh"
      // };

      let res = await getCourse("/app/live/liveUserList", p);
      // console.log(res);
      // 处理卡片显示格式-- 不显示价格 -- 不显示时间
      let newArr = res.map(item => {
        if (item.isPrice) {
          item.isShowPrice = false;
        }
        item.info.time = null;
        return item;
      });
      console.log(newArr);
      this.overList = newArr;

      // this.overList = res;
    }
  }
};
</script>
<style scoped>
.my-class /deep/ .van-tabs--line .van-tabs__wrap {
  height: 1.946667rem;
}
.my-class /deep/ .van-tabs__nav {
  background-color: #f9f9f9;
}
.my-class /deep/ .van-tabs__line {
  width: 3.146667rem !important;
  height: 0.213333rem;
  background-color: #fed039;
}
.inToast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #252525;
  font-size: 28px;
}
</style>