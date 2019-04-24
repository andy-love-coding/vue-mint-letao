<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
// mint-ui App.vue 中公用样式
/**
 * 1. Change the default font family in all browsers (opinionated).
 * 2. Prevent adjustments of font size after orientation changes in IE and iOS.
 */
html {
  -ms-text-size-adjust: 100%;
  /* 1 */
  -webkit-text-size-adjust: 100%;
  /* 1 */ /* 清除点击高亮效果 */
  -webkit-tap-highlight-color: transparent;
  /* 2 */
  height: 100%;
}
/**
 * Remove the margin in all browsers (opinionated).
 */
body {
  margin: 0;
  /* 1 */
  font-size: 14px;
  font-family: "Helvetica Neue", Helvetica, STHeiTi, Arial, sans-serif;
}
/* HTML5 display definitions
   ========================================================================== */
/**
 * Add the correct display in IE 9-.
 * 1. Add the correct display in Edge, IE, and Firefox.
 * 2. Add the correct display in IE.
 */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
main,
menu,
nav,
section,
summary {
  display: block;
}
/**
 * Add the correct display in iOS 4-7.
 */
audio:not([controls]) {
  display: none;
  height: 0;
}
/**
 * Add the correct vertical alignment in Chrome, Firefox, and Opera.
 */
progress {
  vertical-align: baseline;
}
/**
 * Add the correct display in IE 10-.
 * 1. Add the correct display in IE.
 */
template, /* 1 */
[hidden] {
  display: none;
}
/* Links
   ========================================================================== */
/**
 * 1. Remove the gray background on active links in IE 10.
 * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.
 */
a {
  background-color: transparent;
  /* 1 */
  -webkit-text-decoration-skip: objects;
  /* 2 */
  text-decoration: none;
}
/**
 * Remove the outline on focused links when they are also active or hovered
 * in all browsers (opinionated).
 */
a:active,
a:hover {
  outline-width: 0;
}
/* Text-level semantics
   ========================================================================== */
/**
 * 1. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.
 */
abbr[title] {
  text-decoration: underline;
  /* 1 */
  text-decoration: underline dotted;
  /* 1 */
}
/**
 * Add the correct font weight in Chrome, Edge, and Safari.
 */
b,
strong {
  font-weight: bolder;
}
/**
 * Add the correct font style in Android 4.3-.
 */
dfn {
  font-style: italic;
}
/**
 * Add the correct font size in all browsers.
 */
small {
  font-size: 80%;
}
/**
 * Prevent `sub` and `sup` elements from affecting the line height in
 * all browsers.
 */
sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}
sup {
  top: -0.5em;
}
sub {
  bottom: -0.25em;
}
/* Embedded content
   ========================================================================== */
/**
 * Remove the border on images inside links in IE 10-.
 */
img {
  border-style: none;
}
/**
 * Hide the overflow in IE.
 */
svg:not(:root) {
  overflow: hidden;
}
/* Grouping content
   ========================================================================== */
/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd `em` font sizing in all browsers.
 */
code,
kbd,
pre,
samp {
  font-family: monospace, monospace;
  /* 1 */
  font-size: 1em;
  /* 2 */
}
/**
 * 1. Contain overflow in all browsers.
 * 2. Improve readability of pre-formatted text in all browsers.
 */
pre {
  overflow: auto;
  /* 1 */
  white-space: pre;
  /* 2 */
  white-space: pre-wrap;
  /* 2 */
  word-wrap: break-word;
  /* 2 */
}
/* Forms
   ========================================================================== */
/**
 * 1. Correct color not being inherited.
      Known issue: affects color of disabled elements.
 * 2. Change font properties to `inherit` in all browsers (opinionated).
 * 3. Remove the margin in Firefox and Safari.
 */
button,
input,
optgroup,
select,
textarea {
  color: inherit;
  /* 1 */
  font: inherit;
  /* 2 */
  margin: 0;
  /* 3 */
  vertical-align: middle;
}
/**
 * Show the overflow in IE.
 * 1. Show the overflow in Edge.
 * 2. Show the overflow in Edge, Firefox, and IE.
 */
