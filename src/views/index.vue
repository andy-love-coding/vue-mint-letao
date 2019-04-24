<template>
  <div class="lt_container">
    <!-- 头部组件: Header 接收参数 hasWings，参数值：both/left/right/none -->
    <Header hasWings="none" title="乐淘电商" />
    <!-- 中间部分 -->
    <div class="lt_content">
      <div class="lt_wrapper">
        <div v-infinite-scroll="loadMore" infinite-scroll-disabled="notScroll" infinite-scroll-distance="10">
          <!-- 轮播图：记得设置轮播图组件 mt-swipe 的高度（必须设置高度） -->
          <mt-swipe :auto="3000">
            <mt-swipe-item><a href="#"><img src="@/images/banner1.png" /></a></mt-swipe-item>
            <mt-swipe-item><a href="#"><img src="@/images/banner2.png" /></a></mt-swipe-item>
            <mt-swipe-item><a href="#"><img src="@/images/banner3.png" /></a></mt-swipe-item>
            <mt-swipe-item><a href="#"><img src="@/images/banner4.png" /></a></mt-swipe-item>
          </mt-swipe>
          <!-- 导航栏：六宫格 -->
          <div class="lt_nav clearfix">
            <a href="#"><img src="@/images/nav1.png" alt=""></a>
            <a href="#"><img src="@/images/nav2.png" alt=""></a>
            <a href="#"><img src="@/images/nav3.png" alt=""></a>
            <a href="#"><img src="@/images/nav4.png" alt=""></a>
            <a href="#"><img src="@/images/nav5.png" alt=""></a>
            <a href="#"><img src="@/images/nav6.png" alt=""></a>
          </div>
          <!-- 产品区域 -->
          <div class="lt_product">
            <ul class="mui-clearfix clearfix">
              <li>
                <a href="#" class="lt_proBox">
                  <img src="@/images/detail.jpg" alt="">
                  <p class="name ellipsis-2">adidas阿迪达斯 男式 场下休闲篮球鞋s83700</p>
                  <p class="price">
                    <span class="nowPrice">¥100.00</span>
                    <span class="oldPrice">¥1000.00</span>
                  </p>
                  <mt-button type="primary" size="small">立即购买</mt-button>
                </a>
              </li>
              <li>
                <a href="#" class="lt_proBox">
                  <img src="@/images/detail.jpg" alt="">
                  <p class="name ellipsis-2">adidas阿迪达斯 男式 场下休闲篮球鞋s83700</p>
                  <p class="price">
                    <span class="nowPrice">¥100.00</span>
                    <span class="oldPrice">¥1000.00</span>
                  </p>
                  <mt-button type="primary" size="small">立即购买</mt-button>
                </a>
              </li>
              <li>
                <a href="#" class="lt_proBox">
                  <img src="@/images/detail.jpg" alt="">
                  <p class="name ellipsis-2">adidas阿迪达斯 男式 场下休闲篮球鞋s83700</p>
                  <p class="price">
                    <span class="nowPrice">¥100.00</span>
                    <span class="oldPrice">¥1000.00</span>
                  </p>
                  <mt-button type="primary" size="small">立即购买</mt-button>
                </a>
              </li>
              <li>
                <a href="#" class="lt_proBox">
                  <img src="@/images/detail.jpg" alt="">
                  <p class="name ellipsis-2">adidas阿迪达斯 男式 场下休闲篮球鞋s83700</p>
                  <p class="price">
                    <span class="nowPrice">¥100.00</span>
                    <span class="oldPrice">¥1000.00</span>
                  </p>
                  <mt-button type="primary" size="small">立即购买</mt-button>
                </a>
              </li>
              <li>
                <a href="#" class="lt_proBox">
                  <img src="@/images/detail.jpg" alt="">
                  <p class="name ellipsis-2">adidas阿迪达斯 男式 场下休闲篮球鞋s83700</p>
                  <p class="price">
                    <span class="nowPrice">¥100.00</span>
                    <span class="oldPrice">¥1000.00</span>
                  </p>
                  <mt-button type="primary" size="small">立即购买</mt-button>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部组件：footer -->
    <Footer />
  </div>
</template>

<script>
// 引入头部组件
import Header from '@/components/header.vue'
// 引入底部组件
import Footer from '@/components/footer.vue'
export default {
  components: {
    Header,
    Footer
  }
}
</script>

<style lang="less">
/*假设的设备  320px(5/5s) 375px(6/7/8) 414px(6/7/8plus) 768px(ipad) 1024px(ipad pro)，图片按 16:9 显示*/
@media screen and (min-width: 320px) {
  .mint-swipe {
    height: 180px;
  }
}
@media (min-width: 375px) {
  .mint-swipe {
    height: 211px;
  }
}
@media (min-width: 414px) {
  .mint-swipe {
    height: 233px;
  }
}
@media (min-width: 768px) {
  .mint-swipe {
    height: 432px;
  }
}
@media (min-width: 1024px) {
  .mint-swipe {
    height: 576px;
  }
}
// 轮播图
.mint-swipe {
  a {
    img {
      width: 100%;
      height: 100%;
    }
  }
}
// 导航栏：六宫格
.lt_nav {
  width: 100%;
  padding: 10px;
  padding-bottom: 0;
  a {
    float: left;
    width: 33.3333%;
  }
  img {
    width: 100%;
    display: block;
  }
}
</style>
