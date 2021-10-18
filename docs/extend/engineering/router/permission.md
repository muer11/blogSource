<!--
 * @Descripttion: 
 * @version: 
 * @Author: shenjia
 * @Date: 2021-09-27 10:50:44
 * @LastEditors: shenjia
 * @LastEditTime: 2021-09-27 13:46:01
-->
# 权限系统的配置

1. 获取权限系统配置的权限内容
2. 使用 [unstated-next](https://github.com/jamiebuilds/unstated-next) 实现数据的传递
   1. 使用此的原因是？
      1. Hooks未能提供解决多组件之间的数据传输问题，[useReducer](https://zh-hans.reactjs.org/docs/hooks-reference.html#usereducer)只能解决内部组件数据传输的问题
      2. 使用useContext？
      3. Redux和Mobx较重
         1. Redux(pull) 写起来比较重复繁琐，要写 action 、 reducer 、 dispatch
         2. mobox(push) 的数据驱动较好，但当业务场景复杂时，就不太好维护
      4. 比 unstated 更轻，且可使用 hooks （ unstated 只能用 class ）
      5. 
   2. 






参考：
[精读《unstated 与 unstated-next 源码》](https://zhuanlan.zhihu.com/p/93500556)
[unstated: 可能是简单状态管理工具中最好的](https://zhuanlan.zhihu.com/p/48219978)