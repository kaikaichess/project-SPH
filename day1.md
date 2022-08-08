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
        (2)。拆分组件
        (3)。获取服务器的数据动态展示
        (4).完成相应的动态逻辑