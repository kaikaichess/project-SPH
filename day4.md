# 1.开发Search模块中的TypeNavIndex商品分类菜单

    通过判断this.$route.path是否为home路由来改变TypenavIndex页面中三级联动的显示和隐藏
    过渡动画的前提是组件中有元素使用了v-if或者v-show指令才可以设置过渡动画

# 2.优化TypeNavIndex发送请求

    请求如果放在TypeNavIndex组件中在每次向使用到TypeNavIndex的页面跳转时，组件挂载后都会调用发起请求，所以放在APP组件中，就只请求一次即可

# 3.合并params和query参数

    必须保证向search路由跳转时，三级联动的query参数和搜索框中的params参数都会被一同携带传递

# 4.开发Home首页当中的ListContainer组件与Floor组件

    注意：服务器只返回了三级联动的数据，对于ListContainer和Floor服务器是没有提供数据的，所以我们采用mock模拟一下数据
    如果要mock数据，就需要用到mockjs插件，而前端mock的数据不会和服务器进行任何的通信
    
    mockjs的使用步骤：
        (1)在项目的src中创建一个mock文件夹
        (2)准备JSON假数据（在mock文件夹中创建响应的JSON文件，并且需要格式化一下，不能留有空格，否则跑步起来）
        (3)把mock数据用到的图片放到public文件夹下（因为public在打包时会把其中的文件原封不动的放到dist文件夹下）
        (4)创建mockServe.js，开始通过mockjs插件来虚拟数据
        (5)把mockServe.js文件在入口文件中引入（至少需要执行一次，才能模拟数据）

# 5.利用swiper插件实现轮播图

    (1).引包（相应的JS和CSS），若有多个组件要用，就在入口文件处引入
    (2).页面结构务必要有，并且类名保持是swiper的类名不要修改
    (3).初始化swiper实例（new Swiper），给轮播图添加动态效果

# 6.ListContainer组件开发的重点

    (1).安装swiper插件（最好别安装最新版本，不稳定）
    (2).注意初始化swiper实例不能直接写在mounted生命周期函数中，因为mounted中有this.$store.dispatch这个异步请求导致v-for遍历时结构还不完整
    (3).利用watch监听轮播图数据的获取，并且，获取到数据后还要考虑v-for是否将数据遍历完全，所以还需要nextTick
    (4).利用nextTick，保证轮播图结构完整，再初始化swiper实例
