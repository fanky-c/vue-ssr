<template>
  <div>
    {{banner}}
  </div>	
</template>

<script>
export default{
  asyncData ({ store }) {
    return store.dispatch('fetchBanner');
  },
  computed: {
    banner (){
      return this.$store.state.common.banner;
    }
  }
}	
</script>