<template>
	<div class="slider">
    <div class="sliderT1" :style="{width:(t1/max*100+'%')}"></div>
    <div class="sliderT" :style="{width:(len/max*100+'%')}"></div>
    <div class="sliderpointer" :class="{big:type==1}" :style="{left:'calc('+(len/max*100+'%')+' - 5px'}" v-on:mousedown="startdrag($event)"></div>
	</div>
</template>

<script>
	import Vue from 'vue'
	export default {
		name: 'Slider',
		props: ['t1','length','realtime','max','type'],
		data() {
			return {
        lenX:0,
        prepoint:null,
        isdrag:false,
			}
		},
		methods: {
      startdrag(e){
        this.isdrag=true;
				this.prepoint = {
					x: e.clientX
				};

        let handle=(e)=>{

          let tempX=e.clientX-this.prepoint.x;
          this.prepoint = {
  					x: e.clientX
  				};
          tempX=(this.len/this.max+tempX/this.$el.offsetWidth)*this.max;

          if (tempX>=this.max) {
            tempX=this.max;
          }
          if (tempX<=0) {
            tempX=0;
          }
          this.len=tempX;

        }
        let handle2=()=>{
          this.isdrag=false;
          document.removeEventListener('mousemove',handle);
          document.removeEventListener('mouseup',handle2);

          if (!this.realtime) {
            this.$emit('update:length', this.len);
          }
        }

        document.addEventListener('mousemove',handle);
        document.addEventListener('mouseup',handle2);
      }


			},
      computed: {
        len: {
          // getter
          get: function () {

            if (this.realtime) {
              return this.length;
            } else {
              return this.lenX;
            }
          },
          // setter
          set: function (newValue) {
            // this.t1=newValue;
            if (this.realtime) {
              this.$emit('update:length', newValue);
            } else {
              this.lenX=newValue;
            }

          }
        }
      }
      ,
      watch:{
        length(){
          // console.log(this.$route);
          if (!this.isdrag) {
            this.lenX=this.length;
          }

        },

      }
	}

</script>

<style scoped>
  .sliderT1
  {
    height: 100%;
    position: absolute;
    border-radius: 5px;
    background-color: #a6a6a6;
  }
  .sliderT
  {
    height: 100%;
    position: absolute;
    background-color: #e62222;
    border-radius: 5px;
  }
  .sliderpointer
  {
    height: 10px;
    width: 10px;
    border-radius: 100%;
    position: absolute;
    box-shadow: 0px 0px 1px;
    background-color: #ffffff;
    top: -3px;
  }
  .sliderpointer.big
  {
    height: 15px;
    width: 15px;
    top: -5.5px;
  }
	.sliderpointer.big::before
  {
    content: "";
    height: 5px;
    width: 5px;
    position: absolute;
    border-radius: 100%;
    top: 5px;
    left: 5px;
    background-color: #e62222;
  }
  .slider
  {
    position: relative;
    border-radius: 5px;
    height: 5px;
    overflow: visible;
    background-color: #d9d9d9;
  }
</style>
