import indexdb from './indexedDB.js';

var history_type = 'music/play';

var options =  {
  keyPath: 'id',//主键
  autoIncrement: false//是否自增长
};

var store = new indexdb('music_history' , history_type , options);

export function saveToDb(params) {
  if(!params.url){
    return;
  }

  store.save({
    id : [params.url , params.data].join('_'),
    url: params.url,
    data : params.data,
    time : new Date().getTime()
  })
}


const max = 50;
export function query(callback){
  store.all((data) => {
    var len = data.length;
    data = data.sort((a, b) => {
      return b.time - a.time;
    });

    //保留若干条数记录
    if (data.length > max) {
      for (var i = max; i < len; i++) {
        store.remove([data[i].url, data[i].data].join('_'));
      }
    }
    callback(data.slice(0, max));
  });
}

export function clear(){
  store.clear();
}

export function remove(key , callback){
  store.remove(key , callback);
}

