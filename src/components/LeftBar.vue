<template>
<div class="left-part">
  <div class="menublock" :class="{closed:menu.closed}" v-for="menu in menulist">
    <h6 v-on:click="menulist.forEach((m)=>{m.closed=true});menu.closed=false;">{{menu.title}}</h6>
    <div class="listcontiner" :style="{'height':menu.list.length*30+'px'}">
      <div class="list" :class="{select:(select==li.target)}" v-for="li in menu.list" v-on:click="li.target?go(li.target):(li.onclick?doclick(li.onclick):'')">
        <div class="selectmark" v-show="(select==li.target)"></div>
        <div :class="li.iconname" class="icon"></div>
        <div class="title">{{li.title}}</div>
      </div>
    </div>
  </div>


</div>
</template>

<script>
import config from "../config"
export default {
  name: 'LeftBar',
  data() {
    return {
      menulist: [{
          title: "推荐",
          closed: false,
          list: [{
              target: "/index",
              iconname: "find",
              title: "发现音乐"
            }
          ]
        },
      ],
      select: "index",
    }
  },
  methods: {
    go(target) {
      this.$router.push({
        path: target
      });
    },
    doclick(str) {
      eval(str);
    }

  },
  watch: {
    $route() {
      console.log(this.$route);
      this.select = this.$route.matched && this.$route.matched[0] && this.$route.matched[0].name;
      console.log('select:' , this.select)
    }

  }
}
</script>

<style scoped>
.left-part {
  width: 100%;
  height: 100%;
}

.menublock {
  width: 100%;
  margin-bottom: 5px;
  display: inline-block;
}

.menublock h6 {
  text-align: left;
  color: #333;
  font-weight: normal;
  font-size: 23px;
  padding: 10px 0px 5px 20px;
}

.menublock.closed h6 {
  color: #666666;
}

.menublock .list {
  height: 30px;
  padding: 5px;
  text-align: left;
  font-size: 14px;
  cursor: pointer;
}

.menublock .listcontiner {
  transition: height 0.5s;

  overflow: hidden;
}

.menublock.closed .listcontiner {
  height: 0px!important;
}

.menublock .list .icon {
  width: 20px;
  height: 20px;
  display: inline-block;
  background-position: center;
  background-size: 80%;
  background-repeat: no-repeat;
  float: left;
  margin-left: 20px;
  cursor: pointer;
}

.menublock .list .selectmark {
  width: 4px;
  height: 20px;
  background: #4fc08d;
  float: left;
  margin-left: -5px;
}

.menublock .list .title {
  cursor: pointer;
  height: 20px;
  display: inline-block;
  float: left;
  margin-left: 5px;
}

.menublock .list .icon.find {
  background-image: url('../assets/images/music.png');
}

.menublock .list.select {
  background-color: #cccccc;
}
</style>
