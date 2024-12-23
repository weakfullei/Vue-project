const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: '0.0.0.0', // 允许所有地址访问
    port: 8080, // 你可以指定一个端口
    allowedHosts: 'all',
  },
  lintOnSave: false,
  // 代理 用于解决跨域问题
    devServer: {
    proxy: {
      '/api': {
        target: 'http://https://v1.hitokoto.cn',//产生跨域的地址
        changeOrigin: true
      },
      '/api2': {
        target: 'https://cx.shouji.360.cn',//产生跨域的地址
          changeOrigin: true
        }
      }
    }
})
