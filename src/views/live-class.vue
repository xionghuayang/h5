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
      isLoading: false
    };
  },
  created() {
    this.getAllLiveList();
  },
  methods: {
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
      let p = {
        liveStatus: "0",
        roleId: "7",
        rowid: 2376,
        token: "ImkxM7Sh"
      };
      let allLiveList = await getCourse("/app/live/liveList", p);
      console.log(allLiveList);
      this.classList = allLiveList;
    }
  }
};
</script>
<style scoped>
</style>