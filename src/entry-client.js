import Vue from 'vue'
import 'es6-promise/auto'
import { createApp } from './app'
import ProgressBar from './components/ProgressBar.vue'
import plugin from "./plugin"
import axios from "axios"
import VueLazyload from 'vue-lazyload'

// loading
const progressLoadingbar = Vue.prototype.$bar = new Vue(ProgressBar).$mount()
document.body.appendChild(progressLoadingbar.$el);

//img lazyload
//生产占位图
//http://www.gbtags.com/gb/laitu/300x200&text=music/242424/ffffff
Vue.use(VueLazyload, {
  error: require('./assets/images/404.jpg'),
  loading: require('./assets/images/default.png'),
  try: 3
})

// a global mixin that calls `asyncData` when a route component's params change
let progress = {
  progressing: false,
  firstprogressing: false
}
let eventer = {
  emit: null,
  on: null,
  off: null,
  _events: Object.create(null),
  _hasHookEvent: false
};

Vue.mixin({
  data() {
    return {
      progress: progress,
      eventer: eventer
    }
  },

  beforeRouteUpdate (to, from, next) {
    const { asyncData, name } = this.$options;
    console.log('beforeRouteUpdate:', asyncData , name)
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to
      }).then(next).catch(next)
    } else {
      next()
    }
  },

  //匹配要渲染的视图后，再获取数据
  // beforeMount(){
  //   const { asyncData } = this.$options;
  //   console.log('beforeRouteUpdate:111:', asyncData , name)
  //   if (asyncData) {
  //     // 将获取数据操作分配给 promise
  //     // 以便在组件中，我们可以在数据准备就绪后
  //     // 通过运行 `this.dataPromise.then(...)` 来执行其他任务
  //     this.dataPromise = asyncData({
  //       store: this.$store,
  //       route: this.$route
  //     })
  //   }
  // }
})

const { app, router, store } = createApp()

eventer.emit = app.$emit;
eventer.on = app.$on;
eventer.off = app.$off;

// Add a request interceptor
axios.interceptors.request.use(function(config) {
  app.$loading.show();
  app.progress.progressing = true;
  return config;
}, function(error) {
  app.$loading.hide();
  app.progress.progressing = false;
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function(response) {
  app.$loading.hide();
  app.progress.progressing = false;
  return response;
}, function(error) {
  app.$loading.hide();
  app.progress.progressing = false;
  return Promise.reject(error);
});


//这句的作用是如果服务端的vuex数据发生改变，就将客户端的数据替换掉，
//保证客户端和服务端的数据同步
//window.INITIAL_STATE我们就可以知道了客户端拿到了预取的数据，然后去存到客户端的vuex中，
//这也就是大家经常谈论的通过vuex实现前后端的状态共享
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

// 因为可能存在异步组件，所以等待router将所有异步组件加载完毕，
// 服务器端配置也需要此操作
router.onReady(() => {


  // 添加路由钩子函数，用于处理 asyncData.
  // 在初始路由 resolve 后执行，
  // 以便我们不会二次预取(double-fetch)已有的数据。
  // 使用 `router.beforeResolve()`，以便确保所有异步组件都 resolve。  
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)
        
    // 我们只关心非预渲染的组件
    // 所以我们对比它们，找出两个匹配列表的差异组件
    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    })
    const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _)
    if (!asyncDataHooks.length) {
      return next()
    }
    
    progressLoadingbar.start()  //全局asyncData loading提示
    
    Promise.all(asyncDataHooks.map(hook => hook({ store, route: to })))
      .then(() => {
        progressLoadingbar.finish();   //全局asyncData loading提示完成
        next()
      })
      .catch(next)
  })
  app.$mount('#app'); //挂在dom
})

// service worker
if ('https:' === location.protocol && navigator.serviceWorker) {
  navigator.serviceWorker.register('/service-worker.js')
}
