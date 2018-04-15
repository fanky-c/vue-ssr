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
  // computed: {
  //   newSongs (){
  //     return JSON.parse(this.$store.state.common.newSongs || '{}');
  //   }
  // }
}	
</script>
<style scoped>
.container li{
  height: auto;
  width: 150px;
  cursor: pointer;
  overflow:hidden;
  display: inline-block;
  margin: 0 0px 10px 30px;
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