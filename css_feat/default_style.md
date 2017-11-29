# css的一些默认样式修改:
### 去掉input获得焦点时的默认框
```css

/* 去掉input默认边框 */
input {
	outline:none;
} 

/* 去掉滚动条 */
&::-webkit-scrollbar {
	display: none;
}

/* 彩色照片显示为黑白照片 */
img.desaturate {
	filter: grayscale(100%);
	-webkit-filter: grayscale(100%);
	-moz-filter: grayscale(100%);
	-ms-filter: grayscale(100%);
	-o-filter: grayscale(100%);
}

/* 使用 :not() 伪类来应用元素 */
.nav li:not(:last-child) {
	border-right: 1px solid #666;
}

/* 新元素有兄弟元素的话，也可以使用通用的兄弟选择符（~） */
.nav li:first-child ~ li {
	border-left: 1px solid #666;
}

/* 网页加上顶部阴影效果 */
body:before {
	content: "";
	position: fixed;
	top: -10px;
	left: 0;
	width: 100%;
	height: 10px;
	-webkit-box-shadow: 0px 0px 10px rgba(0,0,0,.8);
	-moz-box-shadow: 0px 0px 10px rgba(0,0,0,.8);
	box-shadow: 0px 0px 10px rgba(0,0,0,.8);
	z-index: 100;
}

/* 不需要分别添加 line-height 到每个p,h标记等。只要添加到 body 即可 */
body {
	line-height: 1;
}

/* 垂直居中 */
{
	-webkit-align-items: center;
	-ms-flex-align: center;  
	align-items: center;
	display: -webkit-flex;
	display: flex;
}

/* 有时，字体并不能在所有设备上都达到最佳的显示，所以可以让设备浏览器来帮助你 */
html {
	-moz-osx-font-smoothing: grayscale;
	-webkit-font-smoothing: antialiased;
	text-rendering: optimizeLegibility;
}

/* 使用 max-height 和溢出隐藏来实现只有CSS的滑块 */
.slider ul {
	max-height: 0;
	overlow: hidden;
}
.slider:hover ul {
	max-height: 1000px;
	transition: .3s ease;
}

/* 让 box-sizing 继承 html： */
html {
	box-sizing: border-box;
}
*, *:before, *:after {
	box-sizing: inherit;
}

/* 表格工作起来很麻烦，所以务必尽量使用 table-layout: fixed 来保持单元格的等宽 */
.calendar {
	table-layout: fixed;
}

/* 当需要用到列分隔符时，通过flexbox的 space-between 属性，你就可以摆脱nth-，first-，和 last-child 的hack了 */
.list {
	display: flex
	justify-content: space-between;
}
.list .person {
	flex-basis: 23%;
}

/* 当a元素没有文本值，但 href 属性有链接的时候显示链接 */
a[href^="http"]:empty::before {
	content: attr(href);
}
/* 检测鼠标双击 */
/* HTML：*/

<div class="test3">

  <span><input type="text" value=" " readonly="true" />

  <a href="http://renpingjun.com">Double click me</a></span>

</div>

/*CSS：*/
.test3 span {
	position: relative;
}
.test3 span a {
	position: relative;
	z-index: 2;
}
.test3 span a:hover, .test3 span a:active {
	z-index: 4;
}
.test3 span input {
	background: transparent;
	border: 0;
	cursor: pointer;
	position: absolute;
	top: -1px;
	left: 0;
	width: 101%;  /* Hacky */
	height: 301%; /* Hacky */
	z-index: 3;
}
.test3 span input:focus {
	background: transparent;
	border: 0;
	z-index: 1;
}

/* css三角形 */
/* create an arrow that points up */
div.arrow-up {
	width:0px;
	height:0px;
	border-left:5px solid transparent;  /* left arrow slant */
	border-right:5px solid transparent; /* right arrow slant */
	border-bottom:5px solid #2f2f2f; /* bottom, add background color here */
	font-size:0px;
	line-height:0px;
}

/* create an arrow that points down */
div.arrow-down {
	width:0px;
	height:0px;
	border-left:5px solid transparent;
	border-right:5px solid transparent;
	border-top:5px solid #2f2f2f;
	font-size:0px;
	line-height:0px;
}

/* create an arrow that points left */
div.arrow-left {
	width:0px;
	height:0px;
	border-bottom:5px solid transparent;  /* left arrow slant */
	border-top:5px solid transparent; /* right arrow slant */
	border-right:5px solid #2f2f2f; /* bottom, add background color here */
	font-size:0px;
	line-height:0px;
}

/* create an arrow that points right */
div.arrow-right {
	width:0px;
	height:0px;
	border-bottom:5px solid transparent;  /* left arrow slant */
	border-top:5px solid transparent; /* right arrow slant */
	border-left:5px solid #2f2f2f; /* bottom, add background color here */
	font-size:0px;
	line-height:0px;
}

/* CSS3 calc() 的使用: calc() 用法类似于函数，能够给元素设置动态的值 */
/* basic calc */
.simpleBlock {
	width: calc(100% - 100px);
}

/* calc in calc */
.complexBlock {
	width: calc(100% - 50% / 3);
	padding: 5px calc(3% - 2px);
	margin-left: calc(10% + 10px);
}

/* 文本渐变效果很流行，使用 CSS3 能够很简单就实现 */
h2[data-text] {
	position: relative;
}
h2[data-text]::after {
	content: attr(data-text);
	z-index: 10;
	color: #e3e3e3;
	position: absolute;
	top: 0;
	left: 0;
	-webkit-mask-image: -webkit-gradient(linear, left top, left bottom, from(rgba(0,0,0,0)), color-stop(50%, rgba(0,0,0,1)), to(rgba(0,0,0,0)));
}

/* CSS3 新增的 pointer-events 让你能够禁用元素的鼠标事件，例如，一个连接如果设置了下面的样式就无法点击了 */
.disabled {
	pointer-events: none;
}

/* 简单但很漂亮的文本模糊效果 */
.blur {
	color: transparent;
	text-shadow: 0 0 5px rgba(0,0,0,0.5);
}

/* 多行文本省略打点 */
.text {
	/*height: 60px;*/
	width: 50px;
	display: -webkit-box;
	display: -moz-box;
	overflow: hidden;
	text-overflow: ellipsis;
	word-break: break-all;
	-webkit-box-orient: vertical;
	-webkit-line-clamp:3;
}

/* 文本保留回车换行和空格 */
.text {
	white-space:pre-wrap;
}
```
