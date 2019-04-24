<template>
  <div class="lt_container">
    <!-- 头部组件: Header 接收参数 hasWings，参数值：both/left/right/none -->
    <Header hasWings="both" iconType="fa fa-home" routeName="index" title="商品详情" />
    <!-- 中间部分 -->
    <div class="lt_content">
      <div class="lt_wrapper">
        <!-- 加载效果 -->
        <div class="clearfix" v-if="isLoading">
          <p class="loading">
            <mt-spinner type="fading-circle" size="17"></mt-spinner>
            <span class="loadingText">正在加载中...</span>
          </p>
        </div>
        <!-- 下拉刷新 -->
        <mt-loadmore v-if="product.proName" ref="loadmore" :top-method="loadTop" :topPullText="topPullText" :topDropText="topDropText">
          <!-- 轮播图：记得设置轮播图组件 mt-swipe 的高度（必须设置高度） -->
          <mt-swipe :auto="3000">
            <mt-swipe-item v-for="(item, index) in product.pic" :key="index" >
              <a href="javascript:;"><img :src="item.picAddr" /></a>
            </mt-swipe-item>
          </mt-swipe>
          <!-- 商品名称 -->
          <div class="pro_name">
            <p class="mui-ellipsis-2">{{ product.proName }}</p>
          </div>
          <!-- 商品价格 -->
          <div class="pro_price">
            价格：<span class="now">¥{{ product.price }}</span> <span class="old"> ¥{{ product.oldPrice }}</span>
          </div>
          <!-- 商品尺码 -->
          <div class="pro_size" ref="size" @click="sizeChange">
            尺码：
            <i v-for="(item, index) in product.sizeArr" :key="index">
              <span :class="currentSize == item ? 'now': ''" :data-size="item">{{ item }}</span>&nbsp;
            </i>
          </div>
          <!-- 商品数量 -->
          <div class="pro_num">
            <span>数量：</span>
            <p class="box">
              <span class="reduce" @click="reduce">-</span>
              <input class="orderNum" type="number" v-model="inputValue" readonly>
              <span class="plus" @click="plus">+</span>
            </p>
            <span>剩余：</span>
            <p class="rest">{{ product.num }}</p>
            <span>件</span>
          </div>
        </mt-loadmore>
      </div>
    </div>
    <!-- 底部操作 -->
    <div class="lt_btn">
      <router-link class="btn_cart" :to="{name: 'cart'}"><span class="fa fa-shopping-cart"></span></router-link>
      <div class="btn_box">
        <a @click="addCart" class="addCart" href="javascript:;">加入购物车</a>
        <a class="pay" href="javascript:;">立即支付</a>
      </div>
    </div>
  </div>
</template>

<script>
// 引入头部组件
import Header from '@/components/header.vue'
export default {
  data () {
    return {
      isLoading: false,
      topPullText: '↓ 下拉刷新',
      topDropText: '↑ 释放更新',
      productId: null,
      product: {},
      currentSize: null,
      inputValue: 1,
      stockNum: 0 // 库存数量
    }
  },
  created () {
    this.productId = this.$route.query.productId // 获取问号参数
    this.currentSize = this.$route.query.size // 获取问号参数
    // 开始加载
    this.isLoading = true
    this.refresh()
  },
  mounted () {
    setTimeout(() => {
      this.isLoading = false
    }, 1500)
  },
  methods: {
    loadTop () {
      this.refresh()
    },
    refresh () {
      this.$http({
        url: '/product/queryProductDetail',
        method: 'get',
        params: {
          id: this.productId
        }
      }).then((res) => {
        setTimeout(() => {
          // 处理图片地址
          if (res.data.pic && res.data.pic[0] && res.data.pic[0].picAddr) {
            res.data.pic.forEach(element => {
              element.picAddr = 'http://home.test:3000' + element.picAddr
            })
          } else {
            res.data.pic[0].picAddr = 'http://home.test:3000/mobile/images/none01.jpg'
          }
          // 处理尺码
          var sizeArr = res.data.size.split('-')
          var arr = []
          for (var i = sizeArr[0]; i <= sizeArr[1]; i++) {
            arr.push(i)
          }
          res.data.sizeArr = arr
          // 赋值
          this.product = res.data
          this.stockNum = res.data.num
          this.isLoading = false // 加载结束
          this.$nextTick(() => { // 因为 mt-loadmore 用了v-if, 所以需要等 dom 渲染之后，再用 $refs 才能取得到
            this.$refs.loadmore.onTopLoaded() // 必须有这一句，表示下拉刷新结束
          })
        }, 1500)
      })
    },
    // 选择尺寸
    sizeChange (e) {
      if (e.target.nodeName === 'SPAN') {
        // 先去掉 now
        if (this.$refs.size.querySelector('.now')) {
          this.$refs.size.querySelector('.now').classList.remove('now')
        }
        // 再加上 now
        e.target.classList.add('now')
        // 改变 currentSize
        this.currentSize = e.target.dataset.size
        // 操作地址栏
        var newUrl = '/#/product?productId=' + this.productId + '&size=' + e.target.dataset.size
        window.history.replaceState(null, null, newUrl)
        console.log(this.currentSize)
      }
    },
    // 数量减1
    reduce () {
      if (this.inputValue - 1 >= 1) {
        this.inputValue -= 1
      }
    },
    // 数量加1
    plus () {
      if (this.inputValue + 1 <= this.stockNum) {
        this.inputValue += 1
      }
    },
    // 加入购物车
    addCart () {
      var data = {
        productId: this.productId,
        size: this.currentSize,
        num: this.inputValue
      }
      if (!data.size) {
        this.$toast('请选择尺码')
        return // 终止向下执行
      }
      this.$http({
        url: '/cart/addCart',
        method: 'post',
        data: data
      }).then(res => {
        if (res.data.success === true) {
          this.$router.push({name: 'cart'})
        } else {
          this.$$toast('加入购物车失败！')
        }
      })
    }
  },
  components: {
    Header
  }
}
</script>

