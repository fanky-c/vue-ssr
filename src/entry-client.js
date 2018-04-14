import Vue from 'vue'
import 'es6-promise/auto'
import { createApp } from './app'
import ProgressBar from './components/ProgressBar.vue'
import plugin from "./plugin"
import axios from "axios"
import VueLazyload from 'vue-lazyload'

// loading
const progressLoadingbar = Vue.prototype.$bar = new Vue(ProgressBar).$mount()
document.body.appendChild(progressLoadingbar.$el)

//img lazyload
Vue.use(VueLazyload, {
  error: require('./assets/images/404.jpg'),
  loading: require('./assets/images/loading.gif'),
  try: 2
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
    const { asyncData } = this.$options
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to
      }).then(next).catch(next)
    } else {
      next()
    }
  }
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


if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)
    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    })
    const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _)
    if (!asyncDataHooks.length) {
      return next()
    }
    
    progressLoadingbar.start()
    
    Promise.all(asyncDataHooks.map(hook => hook({ store, route: to })))
      .then(() => {
        progressLoadingbar.finish()
        next()
      })
      .catch(next)
  })
  app.$mount('#app')
})

// service worker
if ('https:' === location.protocol && navigator.serviceWorker) {
  navigator.serviceWorker.register('/service-worker.js')
}
