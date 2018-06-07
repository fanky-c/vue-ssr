
var indexedDB = null;

if (process.env.VUE_ENV == 'client') {
  indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB;
}


//var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB;

export default function(db_name , table_name , options) {
  var db;
  var version;
  var self = this;
  var primary_key;

  var init = () => {
  };

  var getStore = () => {
    var tx = self.db.transaction(table_name , 'readwrite');
    var store = tx.objectStore(table_name);
    return store;
  };

  var execute = self.execute = function(callback){
    open(function(){
      try{
        callback(getStore());
      }finally{
        close();
      }
    });
  };

  var open = (callback) => {
    close();
    var request = version ? indexedDB.open(db_name , version) : indexedDB.open(db_name);

    request.onsuccess = function(e) { 
      var db = self.db = e.target.result; 
      !version && (version = db.version);

      if (!db.objectStoreNames.contains(table_name)) {  
        version++;
        open(callback);
        return;
      }  

      callback();
    };

    request.onupgradeneeded = function(e){
      var db = self.db = e.target.result; 
      if (db.objectStoreNames.contains(table_name)) {  
        db.deleteObjectStore(table_name)  
      }  

      var store = db.createObjectStore(table_name, options);
      if(options.indexes){
        options.indexes.forEach((index) => {
          store.createIndex(index.name, index.column ,{unique: index.unique }); 
        })
      }
    };
  };

  var close = () => {
    if(self.db){
      self.db.close();
      self.db = null;
    }
  };

  self.all = (callback) => {
    execute(function(store){
      var req = store.openCursor();
      var dataArr = [];
      req.onsuccess = function(e){
          var cursor = e.target.result;
          if(cursor){
            dataArr.push(cursor.value);
              cursor.continue();
          }else{
            callback(dataArr);
          }
      };
    });
  };

  self.query = (key , callback) => {
    execute(function(store){
      var request = store.get(key); 
      request.onsuccess=function(e){ 
        callback(e.target.result)
      }; 
    });
  };

  self.save = (params) => {
    execute(function(store){
      var req = store.put(params);
    });
  };

  self.remove = (key , callback) => {
    execute(function(store){
      // var transaction = self.db.transaction(table_name ,'readwrite'); 
      // var store = transaction.objectStore(table_name); 
      store.delete(key);
      callback && setTimeout(function(){callback()} , 1);
    });
  };


  self.clear = (name) => {
    execute(function(store){
      // var transaction = self.db.transaction(table_name ,'readwrite'); 
      // var store = transaction.objectStore(storeName); 
      store.clear();
    });
     
  }

  self.deleteDB = (name) => {
    indexedDB.deleteDatabase(db_name || name);
  }

  init();
};
