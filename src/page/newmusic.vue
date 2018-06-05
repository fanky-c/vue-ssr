<template>
  <div class="container">
    <ul>
      <li v-for="item in newSongs.data" @click="$playsong([Object.assign({}, item)])">
        <img v-lazy="item.album.picUrl" width="150" height="150" />
        <div class="title">{{item.album.name}}</div>
      </li>
    </ul>
  </div>	
</template>

<script>
export default{
  data(){
    return {
      newSongs : JSON.parse(this.$store.state.common.newSongs || '{}'), 
    }
  },
  asyncData ({ store }) {
    return store.dispatch('fetchNewSongs');
  },
}	
</script>
<style scoped>
.container{
  height: 100%;
  width: 100%;
  display: flex;
}
.container ul{
  display: flex;
  flex-flow: row wrap; 
}
.container li{
  height: auto;
  width: 20%;
  cursor: pointer;
  overflow:hidden;
  display: inline-block;
  text-align: center;
  margin: 0px 0px 10px 0px;
}
.container li .title{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  height: 30px;
  line-height: 30px;
}  
</style>