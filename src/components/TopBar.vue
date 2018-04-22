<template>
  <div class="top-part">
    <div class="title" v-on:click="$router.push({ path: '/'});">
      <span>fanky_c音乐</span>
    </div>
    <div class="nextprevdiv">
      <div class="nextprev">
        <div class="left" v-vue-tooltip="'后退'"  v-on:click="goback()"></div>
        <div class="right" v-vue-tooltip="'前进'"  v-on:click="goforward()"></div>
      </div>
    </div>
    <div class="searchdiv">
      <div class="search">
        <div class="searchmark"></div>
        <input placeholder="搜索音乐、歌手、歌单、专辑" v-on:keydown.enter="search()" v-model="searchString"></input>
      </div>
    </div>
  </div>
</template>

<script>
import config from "../config"
export default {
  name: 'TopBar',
  data () {
    return {
      title: '',
      searchString:""
    }
  },
  methods:{
    goback(){
      this.$router.back();

    }
    ,
    goforward(){
      this.$router.forward();

    },
    search(){
      if(!this.searchString.trim()){
        this.$toast.show({
          text: '请输入搜索音乐、歌手、歌单、专辑',
          type: 'warn'
        })
        return;
      }
      this.$router.push({ name: 'search', params: {type:config.setting.searchlist[0].type, str: this.searchString }});
    },
  }, 
}
</script>

<style scoped>
  .top-part
  {
    width: 100%;
    height: 100%;
  }
  .ntrmark
  {
    background: url(../assets/images/ntr.png) no-repeat;
    background-size:  cover;
    background-position: center;
    width: 40px;
  }
  .title
  {
    margin-left: 20px;
    top: 10%;
    height: 80%;
    color: #ffffff;
    font-size: 32px;
    font-weight: bold;
    position: relative;
    float: left;
    cursor: pointer;
  }
  .title > *
  {
    height: 100%;
    float: left;
        margin-right: 10px;
  }
  .nextprevdiv
  {

    float: left;
    position: relative;
    height: 100%;
    margin-left: 50px;
    width: 60px;
  }
  .nextprev
  {
    width:50px;
    height: 25px;
    border: solid 0.1px rgba(50,50,50,0.2);
    border-radius: 5px;
    position: absolute;
    top: 0px;
    bottom: 0px;
    margin: auto;
    overflow: hidden;
  }
  .nextprev > *
  {
    width: 50%;
    height: 100%;
    float: left;
    background-repeat: no-repeat;
  }
  .nextprev > .left
  {
    border-right:  solid 0.1px rgba(50,50,50,0.2);
    margin-right: -1px;
    background-image: url(../assets/images/left.png);
    background-size:  75%;
    background-position: center;
  }
  .nextprev > .right
  {
    background-image: url(../assets/images/right.png);
    background-size:  75%;
    background-position: center;
  }
  .nextprev > .left:hover
  {
    background-color: #4fc08d;
    background-image:  url(../assets/images/left-on.png);
  }
  .nextprev > .right:hover
  {
    background-color: #4fc08d;
    background-image: url(../assets/images/right-on.png);
  }
  .searchdiv
  {
    float: left;
    position: relative;
    height: 100%;
    margin-left: 50px
  }
  .search
  {
    height: 35px;
    border-radius: 25px;
    position: absolute;
    top: 0px;
    bottom: 0px;
    margin: auto;
    overflow: hidden;
    background-color: #ffffff;

  }
  .search > input
  {
    margin-left: 30px;
    background: none;
    border: none;
    height: 35px;
    font-size: 13px;
    width: 240px;
    outline: 0;
  }

  .searchmark
  {
    background: url(../assets/images/sou.png) no-repeat;
    background-size: 18px;
    background-position: center;
    width: 25px;
    height: 100%;
    margin-left: 3px;
    position: absolute;
  }
</style>
