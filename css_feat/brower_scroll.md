## 各浏览器隐藏滚动条
  此时，主要是隐藏 `body` 的滚动条

### Chrome
```css
body::-webkit-scrollbar {
  display: none;
}
```

### IE/Edge
```css
body {
  -ms-overflow-style: none;
}
```

### Firefox
```css
html {
  overflow: -moz-hidden-unscrollable; /*注意！若只打 hidden，chrome 的其它 hidden 会出问题*/
  height: 100%;
}

body {
  height: 100%;
  width: calc(100vw + 18px); /*浏览器滚动条的长度大约是 18px*/
  overflow: auto;
}
```
到此还没结束，你还要在一些地方加上 `width: 100vw;` 。
假设 `HTML` 长这样：
```html
<body>
  <div id="example-1">
    <p>埃米纳姆</p>
  </div>
  <article id="example-2">
    <h1>你没有资格议论我</h1>
    <p>因为你根本不知道我经历了什么</p>
    <button>fuck！</button>
  </article>
</body>
```
 `css` 也要加上
```css
#example-1 {
  width: 100vw;
}

#example-2 {
  width: 100vw;
}
```

### 要让三大浏览器的滚动条都隐藏，并且可以滚动，`CSS` 就至少要长这样：
```css
html {
  overflow: -moz-hidden-unscrollable;
  height: 100%;
}

body::-webkit-scrollbar {
  display: none;
}

body {
  -ms-overflow-style: none;
  height: 100%;
  width: calc(100vw + 18px);
  overflow: auto;
}
```