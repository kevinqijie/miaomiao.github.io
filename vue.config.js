const path = require('path')

// function resolve(dir) {
//   return path.join(__dirname, dir)
// }

// 导入compression-webpack-plugin
const CompressionWebpackPlugin = require('compression-webpack-plugin')
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// const externals = {
//   'vue': 'Vue',
//   'vue-router': 'VueRouter',
//   'vuex': 'Vuex',
//   'axios': 'axios',
//   'ELEMENT': 'element-ui'
// }
// 定义压缩文件类型
const productionGzipExtensions = ['js', 'css']

module.exports = {
  publicPath: './', // 基本路径
  outputDir: 'dist',
  productionSourceMap: false,
  assetsDir: 'static',
  filenameHashing: true,
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html', // 这里用来区分加载那个 html
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') {
      // config.externals = externals
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8
        })
      //   new UglifyJsPlugin({
      //     uglifyOptions: {
      //       compress: {
      //         warnings: false,
      //         drop_debugger: true,
      //         drop_console: true,
      //       },
      //     },
      //     sourceMap: false,
      //     parallel: true,
      //   }),
      )
      const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
      config.plugins.push(new BundleAnalyzerPlugin())
    }
  },
  // CSS 相关选项
  css: {
    extract: true,
    sourceMap: false,
    loaderOptions: {}, // 为所有的 CSS 及其预处理文件开启 CSS Modules。
    modules: false
  },
  // 所有 webpack-dev-server 的选项都支持
  devServer: {
    // open: true, // 浏览器自动打开页面
    // host: '192.168.0.111', // 如果是真机测试，就使用这个IP
    // port: 8911,
    https: false,
    hotOnly: false, // 热更新（webpack已实现了，这里false即可）
    proxy: {
      // 配置跨域
      '/api': {
        target: 'http://39.97.33.178/api',
        ws: true,
        changOrigin: false,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  }
}
