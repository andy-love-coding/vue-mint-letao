import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index.vue'
import Categories from '@/views/categories.vue'
import Cart from '@/views/cart.vue'
import User from '@/views/user.vue'
import Search from '@/views/search'
import SearchList from '@/views/searchList'
import Product from '@/views/product.vue'
import Login from '@/views/login.vue'

Vue.use(Router)

var router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'root',
      redirect: {name: 'index'}
    },
    // 首页
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    // 分类
    {
      path: '/categories',
      name: 'categories',
      component: Categories
    },
    // 购物车
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    // 个人中心
    {
      path: '/user',
      name: 'user',
      component: User
    },
    // 搜索页
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    // 搜索结果页
    {
      path: '/searchList',
      name: 'searchList',
      component: SearchList
    },
    // 产品详情页
    {
      path: '/product',
      name: 'product',
      component: Product
    }
  ]
})
export default router
