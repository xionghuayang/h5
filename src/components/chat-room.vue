<template>
  <div>
    <!-- <div class="web_chatroom" >
      <div class="web_chatroom_box first_web_chatroom_box">
        <div class="web_chatroom_allMessage">
          <div
            class="web_chatroom_allMessage_list"
            v-for="(item, index) in socketAllMsgList"
            :key="index"
          >
            <div class="message_box">
              <div class="message_box_header_img">
                <img :src="item.profilePicture" alt srcset />
              </div>
            </div>
            <div class="message_box_content forciblyBr">
              <div class="message_box_name forciblyBr">
                <span class="message_box_name_y">{{item.sender + ' : '}}</span>
                <span class="message_box_content_text">{{item.content.trim()}}</span>
              </div>
              <p class="message_box_time">{{item.createTime}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="web_chatroom_box" id="sendMsgBox" @click="fοcus = true">
        <div class="web_chatroom_box_textarea">
          <textarea
            id="chatroom_input"
            :fοcus="fοcus"
            v-model="socketMsg"
            @keydown.enter="sendMessage"
            placeholder="请输入内容..."
          ></textarea>
        </div>
        <div class="chatroom_send_message"  @click="sendMessage">
          <span>发送</span>
        </div>
      </div>
    </div>-->

    <div class="web_room">
      <div class="web_room_allMsg" :style="{height:boxH + 'px'}">
        <div class="for_list" v-for="(item,index) in socketAllMsgList" :key="index">
          <p class="time">{{item.createTime}}</p>
          <div class="web_room_allMsg_list">
            <div class="user_avatar">
              <img src="@/assets/images/img0.png" alt srcset />
            </div>
            <div class="user_msg">
              <p class="user_name">杜临风</p>
              <div class="user_news">{{item.content}}</div>
            </div>
          </div>
        </div>
        <!--  -->
        <!-- <div class="for_list">
          <p class="time">18:24</p>
          <div class="web_room_allMsg_list">
            <div class="user_avatar">
              <img src="@/assets/images/img0.png" alt srcset />
            </div>
            <div class="user_msg">
              <p class="user_name">杜临风</p>
              <div class="user_news">郑姐，晚上吃啥郑姐，晚上吃啥，郑姐，晚上吃 啥啥啥啥啥啥啥啥啥</div>
            </div>
          </div>
        </div>-->
      </div>
      <!--  -->
    </div>
    <div class="web_send_msg_foot">
      <div class="user_input_msg">
        <van-field v-model="socketMsg" rows="1" type="textarea" placeholder />
      </div>
      <div class="send" @click="sendMessage">
        <span>发送</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  // pagename:聊天室啊
  props: {
    boxH: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      fοcus: false,
      socketMsg: "", //用户发送的消息
      socketAllMsgList: [], //消息列表
      peopleNum: 0 //所有人
    };
  },
  mounted() {
    /**
     * @description 房间号码给vuex 用于定时发送心跳消息
     */
    this.$store.commit("heartbeat", this.$route.query.liveStreamName);
    /**
          @description 初始化当前用户数据
    */
    this.initUserData();

    /**
     * @description 建立socket房间通讯
     */

    this.joinSocket(this.$route.query.liveStreamName);
    // user_1/linfeng/154
    // 监听消息接收
    this.$options.sockets.onmessage = res => {
      // res.data为服务端返回的数据
      const data = JSON.parse(res.data);
      // 200为服务端连接建立成功时返回的状态码(此处根据真实后端返回值进行相应的修改)
      if (data.code === 200) {
        console.log("服务端反馈消息，消息类型为" + data.msg.type, data);
        // 连接建立成功
        /**@param:消息类型 messageType 1代表上线 2代表下线 3代表在线名单 4代表普通消息 5代表老师（主播发送的消息） 0代表平台发送的消息  99代表心跳消息  100代表控制消息  101代表老师退出了房间*/
        if (data.msg.type == 4 || data.msg.type == 5 || data.msg.type == 0) {
          this.socketAllMsgList.push(data.msg);
          /** @description vue驱动视图也有需要时间的 所以这里写0秒延迟 防止数据未驱动视图 就执行了获取高度 */
          setTimeout(() => {
            var msg_box = document.querySelector(".web_room_allMsg");
            /** @description 多给30的距离  防止文字被底部覆盖 */
            msg_box.scrollTop = msg_box.scrollHeight + 30;
          }, 0);
        } else if (data.msg.type == 3) {
          /** @description 获取服务端推送的消息 将人数反馈给父组件 */
          this.$emit("listenerPeopleNum", data.msg.content.length, data.msg);
        } else if (data.msg.type == 100) {
          // 控制语句
          // 1为请求的video 2为请求的audio
          let result = data.msg;
          let a = {};
          a.source = result.source;
          a.state = result.state;
          this.$emit("performOperation", a);
        } else if (data.msg.type == 101) {
          // 控制语句
          this.$emit("backPage", 1);
        }
      } else {
      }
    };
  },
  // beforeDestroy生命周期中调用$disconnect方法
  beforeDestroy() {
    // 页面销毁时,断开连接
    this.$disconnect();
    console.log("页面销毁，断开websocket连接");
  },
  methods: {
    /**
     * @description 初始化当前用户数据
     */
    initUserData() {
      this.$store.commit("getUserProfilePicture");
    },
    /**
     * @param:{
     *         roomID... { String } @房间号
     *         name... { String } @用户名字
     *         rowid... { String || Int } @用户的userid
     *        }
     * @return any... { Boolean }
     * @description 连接socket
     */
    joinSocket(roomID) {
      let p = this.$user();
      this.$connect(
        // `${this.$store.state.bzSocketURL}/${roomID}/${this.$store.state.nickname}/${p.rowid}`
        `${this.$store.state.bzSocketURL}/15813/linfeng/154`
      );
    },
    /**
     * @param:{ event } { Object } @description $event
     * @param:{ to } { String } @description 定向接收人
     * @param { toid }  { Number || String } @description 定向接收人的userid

     */
    sendMessage(event, to, toId, type, source, state) {
      /**
       * @param:{
       *         event... { object } @event
       *        }
       * 如果非指定人发送视为发送给整个房间 即 to toId 为空
       * @description 用户发送消息
       */
      if (!to) to = "";
      if (!toId) toId = "";
      if (!type) type = 4;
      let sendData = {
        createTime: this.$public.getCurentTime(), //当前发送时间
        // profilePicture: this.$store.state.profilePicture, //发送人头像
        content: this.socketMsg, //消息内容
        // roomName: this.$route.query.liveStreamName,
        roomName: "15813",
        // sender: this.$store.state.nickname, //发送人
        to: to, //定向发送的接受人姓名 所有人则为空
        toId: toId, //定向发送的接受人userid所有人则为空
        type: type, //消息类型详见上方监听接受的注释
        state: state ? state : ""
      };
      //@param:{ source } { Number } @description 1为请求的video 2为请求的audio
      if (source) sendData.source = source;
      // let data = JSON.stringify(o);
      // 消息发送: 消息内容、状态码、当前登录用户的头像地址、用户id
      this.$socket.sendObj({
        msg: sendData,
        code: 200
      });
      try {
        if (event.keyCode === 13) {
          /**
           * @description 用户按了enter键 阻止换行事件
           */
          event.preventDefault();
        }
      } catch (error) {}

      // 清空输入框中的内容
      this.socketMsg = "";
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.web_room {
  padding: 0 55px 0 50px;
  box-sizing: border-box;
}
.web_room_allMsg {
  padding-top: 30px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    /*隐藏滚轮*/
    display: none;
  }
  .time {
    font-size: 18px;
    color: #c5c5c5;
    text-align: center;
  }
  .for_list {
    margin-bottom: 28px;
    &:last-of-type {
      padding-bottom: 100px;
    }
  }
  .web_room_allMsg_list {
    display: flex;
    .user_avatar {
      height: 50px;
      width: 50px;
      border-radius: 50%;
      overflow: hidden;
      img {
        height: 100%;
        width: 100%;
        border-radius: 50%;
      }
    }
    .user_msg {
      margin-left: 10px;

      font-size: 24px;
      .user_name {
        color: #c4c4c4;
      }
      .user_news {
        max-width: 585px;
        padding: 24px 54px 27px 25px;
        box-sizing: border-box;
        background: #ffffff;
        border-radius: 10px;
        white-space: pre-line;
        word-break: break-all;
        word-wrap: break-word;
      }
    }
  }
}
.web_send_msg_foot {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 100px;
  box-sizing: border-box;
  background: white;
  display: flex;
  align-items: center;
  padding: 0 54px 0 35px;
  justify-content: space-between;
  .user_input_msg {
    width: 581px;
    /deep/ .van-field {
      background: #f9f9f9;
      border-radius: 50px;
    }
  }
  /deep/ textarea {
    overflow-x: hidden;
    overflow-y: hidden;
  }
  /deep/ .van-field--min-height .van-field__control{
      min-height: 0;
  }
  .send {
    font-size: 28px;
    color: #3bc602;
  }
}
</style>