button,
input,  /* 1 */
input {
  /* 2 */
  overflow: visible;
}
/**
 * Remove the inheritance of text transform in Edge, Firefox, and IE.
 * 1. Remove the inheritance of text transform in Firefox.
 */
button,
select {
  /* 1 */
  text-transform: none;
}
/**
 * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`
 *    controls in Android 4.
 * 2. Correct the inability to style clickable types in iOS and Safari.
 */
button,
html [type="button"], /* 1 */
[type="reset"],
[type="submit"] {
  -webkit-appearance: button;
  /* 2 */
}
/* Re-set default cursor for disabled elements. */
[disabled] {
  cursor: default;
}
/**
 * 1. Add the correct box sizing in IE 10-.
 * 2. Remove the padding in IE 10-.
 */
[type="checkbox"],
[type="radio"] {
  box-sizing: border-box;
  /* 1 */
  padding: 0;
  /* 2 */
}
/**
 * Correct the cursor style of increment and decrement buttons in Chrome.
 */
[type="number"]::-webkit-inner-spin-button,
[type="number"]::-webkit-outer-spin-button {
  height: auto;
}
/**
 * 1. Correct the odd appearance in Chrome and Safari.
 * 2. Correct the outline style in Safari.
 */
[type="search"] {
  -webkit-appearance: textfield;
  /* 1 */
  outline-offset: -2px;
  /* 2 */
}
/**
 * Remove the inner padding and cancel buttons in Chrome and Safari on OS X.
 */
[type="search"]::-webkit-search-cancel-button,
[type="search"]::-webkit-search-decoration {
  -webkit-appearance: none;
}
/**
 * 1. Correct the inability to style clickable types in iOS and Safari.
 * 2. Change font properties to `inherit` in Safari.
 */
::-webkit-file-upload-button {
  -webkit-appearance: button;
  /* 1 */
  font: inherit;
  /* 2 */
}
/* 1. Remove default vertical scrollbar in IE 8/9/10/11. */
textarea {
  overflow: auto;
  /* 1 */
  resize: none;
  vertical-align: top;
}
/* Don't inherit the `font-weight` (applied by a rule above).
NOTE: the default cannot safely be changed in Chrome and Safari on OS X. */
optgroup {
  font-weight: 700;
}
/* webkit focus outline */
input,
select,
textarea {
  outline: 0;
}
/* Android 下 input focus 消除高亮外框 */
textarea,
input {
  -webkit-user-modify: read-write-plaintext-only;
}
input::-ms-clear,
input::-ms-reveal {
  display: none;
}
/**
 * placeholder text color
 */
input:-ms-input-placeholder,
textarea:-ms-input-placeholder {
  color: inherit;
  opacity: 0.54;
}
input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
  color: inherit;
  opacity: 0.54;
}
/* table
   ========================================================================== */
/* Remove table cell spacing and padding */
table {
  border-collapse: collapse;
  border-spacing: 0;
}
td,
th {
  padding: 0;
}
h1, h2, h3, h4, h5, h6, p, figure, form, blockquote {
  margin: 0;
}
ul, ol, li, dl, dd {
  margin: 0;
  padding: 0;
}
ul, ol {
  list-style: none outside none;
}
h1, h2, h3, h4, h5, h6 {
  font-size: 100%;
  font-weight: 400;
  line-height: 2;
}
* {
  box-sizing: border-box;
}
html, body {
  background-color: #fafafa;
  -webkit-overflow-scrolling: touch;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
}
a {
  color: inherit;
}
.page-back {
  display: inline-block;
  top: 12px;
  left: 10px;
  position: absolute;
  width: 40px;
  height: 40px;
  text-align: center;
}
.page-back i {
  font-size: 24px;
  line-height: 40px;
}
/* 自己写的公共的css样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}

p {
  font-size: 14px;
  margin-top: 0;
  margin-bottom: 10px;
  color: #8f8f94;
}
// 清除浮动
.clearfix::before,
.clearfix::after {
  content: "";
  clear: both;
  /* 只有块级元素才管用 */
  display: block;
  height: 0;
  line-height: 0;
  visibility: hidden;
}
// 1行、2行溢出省略号，参考：https://www.jianshu.com/p/33284f21753d
.ellipsis-1 {
  display: -webkit-box;
  overflow: hidden;
  white-space: normal!important;
  text-overflow: ellipsis;
  word-wrap: break-word;
  /*! autoprefixer: off */
  -webkit-box-orient: vertical;
  /* autoprefixer: on */
  -webkit-line-clamp: 1;
}
.ellipsis-2 {
  display: -webkit-box;
  overflow: hidden;
  white-space: normal!important;
  text-overflow: ellipsis;
  word-wrap: break-word;
  /*! autoprefixer: off */
  -webkit-box-orient: vertical;
  /* autoprefixer: on */
  -webkit-line-clamp: 2;
}
/* 轮播图相关 */
.mint-swipe-indicator {
  box-shadow: 0 0 1px 1px rgba(130,130,130,1)
}
/* 加载效果 */
.loading {
  text-align: center;
  margin-top: 10px;
  .mint-spinner-fading-circle {
    display: inline-block;
    vertical-align: middle;
    margin-right:5px;
  }
}

