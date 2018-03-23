const {createWebAPIRequest, createRequest} = require('../util/createRequest');

  const data = {
    "offset": 0,
    "total": true,
    "limit": 20,
    "csrf_token": ""
  }

  createWebAPIRequest(
    'music.163.com',
    '/weapi/v1/discovery/recommend/songs',
    'POST',
    data,
    '',
    music_req => console.log(music_req),
    err => console.error(err)
  )


// export function createAPI () {

// }