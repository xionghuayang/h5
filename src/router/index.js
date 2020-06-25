import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: index
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/login.vue')
  },
  {
    path: '/coursePlayer',
    name: 'coursePlayer',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/coursePlayer.vue'),
    meta: {
      title: '课程详情'
    }
  },
  {
    path: '/rePlay',
    name: 'rePlay',
    component: () => import('../views/rePlay.vue'),
    meta: {
      title: '直播回放'
    },
  },
  {
    path: '/playing',
    name: 'playing',
    component: () => import('../views/playing.vue'),
    meta: {
      title: '正在播放'
    },
  },
  {
    path: '/courseOrder',
    name: 'courseOrder',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/course-order.vue'),
    meta: {
      title: '课程订单'
    }
  },
  {
    path: '/liveClass',
    name: 'liveClass',
    meta: {
      title: '直播特训班'
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/live-class.vue')
  },
  {
    path: '/myLiveClass',
    name: 'myLiveClass',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/my-live-class.vue'),
    meta: {
      title: '我的直播课'
    },

  },
  {
    path: '/yuyueInfo',
    name: 'yuyueInfo',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/yuyue-info.vue'),
    meta: {
      title: '预约资料'
    },
  },
  {
    path: '/share',
    name: 'share',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/share.vue'),
    meta: {
      title: '分享'
    }
  },
  {
    path: '/orderlist',
    name: 'orderlist',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/orderList.vue'),
    meta: {
      title: '订单列表'
    }
  },
  {
    path: '/orderdetails',
    name: 'orderdetails',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/orderdetails.vue'),
    meta: {
      title: '订单详情'
    }
  }

]

const router = new VueRouter({
  routes
})

export default router
