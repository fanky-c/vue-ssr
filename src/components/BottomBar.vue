<template>
<div class="bottom-part">
  <audio style="position:absolute;" autoplay="true" :src="mp3Url" v-on:progress="setReadyduration()" v-on:durationchange="duration=audio.duration" v-on:timeupdate="currentTimeX=audio.currentTime;" v-on:volumechange="volume=audio.volume;" v-on:pause="isplay=false;"
    v-on:playing="isplay=true;">
  </audio>

  <div class="controls">
    <div class="prev"></div>
    <div class="" :class="{play:!isplay,pause:isplay}" v-on:click="playORpause()"></div>
    <div class="next"></div>
  </div>

  <div class="center">
    <slider class="slider1" :type="'1'" :length.sync="currentTime" :t1="readyduration" :max="duration" :realtime="false"></slider>
    <span class="volume">{{currentTime | timefilter}}/{{duration | timefilter}}</span>
    <div class="history">
       <a href="javascript:;" class="icon-history" @click="isSHowHistory = !isSHowHistory">{{historyNums}}</a>
       <History class="showHistoryArea" v-if="isSHowHistory" :list="list" @clearHistory="clearHistory" @closeHistory="closeHistory"></History>
    </div>
  </div>

  <div class="right">
    <slider class="slider2" :length.sync="volume" max="1" :realtime="true"></slider>
  </div>

  <div class="desc" v-if="nowData.album && nowData.name && nowData.artists">
    <div class="disk">
      <div class="img" v-if="nowData.album">
        <img v-lazy="nowData.album.picUrl" width="60" height="60" />
      </div>    
    </div>
    <div class="text">
      <h4>{{nowData.name}}</h4>
      <p>
        <span v-for="(artist,$index) in nowData.artists">
          <span  style="cursor:pointer" @click="goArtist(artist.id)">{{artist.name}}</span>
          <span v-if="$index<nowData.artists.length-1">/</span>
        </span>
      </p>
    </div>
  </div>
</div>
</template>

<script>
import Vue from "vue"
import slider from "./Slider";
import History from './history';
import * as history from '@/commons/js/history';
export default {
  name: 'BottomBar',
  components: {
    slider,
    History,
  },
  data() {
    return {
      searchString: "",
      audio: null,
      volume: 0.5,
      currentTimeX: 0,
      readyduration: 0,
      duration: 0,
      mp3Url: "",
      isplay: false,
      list: [],
      nowData: {},
      historyNums: 0,
      isSHowHistory: false,
    }
  },
  mounted() {
    var self = this;
    
    //获取历史记录
    history.query((data)=>{
       self.list = data;
       self.historyNums = data.length;
    })    
    
    Vue.prototype.playMp3 = (list) => {
      this.mp3Url = list[0].url;
      this.nowData = list[0];
      this.list=list;
    }
    
    Vue.playMp3 = (list) => {
      if(list[0].url){
        this.mp3Url = list[0].url;
        this.nowData = list[0];
        this.list=list;
      }else{
        this.$toast.show({
          text: '播放失败',
          type: 'error'
        })
      }
      history.saveToDb({
        url: list[0].url,
        data: list[0] 
      })
      self.historyNums++;
    }
    this.audio = this.$el.getElementsByTagName('audio')[0];
    this.audio.volume = this.volume;  
  },
  methods: {
    playORpause() {
      if (this.audio.paused) {
        this.audio.play();
      } else {
        this.audio.pause();
      }

    },
    setReadyduration() {
      this.readyduration = this.audio.buffered.end(this.audio.buffered.length - 1);
    },
    goArtist(id) {
      this.$router.push({
        name: 'artist',
        params: {
          id: id
        }
      });
    },
    clearHistory(){
      this.historyNums = 0;
    },
    closeHistory(){
      this.isSHowHistory = false;
    }
  },
  computed: {
    currentTime: {
      // getter
      get: function() {
        return this.currentTimeX;

      },
      // setter
      set: function(newValue) {
        this.audio.currentTime = newValue;
      }
    }
  },
  watch: {
    $route() {
      // console.log(this.$route);
    },
    volume() {
      this.audio.volume = this.volume;

    },
    currentTime() {
      // this.audio.currentTime=this.currentTime;
    }
  }
}
</script>

<style scoped>
.slider
{
  width: 80px;

}
.controls {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 200px;
  padding-left: 10px;
  padding-right: 10px;
  height: 100%;
}

.controls>* {
  border-radius: 100%;
  background-color: #e62222;
  background-size: 45%;
  background-position: center;
  background-repeat: no-repeat;
}

.controls>*:active {
  background-color: #e64c16;
}

.controls>.prev,
.controls>.next {
  width: 30px;
  height: 30px;
}

.controls>.prev {
  background-image: url('../assets/images/prev.png');
}

.controls>.next {
  background-image: url('../assets/images/next.png');
}

.controls>.play,
.controls>.pause {
  width: 35px;
  height: 35px;

  background-size: 55%;
}

.controls>.play {
  background-image: url('../assets/images/play.png');
}

.controls>.pause {
  background-image: url('../assets/images/pause.png');
}



.center {
  flex-grow: 1;
  display: flex;
  align-items: center;
  padding: 20px;
}

.center>.slider {
  flex-grow: 1;
}

.center> .volume {
  font-size: 12px;
  color: #888888;
  margin-left: 15px;
}
.center> .history{
   margin-left: 10px;
}
.history .icon-history{
    display: block;
    float: none;
    width: 60px;
    height: 25px;
    padding-left: 21px;
    background: url('../assets/images/playbar.png') no-repeat  -42px -68px;
    line-height: 27px;
    text-align: center;
    color: #666;
    text-shadow: 0 1px 0 #080707;
    text-indent: 0;
    text-decoration: none;
    font-size: 12px;
}
.history .icon-history:before{
  content: none;
}
.history .showHistoryArea{
    position: absolute;
    left: 50%;
    bottom: 59px; 
    width: 986px;
    height: 301px;
    margin-left: -493px;
    z-index: 9;
}

.right
{
  padding: 10px;
}
.bottom-part {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.desc {
  width: 200px;
  height: 80px;
  border-top: solid 1px #dcdcdc;
  position: absolute;
  top: -80px;
  padding: 10px;
  left: 0px;
}

.desc .disk {
  display: inline-block;
  width: 60px;
  height: 60px;
  border: solid 1px #cccccc;
  border-radius: 2px;
  overflow: hidden;
}
.desc .text {
  display: inline-block;
  width: 115px;
  height: 60px;
  overflow: hidden;
  padding-top: 5px;
  padding-left: 5px;
}
.desc .text > *{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0px;
  text-align: left;
}
.desc .text > h4{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0px;
  margin-bottom: 5px;
  font-size: 16px;
  font-weight: 400;
}
.desc .text > p{
  font-size: 12px;
}
.desc .disk .img {
  width: 100%;
  height: 100%;
}
</style>
