<!--
 * @Descripttion: 
 * @version: 
 * @Author: shenjia
 * @Date: 2021-10-09 09:51:58
 * @LastEditors: shenjia
 * @LastEditTime: 2021-10-09 11:00:56
-->
## 页面加载时触发的事件及顺序
1. 开始解析 HTML 文档结构
2. 加载外部样式表及 JavaScript 脚本
3. 解析执行 JavaScript 脚本
4. DOM树渲染完成，触发 DOMContentLoaded 事件
5. 加载未完成的外部资源（如 图片）
6. 页面加载成功，触发window.onload事件
   1. 补充：
      1. 能触发 onload 事件的HTML标签：```<body>, <frame>, <frameset>, <iframe>, <img>, <link>, <script>```
      2. 能触发 onload 事件的JS对象：```image, layer, window```

## document readystatechange 事件
- **readyState** 
  - 该属性描述了文档的加载状态，在整个加载过程中 document.readyState 会不断变化，每次变化都会触发readystatechange 事件。
  - readyState 的状态：
    - loading: 加载 document 中。
    - interactive: 互动文档已经完成加载，文档已被解析，但是诸如图像，样式表和框架之类的子资源仍在加载。
    - complete: 完成了文档和所有子资源的加载，load 事件即将被触发。
　　比如说在步骤2的时候对应 interactive ；步骤5之后对应complete ，都会触发readystatechange事件。
　　PS:文档，图片等加载时的readyState 和 XMLHttpRequest.readyState 是不一样的。要注意区分

## document DOMContentLoaded 事件
DOM树渲染完成时触发DOMContentLoaded事件，此时可能外部资源还在加载。jquery中的ready事件就是同样的效果。

## window load 事件
所有的资源全部加载完成会触发 window 的 load事件。

参考：
[页面加载时触发的事件及顺序](https://www.cnblogs.com/shapeY/p/7662406.html)
[关键渲染路径](https://mp.weixin.qq.com/s?__biz=Mzg4MTYwMzY1Mw==&mid=2247495963&idx=1&sn=0c4d17e24e176f96ee879c1e4df9068d&source=41#wechat_redirect)