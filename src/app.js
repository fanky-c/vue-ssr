import Vue from 'vue'
import App from './App.vue'
import { createStore } from './store'
import { createRouter } from './router'
import { sync } from 'vuex-router-sync'
import titleMixin from './util/title'
import directive from './directive/index'
import * as filters from './filter/index'
import vue$methods from "./vue$methods"
import axios from "axios"

// mixin
Vue.mixin(titleMixin)

// directive
Vue.use(directive);

// ajax
Vue.prototype.$http = axios;

// vue$methods
Vue.use(vue$methods);

// filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})


//vue  实例对象
export function createApp () {
  const store = createStore()
  const router = createRouter()

  sync(store, router)

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })

  return { app, router, store }
}
