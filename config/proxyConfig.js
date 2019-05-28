// const config = require("./config");  //路径你们改下
module.exports = {
  proxy: {
    '/api': {    //将服务端接口域名印射为/api
      target: 'http://172.16.33.47:8089',  // 服务端接口域名和端口号
    secure: false,  // 如果是https接口，需要配置这个参数
    changeOrigin: true,  //是否跨域
    pathRewrite: {
      '^/api': ''   //需要rewrite的
    }
  }
}
}
