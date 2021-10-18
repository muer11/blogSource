<!--
 * @Descripttion: 
 * @version: 
 * @Author: shenjia
 * @Date: 2021-10-08 18:42:07
 * @LastEditors: shenjia
 * @LastEditTime: 2021-10-08 20:27:03
-->
## vue 组件通讯方式有哪些方法?
props 和$emit 父组件向子组件传递数据是通过 prop 传递的，子组件传递数据给父组件是通过$emit 触发事件来做到的
$parent,$children 获取当前组件的父组件和当前组件的子组件
$attrs 和$listeners A->B->C。Vue 2.4 开始提供了$attrs 和$listeners 来解决这个问题
父组件中通过 provide 来提供变量，然后在子组件中通过 inject 来注入变量。(官方不推荐在实际业务中使用，但是写组件库时很常用)
$refs 获取组件实例
envetBus 兄弟组件数据传递 这种情况下可以使用事件总线的方式
vuex 状态管理


## Vue 响应式原理
**数据劫持 + 观察者模式**
对象内部通过 defineReactive 方法，使用 Object.defineProperty 将属性进行劫持（只会劫持已经存在的属性），数组则是通过重写数组方法来实现。当页面使用对应属性时，每个属性都拥有自己的 dep 属性，存放他所依赖的 watcher（依赖收集），当属性变化后会通知自己对应的 watcher 去更新(派发更新)。


## Vue nextTick 原理
nextTick 中的回调是在下次 DOM 更新循环结束之后执行的延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。主要思路就是采用微任务优先的方式调用异步方法去执行 nextTick 包装的方法。


## Vue diff 原理
