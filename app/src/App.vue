<template>
  <div>
    <HeaderIndex/>
    <!-- 路由组件出口 -->
    <router-view></router-view>
    <!-- 在Home和Search下显示，在Login和Regi下隐藏 -->
    <FooterIndex v-show="$route.meta.show"/>
  </div>
</template>

<script>
  import HeaderIndex from './components/Header/HeaderIndex.vue'
  import FooterIndex from './components/Footer/FootIndex.vue'
  export default {
    name: 'App',
    components: {
      HeaderIndex,
      FooterIndex
    }
  }
</script>

<style>

</style>