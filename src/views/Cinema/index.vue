<template>
  <div id="main">
    <Header :title="title" />
    <div class="TabBar">
      <router-link tag="div" to="/movie/city" class="city_name">
        <span>全城</span>
        <i class="iconfont icon-lower-triangle"></i>
      </router-link>
      <div class="hot_swtich">
        <!-- <router-link tag="div" to="/movie/hotMovie" class="hot_item">正在热映</router-link>
        <router-link tag="div" to="/movie/upcoming" class="hot_item active">即将上映</router-link>-->
        <span>品牌</span>
        <i class="iconfont icon-lower-triangle"></i>
      </div>
      <router-link tag="div" to="/movie/search" class="search_entry">
        <span>特色</span>
        <i class="iconfont icon-lower-triangle"></i>
      </router-link>
    </div>
    <div class="content">
      <!-- <div>holle cinema</div> -->
      <ul>
        <li v-for="item in cinemas" :key="item.id">
          <div class="list">
           <span class="title">{{item.nm}}</span>
              <span class="m">{{item.sellPrice}}元起</span><br>
            <p>{{item.addr}}</p>
            <p>
               <span>折扣卡</span>              
            </p>
          </div>
          <div class="juli">{{item.distance}}</div>
        </li>
      </ul>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/header";
import Footer from "@/components/footer";
export default {
  name: "cinema",
  data() {
    return {
      title: "喵喵影院",
      cinemas: ""
    };
  },
  components: {
    Header,
    Footer
  },
  methods: {
    getcinmealist() {
        var cityId = JSON.parse(localStorage.getItem('city')).id
      this.axios.get("/api/cinemaList?cityId="+cityId).then(res => {
        if (res.data.msg == "ok") {
          this.cinemas = res.data.data.cinemas;
        }
      });
    }
  },
  created() {
    this.getcinmealist();
  }
};
</script>

<style scoped>
.TabBar div {
  height: 44px;
  line-height: 44px;
  text-align: center;
}
.TabBar .router-link-active {
  color: red;
  border-bottom: 2px solid red;
}
.TabBar .city_name {
  flex: 1;
}
.TabBar .hot_swtich {
  flex: 1;
  display: flex;
  justify-content: center;
}

.TabBar .search_entry {
  flex: 1;
}
.content ul{
    height: 100%;
    width: 100%;
    overflow: hidden;
    overflow-y: auto;
}
.content ul li {
  width: 100%;

  padding: 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
  border-bottom:1px dotted #d7d7d7;
}
.content ul li .list{
width: 300px;

box-sizing: border-box;
}
.content ul li .list .title{
    width: 200px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.content ul li .list p {
  font-size: 18px;
  width: 250px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  height: 40px;
  color: #d7d7d7;
  line-height: 40px;
}
.list .title{
    display: inline-block;
    color: #000;
    font-size: 20px;
}
.list .m {
  color: red;
}
.list p span{
    /* padding: 5px; */
    margin: 5px;
    border: 1px solid #f90;
    color:#f90;
}
.juli {
    color: #d7d7d7
}
</style>
