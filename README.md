# 网易音乐 vue-ssr版本

## 目录结构
```
|- src 程序源文件
    |- api  客户端和服务器api文件
    |- assets  页面基础静态资源
    |- commons 公共JS、CSS
    |- components 公共的vue模块
    |- config  配置项
    |- directive 公共的vue指令
    |- filter  全局filter方法   
    |- router  路由控制 
    |- store   状态存放          
    |- pages   各个页面入口
    |- plugin  扩展方法
    |- app.js  创建vue实例
    |- App.vue 总入口
    |- entry-client.js 浏览器入口文件
    |- entry-server.js 服务端入口文件
    |- index.template.html 项目页面
|- server.js 创建服务端渲染器
|- node_modules node包文件
|- public 公共静态资源
|- build 开发环境和生产环境打包配置
    |- setup-dev-server 开发启动服务器
    |- webpack.client.config 浏览器端配置
    |- webpack.server.config  服务器端配置
|- dist 打包之后文件所在位置
|- doc 项目说明文档
    |- dev              
|- test 开发期间功能测试(暂时未添加)
    |- e2e 
    |- unit
```