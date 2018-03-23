import Vue from 'vue'
import App from './App.vue'
import { createStore } from './store'
import { createRouter } from './router'
import { sync } from 'vuex-router-sync'
import titleMixin from './util/title'
import directive from './directive/index'
import * as filters from './filter/index'
import axios from "axios"

// mixin
Vue.mixin(titleMixin)

// directive
Vue.use(directive);

// ajax
Vue.use(axios);

// filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})


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
