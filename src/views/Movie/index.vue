<template>
  <div id="main">
    <Header :title="title" />

    <div class="TabBar">
      <router-link tag="div" to="/movie/city" class="city_name">
        <span>{{city.nm}}</span>
        <i class="iconfont icon-lower-triangle"></i>
      </router-link>
      <div class="hot_swtich">
        <router-link tag="div" to="/movie/hotMovie" class="hot_item">正在热映</router-link>
        <router-link tag="div" to="/movie/upcoming" class="hot_item active">即将上映</router-link>
      </div>
      <router-link tag="div" to="/movie/search" class="search_entry">
        <i class="iconfont icon-sousuo"></i>
      </router-link>
    </div>
    <div class="content">
      <!-- <keep-alive> -->
      <router-view />
      <!-- </keep-alive> -->
    </div>
    <div class="takuang" v-if="keys">
      <p>
        当前定位城市：
        <span>{{Location.nm}}</span>
      </p>
      <div class="tip">是否切换？</div>
      <span @touchstart="changek">切换</span>
      <span @touchstart="closek" class="colse">取消</span>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/header";
import Footer from "@/components/footer";
import BScroll from "better-scroll";
export default {
  name: "movie",
  data() {
    return {
      title: "喵喵电影",
      city: {
        // nm: "唐",
        // id: 12
      },
      Location: "",
      keys: false
    };
  },
  components: {
    Header,
    Footer
  },
  created(){
    this.axios.get("http://39.97.33.178/api/getLocation").then(res => {
      if (res.data.msg == "ok") {
        this.Location = res.data.data;
        // console.log(this.Location.id, 1);
        var cid = this.city.id,
          lid = this.Location.id;
        // console.log(cid === lid, 2);
        if (cid == lid) {
          this.keys = false;
        } else {
          this.keys = true;
        }
      }
    });
    if (localStorage.getItem("city")) {
      this.city = JSON.parse(localStorage.getItem("city"));
    }
  },
  mounted() {
    
    
    
  },
  methods: {
    closek() {
      this.keys = false;
    },
    changek() {
      this.city = this.Location;
      var s = JSON.stringify(this.Location);
      localStorage.setItem("city", s);
      window.location.reload();
      this.closek();
    }
  }
  
};
</script>

<style scoped>
.TabBar{
  height: 44px;
  padding: 0 10px;
  box-sizing: border-box;
  display: flex;
  width: 100%;
}
.TabBar >div {
  height: 44px;
  line-height: 44px;
  text-align: center;
}
.TabBar .router-link-active {
  color: red;
  border-bottom: 2px solid red;
}
.TabBar .city_name {
  width: 80px;
}
.TabBar .hot_swtich {
  flex: 1;
  display: flex;
  justify-content: space-around;
}

.TabBar .search_entry {
  width: 80px;
}
.takuang {
  width: 200px;
  height: 150px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #eee;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 5px;
  box-shadow: 5px 5px 5px #888888;
}
.takuang p {
  text-align: center;
  font-size: 18px;
  font-weight: bold;
}
.takuang p span {
  color: aqua;
}
.takuang .tip {
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
}
.takuang > span {
  position: absolute;
  bottom: 10px;
  display: inline-block;
  padding: 5px;
  width: 60px;
  border: 1px solid #000;
  text-align: center;
  border-radius: 3px;
}
.takuang > span.colse {
  right: 10px;
}
/* .router-view{
height: 100%;
overflow: hidden;
} */
</style>
