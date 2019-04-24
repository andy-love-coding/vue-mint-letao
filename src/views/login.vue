<template>
  <div class="lt_container">
    <!-- 头部组件: Header 接收参数 hasWings，参数值：both/left/right/none -->
    <Header hasWings="none" title="登录" />
    <!-- 中间部分 -->
    <div class="lt_content">
      <div class="lt_wrapper">
        <form class="mui-input-group">
          <div class="mui-input-row">
            <label>用户名</label>
          <input v-model="user.username" type="text" class="mui-input-clear" placeholder="请输入用户名">
          </div>
          <div class="mui-input-row">
            <label>密码</label>
            <input v-model="user.password" type="password" class="mui-input-password" placeholder="请输入密码">
          </div>
          <div class="mui-button-row">
            <button type="reset" class="mui-btn mui-btn-danger" >重置</button>
            <button type="button" class="mui-btn mui-btn-primary" @click="login">确认</button>
          </div>
        </form>
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
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      this.$http({
        url: '/user/login',
        method: 'post',
        data: {
          username: this.user.username,
          password: this.user.password
        }
      }).then(res => {
        if (res.data.success === true) {
          // 登录成功
          console.log('登录成功了')
          var returnUrl = this.$route.query.returnUrl // 获取问号参数
          if (returnUrl) {
            location.href = returnUrl
          } else {
            this.$router.push({name: 'user'})
          }
        } else {
          // 登录失败
          console.log('失败了')
          this.$toast(res.data.message)
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

<style>

</style>
