<!--
 * @Descripttion: 
 * @version: 
 * @Author: shenjia
 * @Date: 2021-10-08 15:44:04
 * @LastEditors: shenjia
 * @LastEditTime: 2021-10-09 16:20:54
-->

## 页面加载的总体流程
1. 浏览器地址栏输入 URL 并回车
2. 浏览器查找当前 URL 是否存在缓存，并比较缓存是否过期
3. DNS 解析 URL 对应的 IP
4. 根据 IP 建立 TCP 连接（三次握手）
5. 发送 http 请求
6. 服务器处理请求，浏览器接受 HTTP 响应
7. 浏览器解析并渲染页面
8. 关闭 TCP 连接（四次握手）



## 浏览器渲染过程
![渲染流程图](/assets/img/ContentTree.png "渲染流程图")

1. 浏览器解析 HTML/SVG/XHTML、CSS、JS 这三类文件。
   - HTML/SVG/XHTML: 事实上，Webkit 有三个 C++ 的类对应这三类文档。解析这三种文件会产生一个 DOM Tree。
   - CSS: 解析 CSS 会产生 CSS 规则树。
   - JS脚本: 主要是通过 DOM API 和 CSSOM API 来操作 DOM Tree 和 CSS Rule Tree 。
  <!-- * DOM 解析
  当 html 代码如下时：
  ```
    <html>
    <html>
    <head>
        <title>Web page parsing</title>
    </head>
    <body>
        <div>
            <h1>Web page parsing</h1>
            <p>This is an example Web page.</p>
        </div>
    </body>
    </html>
  ```
  解析后的结果是：
  ![DOM 树](/assets/img/domTree.png 'DOM树') -->


  * CSS 解析
  当解析如下 HTML 和 CSS 时：
  ```
  HTML:
  <doc>
    <title>A few quotes</title>
    <para>
      Franklin said that <quote>"A penny saved is a penny earned."</quote>
    </para>
    <para>
      FDR said <quote>"We have nothing to fear but <span>fear itself.</span>"</quote>
    </para>
  </doc>
  ```
  解析后的 DOM Tree：
  ![解析后的 DOM Tree](/assets/img/domTree01.png '解析后的 DOM tree')
  
  ```
  CSS:
  /* rule 1 */ doc { display: block; text-indent: 1em; }
  /* rule 2 */ title { display: block; font-size: 3em; }
  /* rule 3 */ para { display: block; }
  /* rule 4 */ [class="emph"] { font-style: italic; }
  ```
  解析后的 CSSOM Tree：
  ![解析后的 CSSOM Tree](/assets/img/CSSOMTree01.png '解析后的 CSSOM tree')

  注意：由于 CSS 去匹配 DOM 节点是一个相当复杂和产生性能问题的点，因此应尽量减少 DOM树 的大小，CSS 尽量用 id 和class，减小 DOM 层级嵌套深度。

2. 解析完成后，浏览器引擎会通过 DOM Tree 和 CSS Rule Tree 来构造 Rendering Tree。
   - Rendering Tree 渲染树并不等同于 DOM 树，因为一些像 Header 或 display:none 的元素就没必要放在渲染树中了。
   - CSS 的 Rule Tree 主要是为了完成匹配并把 CSS Rule 附加上 Rendering Tree 上的每个 Element，即 DOM 结点 / Frame。
   - 计算每个Frame（也就是每个Element）的位置，这又叫 layout 和 reflow 过程。

  由上述 DOM Tree 和 CSSOM Tree 生成的 Style Context Tree 如下展示：
  ![构造完成的 Style Context Tree](/assets/img/ContentTree.png '构造完成的 Style Context Tree')

3. 最后通过调用操作系统 Native GUI 的 API 绘制。

触发 reflow 的情况：

触发 repaint 的情况：

## 三次握手的重要性

## 四次回收的重要性

## 如何解析URL参数


## 参考
- [史上最详细的经典面试题 从输入URL到看到页面发生了什么？](https://juejin.cn/post/6844903832435032072)
- [你不知道的浏览器页面渲染机制](https://juejin.cn/post/6844903815758479374#heading-1)
- [浏览器的渲染原理简介](https://coolshell.cn/articles/9666.html)

