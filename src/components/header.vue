<template>
  <header class="lt_header">
    <div class="banxin" v-if="hasWings === 'both'">
      <a href="javascript:history.back()" class="left"><span class="fa fa-chevron-left"></span></a>
      <h3>{{ title }}</h3>
      <router-link :to="{name: routeName}" class="right"><span :class="iconType"></span></router-link>
    </div>
    <div class="banxin" v-else-if="hasWings === 'none'">
      <h3>{{ title }}</h3>
    </div>
    <div class="banxin" v-else-if="hasWings === 'right'">
      <h3>{{ title }}</h3>
      <router-link :to="{name: routeName}" class="right"><span :class="iconType"></span></router-link>
    </div>
    <div class="banxin" v-else-if="hasWings === 'left'">
      <a href="javascript:history.back()" class="left"><span class="fa fa-chevron-left"></span></a>
      <h3>{{ title }}</h3>
    </div>
  </header>
</template>

<script>
export default {
  props: ['hasWings', 'iconType', 'routeName', 'title'] // 接收父组件传递过来的参数 hasWings，参数值：both/left/right/none
}
</script>

<style lang="less">
/*
  fixed/absolute 基于浏览器窗口大小，lt_container 版心管不住 fixed/absolute 容器
  解决办法是：在 header和footer 容器中，再放一个版心，这个版心(.banxin)与版心(lt_container)宽度重合
*/
/* 头部 */
.lt_header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 45px;
  z-index: 999;
  .banxin {
    // max-width: 750px;
    max-width: 1080px;
    min-width: 320px;
    width: 100%;
    margin: 0 auto;
    background: #069;
    position: relative;
    color: #fff;
    height: 45px;
    line-height: 45px;
    h3 {
      font-size: 18px;
      text-align: center;
      margin: 0;
      line-height: 45px;
      font-weight: normal;
    }
    a {
      color: #fff;
      width: 45px;
      height: 45px;
      text-align: center;
      position: absolute;
      top: 0;
    }
    .left {
      left: 0;
    }
    .right {
      right: 0;
    }
  }
}
</style>
