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
    components: { HeaderIndex, FooterIndex },
    mounted() {
      // 通知Vuex发送请求，获取数据，存储在仓库中
      // 请求如果放在TypeNavIndex组件中在每次向使用到TypeNavIndex的页面跳转时，组件挂载后都会调用发起请求，所以放在APP组件中，就只请求一次即可
      this.$store.dispatch('categoryList')
    }
  }
</script>

<style>

</style>