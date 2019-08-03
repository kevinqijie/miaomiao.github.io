<template>
  <div class="Search">
    <input type="text" placeholder="主演/剧名" v-model="magess" />
    <div class="contents">
      <h3>电影</h3>
      <ul class="list">
        <li v-for="item in movies" :key="item.id">
          <div class="informationbox">
            <img :src="item.img | setWH('120.180')" />
            <div class="information">
              <h3>{{item.nm}}</h3>
              <p>{{item.enm}}</p>
              <p>{{item.cat}}</p>
              <p>{{item.rt}}</p>
            </div>
          </div>
          <div class="btn">购票</div>
        </li>
      </ul>
    
    </div>
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      magess: "",
      movies: ""
      // cinema:''
    };
  },
  methods:{
    cancelRequest(){
            if(typeof this.source ==='function'){
                this.source('终止请求')
            }}

  },
  watch: {
    magess(val) {
     var that = this;
      // 取消上一次请求
      this.cancelRequest();
      this.axios
        .get("/api/searchList?cityId=10&kw=" + val, {
          cancelToken: new this.axios.CancelToken(function executor(c) {
            that.source = c;
          })
        })
        .then(res => {
          if (res.data.msg == "ok") {
            this.movies = res.data.data.movies.list;
            //  this.cinema = JSON.parse(JSON.stringify(res.data.data.cinemas))
            //  console.log(this.cinema.list)
          }
        })
        .catch(err => {
          if (this.axios.isCancel(err)) {
            console.log("Rquest canceled", err.message); //请求如果被取消，这里是返回取消的message
          } else {
            console.log(err);
          }
        });
    }
  }
};
</script>

<style scoped>
.Search {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  height: 100%;
}
.contents {
  flex: 1;
  width: 100%;
  overflow: hidden;
  overflow-y: auto;
}
input {
  width: 90%;
  margin: 10px auto;
  outline: none;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
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
.informationbox img {
  float: left;
  height: 90px;
  margin-right: 5px;
}
.information h3 {
  width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.information p {
  font-size: 13px;
  color: #666;
  line-height: 22px;
  width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.information p span {
  font-size: 15px;
  font-weight: 700;
  color: #faaf00;
}
.btn {
  border-radius: 5px;
  text-align: center;
  background: #f03d37;
  color: #fff;
  padding: 10px;
}
</style>
