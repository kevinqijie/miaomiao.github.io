<template>
    <header>
    {{title}}
    </header>
</template>

<script>
export default {
   name : 'Header',
   props: ['title']
}
</script>

<style scoped>
 header{
     width: 100%;
     height: 50px;
     background: red;
     color: #fff;
     text-align: center;
     line-height: 50px;
     font-weight: bold;
     z-index: 14;
 }
</style>
