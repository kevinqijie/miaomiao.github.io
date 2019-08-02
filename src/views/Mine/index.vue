<template>
 <div id='main'>
        <Header :title="title"/>
       <div class="content">
            <div>holle mine</div>
       </div>
        <Footer/>
    </div>
   
</template>

<script>
import Header from '@/components/header'
import Footer from '@/components/footer'
export default {
 name:'mine',
 data () {
     return {
        title:'我的' 
     }
 },
 components:{
     Header,
     Footer
 }
}
</script>

<style>

</style>
