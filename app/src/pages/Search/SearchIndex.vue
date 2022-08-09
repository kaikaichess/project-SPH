<template>
    <div>
        我是搜索
        <div>
            <h1>params: {{$route.params.keyWord}}</h1>
            <h1>query: {{$route.query.keyWord}}</h1>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'SearchIndex'
    }
</script>

<style>

</style>