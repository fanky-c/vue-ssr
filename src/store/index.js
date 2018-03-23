import Vue from 'vue'
import Vuex from 'vuex'
import common from './modules/common';

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    modules: {
      common,
    },
  })
}
