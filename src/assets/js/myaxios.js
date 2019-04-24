import Axios from 'axios'
var myPlugin = {}
myPlugin.install = function (vue) {
  // 创建axios实例
  var instance = Axios.create({
    // 开发环境中跨域解决方法：/api 代理成了 http://home.test:3000（代理在config/index.js中设置），这是 vue 内置的 devServer 服务器作为代理服务器，尤其代理请求实现了跨域
    // 生产环境中跨域还需要在服务器中设置
    baseURL: process.env.NODE_ENV === 'development' ? '/api' : 'http://home.test:3000'
  })
  // axios 拦截器：返回结果之时做一下拦截（请求接口前做登录拦截，对于需要登录的接口才会拦截，哪些接口需要登录拦截是后端决定的）
  instance.interceptors.response.use(
    response => {
      if (response.data.error === 400) { // 这里 400 是服务器返回数据中自定义的 400，不是 http 状态码
        // console.log('未登录（需要登录才可以请求的接口，如果没有登录请求该接口，response.data.error 显示 400）')
        window.location.href = '/#/login?returnUrl=' + encodeURIComponent(location.href) // 跳转至 hash 路由, 并传递前网址
      } else {
        console.log('已登录，或者这是不需要拦截的接口')
      }
      return response
    },
    error => {
      console.log('拦截器error错误了') // 如果服务器异常，http 状态码如果 404 等，才会走到这一步
      console.log(error)
      return Promise.reject(error)
    }
  )
  vue.prototype.$http = instance
}
// 暴露
export default myPlugin
