# 会用到的一些css特效集合

### 圆形扩展
使用的是`clip-path`中的`circle`方法
`circle(半径 at 圆心坐标)`
```css
.in {
  animation: clipCircleIn .6s;
}
@keyframes clipCircleIn {
  0% {
    clip-path: circle(0 at 50% 50%);
  }
  100% {
    clip-path: circle(200px at 50% 50%);
  }    
}
```
### 三角效果
```css
.in {
  animation: clipTriangleIn .6s;
}
@keyframes clipTriangleIn {
  0%   {
    clip-path: polygon(50% 50%, 49% 51%, 51% 51%);
  }
  100% {
    clip-path: polygon(50% -100%, -100% 150%, 200% 150%);
  }    
}
```
### 带圆角的矩形效果
这里的效果是借助clip-path中的inset方法。在clip-path的这个方法函数中，inset是最难理解的，因为和clip属性的rect()参数含义容易弄混淆
`inset(距离元素上边缘距离 距离元素右边缘距离 距离元素下边缘距离 距离元素左边缘距离 round 圆角大小)`
```css
.in {
  animation: clipRectIn .6s;
}
@keyframes clipRectIn {
  0% {
    clip-path: inset(50% round 10% 50%);
  }
  100% {
    clip-path: inset(0% round 0);
  }    
}
```
### 扇形展开效果
```css
.in {
  animation: clipSectorIn .6s linear;
}
@keyframes clipSectorIn {
  0% {
    clip-path: polygon(50% 100%, 50% 0%, 0% 0%, 100% 0%, 50% 0%);
  }
  50% {
    clip-path: polygon(50% 100%, 0% 0%, 0% 0%, 100% 0%, 100% 0%);
  }
  100% {
    clip-path: polygon(50% 100%, 0% 100%, 0% 0%, 100% 0%, 100% 100%);
  }
}
```
### 圆点百花齐放效果
实时效果如下，Chrome和Android下可见
```css
.in {
  mask: radial-gradient(#000 calc(1% * var(--seed)), transparent calc(1% * var(--seed)));
  mask-size: 40px 40px;
  animation: seed 1s;
}
@keyframes seed {
  0%{--seed:0}1%{--seed:1}2%{--seed:2}3%{--seed:3}...98%{--seed:98}99%{--seed:99}100%{--seed:100}
}
```