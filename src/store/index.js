import Vue from 'vue';
import Vuex from 'vuex';
import base from "@/config/base.js";// 导入我们的接口域名
Vue.use(Vuex);
const state = {
  $userInfo: '',
  // 用户头像
  profilePicture:'',
  stateTab:0,//状态切换返回
  nickname:'',
  reloadPage:false,//判定刷新页面
    // bzWebSocket手动链接取地址上文 然后拼接下文
  bzSocketURL: base.bzSocketURL,
  // 房间号
  liveStreamName:'',
  socket: {
    // 连接状态
    isConnected: false,
    // 消息内容
    message: '',
    // 重新连接错误
    reconnectError: false,
    // 心跳消息发送时间
    heartBeatInterval: 50000,
    // 心跳定时器
    heartBeatTimer: 0
  }
};
const mutations = {
  loginSuccess(state,data) {
    localStorage.setItem("loginMsg",JSON.stringify(data));
    state.$userInfo = data
  },
  getUserProfilePicture() {
    let data = localStorage.getItem("loginMsg") ? JSON.parse(localStorage.getItem("loginMsg")) : ''
    state.profilePicture = data.imagePrefix + data.avatar;
    state.nickname = data.nickname;
  },
  heartbeat(state,liveStreamName) {
    state.liveStreamName = liveStreamName
  },
  // 连接打开
  SOCKET_ONOPEN(state, event) {
    Vue.prototype.$socket = event.currentTarget;
    state.socket.isConnected = true;
    // 连接成功时启动定时发送心跳消息，避免被服务器断开连接
    const heartbeatMsg = {
      createTime: Vue.prototype.$public.getCurentTime(),
      profilePicture: state.profilePicture,
      content: '心跳消息', //消息内容
      roomName: state.liveStreamName,
      sender: state.nickname,
      to: "", //一个为接受人姓名 所有人则为空
      toId: "",
      type: 99 //心跳消息
    };
    state.socket.heartBeatTimer = setInterval(() => {
      state.socket.isConnected && Vue.prototype.$socket.sendObj({ "msg": heartbeatMsg,"code": 200});
    }, state.socket.heartBeatInterval);
  },
  // 连接关闭
  SOCKET_ONCLOSE(state, event) {
    state.socket.isConnected = false;
    // 连接关闭时停掉心跳消息
    clearInterval(state.socket.heartBeatTimer);
    state.socket.heartBeatTimer = 0;
    console.log('连接已断开: ' + new Date());
    console.log(event);
  },
  // 发生错误
  SOCKET_ONERROR(state, event) {
    console.error(state, event)
  },
  // 收到服务端发送的消息
  SOCKET_ONMESSAGE(state, message) {
    state.socket.message = message
  },
  // 自动重连
  SOCKET_RECONNECT(state, count) {
    console.info('消息系统重连中...', state, count);
  },
  // 重连错误
  SOCKET_RECONNECT_ERROR(state) {
    state.socket.reconnectError = true;
  },
}
const actions = {
  customerAdded(context) {
    console.log('action received: customerAdded');
    console.log(context)
  }
}
const store = new Vuex.Store({
  state,
  mutations,
  actions
});
export default store;