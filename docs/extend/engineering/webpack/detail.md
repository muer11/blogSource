<!--
 * @Descripttion: 
 * @version: 
 * @Author: shenjia
 * @Date: 2021-09-02 10:05:53
 * @LastEditors: shenjia
 * @LastEditTime: 2021-10-08 20:47:18
-->
# webpack 内部详情及配置

## webpack 是什么？
Webpack本质上一种基于事件流的编程范例，其实就是一系列的插件运行。
Webpack主要使用**Compiler**和**Compilation**两个类来控制Webpack的整个生命周期。他们都继承了Tapabel并且通过Tapabel来注册了生命周期中的每一个流程需要触发的事件。

loader
plugin
按需加载的性能优化

## webpack Plugin 和 Loader 的区别

## 常用的 Loader 有哪些？他们的作用是什么？
- css-loader
  - 将导入的 CSS 文件转化为模块供后续 Loader 处理
- style-loader
  - 将 CSS 模块的内容在运行时添加到页面的 style 标签中

## Webpack 有哪些优化手段?
[带你深度解锁Webpack系列(优化篇)](https://juejin.cn/post/6844904093463347208)
