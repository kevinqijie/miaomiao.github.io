<template>
    <div class="c" ref="com_movie">
       <ul class="list">
      <li v-for="item in cominglists" :key="item.id">
        <div class="informationbox">
          <img :src="item.img | setWH('120.180')">
          <div class="information">
            <h3>{{item.nm}}</h3>
          <p>{{ item.wish}}想看</p>
          <p>主演：{{item.star}}</p>
          <p>{{item.rt}} 上映</p>
          </div>
        </div>
        <div class="btn">预售</div>
      </li>
    </ul>
    </div>
</template>

<script>
import BScroll from 'better-scroll';
export default {
  name:'up-coming',
  data () {
    return {
      cominglists : ''
    }
  },
  methods:{
    getlist(){
      var cityId = JSON.parse(localStorage.getItem('city')).id
      this.axios.get('/api/movieComingList?cityId='+cityId)
      .then(res=>{
       if(res.data.msg === 'ok'){
         this.cominglists = res.data.data.comingList;
       }
      })
      .catch(err=>{
        console.log(err)
      })
      
    }
  },
  created(){
    this.getlist()
  },
  mounted(){
    this.$nextTick(()=>{
       new BScroll(this.$refs.com_movie,{})
    })
  }
}
</script>

<style scoped>
.c{

  height: 100%;
  overflow: hidden;
  overflow-y: auto;
}
.list {
  padding: 0 10px;
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

.btn{
  border-radius: 5px;
  text-align: center;
  background: #3c9fe6;
  color: #fff;
  font-size: 14px;
  padding: 10px;
}
</style>

