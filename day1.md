# 1.vue-cli脚手架初始化项目（node+webpack+淘宝镜像）

    node_modules文件夹：项目依赖文件夹

    public文件夹：一般放置一些静态资源，webpack打包的时候，public中的文件会原封不动的打包到dist文件夹中

    src文件夹：源代码文件夹
        (1).assets文件夹：一般放置静态资源（一般放置多个组件共用的静态资源，在webpack打包时，会把assets中的文件当成一个模块，打包到JS文件中）
        (2).components文件夹：一般放置非路由组件或一些常用的全局组件
        (3).APP.vue：唯一的根组件
        (4).main.js：入口文件
    
    babel.config.js：配置文件（与babel相关）

    package.json：项目信息文件（记录项目姓名、项目依赖、项目如何运行）

    package-lock.json：缓存型文件

    README.md：说明性文件

# 2.项目的其他配置

    1.项目运行后浏览器自动打开：
    ---package.json:
        "scripts": {
            "serve": "vue-cli-service serve --open",
            "build": "vue-cli-service build",
            "lint": "vue-cli-service lint"
        }

    2.eslint校验功能关闭：
    ---在根目录下的vue.config.js文件
        module.exports = defineConfig({
            transpileDependencies: true,
            lintOnSave: false
        })

    3.src文件夹简写方法，配置别名
    ---jsconfig.json配置别名@提示【@代表src文件夹】
    {
        "paths": {
            "@/*": [
                "src/*"
            ]
        }
    }

# 3.项目路由分析（vue-router）
    
    (1).前端所谓的路由：key-value键值对
        key：url(地址栏中的路径)
        value：相应的路由组件
    
    (2).路由组件和非路由组件：
        路由组件：Home（首页路由组件）、Search（搜索路由组件）、Login（登录路由组件）、Regist（注册路由组件）
        非路由组件：Header（头部组件）、Footer（底部组件）

# 4.完成非路由组件Header和Footer业务

    开发项目的步骤：
        (1).书写静态页面(HTML+CSS)
        (2).拆分组件
        (3).获取服务器的数据动态展示
        (4).完成相应的动态逻辑
    本项目不关注样式的书写，静态资源已提供，根据静态资源完成Header和Footer组件的结构搭建

# 5.路由组件的搭建

    路由组件经常放在pages/view文件夹中

    (1)配置路由：项目中配置的路由一般放置在router文件夹中
    (2)总结：
        路由组件和非路由组件的区别：路由组件需要在router文件夹中进行注册，通过<router-view>使用；而非路由组件直接以标签的形式使用
    (3)$route和$router：注册完路由之后，不管路由组件还是非路由组件身上都有$route和$router
        $route：一般获取路由信息（路径、query、param等）
        $router：一般进行编程式导航进行路由跳转（push、replace）
    (4)路由的跳转：一共有声明式导航和编程式导航两种
        声明式导航：router-link，可以进行路由的跳转（解析模板后为a标签）
        编程式导航：利用push、replace进行路由跳转（可以自己选择所要用到的标签）

# 6.Footer组件的显示与隐藏

    Footer组件：在Home、Search显示，在Login、Register隐藏
    我们可以根据组件身上的$route获取组件的路由信息，可以通过$route.path来判断FooterIndex的显示与隐藏
    但是更推荐配置路由元信息（meta，相当于自定义信息）

# 7.路由传参

    params参数：属于路径中的一部分，在配置路由的时候需要进行占位
    query参数：不属于路径中的一部分，类似于ajax中的queryString（/home?key1=value1&key2=value2...）

# 8.路由传参面试题：
    (1).路由传递参数（对象写法）path是否可以结合params参数一起使用?
        答：不可以，不能这样书写，程序会崩掉，要配合name进行跳转

    (2).如何指定params参数可传可不传? 
        答：通过占位符占位就要传递params参数，如果不传递params参数，跳转路径会出错；可以在占位符后加一个?代表该占位符所占位的params参数可传可不传

    (3).params参数可以传递也可以不传递时，如果传递的是空串，如何解决？
        答：params参数可以传递也可以不传递时传递的是空串，会造成跳转路径错误（params: {keyWord: ''}）
            可以通过或上一个undefined解决（params: {keyWord: '' || undefined}）

    (4).路由组件能不能传递props数据?
        答：可以，并且有三种方法
            //第一种写法：props值为对象，该对象中所有的key-value的组合最终都会通过props传给组件
            //第二种写法：props值为布尔值，布尔值为true，则把路由收到的所有params参数通过props传给组件
            //第三种写法：props值为函数，该函数返回的对象中每一组key-value都会通过props传给组件