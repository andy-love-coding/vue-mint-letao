import router from '@/router/index.js'

var myPlugin = {}
myPlugin.install = function (Vue) {
  Vue.prototype.$utils = {
    // 封装一个获取地址栏传参的方法
    GetParamsByUrl: () => {
      return router.currentRoute.query
    }
  }
}
// 暴露
export default myPlugin
