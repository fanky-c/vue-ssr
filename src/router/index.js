/* 路由配置全写这里 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const Index = () => import ('../page/index.vue');
const Newmusic = () => import ('../page/newmusic.vue');
const Rank = () => import ('../page/rank.vue');
const Allplaylist = () => import ('../page/allplaylist.vue');
const Search = () => import ('../page/search.vue');
const Playlist = () => import ('../page/playlist.vue');
const Album = () => import ('../page/album.vue');
const Artist = () => import ('../page/artist.vue');

export function createRouter() {
	return new VueRouter({
		mode: 'history',
		fallback: false,
		scrollBehavior: () => ({
			y: 0
		}),
		routes: [{
			path: '/',
			redirect: '/index'
		}, {
			path: '*',
			redirect: '/'
		}, {
			path: '/index',
			name: 'index',
			component: Index,
			children: [{
				path: '/index',
				redirect: '/index/newmusic'
			}, {
				path: 'newmusic/:album?/:type?',
				name: 'newmusic',
				component: Newmusic,
			}, {
				path: 'rank/:type?',
				name: 'rank',
				component: Rank,
			}, {
				path: 'allplaylist/:type?',
				name: 'allplaylist',
				component: Allplaylist,
			}]
		}, {
			path: '/search/:type/:str',
			name: 'search',
			component: Search,
		}, {
			path: '/playlist/:id',
			name: 'playlist',
			component: Playlist,
		},{
			path: '/album/:id',
			name: 'album',
			component: Album,
		}, {
			path: '/artist/:id',
			name: 'artist',
			component: Artist,
		}]
	})
}