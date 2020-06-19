<template>
  <div>
      <div class="page"></div>
  </div>
</template>

<script>
export default {
  name: "Home",
  created() {},
  mounted() {
    this.$toast("???????");
    let p = {};
    p.coursewareId = 4;
    this.$request.post("app/home/myCoursewareInfo", p).then(res => {
      console.log(res);
    });
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
    .page{
        height:370px;
        background: red;
        width: 750px;
    }
</style>