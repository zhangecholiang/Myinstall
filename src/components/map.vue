<script setup lang="ts">
    import AMapLoader from "@amap/amap-jsapi-loader";
    import {ref, onMounted, onBeforeUnmount} from "vue";


</script>

<template>
    <div id="container"></div>
</template>

<style lang="less" scoped>
  #container{
    padding:0;
    margin: 0;
    width: 100%;
    height: 100vh;
  }
</style>