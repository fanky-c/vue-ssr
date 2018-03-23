// this is aliased in webpack config based on server/client build
import { createAPI } from 'create-api'
import {createWebAPIRequest, createRequest} from '../util/createRequest'

/**
 * 调用此接口 , 可获取 banner( 轮播图 ) 数据注 : 因参数未知 , 只能获取比较旧的数据
 * @return {[type]} [description]
 */
export var fetchBanner = () => {
	return new Promise(function(resolve, reject) {
		createRequest('/api/v2/banner/get', 'GET', null).then((result) => {
			resolve(result);
		}).catch(err => {
			reject(err);
		})
	});
}

//music163/api/discovery/new/songs
export var fetchNewSongs = () => {
  return new Promise(function(resolve, reject) {
    const cookie = ''
    const data = {
      type: "recommend"
    }
    createWebAPIRequest(
      'music.163.com',
      '/api/personalized/newsong',
      'POST',
      data,
      cookie,
      result => {
        resolve(result);
      },
      err => {
        reject('fff');
      }
    )
  })
}


/**
 * [排行榜， 调用此接口 , 传入数字 idx, 可获取不同排行榜]
 * @param  {[type]} id [description]
 * @return {[type]}    [description]
 */
export var fetchRankById = (id) => {
  const top_list_all = {
    "0": ['云音乐新歌榜', '/api/playlist/detail?id=3779629'],
    "1": ['云音乐热歌榜', '/api/playlist/detail?id=3778678'],
    "2": ['网易原创歌曲榜', '/api/playlist/detail?id=2884035'],
    "3": ['云音乐飙升榜', '/api/playlist/detail?id=19723756'],
    "4": ['云音乐电音榜', '/api/playlist/detail?id=10520166'],
    "5": ['UK排行榜周榜', '/api/playlist/detail?id=180106'],
    "6": ['美国Billboard周榜', '/api/playlist/detail?id=60198'],
    "7": ['KTV嗨榜', '/api/playlist/detail?id=21845217'],
    "8": ['iTunes榜', '/api/playlist/detail?id=11641012'],
    "9": ['Hit FM Top榜', '/api/playlist/detail?id=120001'],
    "10": ['日本Oricon周榜', '/api/playlist/detail?id=60131'],
    "11": ['韩国Melon排行榜周榜', '/api/playlist/detail?id=3733003'],
    "12": ['韩国Mnet排行榜周榜', '/api/playlist/detail?id=60255'],
    "13": ['韩国Melon原声周榜', '/api/playlist/detail?id=46772709'],
    "14": ['中国TOP排行榜(港台榜)', '/api/playlist/detail?id=112504'],
    "15": ['中国TOP排行榜(内地榜)', '/api/playlist/detail?id=64016'],
    "16": ['香港电台中文歌曲龙虎榜', '/api/playlist/detail?id=10169002'],
    "17": ['华语金曲榜', '/api/playlist/detail?id=4395559'],
    "18": ['中国嘻哈榜', '/api/playlist/detail?id=1899724'],
    "19": ['法国 NRJ EuroHot 30周榜', '/api/playlist/detail?id=27135204'],
    "20": ['台湾Hito排行榜', '/api/playlist/detail?id=112463'],
    "21": ['Beatport全球电子舞曲榜', '/api/playlist/detail?id=3812895']
  }
  const action = 'http://music.163.com' + top_list_all[id][1]
  return new Promise(function(resolve, reject) {
    createRequest(`${action}`, 'GET', null)
      .then(result => {
        resolve(result);
      })
      .catch(err => {
        reject(err);
      })
  })
}

//调用此接口 , 可获取推荐歌单
export var fetchPersonalized = () => {
  return new Promise(function(resolve, reject){
    const cookie = '';
    const data = {}
    createWebAPIRequest(
      'music.163.com',
      '/api/personalized/playlist',
      'POST',
      data,
      cookie,
      result => {
        resolve(result);
      },
      err => {
        reject(err);
      }
    )
  })
}