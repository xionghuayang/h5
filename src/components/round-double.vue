<template>
  <div>
    <div class="double">
      <div @click="invite" v-if="records.isSwitch4==1">
        <img src="@/assets/images/invite.png" alt srcset />
      </div>
      <div class="reservation" @click="reservation" v-if="records.isSwitch6==1">
        <img src="@/assets/images/reservation.png" alt srcset />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "round-double",
  props: {
    shareUrl: {
      type: String,
      default: ""
    },
    teacherQrCode: {
      type: String,
      default: ""
    },
    orgName: {
      type: String,
      default: ""
    },
    orgId:{
      type: String,
      default: ""
    },
    oneId:{
      type: String,
      default: ""
    }
  },
  data() {
    return {
		records:''
	};
  },
  created() {},
  mounted(){
	  this.showplay()
  },
  methods: {
	  showplay(){
	  	let { oneId } = this.$route.query;
	  	let p = { liveCurriculaId: oneId };
	  	this.$request.post("/app/live/liveList", p).then(res=>{
	  		console.log(res)
	  		if(res.code==200){
	  			this.records=res.data.records[0]
	  		}
	  	});
	  },
    invite() {
      //   邀请有礼
      this.$router.push({
        path: "/share",
        query: {
          shareUrl: this.shareUrl,
          teacherQrCode: this.teacherQrCode,
          orgName: this.orgName
        }
      });
    },
    reservation() {
      //   预约报名
      this.$router.push({
        path: "/yuyueinfo",
        query:{
          orgId: this.orgId,
          orgName: this.orgName,
          oneId:this.oneId
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.double {
  position: fixed;
  top: 70%;
  right: 53px;
  img {
    height: 104px;
  }
  .reservation {
    margin-top: 15px;
  }
}
</style>
