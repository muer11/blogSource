<!--
 * @Descripttion: 
 * @version: 
 * @Author: shenjia
 * @Date: 2021-10-08 16:05:33
 * @LastEditors: shenjia
 * @LastEditTime: 2021-10-09 09:40:13
-->
## css 的渲染层合成是什么？浏览器如何创建新的渲染层？
在 DOM 树中每个节点都会对应一个渲染对象（RenderObject），当它们的渲染对象处于相同的坐标空间（z 轴空间）时，就会形成一个 RenderLayers，也就是渲染层。渲染层将保证页面元素以正确的顺序堆叠，这时候就会出现层合成（composite），从而正确处理透明元素和重叠元素的显示。对于有位置重叠的元素的页面，这个过程尤其重要，因为一旦图层的合并顺序出错，将会导致元素显示异常。

浏览器如何创建新的渲染层
根元素 document
有明确的定位属性（relative、fixed、sticky、absolute）
opacity < 1
有 CSS fliter 属性
有 CSS mask 属性
有 CSS mix-blend-mode 属性且值不为 normal
有 CSS transform 属性且值不为 none
backface-visibility 属性为 hidden
有 CSS reflection 属性
有 CSS column-count 属性且值不为 auto 或者有 CSS column-width 属性且值不为 auto
当前有对于 opacity、transform、fliter、backdrop-filter 应用动画
overflow 不为 visib

## css 怎么开启硬件加速(GPU 加速)
浏览器在处理下面的 css 的时候，会使用 GPU 渲染
- transform（当 3D 变换的样式出现时会使用 GPU 加速）
  - transform: translateZ(0)
  - transform: translate3d(0, 0, 0)
- opacity
- filter
- will-change
  - will-change 可以设置为 opacity、transform、top、left、bottom、right。


## css 优先级是怎么计算的？
第一优先级：!important 会覆盖页面内任何位置的元素样式
1.内联样式，如 style="color: green"，权值为 1000
2.ID 选择器，如#app，权值为 0100
3.类、伪类、属性选择器，如.foo, :first-child, div[class="foo"]，权值为 0010
4.标签、伪元素选择器，如 div::first-line，权值为 0001
5.通配符、子类选择器、兄弟选择器，如*, >, +，权值为 0000
6.继承的样式没有权值


## position 有哪些值，作用分别是什么？
- static
static(没有定位)是 position 的默认值，元素处于正常的文档流中，会忽略 left、top、right、bottom 和 z-index 属性。

- relative
relative(相对定位)是指给元素设置相对于原本位置的定位，元素并不脱离文档流，因此元素原本的位置会被保留，其他的元素位置不会受到影响。
使用场景：子元素相对于父元素进行定位

- absolute
absolute(绝对定位)是指给元素设置绝对的定位，相对定位的对象可以分为两种情况：

设置了 absolute 的元素如果存在有祖先元素设置了 position 属性为 relative 或者 absolute，则这时元素的定位对象为此已设置 position 属性的祖先元素。
如果并没有设置了 position 属性的祖先元素，则此时相对于 body 进行定位。
使用场景：跟随图标 图标使用不依赖定位父级的 absolute 和 margin 属性进行定位，这样，当文本的字符个数改变时，图标的位置可以自适应

- fixed
可以简单说 fixed 是特殊版的 absolute，fixed 元素总是相对于 body 定位的。
使用场景：侧边栏或者广告图

- inherit
继承父元素的 position 属性，但需要注意的是 IE8 以及往前的版本都不支持 inherit 属性。

- sticky
设置了 sticky 的元素，在屏幕范围（viewport）时该元素的位置并不受到定位影响（设置是 top、left 等属性无效），当该元素的位置将要移出偏移范围时，定位又会变成 fixed，根据设置的 left、top 等属性成固定位置的效果。
当元素在容器中被滚动超过指定的偏移值时，元素在容器内固定在指定位置。亦即如果你设置了 top: 50px，那么在 sticky 元素到达距离相对定位的元素顶部 50px 的位置时固定，不再向上移动（相当于此时 fixed 定位）。

使用场景：跟随窗口


## 垂直水平居中实现方式
[参考](https://juejin.cn/post/6844903982960214029)