<!--
 * @Descripttion: 
 * @version: 
 * @Author: shenjia
 * @Date: 2021-09-23 19:34:20
 * @LastEditors: shenjia
 * @LastEditTime: 2021-09-24 12:25:11
-->
# React 面试简历

1. 创建组件的方法
   1. React.createClass 
   2. React.Component: class组件
   3. function: 函数组件

2. React 生命周期
   不同时期触发的方法不同
   1. mount(组件挂载)
      1. constructor()
      2. static getDerivedStateFromProps() [使用方法及建议](https://www.jianshu.com/p/50fe3fb9f7c3) [官方文档说明](https://zh-hans.reactjs.org/docs/react-component.html#static-getderivedstatefromprops)
      3. render
      4. componentDidMount()
      5. UNSAFE_componentWillMount
         1. render 之前。此时获取到的state不是最新的(原因？如何解决？)
   2. update(组件更新)
      1. static getDerivedStateFromProps()
      2. shouldComponentUpdate()
      3. render()
      4. getSnapshotBeforeUpdate()
      5. componentDidUpdate()
      6. UNSAFE_componentWillUpdate()
      7. UNSAFE_componentWillReceiveProps()
         1. 仅在父组件发生改变时才会触发该方法，而 getDerivedStateFromProps() 不仅可以在调用render之前、初始挂载，还可以在后续更新时会调用
   3. 组件卸载时
      1. componentWillUnmount 
         1. 例如：清除定时器
   4. 错误监听
      1. static getDerivedStateFromError()
      2. componentDidCatch()

  forceUpdate()如何触发更新？原理是什么？

3. setState() [使用方法和建议](https://www.jianshu.com/p/799b8a14ef96)
   1. 本身不是异步的方法，内部的处理逻辑是同步的，只是从行为表现上看是异步的。
      1. 当在JS原生事件和setTimeout中是同步的，在合并事件和hook中是异步的（保证性能）
   2. 如果传的值是对象，则无法立即取到最新的值，可以通过传递函数的方式获取到最新的值
      ```
      this.setState((preState)=>({count: preState.count+1}))
      ```
   3. 其如何触发更新？
   4. [工作原理](https://juejin.cn/post/6992006476558499853)

