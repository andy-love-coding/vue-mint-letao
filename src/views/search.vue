<template>
  <div class="lt_container">
    <!-- 头部组件: Header 接收参数 hasWings，参数值：both/left/right/none -->
    <Header hasWings="both" iconType="fa fa-search" routeName="search" title="搜索中心" />
    <!-- 中间部分 -->
    <div class="lt_content">
      <div class="lt_wrapper">
        <!-- 搜索框 -->
        <div class="lt_search">
          <input type="search" placeholder="根据商品关键字进行搜索" v-model="inputValue">
          <a href="javascript:;" @click="search">搜索</a>
        </div>
        <!-- 搜索历史 -->
        <div class="lt_history">
          <div v-if="list.length">
            <div class="tit">
              <span>搜索历史</span>
              <a href="javascript:;" @click="clear"><span class="fa fa-trash"></span> 清空历史</a>
            </div>
            <ul class="con">
              <li v-for="(item, index) in list" :key="index">
                <router-link :to="{name: 'searchList', query: {key: encodeURIComponent(item)}}">{{ item }}</router-link>
                <span class="fa fa-close" @click="del(index)"></span>
              </li>
            </ul>
          </div>
          <div v-else>
            <div class="tit">
              <span>您没有搜索记录</span>
            </div>
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
  data () {
    return {
      inputValue: '',
      KEY: 'key_search_keywords', // 约定好 localstorage 的存储key
      list: [] // 历史记录
    }
  },
  components: {
    Header,
    Footer
  },
  methods: {
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
      // 3.追加历史
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
    // 删除某条历史记录
    del (index) {
      this.list.splice(index, 1)
      window.localStorage.setItem(this.KEY, JSON.stringify(this.list))
    },
    // 清空历史记录
    clear () {
      this.list = []
      window.localStorage.setItem(this.KEY, JSON.stringify(this.list))
    }
  },
  created () {
    this.list = JSON.parse(localStorage.getItem(this.KEY) || '[]')
  }
}
</script>

<style lang="less">
.lt_content {
  background: #fff;
}
// 搜索历史
.lt_history {
  padding: 0 10px;
  .tit {
    font-size: 12px;
    span {
      color: #666;
    }
    a {
      color: #666;
      float: right;
    }
  }
  .con {
    margin: 0;
    padding: 0;
    list-style: none;
    border: 1px dashed #ccc;
    border-bottom: none;
    li {
      border-bottom: 1px dashed #ccc;
      height: 30px;
      line-height: 30px;
      padding: 0 10px;
      position: relative;
      a {
        font-size: 12px;
      }
      span {
        position: absolute;
        top: 0;
        right: 0;
        height: 30px;
        line-height: 30px;
        width: 30px;
        font-size: 12px;
        color: #666;
        text-align: center;
      }
    }
  }
}
</style>
