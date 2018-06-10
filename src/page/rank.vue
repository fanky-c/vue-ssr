<template>
	<div class="main">
	  <h3 :class="{'h3':type==2,'h1':type==1}" v-on:click="$router.push({name:'rank',params:{type:1}});">官方榜</h3>

	  <h3 :class="{'h3':type==1,'h1':type==2}" v-on:click="$router.push({name:'rank',params:{type:2}});">全球榜</h3>

	  <div class="ranklist1" v-if="type==1">
	    <template v-for="(rank,$index) in ranklist.rank1" >
		    <div v-if="$index%3>0" style="width:15px;height:1px;float:left;"></div>
		    <div class="rank1" :style="{visibility:(rank.list.length>0?'visible':'hidden')}">
		      <div class="rankimg1" :style="{background:'url('+rank.picUrl+'?param=150y150) '+rank.bkc+' no-repeat 0px -40px'}"  v-on:click="goPlaylist(rank.code)">
		        <span>({{rank.time | datefilter('YYYY年MM月DD日')}}更新)</span>
		      </div>
		      <div class="hot" v-for="(li,$index) in rank.list.slice(0,8)">
		        <span style="font-weight: 900;" :style="{color:($index>2?'':'#4fc08d')}">{{$index+1}}</span>
		        <span v-vue-tooltip="'播放 '+li.name" style="font-weight:600;flex-grow: 1;cursor:pointer;" v-on:click="$playsong([li])">{{li.name}}</span>
		        <span style="width:25%;"><span v-for="(artist,$index) in li.artists"><span style="cursor:pointer"  v-vue-tooltip="'艺人详细 '+artist.name" v-on:click="goArtist(artist.id)">{{artist.name}}</span><span v-if="$index<li.artists.length-1">、</span></span></span>
		      </div>
		      <div class="more"  v-vue-tooltip="'查看全部'" v-on:click="goPlaylist(rank.code)">   查看全部>>
          </div>
		    </div>
	    </template>
	  </div>
	  <div class="ranklist2" v-if="type==2">
	    <div class="continer">
	      <template v-for="(rank,$index) in ranklist.rank2" v-if="type==2">
  			  <div class="rank2 disk"  v-if="rank.count">
  			    <div class="rankimg2"  v-on:click="goPlaylist(rank.code)">
                <img v-lazy="rank.picUrl" width="150" height="150" />
  			        <span>
  			          <span>{{Math.ceil(rank.count/10000)}}万</span>
  			          <div class="counticon"></div>
  			        </span>
  			    </div>
  			    <span>{{rank.name}}</span>
  			  </div>
	      </template>
	      <div class="rank2" style="height:1px;"></div>
	      <div class="rank2" style="height:1px;"></div>
	      <div class="rank2" style="height:1px;"></div>
	      <div class="rank2" style="height:1px;"></div>
	      <div class="rank2" style="height:1px;"></div>
	      <div class="rank2" style="height:1px;"></div>
	      <div class="rank2" style="height:1px;"></div>
	      <div class="rank2" style="height:1px;"></div>
	    </div>
	  </div>
	</div>
</template>

