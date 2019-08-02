<template>
  <footer>
    <ul>
      <router-link tag="li" to='/movie'>
        <i class="iconfont icon-dianying"></i>
        <p>电影</p>
      </router-link>
      <router-link tag="li" to='/cinema'>
        <i class="iconfont icon-yingyuan"></i>
        <p>影院</p>
      </router-link>
      <router-link tag="li" to="/mine">
        <i class="iconfont icon-wode"></i>
        <p>我的</p>
      </router-link>
    </ul>
  </footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style scoped>
footer {
  width: 100%;
  height: 50px;
  background: #d7d7d7;
  z-index: 14;
  position: fixed;
  bottom: 0;
  left: 0;
}
ul{
display: flex;
}
ul li{
    text-align: center;
    width: 33.3%;
    /* color: red; */
}
ul .router-link-active{
    color: red;
}
</style>
