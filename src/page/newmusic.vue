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
  // data(){
  //   return {
  //     newSongs : {}, 
  //   }
  // },
  // created(){
  //   this.newSongs = JSON.parse(this.$store.state.common.newSongs || '{}');
  // },
  //在实例化之前调用所以this无法获取要通过参数传入
  asyncData ({ store }) {
    return store.dispatch('fetchNewSongs');
  },
  computed: {
    newSongs (){
      return JSON.parse(this.$store.state.common.newSongs || '{}');
    }
  }
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