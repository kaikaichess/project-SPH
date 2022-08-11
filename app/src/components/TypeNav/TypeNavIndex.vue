<template>
    <div class="type-nav">
        <div class="container">
            <div @mouseleave="leaveShow" @mouseenter="enterShow">
                <h2 class="all">全部商品分类</h2>
                <!-- 三级联动 -->
                <!-- 过渡动画 -->
                <transition name="sort">
                    <div class="sort" v-show="show">
                        <div class="all-sort-list2" @click="goSearch">
                            <div class="item" v-for="(c1, index) in categoryList" :key="c1.categoryId" :class="{cur: currentIndex === index}">
                                <h3 @mouseenter="changeIndex(index)">
                                    <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
                                </h3>
                                <div class="item-list clearfix" :style="{display: currentIndex === index ? 'block' : 'none'}">
                                    <div class="subitem" v-for="(c2) in c1.categoryChild" :key="c2.categoryId">
                                        <dl class="fore">
                                            <dt>
                                                <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
                                            </dt>
                                            <dd>
                                                <em v-for="(c3) in c2.categoryChild" :key="c3.categoryId">
                                                    <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
                                                </em>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
            
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    // 按需引入lodash中的节流函数
    import throttle from 'lodash/throttle.js'
    export default {
        name: 'TypeNavIndex',
        data() {
            return {
                // 存储用户鼠标所在的一级分类的index
                currentIndex: -1, // 使一开始不选中任何一个一级分类【一级分类范围为0~16】
                // 控制商品分类的显示与隐藏
                show: true
            }
        },
        computed: {
            ...mapState({
                categoryList: state => state.home.categoryList
            })
        },
        methods: {
            // 鼠标进入，修改响应式数据currentIndex
            // changeIndex(index) {
            //     this.currentIndex = index
            // },

            // 对changeIndex函数进行节流
            // 注意这里不要用箭头函数，防止出现this指向问题
            changeIndex: throttle(function(index) {
                this.currentIndex = index
            }, 50),

            // 鼠标离开的事件回调
            leaveShow() {
                this.currentIndex = -1
                // 如果当前不是在home路由下，则鼠标离开商品分类，三级联动隐藏
                if(this.$route.path != '/home') {
                    this.show = false
                }
            },
            // 进行路由跳转的方法（编程式导航+事件委派）
            goSearch(event) {
                // 给a子节点添加data-categoryName自定义属性，以便判断点击的是不是a标签，添加data-categoryId自定义属性来判断是几级分类
                // 获取点击对象
                let element = event.target
                // dataset可以获取元素的自定义属性，其值为一个对象，通过解构赋值获取categoryname(模板解析后会变成小写)等自定义属性
                let {categoryname, category1id, category2id, category3id} = element.dataset
                // 判断是否是a标签
                if(categoryname) {
                    // 整理路由跳转的参数
                    let location = {name: 'search'}
                    let query = {categoryName: categoryname}
                    if(category1id) {
                        // 判断是否是一级分类
                        query.category1Id = category1id
                    } else if(category2id) {
                        // 判断是否是二级分类
                        query.category2Id = category2id
                    } else {
                        // 判断是否是三级分类
                        query.category3Id = category3id
                    }
                    // 如果路由跳转的时候带有params参数也要带上一起跳转
                    if(this.$route.params) {
                        location.params = this.$route.params
                    }
                    // 整理参数
                    location.query = query
                    // 路由跳转
                    this.$router.push(location)
                }
            },
            // 鼠标移动到商品分类上，三级联动出现
            enterShow() {
                this.show = true
            }
        },
        // 组件挂载完毕即可向服务器发送请求
        mounted() {
            // 当组件挂载完毕时，如果不是home路由，就将商品分类初始值设为隐藏
            if(this.$route.path != '/home') {
                this.show = false
            }
        },
    }
</script>

<style scoped lang="less">
    .type-nav {
        border-bottom: 2px solid #e1251b;

        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 461px;
                position: absolute;
                background: #fafafa;
                z-index: 999;

                .all-sort-list2 {
                    .item {
                        h3 {
                            line-height: 27px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;

                            a {
                                color: #333;
                            }
                        }

                        .item-list {
                            display: none;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 415px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }

                        &:hover {
                            // .item-list {
                            //     display: block;
                            // }
                        }
                    }
                    .cur {
                        background-color: skyblue;
                    }
                }
            }

            // 过渡动画的样式
            // 过渡动画开始（进入）
            .sort-enter, 
            .sort-leave-to {
                height: 0;
                overflow: hidden;
            }
            // 过渡动画结束（进入）
            .sort-enter-to,
            .sort-leave {
                height: 461px;
                overflow: hidden;
            }
            // 定义过渡动画的时间、速率（进入）
            .sort-enter-active, 
            .sort-leave-active {
                transition: all .15s linear;
            }
        }
    }
</style>