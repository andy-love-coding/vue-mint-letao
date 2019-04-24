<template>
  <div class="lt_container">
    <!-- 头部组件: Header 接收参数 hasWings，参数值：both/left/right/none -->
    <Header hasWings="both" iconType="fa fa-search" routeName="search" title="商品列表"/>
    <!-- 中间部分 -->
    <div class="lt_content for_search_list">
      <div class="lt_wrapper">
        <!-- 注意：滚动组件 mint-loadMore 的父容器必须设置高度 -->
        <!-- mint-loadmore 配置参考网址: https://github.com/mint-ui/mint-loadmore -->
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :autoFill="isAutoFill" :topPullText="topPullText" :bottomPullText="bottomPullText" :topDropText="topDropText" :bottomDropText="bottomDropText">
          <!-- 搜索框 -->
          <div class="lt_search">
            <input type="search" placeholder="根据商品关键字进行搜索" v-model="inputValue">
            <a href="javascript:;" @click="search">搜索</a>
          </div>
          <!-- 排序区域 -->
          <div class="lt_order" @click="orderChange">
            <a data-type="time" href="javascript:;" class="now">上架时间 <span class="fa fa-angle-down"></span></a>
            <a data-type="price" href="javascript:;">价格 <span class="fa fa-angle-down"></span></a>
            <a data-type="num" href="javascript:;">销量 <span class="fa fa-angle-down"></span></a>
            <a data-type="sale" href="javascript:;">折扣 <span class="fa fa-angle-down"></span></a>
          </div>
          <!-- 产品区域 -->
          <div class="lt_product">
            <ul class="clearfix" v-if="isLoading">
              <p class="loading">
                <mt-spinner type="fading-circle" size="17"></mt-spinner>
                <span class="loadingText">正在加载中...</span>
              </p>
            </ul>
            <ul class="clearfix" v-if="productList.length">
              <li v-for="item in productList" :key="item.id">
                <router-link :to="{name: 'product', query: {productId: item.id}}" class="lt_proBox">
                  <img :src="item.defaultPicAddr" alt="">
                  <p class="name ellipsis-2">{{ item.proName }}</p>
                  <p class="price">
                    <span class="nowPrice">{{ item.price }}</span>
                    <span class="oldPrice">{{ item.oldPrice }}</span>
                  </p>
                  <mt-button type="primary" size="small">立即购买</mt-button>
                </router-link>
              </li>
            </ul>
            <ul class="clearfix" v-if="!isLoading && productList.length === 0">
              <p class="loading">很遗憾，没有您要找的商品</p>
            </ul>
          </div>
          <!-- 底线区 -->
          <div class="nomore" v-if="allLoaded">
            <span class="line"></span>
            <span class="lineText">
              我是有底线的
            </span>
          </div>
        </mt-loadmore>
      </div>
    </div>

  </div>
</template>

