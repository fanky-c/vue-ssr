<template>
  <div>
    {{newSongs.result}}
  </div>	
</template>

<script>
export default{
  asyncData ({ store }) {
    return store.dispatch('fetchNewSongs');
  },
  computed: {
    newSongs (){
      return JSON.parse(this.$store.state.common.newSongs);
    }
  }
}	
</script>