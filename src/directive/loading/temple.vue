<template>
<transition :name="fadeIn">
  <div class="f-loading" v-show="show">
    <div class="loading-mask" v-show="isShowMask"></div>
    <transition :name="translate">
      <div class="container" v-show="show">
        <img src="./imgs/oval.svg">
      </div>
    </transition>
  </div>
</transition>    
</template>
<script>

export default{
  props : {
    show: {   // 是否显示
     default: false
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
}  
</script>

<style lang="scss" scoped>
@import './index';  
</style>