<template>
 <div>
 	<div class="listhd">
 	   <div class="listhdc">
 	      <h4>播放列表(0)</h4>
 	      <a href="javascript:;" class="clear">
 	      	 <span class="ico icn-del"></span>清除
 	      </a>
 	      <span class="close" @click="close">关闭</span>	
 	   </div>
 	</div>
 	<div class="listbd"></div>
 </div>
</template>
<script>
export default {
 props:{
 	list:[]
 },
 methods : {
   close: function(){
   	 this.$emit('closeHistory');
   }
 },
 mounted(){
 	console.log(this.list)
 }
}	
</script>
<style scoped>
.listhd{
	height: 41px;
	padding: 0 5px;
	background: url('../assets/images/playlist_bg.png') no-repeat 0px 0px;
}
.listhd .listhdc{
  height: 40px;
  position: relative;
}

.listhd h4{
    position: absolute;
    left: 25px;
    top: 0;
    height: 39px;
    line-height: 39px;
    font-size: 14px;
    color: #e2e2e2	
}
.listhd .clear{
	position: absolute;
    left: 490px;
    top: 12px;
    height: 15px;
    line-height: 15px;
    cursor: pointer;
    color: #ccc;
}
.listhd .clear .ico{
 float: left;
 margin: 1px 6px 0 0;
 height: 16px;
}
.listhd .clear .icn-del{
	width: 13px;
	background: url('../assets/images/playlist.png') no-repeat -51px 0px;
}
.listhd .close{
    position: absolute;
    top: 6px;
    right: 8px;
    width: 30px;
    height: 30px;
    overflow: hidden;
    text-indent: -999px;
    cursor: pointer;
    background: url('../assets/images/playlist.png') no-repeat -195px -21px;
    display: block;	
}
.listbd{
    position: absolute;
    left: 0;
    top: 41px;
    width: 996px;
    height: 260px;
    overflow: hidden;
    background: url('../assets/images/playlist_bg.png') repeat-y -1014px 0;	
}	
</style>