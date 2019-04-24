<template>
  <div class="lt_container">
    <!-- 头部组件: Header 接收参数 hasWings，参数值：both/left/right/none -->
    <Header hasWings="none" />
    <!-- 中间部分 -->
    <div class="lt_content">
      <div class="lt_wrapper">
        <!-- 由于 mt-cell 样式模板有限，只有拷贝 mt-cell 编译后的源码来改造 -->
        <div class="page-cell">
          <a class="mint-cell">
            <span class="mint-cell-mask"></span>
            <div class="mint-cell-left"></div>
            <div class="mint-cell-wrapper">
              <img class="icon" src="http://home.test:3000/mobile/images/user.jpg" width="42" height="42" />
              <div class="mint-cell-title">
                <span class="mint-cell-text">{{ user.username }}</span>
                <span class="mint-cell-label">手机号：{{ user.mobile }}</span>
              </div>
              <div class="mint-cell-value is-link">
                <span></span>
              </div>
              <i class="mint-cell-allow-right"></i>
            </div>
            <div class="mint-cell-right"></div>
          </a>
          <mt-cell is-link title="账号与安全"></mt-cell>
          <mt-cell is-link title="我的购物车"></mt-cell>
          <mt-cell is-link title="收货地址管理"></mt-cell>
        </div>
        <div class="btn_box">
          <a href="javascript:;" class="mui-btn mui-btn-danger" @click="logout">退出登录</a>
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
  data () {
    return {
      user: {
        username: '加载中...',
        mobile: '加载中...'
      }
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    getUserInfo () {
      this.$http({
        url: '/user/queryUserMessage',
        method: 'get'
      }).then(res => {
        setTimeout(() => {
          this.user = res.data
        }, 1500)
      })
    },
    logout () {
      this.$http({
        url: '/user/logout',
        method: 'get'
      }).then(res => {
        if (res.data.success) {
          this.$router.push({name: 'login'})
        }
      })
    }
  },
  components: {
    Header,
    Footer
  }
}
</script>

<style lang="less">
.icon {
  margin-right: 10px;
}
.btn_box {
  width: 100%;
  margin-top: 10xp;
  padding: 10px;
  a {
    width: 100%;
  }
}
</style>
