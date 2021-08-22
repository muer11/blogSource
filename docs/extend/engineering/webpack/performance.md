<!--
 * @Descripttion: 
 * @version: 
 * @Author: shenjia
 * @Date: 2021-08-09 10:32:49
 * @LastEditors: shenjia
 * @LastEditTime: 2021-08-13 11:27:43
-->
# 如何实现性能优化？

思路：在什么场景下，遇到了什么性能问题，围绕什么样的性能指标，采取了哪些性能优化手段，最后取得了什么样的结果（性能优化对业务带来的收益是什么？）。


性能优化流程：
1. 性能指标设定：
   1. 可衡量，就是可以通过代码来度量
   2. 关注以用户为中心的关键结果和真实体验
2. 确定性能标准
   1. 两方面：
      1. 加载
         1. 进入页面时，页面内容（文字、图片）的加载过程是否流畅
         2. 判断依据：
            1. First contentful paint (**FCP**)： 测量页面开始加载到某一块内容显示在页面上的时间
            2. Largest contentful paint (**LCP**)： 测量页面开始加载到最大文本块内容或图片显示在页面中的时间。
            3. DomContentLoaded Event：DOM解析完成时间
            4. OnLoad Event：页面资源加载完成时间
            5. 白屏时间 < (300ms ~ 1s)
                **从输入内容回车（包括刷新、跳转等方式）后，到页面开始出现第一个字符的时间.**
               1.  DNS 查询，建立 TCP 连接，发送首个HTTP请求（如果使用HTTPS还要介入 TLS 的验证时间），返回HTML文档，HTML文档 Head 解析完毕
                   1.   DNS 查询时间长
                   2.   建立 TCP 请求链接太慢
                   3.   服务器处理请求速度太慢
                   4.   客户端下载、解析、渲染时长过长
                   5.   没有做 Gzip 压缩
                   6.   缺乏本地离线化处理
            6. 首屏时间 = 白屏时间 + 渲染时间 ( < 1.5s )
               1. 秒开率 = 屏时间 < 1s 的概率， 可利用Spark计算
            7. 
      2. 交互
         1. 用户点击网站或 App 的某个功能，页面交互上是否未打断用户操作
         2. 判断依据：
            1. 视觉稳定性指标 **CLS**（ Cumulative layout shift ）
               即布局偏移量，它是指页面从一帧切换到另外一帧时，视线中不稳定元素的偏移情况。
            2. 首次输入延迟 **FID**（ First Input Delay ）< 100ms 
               测量用户首次与网站进行交互(例如点击一个链接、按钮、js自定义控件)到浏览器真正进行响应的时间。
            3. 视觉变化率 **PSI**（ Perceptual Speed Index ）< 20%
      3. 扩展知识：
         1. （Chrome）浏览器架构：当导航提交完成后，渲染进程开始着手加载资源以及渲染页面。一旦渲染进程“完成”（finished）渲染，它会通过IPC告知浏览器进程（注意这发生在页面上所有帧（frames）的 onload 事件都已经被触发了而且对应的处理函数已经执行完成了的时候），然后UI线程就会停止导航栏上旋转的圈圈。
         2. 所以如果为了减少进度条的加载时长，则需要减少onLoad时长。
         3. 使用ChromeDevTool作为基础的性能分析工具:
            1. Network：观察网络资源加载耗时及顺序
               - 需要禁用缓存、启用网络限速（4g/3g） 模拟移动端弱网情况下
               - DOMContentLoaded：分析哪些资源加载时间较长
               - onload 
                 - 影响因素：
                   - 1.JS加载并执行完成时间 -> 对JS进行压缩、拆分处理（HTTP2下）
                   - 2.（内部或外部的图片、视频等）资源加载完成 -> 优化资源的加载时机
                 - 
                 - [深入理解 window.onload](http://eux.baidu.com/blog/fe/%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3window.onload)
            2. Performace：观察页面渲染表现及JS执行情况
               - PC端模拟手机端可将 CPU 设置为 4x slowdown 或 6x slowdown 
               - 核心数据：
                 -  Web Vitals 中的 FP 、 FCP 、 LCP 、 Layout Shift 核心页面指标 和 Timings 时长
                 -  Main Long Tasks 长任务数量和时长，找到耗时较长的任务
               - 结果分析及方案：
                 -  页面 LCP 触发时间较晚，且出现多次布局偏移，影响用户体验，需要尽早渲染内容和减少布局偏移
                 -  页面 Long Tasks 较多，需要对 JS 进行合理拆分和加载，减少 Long Tasks 数量，特别是影响 DCL 和 Onload Event 的 Task
            3. Lighthouse：对网站进行整体评分，找出可优化项
               1. 根据检测出来的结果及优化建议进行优化
         4. 打包分析：webpack-bundle-analyzer 、rollup-plugin-visualizer等
3. 收益评估
4. 诊断清单
5. 优化手段
   1. 解决首屏秒开的方案：
      1. 懒加载：
         1. 即在长页面加载过程时，先加载关键内容，延迟加载非关键内容。
         2. 实际使用场景：
            1. 先根据手机的可视窗口，估算需要多少条数据，超出首屏的内容，可以在页面下拉或者滚动时再发起加载。
            2. **如何实现图片的懒加载？**
         3. 本质是提供首屏后请求非关键内容的能力
      
      2. 缓存：
         1. 本质是赋予二次访问不需要重复请求的能力
         2. 在首屏优化方案中，接口缓存和静态资源缓存起到中流砥柱的作用
         3. 接口缓存：
            1. Native端通过在WebView初始化之前开始请求数据，可节省时间
         4. 静态资源缓存：
            1. 强缓存
               1. Cache-Control:max-age=31536000
               2. 适用于资源长期不变
            2. 协商缓存
               1. Etag + If-none-match
               2. 适用于资源本身随时会发生改动
      
      3. 离线化：
         1. 线上实时变动的资源数据静态化到本地，访问时走的是本地文件的方案。
         2. 适合首页或者列表页等不需要登录页面的场景，同时能够支持 SEO 功能。
         3. Webpack 的 prerender-spa-plugin 来实现预渲染
         4. [前端prerender-spa-plugin预渲染](https://segmentfault.com/a/1190000018182165)
      
      4. 并行化： 
         1. 前三者是在请求本身上下功夫，想尽办法减少请求或者推迟请求，而并行化则是在请求通道上功夫，解决请求阻塞问题，进而减少首屏时间。
         2. **HTTP2.0 多路复用**

       综上，懒加载解决的是客户端渲染的问题，缓存是请求服务端数据的性能问题，离线化是综合各方面的解决方案，并行化解决的是请求次数的限制问题。

   2. 解决白屏的方案：
       1. DNS查询优化
          1. DNS查询是浏览器发起请求时，需要将用户输入的域名地址转换为 IP 地址的过程。
        
        - 前端处理：
        ```
          <meta http-equiv="x-dns-prefetch-control" content="on" /> // 开启 DNS 预解析功能
          <link rel="dns-prefetch" href="https://s.google.com/" > // 强制对 s.google.com 的域名做预解析
        ```

        - 客户端处理：
          - 

       2. 首字符展示
          1. 骨架屏：在页面数据加载完成前，先给用户展示出页面的大致结构（灰色占位图），告诉用户页面正在渐进式地加载中，然后在渲染出实际页面后，把这个结构替换掉。骨架屏并没有真正减少白屏时间，但是给了用户一个心理预期，让他可以感受到页面上大致有什么内容。
       
       3. 卡顿治理
          1. 解决步骤：
             1. 先定位问题：通过 charles 等工具抓包看接口数据，如果是和接口相关，找后端同学，或使用数据缓存的方式解决；若为前端问题，则主要是以下两种情况：
                1. 浏览器的主线程与合成线程调度不合理
                   1. 
                2. 计算耗时操作
             2. 



   3. webpack 打包优化：
      1. 关键JS打包优化
         1. Splitchunks 的正确配置（可使用）
         2. 提取不同页面和组件都有的共同依赖打包到同一个文件中
      2. 公共组件的按需加载
         1. 按需加载的内容应该为独立的组件
         2. [antd babel-plugin-import](https://ant.design/docs/react/getting-started-cn#%E6%8C%89%E9%9C%80%E5%8A%A0%E8%BD%BD)
      3. 业务组件的代码拆分 (Code Splitting)
         1. [react-loadable](https://zhuanlan.zhihu.com/p/25874892)、@loadable/component 等库
         2. React.lazy
   4. 媒体资源懒加载
      1. lazysizes库 ``` className="lazyload" ```
      2. 加载时序优化：
         可onload之后加载图片，但要注意懒加载不能阻塞业务的正常展示，应该做好超时处理、重试等兜底措施
      3. 大小尺寸优化
         1. CDN图床压缩图片 + 使用 img 标签 srcset/sizes 属性和 picutre 标签实现响应式图片
         2. 使用URL动态拼接方式构造url请求，根据机型宽度和网络情况，判断当前图片宽度倍数进行调整（如iphone 1x，ipad 2x，弱网0.5x）
            1. 比如阿里云图片压缩配置
         3. 注意：实际业务中需要视觉同学参与，评估图片的清晰度是否符合视觉标准，避免反向优化！
      4. 把 iframe 资源延迟到 onLoad 事件之后
      5. 字体包大小的优化：[fontmin](https://ecomfe.github.io/fontmin/#app) 压缩字体资源
   5. 页面渲染优化
      1. 直出页面 [TTFB](https://www.cnblogs.com/123blog/articles/11697450.html) 时间优化
      2. 页面渲染时间优化
         1. 在Sources中找到css对应的Coverage，分析它的解析时间，适当地把首屏未用到的放到之后展示
      3. 页面布局抖动优化
         1. 确定直出页面元素出现位置，根据直出数据做好布局
         2. 页面小图可以通过base64处理，页面解析的时候就会立即展示
         3. 减少动态内容对页面布局的影响，使用脱离文档流的方式或定好宽高


6. 性能项目立项
7. 性能实践
   1. React.lazy + React.Suspense
      1. 原理是什么？
      [深入理解React：懒加载（lazy）实现原理](https://juejin.cn/post/6844904191853494280#comment)
      1. Suspense可以使组件“等待”某些操作结束后，再进行渲染。
      
      ```
        import React, { lazy, Suspense } from 'react';
        const OtherComponent = lazy(() => import('./OtherComponent'));
        const AnotherComponent = lazy(() => import('./AnotherComponent'));

        function MyComponent() {
          return (
            <div>
              <Suspense fallback={<div>Loading...</div>}>
                <section>
                  <OtherComponent />
                  <AnotherComponent />
                </section>
              </Suspense>
            </div>
          );
        }
      ```



参考：
[腾讯企鹅辅导 H5 性能极致优化](https://juejin.cn/post/6994383328182796295)