<style lang="less">
/*假设的设备  320px(5/5s) 375px(6/7/8) 414px(6/7/8plus) 768px(ipad) 1024px(ipad pro)，图片按 16:9 显示*/
@media screen and (min-width: 320px) {
  .mint-swipe {
    height: 320px;
  }
}
@media (min-width: 375px) {
  .mint-swipe {
    height: 375px;
  }
}
@media (min-width: 414px) {
  .mint-swipe {
    height: 414px;
  }
}
@media (min-width: 768px) {
  .mint-swipe {
    height: 768px;
  }
}
@media (min-width: 1024px) {
  .mint-swipe {
    height: 1024px;
  }
}
.mint-swipe {
  a {
    display: block;
    width: 100%;
    height: 100%;
    img {
      width: 100%;
    }
  }
}
[class ^= "pro_"] {
  padding: 10px;
  border-bottom: 1px solid #ccc;
}
.pro_name p {
  font-size: 20px;
  margin-top: 10xp;
  color: #ccc;
}
.pro_price {
  .now {
    font-size: 20px;
    color: red;
  }
  .old {
    font-size: 12px;
    color: #666;
    text-decoration: line-through;
  }
}

.pro_size {
  span {
    font-size: 12px;
    padding: 5px; /* 行内元素可以用 padding 撑开宽高 */
    border: 1px solid #666666;
    line-height: 32px;
  }
  span.now {
    background: #fa0;
  }
}
.pro_num {
  height: 50px;
  &>span {
    float: left;
    height: 30px;
    line-height: 30px;
    font-size: 17px;
  }
  .box {
    /* display: inline-block; */
    float: left;
    vertical-align: middle;
    border: 1px solid #ccc;
    margin: 0;
    padding: 0;
    height: 30px;
    margin-right: 10px;
    span {
      float: left;
      width: 30px;
      height: 28px;
      line-height: 28px;
      text-align: center;
      font-size: 12px;
      color: #333;
    }
    input.orderNum {
      float: left;
      padding: 0;
      margin: 0;
      border: none;
      border-radius: 0;
      border-right: 1px solid #ccc;
      border-left: 1px solid #ccc;
      width: 28px;
      height: 28px;
      text-align: center;
    }
  }
  p.rest {
    float: left;
    font-size: 17px;
    margin: 0;
    color: #333;
    line-height: 30px;
    height: 30px;
    margin-right: 3px;
  }
}
/* 操作按钮区域: 两栏自适应，一栏固定宽度，一栏overflow: hidden */
.lt_btn {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 55px;
  line-height: 55px;
  width: 100%;
  border-top: 1px solid #ccc;
  background: #f3f4f5;
  .btn_cart {
    width: 55px;
    height: 54px;
    text-align: center;
    float: left;
  }
  .btn_box {
    overflow: hidden;
    padding-right:10px;
    a {
      width: 48%;
      height: 44px;
      line-height: 44px;
      float: left;
      color: #fff;
      text-align: center;
      margin-top: 5px;
      border-radius: 4px;
    }
    a.addCart {
      background: #991020;
      margin-right: 4%;
    }
    a.pay {
      background: #fa672d;
    }
  }
}
</style>