<script>
import config from '@/config';
var  cancelTokenFn = null; 
export default {
  data() {
    return {
      ranklist: config.setting.ranklist,
      type: 1,
      searchString: ""
    }
  },  
  created(){
    this.type = this.$route.params.type || 1;
    this.search();    
  },
  watch: {
    $route() {
      this.type = this.$route.params.type || 1;
      this.search();
    },
  },
  methods: {
    search() {
      var self = this;
      var CancelToken = self.$http.CancelToken;
	    cancelTokenFn && cancelTokenFn()
	    cancelTokenFn = null;
      self.ranklist['rank' + self.type].forEach((obj) => {
        obj.list=[];
        obj.count = 0;
        self.$http.get('/music163/api/playlist/detail?id=' + obj.code, {
		    cancelToken : new CancelToken(function executor(c) {
		      cancelTokenFn = c;
		    })
        }).then(m => {
          if (m.status == 200 && m.data.code == 200 && m.data.result && m.data.result.tracks) {
            obj.picUrl = m.data.result.coverImgUrl;
            obj.name = m.data.result.name;
            obj.list = m.data.result.tracks.filter((elt, i, arr) => {
              return true;
            });
            obj.time = m.data.result.trackNumberUpdateTime;
            obj.count = m.data.result.playCount;
          }
        }).catch(err =>{
           //console.error(err);
        })
      })
    },
    goPlaylist(id) {
      this.$router.push({
        name: 'playlist',
        params: {
          id: id
        }
      });
    },
    goSong(id) {
      this.$router.push({
        name: 'song',
        params: {
          id: id
        }
      });
    },
    goArtist(id) {
      this.$router.push({
        name: 'artist',
        params: {
          id: id
        }
      });
    },
  } 
}	
</script>

<style scoped>
.ranklist1 {
  padding-top: 20px;
  border-top: solid 1px #e6e6e6;
}

.ranklist2 {
  padding-top: 20px;
  border-top: solid 1px #e6e6e6;
}

.ranklist2>div {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.ranklist1 .rank1 {
  height: 360px;
  width: calc(33.3% - 10px);
  overflow: hidden;
  display: inline-block;
  float: left;
  margin-bottom: 20px;
  border: solid 1px #e6e6e6;
}
.ranklist2 .continer {
  margin-left:-30px;
  margin-right:-30px;
}
.ranklist2 .rank2 {
  height: auto;
  width: 150px;
  cursor: pointer;
  overflow: hidden;
  display: inline-block;
  margin-right: 30px;
  margin-left: 30px;
  margin-bottom: 30px;
}

.ranklist1 .rank1 .rankimg1 {
  height: 80px;
  width: 100%;
  position: relative;
}

.ranklist2 .rank2 .rankimg2 {
  height: 150px;
  width: 150px;
  position: relative;
  background-size: contain !important;
  border: solid 1px #e6e6e6;
}


.ranklist1 .rank1 .rankimg1 span {
  font-size: 12px;
  color: #ffffff;
  position: absolute;
  bottom: 5px;
  left: 50px;
}

.ranklist1 .rank1 .hot {
  height: 30px;
  display: flex;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 14px;

  line-height: 30px;
}
.ranklist1 .rank1 .more{
  font-size: 14px;
    color: #666666;
    float: right;
    margin-right: 10px;
    margin-top: 10px;
    cursor: pointer;
}
.ranklist1 .rank1 .hot > span {
  height: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
}

.ranklist2 .rank2 .rankimg2>span {
  height: 20px;
  font-size: 13px;
  color: #ffffff;
  position: absolute;
  top: 0px;
  right: 0px;
  font-weight: 900;
  background: linear-gradient(-90deg, rgba(50, 50, 50, 0.8), rgba(100, 100, 100, 0.4), rgba(150, 150, 150, 0));
  text-align: right;
  padding-right: 5px;
}

.ranklist2 .rank2 .rankimg2 span>* {
  float: right;
}

.ranklist2 .rank2 .rankimg2 span div {
  width: 20px;
  height: 20px;
  background: url('../assets/images/headphones.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: 80%;
}

.hotlist .hot p {
  width: 100%;
  margin: 0px;
  text-align: left;
}

.hotimg {
  width: 150px;
  height: 150px;
  border: solid 1px #e6e6e6;
}

.main {
  padding-left: 30px;
  padding-right: 30px;
  text-align: left;
}

.main .h1 {
  margin: 0px;
  border-bottom: solid 3px #e6e6e6;
  display: inline-block;
  font-size: 24px;
  color: #666666;
  margin-right: 20px;
}

.main .h3 {
  margin: 0px;
  display: inline-block;
  font-size: 16px;
  color: #666666;
  margin-right: 20px;
  cursor: pointer;
}
.main h3 {
  transition: font-size 0.5s;
}	
</style>