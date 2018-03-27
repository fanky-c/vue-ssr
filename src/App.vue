<template>
  <div id="app">
    <!-- 头部区域 -->
    <div id="top-continer">
      <TopBar></TopBar>
    </div>
    
    <!-- 左边区域 -->
    <div id="left-continer">
      <LeftBar></LeftBar>
    </div>
    
    <!-- main区域 -->
    <div id="main-continer" class="main-continer" v-on:scroll="onScroll($event)">
      <router-view></router-view>
    </div>
    
    <!-- 底部播放器 -->
    <div id="bottom-continer">
      <BottomBar></BottomBar>
    </div>
  </div>
</template>

<script>
import TopBar from './components/TopBar.vue';
import LeftBar from './components/LeftBar.vue';
import BottomBar from './components/BottomBar.vue';
export default {
  components:{
    TopBar,
    LeftBar,
    BottomBar,
  },
  methods:{
    onScroll(e){
        var main=this.$el.getElementsByClassName("main-continer")[0];
        if (main.scrollTop >= main.scrollHeight - main.offsetHeight) {
            this.eventer.emit("main-continer-scroll",e);
        }
    }    
  }
}  
</script>
<style>
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

#app {
  font: 12px Arial,"Microsoft YaHei",Malgun Gothic,Meiryo,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0px;
  padding: 0px;
  width: 100%;
  height: 100%;
  position: absolute;
  font-size: 16px;
}

#main-continer {
  left: 200px;
  top: 60px;
  height: calc(100% - 60px - 60px);
  width: calc(100% - 200px);
  position: absolute;
  overflow-y: auto;
  overflow-x: hidden; 
  background-color: #fafafa;
}

#top-continer {
  position: absolute;
  left: 0px;
  top: 0px;
  height: 60px;
  width: 100%;
  background-color: #242424;
}

#left-continer {
  background-color: #f1f1f1;
  position: absolute;
  left: 0px;
  top: 60px;
  bottom: 60px;
  height: calc(100% - 60px - 60px);
  width: 200px;
  border-right: solid 1px #dcdcdc;
}

#bottom-continer {
  background-color: #242424;
  position: absolute;
  bottom: 0px;
  height: 60px;
  width: 100%;
  border-top: solid 1px #dcdcdc;
}
</style>