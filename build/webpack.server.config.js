const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

module.exports = merge(base, {
  target: 'node',
  // 对 bundle renderer 提供 source map 支持
  devtool: '#source-map',
  entry: './src/entry-server.js',
  output: {
    filename: 'server-bundle.js',
    // 此处告知 server bundle 使用 Node 风格导出模块(Node-style exports)
    libraryTarget: 'commonjs2'
  },
  resolve: {
    alias: {
      'create-api': './create-api-server.js'
    }
  },
  
  //防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖
  externals: nodeExternals({
    // do not externalize CSS files in case we need to import it from a dep
    whitelist: /\.css$/
  }),
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"'
    }),

    // 这是将服务器的整个输出
    // 构建为单个 JSON 文件的插件。
    // 默认文件名为 `vue-ssr-server-bundle.json`    
    new VueSSRServerPlugin()
  ]
})
