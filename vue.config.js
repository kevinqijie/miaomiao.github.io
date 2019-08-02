module.exports = {
  publicPath: '/',
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
        changOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  }
}
