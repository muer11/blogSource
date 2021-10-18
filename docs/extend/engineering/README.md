<!--
 * @Descripttion: 
 * @version: 
 * @Author: shenjia
 * @Date: 2021-08-09 21:01:32
 * @LastEditors: shenjia
 * @LastEditTime: 2021-10-10 11:17:47
-->
# 前端工程化

开发-构建-部署

## 开发篇

### 脚手架
1. 对脚手架的理解
   1. 通过简单的配置，即可快速生成项目的基础代码
   2. 集成了开发者的最佳实践
   3. 通过自定义配置来适配不同项目

2. 组成部分
   1. 配置 package.json：设置 npm 依赖管理体系下的基础配置文件
   2. 明确包管理器：选择使用 npm 或 Yarn 作为包管理器，并添加对应的 lock 文件，确保在不同环境下部署项目时的依赖稳定性
   3. 明确项目技术栈：包含了技术框架、CSS 预处理器、是否使用 TS 、使用什么数据流模块。在明确选择后安装相关依赖包并在 src 目录中建立入口源码文件。
   4. 选择构建工具：webpack 或根据当前的主流工具
   5. 打通构建流程：通过安装与配置各种 Loader 、插件和其他配置项，来确保开发和生产环境能正常构建代码和预览效果
   6. 优化构建流程：针对开发/生产环境的不同特点进行各自优化
   7. 选择和调试辅助工具：代码检查工具和单元测试工具，安装相应依赖并调试配置文件
   8. 收尾工作：编写说明文档 README.md，将不需要纳入版本管理的文件目录记入 .gitignore 等

3. 常见的脚手架
   1. [Yoman](https://yeoman.io/learning/index.html)
   2. [Create React App](https://create-react-app.dev/docs/getting-started)
      1. 它由 create-react-app 和 react-scripts 组成，由于这个脚手架为黑盒配置，若需要优化，则容易破坏原本的内容，因此提供了 react-rewired 和 customize-cra 工具
   3. Vue CLI 
      1. 由三部分组成
         - 作为全局命令的 @vue/cli
         - 作为项目内集成工具的 @vue/cli-service
         - 作为功能插件系统的 @vue/cli-plugin-
      2. 相较于 CRA 的优点：在保留了创建项目开箱即用的优点的同时，提供了用于覆盖修改原有配置的自定义构建配置文件和其他工具配置文件。

   比较 CRA 和 Vue CLI ：
   - webpack loaders
   - webpack plugins
   - webpack.optimize
   - webpack resolve

4. 如何定制一个脚手架？
   - 4.1 为项目引入新的通用特性。
   - 4.2 针对构建环节的 webpack 配置优化，来提升开发环境的效率和生产环境的性能等。
   - 4.3 定制符合团队内部规范的代码检测规则配置。
   - 4.4 定制单元测试等辅助工具模块的配置项。
   - 4.5 定制符合团队内部规范的目录结构与通用业务模块，例如业务组件库、辅助工具类、页面模板等。

### 热更新

1. 浏览器的热更新原理（*）
   浏览器的热更新，指的是我们在本地开发的同时打开浏览器进行预览，当代码文件发生变化时，浏览器自动更新页面内容的技术。这里的自动更新，表现上又分为自动刷新整个页面，以及页面整体无刷新而只更新页面的部分内容。
2. webpack如何实现热更新？
   - watch 模式
     - 可以不用手动执行打包脚本，但浏览器未自动更新内容，需手动刷新才能看到最新内容
   - Live Reload
     - 通过 websocket 建立通信机制来连接浏览器中的预览页面与本地监控代码变更的进程
     - 但是它会刷新整个页面，导致之前填写于表单中的内容等交互效果消失，无疑会增加开发成本
   - Hot Module Replacement （HMR） 模块热替换
     - 修改 css 时，会请求 hot-update.json 和 hot-update.js，实现局部刷新功能
3. HMR 的原理
   ![HMR 的基本流程图](/assets/img/HMR_01.png 'HMR 的基本流程图')

   主要包含了三方面：
   1. watch 对本地源文件更改的监控
   2. 浏览器网页端与本地服务器端的 Websocket 通信
   3. 模块解析与替换功能

4. webpack的打包流程
   - webpack 中的几个专业术语：
     - module：指在模块化编程中我们把应用程序分割成的独立功能的代码模块。
     - chunk：指模块间按照引用关系组合成的代码块，一个 chunk 中可以包含多个 module。
     - chunk group：指通过配置入口点（entry point）区分的块组，一个 chunk group 中可包含一到多个 chunk。
     - bundling：webpack 打包的过程。
     - asset/bundle：打包产物。

   - webpack 的打包思想
     - 一切源代码文件均可通过各种 Loader 转换为 JS 模块 （module），模块之间可以互相引用。
     - webpack 通过入口点（entry point）递归处理各模块引用关系，最后输出为一个或多个产物包 js(bundle) 文件。
     - 每一个入口点都是一个块组（chunk group），在不考虑分包的情况下，一个 chunk group 中只有一个 chunk，该 chunk 包含递归分析后的所有模块。每一个 chunk 都有对应的一个打包后的输出文件（asset/bundle）。

   

## 构建篇
## 部署篇




## 参考
[前端工程化精讲](https://kaiwu.lagou.com/course/courseInfo.htm?courseId=416#/detail/pc?id=4357)
[从 0 构建自己的脚手架/CLI知识体系（万字） 🛠](https://juejin.cn/post/6966119324478079007)