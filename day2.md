# 1.处理编程式路由跳转到当前路由（参数不变），多次执行会抛出NavigationDuplicated的警告错误
    
    (1)这类问题只有编程式导航有，声明式导航不存在这种问题（router-link底层已经处理好了）
    (2)vue-router引入了Promise，push/replace方法跳转后并没有对Promise对象的成功或失败编写相应的回调函数
    (3)通过给push/replace方法传递相应成功或失败的回调函数，可以捕获到当前的错误，就可以解决报错，但是这个方法治标不治本
    (4)this.$router是VueRouter类的一个实例，是在入口文件(main.js)注册路由时给组件实例添加的$router和$route这两个属性
    (5)this.$router身上没有push和replace方法，这两个方法在$router的原型对象上（$router.__proto__ 或 VueRouter.prototype）
    (6)所以push和replace方法的上下文(context)就是VueRouter的实例对象，所以要从根本上解决报错，就要重写$router的原型对象上的push方法

# 2.Home模块拆分：

    (1)准备静态页面
    (2)拆分静态组件
    (3)获取服务器数据进行展示
    (4)完成动态业务

# 3.三级联动组件的完成：

    由于三级联动在Home、Search、Detail都要用到，所以把三级联动注册为全局组件（注册一次，就可以在项目任意地方使用）

# 4.完成其余静态组件：

    三级联动全局组件（全局组件直接使用，不需要再引入）、轮播图和右侧边栏、今日推荐、排行榜、猜你喜欢、楼层、商标

# 5。POSTMAN测试接口：

    利用Postman工具进行测试，向服务器发送请求：如果服务器返回的code为200，代表服务器返回数据成功，如果服务器返回的code非200，则服务器返回数据失败

# 6.axios二次封装：

    为什么要二次封装：为了使用请求拦截器（在发请求前处理一些业务）和响应拦截器（服务器数据返回后处理一些业务）

    axios文件放在api文件夹下

    可以参考npm社区的axios文档编写

# 7.统一接口管理：

    项目小：可以在组件的生命周期函数中发请求

    项目大：可以在api文件夹下单独写一个index.js文件进行配置

    跨域问题：协议、域名、端口号不同的请求，称之为跨域，处理跨域问题一般有JSONP、CROS、配置代理三种方法，我们采用配置代理

# nprogress进度条的使用

    当开始发送请求时，进度条开始加载，服务器响应成功后，进度条加载完毕，应该用在拦截器中

# vuex状态管理

    vuex是官方提供的一个插件，是一个状态管理库，可以集中管理项目中组件共用的数据

    并不是所有的项目都需要vuex，如果项目很大，组件很多，数据很多，数据共用，最好使用vuex

    vuex的使用方法：
        // state是仓库存储数据的地方
        const state ={}
        // mutations是修改state的唯一手段
        const mutations = {}
        // actions用来处理各种action（action中可以书写业务逻辑）
        const actions = {}
        // getters可以理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
        const getters = {}

    vuex实现模块式开发：给每个组件拆分注册小仓库之后，在index.js中引入各个小仓库并暴露
        export default new Vuex.Store({
            // 实现vuex仓库模块式开发
            modules: {
                home,
                search,
                ......
            }
        })

# 10.完成TypeNavIndex三级联动展示数据业务

    在mounted生命周期函数中向服务器发送请求数据请求，通过vuex的actions和mutations将所获取到的数据存储在state中
    随后通过v-for遍历和使用state中的数据对页面进行渲染即可