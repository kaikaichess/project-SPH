# 1.vue-cli脚手架初始化项目（node+webpack+淘宝镜像）

    node_modules文件夹：项目依赖文件夹

    public文件夹：一般放置一些静态资源，webpack打包的时候，public中的文件会原封不动的打包到dist文件夹中

    src文件夹：源代码文件夹
    (1).assets文件夹：一般放置静态资源（一般放置多个组件共用的静态资源，在webpack打包时，会把assets中的文件当成一个模块，打包到JS文件中）
    (2).components文件夹：一般放置非路由组件或一些常用的全局组件
    (3).APP.vue：唯一的根组件
    (4).main.js：入口文件