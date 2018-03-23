// this is aliased in webpack config based on server/client build
import { createAPI } from 'create-api'
import {createWebAPIRequest, createRequest} from '../util/createRequest'

/**
 * 调用此接口 , 可获取 banner( 轮播图 ) 数据注 : 因参数未知 , 只能获取比较旧 的数据
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
   
}


