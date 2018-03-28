import Vue from 'vue';

var LoadTpl = require('./temple.vue'); 
var Loading = {}; // 定义插件对象

if(!document.getElementsByClassName('f-loading').length){
  
  let loadingTpl = Vue.extend(LoadTpl) // 创建vue构造器

  let $vm = new loadingTpl() // 实例化vue实例

  let tpl = $vm.$mount().$el;

  document.body.appendChild(tpl);

  Vue.prototype.$loading = {
    show(options){
      if(typeof options === 'object'){
        Object.assign($vm, options) // 合并参数与实例
      }else{
        $vm.isShowMask = Boolean(options);
      }
      $vm.show = true;
    },
    hide(){
      $vm.show = false;
    }
  }  
} 
export default Loading; 