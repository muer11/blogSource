<!--
 * @Descripttion: React Hooks 的使用
 * @version: 
 * @Author: shenjia
 * @Date: 2021-06-21 10:27:26
 * @LastEditors: shenjia
 * @LastEditTime: 2021-08-13 17:37:39
-->
# React Hooks 的使用

1. 什么是React Hooks?
2. 和class组件相比较，它的优点是什么？
3. 注意事项？
4. 性能优化方案？
   1. 
   2. Lazy、Suspence
   3. useCallback
   4. useMemo
   5. useRef
   6. 

5. 状态逻辑复用
   1. Minxin 混入
      - 本质：将一个对象的属性拷贝到另一个对象上面去。这是继承所不支持的。
      
      代码实现：
      ```
      function setMixin(target, mixin) {
         if (arguments[2]) {
            for (var i = 2, len = arguments.length; i < len; i++) {
               target.prototype[arguments[i]] = mixin.prototype[arguments[i]];
            }
         }
         else {
            for (var methodName in mixin.prototype) {
               if (!Object.hasOwnProperty(target.prototype, methodName)) {
               target.prototype[methodName] = mixin.prototype[methodName];
               }
            }
         }
      }
      setMixin(User,LogMixin,'actionLog');
      setMixin(Goods,LogMixin,'requestLog');
      ```

      - 实际运用场景：
      Underscore的_.extend方法、JQuery的extend方法、React中通过createClass创建React组件中使用mixins

      - 危害：
        - Mixin 可能会相互依赖，相互耦合，不利于代码维护
        - 不同的Mixin中的方法可能会相互冲突
        - Mixin非常多时，组件是可以感知到的，甚至还要为其做相关处理，这样会给代码造成滚雪球式的复杂性

   2. HOC 高阶组件
      1. 为了解决Mixin带来的问题，所以引入了HOC，用来重用组件逻辑。
      2. 其采用装饰模式，在不改变对象自身的基础上，在程序运行期间给对象动态地添加职责。与继承相比，装饰者是一种更轻便灵活的做法。
      3. 实现原理
      4. 和Mixin的比较
      5. 仍存在的问题

   3. Hooks
      1. React v16.7.0-alpha
      
      ```
      useEffect(() => {
         // 只要组件render后就会执行
         return ()=>{}
      });
      useEffect(() => {
         // 只有count改变时才会执行
         return ()=>{}
      },[count]);
      ```
      
      1. 参数：
         1. 函数
            1. 由于这个函数形成了闭包，保证了我们上一次执行函数存储的变量不被销毁和污染，因此即使执行了return清除工作，下一次仍能取到相应的state
         2. 状态依赖（数组）

      2. 声明约束：
         - 不要在循环，条件或嵌套函数中调用Hook
         ```
         // 安装
         npm install eslint-plugin-react-hooks --save-dev
         // 配置
         {
            "plugins": [
               // ...
               "react-hooks"
            ],
            "rules": {
               // ...
               "react-hooks/rules-of-hooks": "error"
            }
         }
         ```


      3. 优点：
         1.  减少状态逻辑复用的风险 （Mixin）
         2.  避免地狱式嵌套 (HOC)
         3.  让组件更容易理解（class）
         4.  




[](https://juejin.cn/post/6844903815762673671)


6. 比较 Class 和 Hooks  
   1. Class：有实例、生命周期函数
   2. Hooks：
      1. 弥补类组件的不足：
         - 状态逻辑难复用
           - 容易导致层级冗余
         - 趋向复杂难以维护
           - 多处对状态的调用和处理
           - 不同生命周期的逻辑处理
         - this指向问题
      2. 能在无需修改组件结构的情况下复用状态逻辑（自定义 Hooks ）
      3. 能将组件中相互关联的部分拆分成更小的函数（比如设置订阅或请求数据）
      4. 副作用的关注点分离：副作用指那些没有发生在数据向视图转换过程中的逻辑，如 ajax 请求、访问原生dom 元素、本地持久化缓存、绑定/解绑事件、添加订阅、设置定时器、记录日志等。以往这些副作用都是写在类组件生命周期函数中的。而 useEffect 在全部渲染完毕后才会执行，useLayoutEffect 会在浏览器 layout 之后，painting 之前执行。
   3. useState & useMemo & useCallback
      1. 每次渲染都是独立的闭包
      2. useState 不会把新的 state 和旧的 state 进行合并，而是直接替换
      3. 可通过将回调函数当做参数传递给setState，实现函数式更新
      4. 
   4. 


   是不是所有的Class组件都能用Hooks代替？

7. Hooks如何实现性能优化？
   1. Object.is(浅比较)
      比较新/旧 state 是否相等，如果修改状态时，传的状态值没有变化，则不重新渲染。所以可以通过 setState 传对应状态值。
   2. 减少渲染次数
      1. 默认情况，只要父组件状态变了（不管子组件依不依赖该状态），子组件也会重新渲染。
      2. 优化方案：
         1. 类组件：使用 pureComponent；
         2. 函数组件：
            1. React.memo()
               1. 当？时候就算如此设置也无效？
               2. 
            2. React.useCallback() 优化针对于子组件渲染
               1. 返回一个 memoized 回调函数。
               2. 在依赖参数不变的情况下，返回的回调函数是同一个引用地址；每当依赖参数发生改变useCallback就会自动重新返回一个新的 memoized 函数（地址发生改变）。
            3. React.useMemo() 优化针对于当前组件高开销的计算
               1. 避免在每次渲染时都进行高开销的计算的优化的策略。
               2. 返回一个 memoized 值。
               3. 在依赖参数不变的的情况返回的是上次第一次计算的值；每当依赖参数发生改变useMemo就会自动重新计算返回一个新的 memoized 值。
               4. 
            [彻底理解 React hook useCallback和useMemo的区别](https://juejin.cn/post/6844904032113278990)


[](https://juejin.cn/post/6844903985338400782)

可以把自己有疑惑的点都记录下来，再一个个地解决


# 阅读React源码



参考文档：
[](https://juejin.cn/post/6844903985338400782#heading-17)