body {
  // body 公用样式
  line-height: 21px;
  color: #000;
  background-color: #efeff4;
  // body 全屏容器
  position: absolute; /* absolute 基于最近的有定位的上级元素，这里会找到 window，所以这个是全屏容器  */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  #app {
    width: 100%;
    height: 100%;
  }
}
/* 版心 */
.lt_container {
  max-width: 1080px;
  // max-width: 750px;
  min-width: 320px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
}

/* 中间部分 */
.lt_content {
  width: 100%;
  height: 100%;
  padding-top: 45px;
  padding-bottom: 55px;
  /* lt_wrapper 用这个容器来承载内容，是因为 lt_content 容器有padding，如果lt_content的孩子有定位的话，依然会从lt_content的(0,0)位置开始计算而忽略padding，这样会不方便计算，所以在lt_content中加一个盒子(lt_wrapper) 来承载内容 */
  .lt_wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    background: #fff;
    /* 在使用 mint-ui 时，页面中部分区域实现无限滚动时(infinite-scroll)，包裹 infinite-scroll 组件的div元素需要设置一个高度，并且overflow要为auto，不能为hidden(为hidden时滚动不了)*/
    overflow: auto;
  }
}
/* 产品容器 */
.lt_product {
  padding: 0 10px;
  padding-bottom: 10px;
}
.lt_product ul {
  margin: 0;
  padding: 0;
  list-style: none;
  width: 100%;
  li {
    width: 50%;
    float: left;
    margin-top: 10px;
    a{
      display: block;
      width: 100%;
      /* height: 200px; */
      box-shadow: 0 0 1px #666;
      /* border: 1px solid #666; */
    }
  }
  li:nth-child(2n+1) {
    padding-right: 5px;
  }
  li:nth-child(2n+2) {
    padding-left: 5px;
  }
}
.lt_proBox {
  padding-bottom: 5px;
  img  {
    width: 100%;
    display: block;
    color: #444;
  }
  .name {
    padding: 0 5px;
  }
  .price {
    font-size: 12px;
    text-align: center;
    .nowPrice {
      color: red;
    }
    .oldPrice {
      color: #ccc;
      text-decoration: line-through;
    }
  }
  button {
    display: block;
    margin: 0 auto;
    background: #069;
    border-color: #069;
    color: #fff;
  }
}

/* 搜索框 */
.lt_search {
  width: 100%;
  padding: 10px;
  position: relative;
  input {
    width: 100%;
    height: 30px;
    border: 1px solid #069;
    border-radius: 2px;
    background: #fff;
    margin: 0;
    padding: 0 70px 0 10px;
    text-align: left;
    font-size: 12px;
  }
  a{
    position: absolute;
    top: 10px;
    right: 10px;
    width: 60px;
    height: 30px;
    line-height: 30px;
    background: #069;
    color: #fff;
    font-size: 14px;
    text-align: center;
    /* border-radius: 0 2px 2px 0; */
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
  }
}

</style>
