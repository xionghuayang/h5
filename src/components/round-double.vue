<template>
  <div>
    <div class="double">
      <div @click="invite">
        <img src="@/assets/images/invite.png" alt srcset />
      </div>
      <div class="reservation" @click="reservation">
        <img src="@/assets/images/reservation.png" alt srcset />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "round-double",
  data() {
    return {};
  },
  methods: {
    invite() {
      //   邀请有礼
      this.$router.push("/share");
    },
    reservation() {
      //   预约报名
      this.$router.push("/yuyueinfo");
    }
  }
};
</script>

<style scoped lang="scss">
.double {
  position: fixed;
  top: 75%;
  right: 53px;
  img {
    height: 104px;
  }
  .reservation {
    margin-top: 15px;
  }
}
</style>
