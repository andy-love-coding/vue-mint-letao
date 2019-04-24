<template>
  <div class="lt_container">
    <!-- 头部组件: Header 接收参数 hasWings，参数值：both/left/right/none -->
    <Header hasWings="both" iconType="fa fa-search" routeName="search" title="商品分类" />
    <!-- 中间部分 -->
    <div class="lt_content">
      <!-- 左侧 -->
      <aside class="cateLeft">
        <ul ref="leftUl">
          <!-- router-link 会渲染成一下html代码
            <li class="router-link-exact-active now">
              <a href="#/categories#1">运动馆</a>
            </li>
            <li class="">
              <a href="#/categories#2">女士馆</a>
            </li>
           -->
          <router-link v-for="(item, index) in categories" :key="index" tag="li" :to="'#'+item.id" active-class="now" @click.native="tapLeft(item.id, index)">
            <a>{{ item.categoryName }}</a>
          </router-link>
        </ul>
      </aside>
      <!-- 右侧 -->
      <article class="cateRight">
        <ul>
          <div v-if="secondCategories.length>0">
            <li v-for="item in secondCategories" :key="item.id">
              <a href="#">
                <img :src="item.brandLogo" alt="">
                <p>{{ item.brandName }}</p>
              </a>
            </li>
          </div>
          <p style="text-align: center; padding: 5px;" v-else>还没有二级分类</p>
        </ul>
      </article>
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
      categories: [], // 一级分类
      secondCategories: [], // 二级分类
      init_category_id: '' // 默认显示哪个二级分类所对应的一级分类
    }
  },
  components: {
    Header,
    Footer
  },
  methods: {
    // 获取一级分类
    getCategories () {
      this.$http({
        url: '/category/queryTopCategory',
        method: 'get'
      }).then(res => {
        this.categories = res.data.rows
        this.getSecondCategories(res.data.rows[0].id) // 获取初始的二级分类
        // 初始化或刷新时选中第一个一级类目
        this.$nextTick(_ => {
          this.$refs.leftUl.childNodes.forEach((element, index) => {
            element.classList.remove('now')
            if (index === 0) {
              element.classList.add('now')
            }
          })
        })
      })
    },
    // 获取二级分类
    getSecondCategories (id) {
      this.$http({
        url: '/category/querySecondCategory',
        method: 'get',
        params: {
          id: id
        }
      }).then(res => {
        res.data.rows.forEach(element => {
          element.brandLogo = 'http://home.test:3000' + element.brandLogo
        })
        this.secondCategories = res.data.rows
      })
    },
    // 点击一级分类
    tapLeft (id, index) {
      // H5 用dom元素的 classList 对象的原生链方法来操作 元素的类名。
      this.$refs.leftUl.childNodes.forEach((element, index1) => {
        element.classList.remove('now')
        if (index1 === index) {
          element.classList.add('now')
        }
      })
      // 根据点击的一级分类，获取二级分类
      this.getSecondCategories(id)
    }
  },
  mounted () {
    this.getCategories()
  }
}
</script>

<style lang="less">
.lt_content {
  background: #fff;
}
/* 两栏自适应：左侧 */
.cateLeft {
  width: 90px;
  height: 100%;
  float: left;
  overflow: hidden;
  ul {
    width: 100%;
    margin: 0;
    padding: 0;
    list-style: none;
    li {
      width: 90px;
      height: 50px;
      line-height: 50px;
      background: #f3f4f5;
      border-right: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      a {
        display: block;
        text-align: center;
        color: #666;
        font-size: 12px;
      }
    }
    li.now {
      border-right: none;
      background: #fff;
      a {
        color: red;
      }
    }
  }
}

/* 两栏自适应：右侧 */
.cateRight {
  overflow: hidden;
  height: 100%;
  ul {
    width: 100%;
    margin: 0;
    padding: 0;
    list-style: none;
    li {
      width: 33.3333%;
      float: left;
      a {
        display: block;
        width: 100%;
        img {
          display: block;
          width: 60px;
          height: 60px;
          margin: 0 auto;
        }
        p {
          font-size: 12px;
          color: #666;
          text-align: center;
        }
      }
    }
  }
}
</style>
