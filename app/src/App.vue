<template>
  <div>
    <HeaderIndex/>
    <h1>根组件</h1>
    <FooterIndex/>
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