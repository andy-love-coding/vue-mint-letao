<template>
  <div class="lt_container">
    <!-- 头部组件: Header 接收参数 hasWings，参数值：both/left/right/none -->
    <Header hasWings="both" iconType="fa fa-refresh" routeName="cart" title="购物车"/>
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
        <mt-loadmore v-if="itemList" ref="loadmore" :top-method="loadTop" :topPullText="topPullText" :topDropText="topDropText">
          <ul id="cart" class="mui-table-view">
            <li v-for="(item, index) in itemList" :key="index">
              <mt-cell-swipe
                is-link
                :right="[
                  {
                    content: `<span class='fa fa-edit'></span>`,
                    style: { background: 'blue', color: '#fff', width: '80px', textAlign: 'center', lineHeight: '96px'},
                    handler: () => edit(item.id)
                  },
                  {
                    content: '删除',
                    style: { background: 'red', color: '#fff', width: '80px', textAlign: 'center', lineHeight: '96px'},
                    handler: () => del(item.id, index)
                  }
                ]">
                <a id="product_item">
                  <img class="leftImg" :src="item.defaultPicAddr">
                  <div class="rightText">
                    <p class="name ellipsis-2">{{ item.proName }}</p>
                    <p class="price">
                      <span class="now">¥{{ item.price }}</span>
                      <span class="old">¥{{ item.oldPrice }}</span>
                      <span class="num">x{{ item.num }} 双</span>
                    </p>
                    <p class="size">鞋码 : {{ item.size }}</p>
                  </div>
                  <input type="checkbox" @click="checkboxChange($event, item.id)" :checked="item.isChecked">
                </a>
              </mt-cell-swipe>
            </li>
          </ul>
        </mt-loadmore>
      </div>
    </div>
    <div class="lt_amount">
      订单金额：¥<span>{{ amount }}</span>
      <a href="#">生成订单</a>
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
      isLoading: false,
      topPullText: '↓ 下拉刷新',
      topDropText: '↑ 释放更新',
      itemList: null,
      checkedList: [],
      checkedListKey: 'checkedId', // 选中的缓存列表的 key
      amount: 0, // 订单总额
      html: '', // 编辑框 html 模板
      isShow: false,
      editingItem: {}, // 当前正在编辑的产品
      currentSize: null,
      currentIndex: null,
      currentNum: null,
      currentInput: null // 当前正在编辑的产品的数量框 input
    }
  },
  created () {
    // 给 JSON.parse 的传参设置 默认值(需要是合法的json字符串)，避免其值为空字符串时报错
    this.checkedList = JSON.parse(window.localStorage.getItem(this.checkedListKey) || '[]')
    // 开始加载
    this.isLoading = true
    this.refresh()
  },
  methods: {
    loadTop () {
      this.refresh()
    },
    refresh () {
      this.$http({
        url: '/cart/queryCart',
        method: 'get'
      }).then(res => {
        setTimeout(() => {
          res.data.forEach(element => {
            // 为每个产品加一个封面图片
            element.defaultPicAddr = 'http://home.test:3000/mobile/images/none01.jpg'
            if (element.pic && element.pic[0] && element.pic[0].picAddr) {
              element.defaultPicAddr = 'http://home.test:3000' + element.pic[0].picAddr
            }
            // 为每个产品标记是否被选中
            element.isChecked = false
            if (this.checkedList.indexOf(element.id) >= 0) { // 如果 id 在选中列表中，则表示该项是选中的
              element.isChecked = true
            }
            // 处理尺码
            var sizeArr = element.productSize.split('-')
            var arr = []
            for (var i = sizeArr[0]; i <= sizeArr[1]; i++) {
              arr.push(i)
            }
            element.sizeArr = arr
          })
          this.itemList = res.data
          this.calcAmount() // 计算总金额
          this.isLoading = false // 加载结束
          this.$nextTick(() => { // 因为 mt-loadmore 用了v-if, 所以需要等 dom 渲染之后，再用 $refs 才能取得到
            this.$refs.loadmore.onTopLoaded() // 必须有这一句，表示下拉刷新结束
          })
        }, 1500)
      })
    },
    // 左滑后点击编辑
    edit (id) {
      var currentItemArr = this.itemList.filter((element, index) => { // filter 返回一个新数组，但并不改变原数组
        if (element.id === id) {
          this.currentIndex = index
          this.currentSize = element.size
          this.currentNum = element.num
          return true
        }
      })
      this.editingItem = currentItemArr[0] // 这个新数组只要这 1 个元素
      // 编辑框 html 模板
      var size = ''
      this.editingItem.sizeArr.forEach(element => {
        size += `<i>
          <span data-size="${element}" class="${parseInt(this.editingItem.size) === parseInt(element) ? 'now' : ''}">${element}</span>&nbsp;
        </i>`
      })
      var html = `
        <div class="pro_size" style="text-align: left">
          尺码：
          ${size}
        </div>
        <div class="pro_num" style="text-align: left">
          <span>数量：</span>
          <p class="box">
            <span class="reduce">-</span>
            <input class="orderNum" type="number" value="${this.editingItem.num}" readonly>
            <span class="plus">+</span>
          </p>
          <span>剩余：</span>
          <p class="rest">${this.editingItem.productNum}</p>
          <span>件</span>
        </div>`
      // 编辑框
      this.$messagebox.confirm('', {
        title: '编辑商品',
        message: html,
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      }).then(action => {
        if (action === 'confirm') {
          this.updateCart()
        }
      }).catch(error => {
        if (error === 'cancel') {
          console.log('取消了编辑')
        }
      })
      // 为 html 模板内容绑定事件(只能绑定一次，否则每次点击编辑时，都会绑定一个加法或减法，造成多次绑定，从而多加或多减)
      this.$nextTick(() => {
        this.currentInput = window.document.querySelector('.orderNum')
        this.currentNum = parseInt(this.currentInput.value)
        this.bindEvent()
      })
    },
    // 为编辑框绑定事件：加法、减法、改变尺码(为了只绑定一次事件，需要事件函数定义在外部，如果不放在外面，每次都会新建一个函数，还是还绑定多次)
    bindEvent () {
      // 加法
      var plusDom = window.document.querySelector('.plus')
      plusDom.removeEventListener('click', this.plusFun)
      plusDom.addEventListener('click', this.plusFun)
      // 减法
      var reduceDom = window.document.querySelector('.reduce')
      reduceDom.removeEventListener('click', this.reduceFun)
      reduceDom.addEventListener('click', this.reduceFun)
      // 改变尺码（事件委托）
      var sizeParent = window.document.querySelector('.pro_size')
      sizeParent.addEventListener('click', (e) => {
        if (e.target.nodeName === 'SPAN') {
          // 先去掉 now
          var nowSize = sizeParent.querySelector('.now')
          if (nowSize) {
            nowSize.classList.remove('now')
          }
          // 再加上 now
          e.target.classList.add('now')
          // 改变 currentSize
          this.currentSize = e.target.dataset.size
          console.log(this.currentSize, typeof this.currentSize)
        }
      })
    },
    // 加法
    plusFun () {
      if (this.currentNum + 1 <= this.editingItem.productNum) {
        this.currentNum++
        console.log(this.currentNum)
        this.currentInput.setAttribute('value', this.currentNum)
      }
    },
    // 减法
    reduceFun () {
      if (this.currentNum - 1 >= 1) {
        this.currentNum--
        console.log(this.currentNum)
        this.currentInput.setAttribute('value', this.currentNum)
      }
    },
    del (id, index) {
      this.$messagebox.confirm('', {
        title: '提示',
        message: '确认删除吗？',
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      }).then(action => {
        if (action === 'confirm') { // 点击确认
          // 从服务器删除
          this.$http({
            url: '/cart/deleteCart',
            method: 'get',
            params: {
              id: id
            }
          }).then(res => {
            if (res.data.success) {
              this.$toast('删除成功！')
              this.itemList.splice(index, 1) // 客户端删除
              this.calcAmount() // 计算金额
              if (this.checkedList.indexOf(id) >= 0) { // 删除选中状态的缓存列表
                this.checkedList.splice(this.checkedList.indexOf(id), 1)
                // 存入缓存
                localStorage.setItem(this.checkedListKey, JSON.stringify(this.checkedList))
              }
            }
          })
        }
      }).catch(error => {
        if (error === 'cancel') { // 点击取消
          // console.log('取消')
        }
      })
    },
    // 选中或取消
    checkboxChange (e, id) {
      if (e.target.checked) {
        // 选中，则加入缓存列表 checkedList 中
        if (this.checkedList.indexOf(id) === -1) { // 如果 id 不在列表中, 才把 id 加入列表
          this.checkedList.push(id)
        }
      } else {
        // 未选中，则从缓存列表 checkedList 中移除
        if (this.checkedList.indexOf(id) >= 0) { // 如果 id 在列表中，则移除
          this.checkedList.splice(this.checkedList.indexOf(id), 1)
        }
      }
      this.itemList.forEach(element => {
        if (element.id === id) {
          element.isChecked = e.target.checked
        }
      })
      // 存入缓存
      localStorage.setItem(this.checkedListKey, JSON.stringify(this.checkedList))
      this.calcAmount()
    },
    // 计算总金额
    calcAmount: function () {
      // 四种情况需要计算金额：初始化、选择复选框、删除、修改数量
      // 计算业务
      var amount = 0
      this.itemList.forEach(element => {
        if (element.isChecked) {
          amount += element.price * element.num
        }
      })
      this.amount = amount.toFixed(2)
    },
    // 更新购物车
    updateCart () {
      var data = {
        id: this.editingItem.id,
        size: this.currentSize,
        num: this.currentNum
      }
      this.$http({
        url: '/cart/updateCart',
        method: 'post',
        data: data
      }).then(res => {
        if (res.data.success === true) {
          this.$toast('修改成功！')
          // 修改数组驱动渲染
          this.itemList[this.currentIndex].num = this.currentNum
          this.itemList[this.currentIndex].size = this.currentSize
          this.calcAmount()
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
.lt_content {
  padding-bottom: 85px;
}
// 产品模块
#product_item {
  display: block;
  padding-right: 20px;
  .leftImg {
    float: left; // 两栏自适应布局：左边 float: left; 右边：overflow: hidden
    width: 42px;
    margin-right: 10px;
    margin-top: 10px;
  }
  .rightText {
    overflow: hidden;
    margin-top: 10px;
  }
  .name {
    color: #8f8f94;
    line-height: 17px;
  }
  .price {
    position: relative;
    .now {
      color: red;
    }
    .old {
      color: #666;
      text-decoration: line-through;
    }
    .num {
      position: absolute;
      right: 0;
    }
  }
  input {
    position: absolute;
    left: 10px;
    bottom: 10px;
  }
}
/* 金额模块 */
.lt_amount {
  position: absolute;
  left: 0;
  bottom: 55px;
  height: 30px;
  line-height: 30px;
  width: 100%;
  background: #ccc;
  color: red;
  font-weight: bold;
  font-size: 12px;
  padding: 0 10px;
  a {
    position: absolute;
    right: 0;
    top: 0;
    width: 60px;
    height: 30px;
    text-align: center;
    background: red;
    color: #fff;
    font-weight: normal;
  }
}
// 编辑框
.pro_size {
  font-size: 14px;
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
    font-size: 14px;
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
</style>
