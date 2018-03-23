import Vue from 'vue';
import * as api from '../../api';


const state = {
  banner: '',
  newSongs: '',
  personalized: '',
}

const getters = {

}

const actions = {
	fetchBanner({ commit }) {
		return api.fetchBanner().then(msg => {
			commit('setBanner', { msg })
		})
	},
  fetchNewSongs({ commit }) {
    return api.fetchNewSongs().then(msg => {
      commit('setNewSongs', { msg })
    })    
  },
  fetchPersonalized({ commit }){
    return api.fetchPersonalized().then(msg => {
      commit('setPersonalized', { msg })
    })    
  }
}

const mutations = {
	setBanner(state, {msg}){
    Vue.set(state, 'banner', msg);
	},
  setNewSongs(state, {msg}){
    Vue.set(state, 'newSongs', msg);    
  },
  setPersonalized(state, {msg}){
    Vue.set(state, 'personalized', msg);    
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}