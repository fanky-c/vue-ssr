import Vue from 'vue';
import * as api from '../../api';


const state = {
  banner: '',
}

const getters = {

}

const actions = {
	fetchBanner({ commit }) {
		return api.fetchBanner().then(msg => {
			commit('setBanner', { msg })
		})
	}
}

const mutations = {
	setBanner(state, {msg}){
       Vue.set(state, 'banner', msg);
	}
}

export default {
  state,
  actions,
  getters,
  mutations
}