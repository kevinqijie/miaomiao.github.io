<template>
 <div class="city">
    <div class="citylistbox" ref="com_movie">
    <div ref="city_list">
      <h2>热门城市</h2>
      <div class="hotcity">
        <ul>
          <li v-for="item in hotcitylist" :key="item.id" @tap="postcity(item)">{{item.nm}}</li>
        </ul>
      </div>
      <h2>城市列表</h2>

      <div v-for="it in citylists" :key="it.index" class="list">
        <h3>{{it.index}}</h3>
        <ul>
          <li v-for="items in it.list" :key="items.id" @tap="postcity(items)">
           {{items.nm}}
          </li>
        </ul>
      </div>
     
    </div>
  </div>
   <div class="indexlist">
        <ul>
          <li v-for="(it,i) in citylists" :key="it.index" @touchstart="toscroll(i)">{{it.index}}</li>
        </ul>
      </div>
 </div>
</template>

<script>
import BScroll from 'better-scroll';
export default {
  name: "City",
  data() {
    return {
      hotcitylist: [],
      citylists: []
    };
  },
  methods: {
    getcitylsit() {
      this.axios
        .get("/api/cityList")
        .then(res => {
          if (res.data.msg === "ok") {
            var citys = res.data.data.cities;
            var citylist = [];
            for (var i in citys) {
              var first = citys[i].py.substring(0, 1).toUpperCase();
              if (citys[i].isHot == 1) {
                this.hotcitylist.push(citys[i]);
              }
              if (tocomm(first)) {
                citylist.push({
                  index: first,
                  list: [citys[i]]
                });
              } else {
                for (var j in citylist) {
                  if (citylist[j].index == first) {
                    citylist[j].list.push(citys[i]);
                  }
                }
              }
            }
            this.citylists = citylist.sort((a, b) => {
              if (a.index > b.index) {
                return 1;
              } else {
                return -1;
              }
            });
            function tocomm(f) {
              for (let i in citylist) {
                if (citylist[i].index == f) {
                  return false;
                }
              }
              return true;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    toscroll(x) {
      var h3 = this.$refs.city_list.getElementsByTagName("h3");
      this.$refs.city_list.parentNode.scrollTop = h3[x].offsetTop - 95;
      // console.log(x, h3);
    },
    postcity(s) {
      var j = JSON.stringify(s)
      localStorage.setItem("city", j);
      // this.$router.path('/movie')
      this.$router.push('/')
     this.$router.go(0)
      // console.log(JSON.parse(localStorage.getItem('city')))
      // console.log(s);
    }
  },
  created() {
    this.getcitylsit();
  },
   mounted(){
    this.$nextTick(()=>{
       new BScroll(this.$refs.com_movie,{
         tap:true
       })
    })
  }
};
</script>

<style scoped>
.city{
  height: 100%;
  overflow: hidden;
}
.citylistbox {
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
}
.hotcity ul {
  width: 90%;
  display: flex;
  flex-wrap: wrap;
}
.hotcity ul li {
  width: 60px;
  height: 30px;
  background: #ccc;
  border-radius: 5px;
  line-height: 30px;
  text-align: center;
  margin: 10px 10px 10px 30px;
}
.citylistbox .list h3 {
  width: 100%;
  height: 30px;
  background: rgba(200, 200, 200, 0.5);
  line-height: 30px;
  padding-left: 10px;
  box-sizing: border-box;
}
h2 {
  padding: 10px;
}
.citylistbox .list ul li {
  height: 20px;
  line-height: 20px;
  padding-left: 10px;
  box-sizing: border-box;
  font-size: 14px;
}
.indexlist {
  padding: 95px 0 50px 0;
  box-sizing: border-box;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1;
  background: rgba(200, 200, 200, 0.8);
  height: 100%;
  font-size: 14px;
}
.indexlist ul {
  display: flex;
  flex-direction: column;
  justify-content:space-between;
  height: 100%;
  /* box-sizing: border-box; */
}
.indexlist ul li {
  width: 30px;
  /* height: 20px;
  line-height: 20px; */
  text-align: center;
}
</style>
