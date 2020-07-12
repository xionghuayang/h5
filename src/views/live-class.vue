<template>
  <div class="live-class">
    <template v-for="item in classList">
      <card :order="item" :key="item.id" :border="true"></card>
    </template>
  </div>
</template>
<script>
import card from "../components/card";
import getCourse from "../utils/course";

export default {
  name: "liveclass",
  components: {
    card
  },
  data() {
    return {
      classList: [],
      isLoading: false,
      currentPage: 1,
      pages: 1,
      total: 0,
      isShow: true
    };
  },
  created() {
    this.getAllLiveList();
    this.getLiveListData();
  },
  mounted() {
    setTimeout(() => {
      window.addEventListener("scroll", this.onScroll);
    }, 50);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    // 页面滚动事件
    onScroll() {
      console.log("滚动了");
      // console.log(e);
      var wScrollY = window.scrollY; // 当前滚动条位置
      var wInnerH = window.innerHeight; // 设备窗口的高度（不会变）
      var bScrollH = document.body.scrollHeight; // 滚动条总高度
      // console.log(wScrollY, wInnerH, bScrollH);
      if (bScrollH - (wScrollY + wInnerH) <= 50) {
        // console.log("触底了");
        // 触底加载下页数据
        // this.page++;
        this.currentPage++;
        if (this.currentPage > this.pages) {
          this.currentPage = this.pages;
          if (this.isShow) {
            this.$toast("到底啦 没有更多课程了");
            this.isShow = false;
          }
          // console.log(this.isShow);
          return;
        }
        this.$toast.loading({
          message: "数据加载中...",
          forbidClick: true,
          loadingType: "spinner",
          duration: 0
        });
        this.getAllLiveList();
      } else {
        // console.log("未触底");
        this.$toast.clear();
        this.isShow = true;
      }
    },
    // 获取下一页数据
    getLiveListData() {
      let p = {};
      p.liveStatus = "0";
      this.$request.post("/app/live/liveList", p).then(res => {
        // console.log(res, "---");
        this.pages = res.data.pages;
        this.total = res.data.total;
      });
    },
    // 获取全部数据
    async getAllLiveList() {
      // let p = {
      //   liveStatus: "0",
      //   roleId: "7",
      //   rowid: 2376,
      //   token: "ImkxM7Sh"
      // };
      // let res = await this.$request.post("/app/live/liveList", p);
      // console.log(res.data.records);
      // if (res.code !== 200) return this.$toast.fail("获取失败");
      // let allLiveList = res.data.records.map(item => {
      //   let {
      //     createName,
      //     creaTime,
      //     imagePrefix,
      //     createUser,
      //     liveCurriculaTitle,
      //     liveCurriculaCover,
      //     liveCurriculaOriginalPrice,
      //     liveCurriculaPresentPrice
      //   } = item;
      //   return {
      //     id: liveCurriculaCover,
      //     title: liveCurriculaTitle,
      //     imgSrc: imagePrefix + liveCurriculaCover,
      //     isShowPrice: true,
      //     isPrice: liveCurriculaPresentPrice === 0 ? false : true,
      //     priceInfo: "公开课",
      //     price: liveCurriculaPresentPrice,
      //     orginPrice: liveCurriculaOriginalPrice,
      //     info: {
      //       tName: createName,
      //       allNum: 30,
      //       num: 0,
      //       time: formatDate(creaTime)
      //     }
      //   };
      // });
      // console.log(allLiveList);
      // let p = {
      //   liveStatus: "0",
      //   roleId: "7",
      //   rowid: 2376,
      //   token: "ImkxM7Sh"
      // };
      let p = this.$user();
      p.liveStatus = "0";
      p.page = this.currentPage;
      let allLiveList = await getCourse("/app/live/liveList", p);
      if (this.currentPage > 1) {
        this.classList.push(...allLiveList);
        allLiveList = this.classList;
      }
      console.log(allLiveList, "-------");

      this.classList = allLiveList.map(item => {
        item.info.time = null;
        return item;
      });
      this.$toast.clear();
    }
  }
};
</script>
<style scoped>
</style>