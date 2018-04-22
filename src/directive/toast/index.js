import Vue from 'vue';
import Alert from './temple.vue';

var Toast = {}; // 定义插件对象
var timer = null;
var $vm = null;


if (process.env.VUE_ENV == 'client') {
  if (!document.getElementsByClassName('f-toast').length) {

    let toastTpl = Vue.extend(Alert) // 创建vue构造器

    $vm = new toastTpl() // 实例化vue实例

    let tpl = $vm.$mount().$el;

    document.body.appendChild(tpl);
  }
}


Toast.install = function(Vue){
  Vue.prototype.$toast = {
    show(options){
      if(typeof options === 'string'){
        $vm.text = options          // 传入props
      }else if(typeof options === 'object'){
        Object.assign($vm, options) // 合并参数与实例
      }

      $vm.show = true;
      
      timer && clearTimeout(timer);
      timer = setTimeout(() => {
       $vm.show = false;
      }, (options.time || 1.5) * 1000);
    },
    hide(){
      $vm.show = false;
    }
  }
}
  
export default Toast; 