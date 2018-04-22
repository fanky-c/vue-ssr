<template>
<transition :name="fadeIn">
  <div id="f-toast" v-show="show">
    <div class="alert-mask" v-show="isShowMask"></div>
    <transition :name="translate">
      <div class="container"  v-show="show">
        <em class="icon" :class="'icon-' + type"></em>
        <p id="f-toast-msg" class="f-toast-msg">{{text}}</p>
      </div>
    </transition>
  </div>
</transition>    
</template>
<script>

export default{
  props : {
    show: { // 是否显示此toast
     default: false
    },
    text: { // 提醒文字
     default: ''
    },
    type : {  //提示图标
      default : 'success'
    },
    isShowMask: { // 是否显示遮罩层
     default: false
    },
    transition: { // 是否开启动画
     default: true
    }
  },
 computed: {
    translate() { // 根据props，生成相对应的动画
     if (!this.transition) {
      return ''
     } else {
      if (this.position === 'top') {
       return 'translate-top'
      } else if (this.position === 'middle') {
       return 'translate-middle'
      } else if (this.position === 'bottom') {
       return 'translate-bottom'
      }
     }
    },
    fadeIn() { // 同上
     if (!this.transition) {
      return '';
     } else {
      return 'fadeIn'
     }
    }
  },  
  mounted(){   
  },
  beforeDestroy(){
  }
}  
</script>
<style lang="scss" scoped>
@import './index';  
</style>