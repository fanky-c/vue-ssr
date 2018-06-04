var store;

function generateKey (key) {
  return KEY_PREFIX + '-' + key;
}

if (typeof localStorage === 'undefined' || localStorage === null) {
  console.log('localStorage不可用');
  store = false;
} else {
  var ls = window.localStorage;
  var KEY_PREFIX = 'music';

  store = {
    set : function (key, data) {
      console.log('【LS】本地存储存储' + key + '数据', data);
      var val = JSON.stringify(data);
      key = generateKey(key);
      try{
        return ls.setItem(key, val);
      }catch(e){
        if(e.name == 'QuotaExceededError'){
          ls.clear();
          ls.setItem(key , val);
        }        
      }
    },
    get : function (key) {
      var data = JSON.parse(ls.getItem(generateKey(key)))
      console.log('【LS】本地存储获取' + key + '数据', data);
      return data;
    }
  }
}



module.exports = store;