<script>
// 引入头部组件
import Header from '@/components/header.vue'
// 引入自定义插件：getParamsByUrl
import Vue from 'vue'
import GetParamsByUrl from '@/assets/js/utils.js'
// 注册 GetParamsByUrl 插件
Vue.use(GetParamsByUrl)
export default {
  data () {
    return {
      isLoading: false,
      productList: [],
      arr: [1, 2],
      allLoaded: false, // 数据是否已经加载完毕，加载完毕后，将禁用“上拉加载更多”
      isAutoFill: false, // 页面初始化时，是否自动触发上拉加载更多
      topPullText: '↓ 下拉刷新',
      topDropText: '↑ 释放更新',
      bottomPullText: '↑ 上拉加载更多',
      bottomDropText: '↓ 释放更新',
      proName: '', // 搜索关键字
      page: 1,
      pageSize: 4,
      orderType: 'time',
      orderValue: 2,
      // 搜索区
      inputValue: '',
      KEY: 'key_search_keywords', // 约定好 localstorage 的存储key
      list: [] // 历史记录
    }
  },
  created () {
    this.inputValue = decodeURIComponent(this.$utils.GetParamsByUrl().key) || '' // 绕个路，自己封装一个插件来获取 路由参数
    // this.inputValue = decodeURIComponent(this.$route.query.key) || '' // 直接用 $route 获取路由参数
    this.proName = this.inputValue
    // 开始加载：这个放在 refresh() 的外面是为了避免下拉刷新时，出现2个加载中的圆圈效果（一个是下拉加载自动的圆圈，一个是自定义isLoading的spinner的圆圈）
    this.isLoading = true
    this.refresh()
    this.list = JSON.parse(localStorage.getItem(this.KEY) || '[]')
  },
  methods: {
    // 下拉刷新
    loadTop () {
      this.refresh()
    },
    // 上拉加载更多
    loadBottom () {
      this.loadMore()
    },
    // 刷新
    refresh () {
      // 重置 allLoaded page
      this.allLoaded = false
      this.page = 1
      var params = {
        proName: this.proName,
        page: this.page,
        pageSize: this.pageSize
      }
      params[this.orderType] = this.orderValue
      this.$http({
        url: '/product/queryProduct',
        method: 'get',
        params: params
      }).then(res => {
        // 模拟网络很慢
        setTimeout(() => {
          res.data.data.forEach(element => { // 为每个产品加一个封面图片
            element.defaultPicAddr = 'http://home.test:3000/mobile/images/none01.jpg'
            if (element.pic && element.pic[0] && element.pic[0].picAddr) {
              element.defaultPicAddr = 'http://home.test:3000' + element.pic[0].picAddr
            }
          })
          this.productList = res.data.data
          this.isLoading = false // 加载结束
          this.$refs.loadmore.onTopLoaded() // 必须有这一句，表示下拉刷新结束
        }, 1500)
      })
    },
    // 加载更多
    loadMore () {
      this.page++
      var params = {
        proName: this.proName,
        page: this.page,
        pageSize: this.pageSize
      }
      params[this.orderType] = this.orderValue
      this.$http({
        url: '/product/queryProduct',
        method: 'get',
        params: params
      }).then(res => {
        // 模拟网络很慢
        setTimeout(() => {
          // 如果请求到数据则累加
          if (res.data.data.length) {
            res.data.data.forEach(element => { // 为每个产品加一个封面图片
              element.defaultPicAddr = 'http://home.test:3000/mobile/images/none01.jpg'
              if (element.pic && element.pic[0] && element.pic[0].picAddr) {
                element.defaultPicAddr = 'http://home.test:3000' + element.pic[0].picAddr
              }
            })
            // 产品列表累加
            this.productList = this.productList.concat(res.data.data)
          }
          // 如果产品列表长度 等于 数据库总产品条数，则表示已经加载完所所有数据
          if (this.productList.length === res.data.count) {
            this.allLoaded = true
          }
          // 必须有这一句，表示上拉加载结束。
          // 【注意】: onBottomLoaded() 这一句必须放在异步回调(then)之中，如果放在then之后，会导致上拉加载提前结束，结束后再给this.productList赋值，再驱动渲染页面。
          // 这样做会导致：先结束了上拉加载效果，然后再增加更多内容来渲染页面，而此时由于上拉已经结束了，后面的页面渲染不会使mint-loadmore组件发生位移，也就是加载的更多内容，不会漏出来。
          this.$refs.loadmore.onBottomLoaded()
        }, 1500)
      })
    },
    // 追加搜索历史，跳转搜索列表页
    search () {
      // 1.校验数据
      if (!this.inputValue) {
        // 友好提示
        this.$toast('请输入搜索关键字')
        // 终止执行
        return
      }
      // 2.跳转
      // 注意对【传参】进行URL编码，以过滤特殊字符的影响，如 & 、 = 等
      // window.location.href = '/searchList?key=' + encodeURIComponent(this.inputValue)
      this.$router.push({name: 'searchList', query: {key: encodeURIComponent(this.inputValue)}})
      // 3.刷新：上一步跳转的路由没有变化，知识参数变化，所有没有向后端请求数据，这里主动请求刷新一下
      this.proName = this.inputValue
      this.productList = []
      // 开始加载：这个放在 refresh() 的外面是为了避免下拉刷新时，出现2个加载中的圆圈效果（一个是下拉加载自动的圆圈，一个是自定义isLoading的spinner的圆圈）
      this.isLoading = true
      this.refresh()
      // 4.追加历史
      this.add()
    },
    // 追加搜索历史
    add () {
      var isSame = false
      var sameIndex = null
      this.list.forEach((element, i) => {
        if (element === this.inputValue) {
          isSame = true
          sameIndex = i
        }
      })
      if (isSame) {
        // 有重复：先删除，后追加
        this.list.splice(sameIndex, 1)
      } else {
        // 没有重复
        if (this.list.length >= 10) {
          // 超过10条，先删除最早的一条，再追加
          this.list.splice(this.list.length - 1, 1)
        }
      }
      // 追加
      this.list.unshift(this.inputValue) // 数组头部插入
      // 存储
      window.localStorage.setItem(this.KEY, JSON.stringify(this.list))
    },
    // 排序功能
    orderChange (e) {
      var a = e.target
      var span = a.querySelector('span')
      // 点击的选中的(有now的)，则切换箭头朝向；点击未选中的，则移除所有的now并重置其箭头(朝下)，给当前加 now
      if (e.target.classList.contains('now')) {
        // 切换箭头朝向
        if (span.classList.contains('fa-angle-down')) {
          span.classList.remove('fa-angle-down')
          span.classList.add('fa-angle-up')
        } else {
          span.classList.add('fa-angle-down')
          span.classList.remove('fa-angle-up')
        }
      } else {
        // 重置：移除所有now，将所有箭头朝向
        a.parentNode.querySelectorAll('a').forEach((item) => {
          item.classList.remove('now')
          var spanInItem = item.querySelector('span')
          if (spanInItem.classList.contains('fa-angle-up')) {
            spanInItem.classList.remove('fa-angle-up')
            spanInItem.classList.add('fa-angle-down')
          }
        })
        // 给当前加 now
        a.classList.add('now')
      }
      // 获取最终的 orderType  和 orderValue
      // 排序参数：price 1升序 2降序；num 1升序 2降序
      this.orderType = a.dataset.type
      this.orderValue = span.classList.contains('fa-angle-down') ? 2 : 1
      // 开始加载：这个放在 refresh() 的外面是为了避免下拉刷新时，出现2个加载中的圆圈效果（一个是下拉加载自动的圆圈，一个是自定义isLoading的spinner的圆圈）
      this.isLoading = true
      this.refresh()
    }
  },
  components: {
    Header
  }
}
</script>

<style lang="less">
/* 排序区域 */
.for_search_list {
  padding-bottom: 0;
  .lt_wrapper {
    overflow: scroll;
  }
}
.lt_order {
  width: 100%;
  height: 30px;
  line-height: 30px;
  background: #ddd;
  a {
    float: left;
    width: 25%;
    text-align: center;
    font-size: 12px;
    color: #666;
  }
  a.now {
    color: red;
  }
}
/* 底线区 */
.nomore {
  position: relative;
  height: 30px;
  .line {
    border-top: 1px dashed #ccc;
    position: absolute;
    width: 100%;
    top: 14px;
  }
  .lineText {
    background: #fff;
    margin: 0 auto;
    display: block;
    width: 100px;
    text-align: center;
    line-height: 30px;
    position: relative;
    z-index: 999;
  }
}
</style>
