<template>
  <div>
    <!-- <div id="local_stream" ref="local_stream"></div> -->
    <div id="remote_stream">
		<div class="video_fh"  @click="videoFn()"></div>
		<van-loading type="spinner" color="#1989fa" size="30px" class='viode_loading' vertical>加载中...</van-loading>
		<div class="remote_footer">
			<div class="video_time">{{videotimer}}</div>
			<div class="video_jdt"></div>
			<div class="video_big_box" @click="videoFn()">
				<img :src="imgUrl_big" alt="">
			</div>
		</div>
	</div>
  </div>
</template>
<script>
import "../live-config/js/popper.js";
import genTestUserSig from "../live-config/js/debug/GenerateTestUserSig";
import TRTC from "../live-config/js/trtc.js";
export default {
  name: "room",
  props: ["videoObj"],
  data() {
    return {
      roomObj: {},
      client: null,
      localStream: null,
	  playId:'',
	  videoarr:[],
	  videotimer:'00:00:00',
	  imgUrl_big:require("../assets/images/video_big.png"),
	  imgUrl_small:require("../assets/images/video_small.png")
    };
  },
  created() {
    // this.getData();
    // console.log(this.roomObj);
	
  },
  mounted() {
    this.getData();
	this.videoTime()
	this.videobfFn()
	
  },
  methods: { 
	  // 时间导航条
	  mouserFN(){
		  setTimeout(()=>{
		  			  document.querySelector('.remote_footer').style.display='none'
		  },6000)
		  document.querySelector('#remote_stream').addEventListener('click',function(){
			  document.querySelector('.remote_footer').style.display='flex'
			  setTimeout(()=>{
				  document.querySelector('.remote_footer').style.display='none'
			  },6000)
		  })
	  },
	  videobfFn(){
		  if (/phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone/i.test(navigator.userAgent)) {
		  	document.querySelector('#remote_stream').style.height='243.5px'
			this.mouserFN()
		  } else {
		  	document.querySelector('#remote_stream').style.height='311px'
			this.mouserFN()
		  }
		  // 加载事件
		  setInterval(()=>{
			  if(this.videoarr.length==0){
			  	document.querySelector('#remote_stream .viode_loading').style.display='inline-block'
			  }else{
			  	document.querySelector('#remote_stream .viode_loading').style.display='none'
			  } 
		  },6000)
		 
	  },
	  // 时间计时
	  timer(time) {
			let timer = new Date().getTime() - new Date(time).getTime();
			let hours = Math.floor(timer / (60 * 60 * 1000));
			if (hours < 10) {
			  hours = "0" + hours;
			}
			let minutes = Math.floor((timer % (60 * 60 * 1000)) / (60 * 1000));
			if (minutes < 10) {
			  minutes = "0" + minutes;
			}
			let seconds = Math.floor(
			  ((timer % (60 * 60 * 1000)) % (60 * 1000)) / 1000
			);
			if (seconds < 10) {
			  seconds = "0" + seconds;
			}
			this.videotimer = hours + ":" + minutes + ":" + seconds;
	  },
	  videoTime(){
		  let p = this.$user()
		  p.liveCurriculaCourseId=this.videoObj.liveCurriculaCourseId
		  this.$request.post('app/live/getLiveTime',p).then(res=>{
			  if(res.code==200){
				  let time = res.data.liveStartTime
				  setInterval(()=>{
					  this.timer(time)
				  },1000)
			  }
		  })
	  },
	  // 全屏
	  videoFn(){
		  let width = window.innerWidth
		  let remoteStream = document.querySelector('#remote_stream')
		  let videoBtnImg= document.querySelector('.video_big_box img')
		  let videoFh = document.querySelector('.video_fh')
		  if(this.videoarr.length>1){
			  let ele= this.videoarr[1].querySelector('video');
			  ele.style.objectFit= 'contain'
			  ele.style.position= ''
			  ele.style.transform= 'none'
		  }else if(this.videoarr.length==0){}else{
			 let ele= document.querySelector('video'); 
			 ele.style.objectFit= 'contain'
			 ele.style.position= ''
			 ele.style.transform= 'none'
		  }
		  if (/phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone/i.test(navigator.userAgent)) {
			  //判断是否全屏
			  if(remoteStream.clientWidth<=width){
			  	let cssText='width: 100vh;height: 100vw;top: calc((100vh - 100vw) / 2);left: calc((100vw - 100vh) / 2);transform: rotate(90deg);transform-origin: 50% 50%;'
			  	remoteStream.style.cssText=cssText
			  	videoBtnImg.src=this.imgUrl_small
				videoFh.style.display='block'
			  }else{
			  	let cssText = 'height:243.5px;width: 100%;position: relative;z-index: 100;'
			  	remoteStream.style.cssText=cssText
			  	videoBtnImg.src=this.imgUrl_big
				videoFh.style.display='none'
			  }
		  } else {
			  if(this.videoarr.length>1){
				  let ele= this.videoarr[1].querySelector('video');
				  if (ele.requestFullscreen) {
				      ele.requestFullscreen();
				  } else if (ele.mozRequestFullScreen) {
				      ele.mozRequestFullScreen();
				  } else if (ele.webkitRequestFullScreen) {
				      ele.webkitRequestFullScreen();
				  }
			  }else if(this.videoarr.length==0){
				  let ele= document.activeElement; 
				 if (ele.requestFullscreen) {
				     ele.requestFullscreen();
				 } else if (ele.mozRequestFullScreen) {
				     ele.mozRequestFullScreen();
				 } else if (ele.webkitRequestFullScreen) {
				     ele.webkitRequestFullScreen();
				 } 
			  }else{
					 let ele= document.querySelector('video'); 
					if (ele.requestFullscreen) {
						ele.requestFullscreen();
					} else if (ele.mozRequestFullScreen) {
						ele.mozRequestFullScreen();
					} else if (ele.webkitRequestFullScreen) {
						ele.webkitRequestFullScreen();
					}
			  }
		  }
		  
	  },
	  getVideo(videoId){
		  console.log(videoId)
		  this.videoarr.push(document.querySelector('#'+videoId))
		  console.log(this.videoarr.length)
		  if(this.videoarr.length>1){
			  this.videoarr[0].style.display='none'
		  }
		  
	  },
    // 获取进房间参数
    getData() {
      let { sdkAppId, userSig } = genTestUserSig(this.videoObj.userId.toString());
      // console.log(sdkAppId, userSig);
      this.roomObj = {
        userId: this.videoObj.userId,
        roomId: this.videoObj.roomId,
		// roomId: 116666,
        sdkAppId,
        userSig
      };
      this.createClient();
    },
	
    createClient() {
      let that = this;
      // 创建客户端对象
	  console.log(TRTC)
      this.client = TRTC.createClient({
        mode: "rtc",
        sdkAppId: this.roomObj.sdkAppId,
        userId: this.roomObj.userId,
        userSig: this.roomObj.userSig
      });
	  console.log(this.client)
      // 订阅远端流
      this.client.on("stream-added", event => {
        const remoteStream = event.stream;
        console.log("远端流增加: " + remoteStream.getId());
		  // 订阅远端音频和视频流
		  this.client.subscribe(remoteStream, { audio: true, video: true }).catch(e => {
		    console.error('failed to subscribe remoteStream');
		  });
        // this.client.subscribe(remoteStream);
		// console.log(remoteStream.getType())
      });
	  // 监听‘stream-updated’事件
	 //  this.client.on('stream-updated', event => {
	 //    const remoteStream = event.stream;
		// console.log(remoteStream.getType())
	 //    console.log('remoteStream ID: ' + remoteStream.getId() + ' was updated hasAudio: '
	 //                + remoteStream.hasAudio() + ' hasVideo: ' + remoteStream.hasVideo());
	 //  });
      this.client.on("stream-subscribed", event => {
        const remoteStream = event.stream;
        console.log("远端流订阅成功：" + remoteStream.getId());
        // 播放远端流
		let option ={objectFit:'contain'}
        remoteStream.play("remote_stream",option);
		let videoId = 'player_'+remoteStream.getId()
		console.log(remoteStream.getVideoTrack())
		console.log(remoteStream.getVideoFrame())
		that.getVideo(videoId)
      });
		
      // 创建本地流
      this.client
        .join({ roomId: this.roomObj.roomId })
        .catch(error => {
          console.error("进房失败 " + error);
        })
        .then(() => {
          console.log("进房成功");
        });

    //   // 创建本地视频流
    //   this.localStream = TRTC.createStream({
    //     userId: that.roomObj.userId,
    //     audio: true,
    //     video: true,
    //     mirror: true
    //   });

    //   //初始化本地视频流
    //   this.localStream
    //     .initialize()
    //     .catch(error => {
    //       console.error("初始化本地流失败 " + error);
    //     })
    //     .then(() => {
    //       console.log("初始化本地流成功");

    //       // 播放本地流 id
    //       this.localStream.play("local_stream");

    //       // // 自定义 用户 id > 10000 为观看模式
    //       // if (that.roomObj.userId > 10000) return;

    //       // 发布本地流
    //       that.client
    //         .publish(that.localStream)
    //         .catch(error => {
    //           console.error("本地流发布失败 " + error);
    //         })
    //         .then(() => {
				// that.playId='player_'+that.localStream.getId()
				// console.log(that.playId)
				// // this.player()
    //           console.log(that.localStream.getId());
    //         });
    //     });
    }
	
  }
};
</script>
<style scoped lang="scss">
#remote_stream {
 height: 487px;
  width: 100%;
  position: relative;
  z-index: 100;
  background-color: #000;
}
.video_fh{
	z-index: 1000;
	display: none;
	width: 50px;
	height: 50px;
	position: absolute;
	top: 16px;
	left: 20px;
	background:url(../assets/images/fanhui.png) no-repeat;
	background-size: 100%;
}
.viode_loading{
	position: absolute;
	display: inline-block;
	margin:25% 0 0 40%;
	text-align: center;
}
.remote_footer{
	position: absolute;
	bottom: 0;
	width: 100%;
	height: 70px;
	z-index: 1000;
	display: flex;
	align-items: center;
	background-color: rgba(0,0,0,0.1);
}
.video_time{
	font-size: 24px;
	background: url(../assets/images/bofang.png) no-repeat;
	background-size: 30px;
	color: #fff;
	margin: 0 20px 0 30px;
	padding-left: 40px;
}
.video_jdt{
	flex-grow: 1;
	height: 0;
	border-bottom: 3px solid #fff;
}
.video_big_box{
	margin-left: auto;
	display: flex;
	align-items: flex-end;
	flex-direction: column;
	width: 40px;
	height: 40px;
	margin:0 30px 0 30px;
	img{
		width: 100%;
		height: 100%;
	}
}

</style>