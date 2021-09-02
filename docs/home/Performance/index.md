<!--
 * @Descripttion: 
 * @version: 
 * @Author: shenjia
 * @Date: 2021-08-24 11:52:34
 * @LastEditors: shenjia
 * @LastEditTime: 2021-08-24 11:54:21
-->
# 性能优化

## 指标：

### FCP (First Contentful Paint)
渲染第一个元素(文本、图片、canvas...)的时间点

### SI (Speed Index)
首屏展现时间

### LCP (Largest Contentful Paint)
渲染可视区域内最大内容元素的时间点

### TTI (Time to Interactive)
页面资源加载成功并能响应用户交互的时间点

### TBT (Total Blocking Time)
FCP到TTI之间,主线程被long task(超过50ms)阻塞的时间之和

### CLS (Cumulative Layout Shift)
累计布局偏移值

### FID (First Input Delay)
用户第一次在页面进行交互(点击链接、按钮、自定义js事件),到浏览器实际开始处理这个事件的时间
