<template>
  <footer class="lt_tabs">
    <div class="banxin">
      <router-link :to="{name:'index'}" active-class="now">
        <span class="fa fa-home"></span><p>首页</p>
      </router-link>
      <router-link :to="{name:'categories'}" active-class="now">
        <span class="fa fa-bars"></span><p>分类</p>
      </router-link>
      <router-link :to="{name:'cart'}" active-class="now">
        <span class="fa fa-shopping-cart"></span><p>购物车</p>
      </router-link>
      <router-link :to="{name:'user'}" active-class="now">
        <span class="fa fa-user"></span><p>个人中心</p>
      </router-link>
    </div>
  </footer>
</template>

<script>
export default {

}
</script>

<style lang="less">
/*
  fixed/absolute 基于浏览器窗口大小，lt_container 版心管不住 fixed/absolute 容器
  解决办法是：在 header和footer 容器中，再放一个版心，这个版心(.banxin)与版心(lt_container)宽度重合
*/
/* 底部 */
.lt_tabs {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 55px;
  .banxin {
    // max-width: 750px;
    max-width: 1080px;
    min-width: 320px;
    width: 100%;
    margin: 0 auto;
    background: #069;
    position: relative;
    color: #fff;
    height: 55px;
    a {
      width: 25%;
      float: left;
      text-align: center;
      color: #fff;
      padding-top: 9px;
      p {
        color: #fff;
        font-size: 12px;
        margin-bottom: 0;
      }
      &.now {
        color: #fa0;
        p {
          color: #fa0;
        }
      }
    }
  }
}
</style>
