<template>
  <div  class="c" ref="hot_movie">
    <ul class="list">
      <li v-for="item in movielists" :key="item.id">
        <div class="informationbox">
          <img :src="item.img | setWH('120.180')">
          <div class="information">
            <h3>{{item.nm}}</h3>
          <p>评分：<span>{{item.sc}}</span></p>
          <p>主演：{{item.star}}</p>
          <p>{{item.showInfo}}</p>
          </div>
        </div>
        <div class="btn" @touchstart='set()'>购票</div>
      </li>
    </ul>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
export default {
  name: "HotMovie",
  data () {
    return {
      movielists : ''
    }
  },
  methods:{
    getlist(){
      var cityId = JSON.parse(localStorage.getItem('city')).id
      // console.log(cityId)
      this.axios.get('/api/movieOnInfoList?cityId='+cityId)
      .then(res=>{
       if(res.data.msg === 'ok'){
         this.movielists = res.data.data.movieList;
       }
      })
      .catch(err=>{
        console.log(err)
      })
      
    },
    set(){
      // console.log(1)
      // if(localStorage.getItem('token')){
      //   this.$router.push('/movie/upcoming')
      // }else{
        // this.$router.push('/mine')
        // localStorage.setItem('token','1')
      // }
    }
  },
  created(){
    this.getlist()
  }, 
  mounted(){
    this.$nextTick(()=>{
     new BScroll(this.$refs.hot_movie,{
       
     })
    });

  }
}
</script>

<style scoped>
.list {
  padding: 0 10px;

}
.c{

  height: 100%;
  overflow: hidden;
  overflow-y: auto;
}
.list li {
  width: 100%;
  
  padding: 10px 0;
  border-bottom: 1px solid #777;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.informationbox {
  display: flex;
}
.informationbox img{
  float: left;
  height: 90px;
  margin-right: 5px;
}
.information h3{
   width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.information p{
  font-size: 13px;
  color: #666;
  line-height: 22px;
  width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.information p span{
  font-size: 15px;
  font-weight: 700;
  color: #faaf00
}
.btn{
  
  border-radius: 5px;
  text-align: center;
  background: #f03d37;
  color: #fff;
  padding: 10px;
}
</style>
