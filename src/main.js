import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

import $request from "@/config/request.js";// 导入我们的api接口
import base from "@/config/base.js";// 导入我们的接口域名
import $public from '@/config/public.js'//引入公共方法
Vue.prototype.$request = $request;//挂载axiox
Vue.prototype.$public = $public;
import './config/rem.js';
import '@/assets/css/base.css'

import './utils/formatArea'
// 路由守卫
const defaultTitle = '直播课'
router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? to.meta.title : defaultTitle
  next()
})

import $bzWebSocket from 'vue-native-websocket'
// 挂载websocket通讯
Vue.use($bzWebSocket, `${base.bzSocketURL}`, {
  // 启用Vuex集成,store的值为你的vuex
  store: store,
  // 数据发送/接收使用使用json格式
  format: "json",
  // 开启自动重连
  reconnection: true,
  // 开启手动重连
  connectManually: true,
  // 尝试重连的次数
  reconnectionAttempts: 5,
  // 重连间隔时间
  reconnectionDelay: 3000,
  // 将数据进行序列化，由于启用了json格式的数据传输这里需要进行重写
  passToStoreHandler: function (eventName, event) {
    if (!eventName.startsWith('SOCKET_')) { return }
    let method = 'commit';
    let target = eventName.toUpperCase();
    let msg = event;
    if (this.format === 'json' && event.data) {
      msg = JSON.parse(event.data);
      if (msg.mutation) {
        target = [msg.namespace || '', msg.mutation].filter((e) => !!e).join('/');
      } else if (msg.action) {
        method = 'dispatch';
        target = [msg.namespace || '', msg.action].filter((e) => !!e).join('/');
      }
    }
    this.store[method](target, msg);
    this.store.state.socket.message = msg;
  }
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    this.$store.commit("loginSuccess", $public._getUserMsg());
  },
}).$mount('#app')
