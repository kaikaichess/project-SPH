<template>
    <div>
        <!-- 三级联动全局组件（全局组件直接使用，不需要再引入） -->
        <TypeNavIndex/>
        <!-- 轮播图和右侧边栏 -->
        <ListContainerIndex/>
        <!-- 今日推荐 -->
        <RecommendIndex/>
        <!-- 排行榜 -->
        <RankIndex/>
        <!-- 猜你喜欢 -->
        <LikeIndex/>
        <!-- 楼层 -->
        <FloorIndex/>
        <FloorIndex/>
        <!-- 商标 -->
        <BrandIndex/>
    </div>
</template>

<script>
    import ListContainerIndex from './ListContainer/ListContainerIndex.vue'
    import RecommendIndex from './Recommend/RecommendIndex.vue'
    import RankIndex from './Rank/RankIndex.vue'
    import LikeIndex from './Like/LikeIndex.vue'
    import FloorIndex from './Floor/FloorIndex.vue'
    import BrandIndex from './Brand/BrandIndex.vue'
    export default {
        name: "HomeIndex",
        components: { ListContainerIndex, RecommendIndex, RankIndex, LikeIndex, FloorIndex, BrandIndex }
    }
</script>

<style>

</style>