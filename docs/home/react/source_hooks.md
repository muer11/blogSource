<!--
 * @Descripttion: 
 * @version: 
 * @Author: shenjia
 * @Date: 2021-08-12 05:18:55
 * @LastEditors: shenjia
 * @LastEditTime: 2021-08-21 22:59:08
-->
# React Hooks 源码解析

如何学习源码？


1. useState做了什么？
   1. useState() 的执行等于 dispatcher.useState(initialState) 这里面引入了一个dispatcher
   2. 
2. 函数组件的执行时期是什么时候？
  在调用 **renderWithHooks** 时触发执行


   1. 初始化
      ```
        renderWithHooks(
          null,                // current Fiber
          workInProgress,      // workInProgress Fiber
          Component,           // 函数组件本身
          props,               // props
          context,             // 上下文
          renderExpirationTime,// 渲染 ExpirationTime
      );
      ```
      
    2. 组件更新
      对于初始化是没有current树的，之后完成一次组件更新后，会把当前workInProgress树赋值给current树。

      ```
        renderWithHooks(
          current,
          workInProgress,
          render,
          nextProps,
          context,
          renderExpirationTime,
      );        

      ```


    完整代码：
    ```
      export function renderWithHooks(
        current,
        workInProgress,
        Component,
        props,
        secondArg,
        nextRenderExpirationTime,
      ) {
        renderExpirationTime = nextRenderExpirationTime;
        currentlyRenderingFiber = workInProgress;

        workInProgress.memoizedState = null;
        workInProgress.updateQueue = null;
        workInProgress.expirationTime = NoWork;

        ReactCurrentDispatcher.current =
            current === null || current.memoizedState === null
              ? HooksDispatcherOnMount
              : HooksDispatcherOnUpdate;

        let children = Component(props, secondArg);

        if (workInProgress.expirationTime === renderExpirationTime) { 
            // ....这里的逻辑我们先放一放
        }

        ReactCurrentDispatcher.current = ContextOnlyDispatcher;

        renderExpirationTime = NoWork;
        currentlyRenderingFiber = null;

        currentHook = null
        workInProgressHook = null;

        didScheduleRenderPhaseUpdate = false;

        return children;
      }

    ```

    - current fiber树: 当完成一次渲染之后，会产生一个current树,current会在commit阶段替换成真实的Dom树。
    - workInProgress fiber树: 即将调和渲染的 fiber 树。再一次新的组件更新过程中，会从current复制一份作为 workInProgress，更新完毕后，将当前的 workInProgress 树赋值给 current 树。
    - workInProgress.memoizedState: 在class组件中，memoizedState存放state信息，在 function 组件中，memoizedState 在一次调和渲染过程中，以链表的形式存放 hooks 信息。
    - workInProgress.expirationTime: react 用不同的expirationTime，来确定更新的优先级。
    - currentHook : current 树上指向当前调度的 hooks 节点。
    - workInProgressHook : workInProgress 树上指向当前调度 hooks节点。
    

    ### renderWithHooks 的主要作用：
    - 首先置空即将 调 和 渲染 的workInProgress 树的 memoizedState 和 updateQueue 。
      - 为了在函数组件执行过程中，要把新的hooks信息挂载到这两个属性上，然后在组件commit阶段，将workInProgress树替换成current树，替换真实的DOM元素节点，并在current树保存hooks信息。

    - 根据当前函数组件是否是第一次渲染（current 是否存在 / current树上是否存在 memoizedState 来判断），赋予 ReactCurrentDispatcher.current 不同的 hooks。
      - 第一次渲染组件，是HooksDispatcherOnMount hooks 对象
      - 渲染后，需要更新的函数组件，是HooksDispatcherOnUpdate 对象
    
    -  调用 Component(props, secondArg) 执行我们的函数组件
       -  我们写的 hooks 被依次执行，把 hooks 信息依次保存到 workInProgress 树上。
    
    -  将 ContextOnlyDispatcher 赋值给 ReactCurrentDispatcher.current ，由于js是单线程的，没有在函数组件中调用的hooks，都是ContextOnlyDispatcher 对象上 hooks
      - react-hooks就是通过这种函数组件执行赋值不同的hooks对象方式，判断在hooks执行是否在函数组件内部，捕获并抛出异常的。

    - 重新置空一些变量比如currentHook，currentlyRenderingFiber,workInProgressHook等



     3. HooksDispatcherOnMount 首次渲染
       ```
         const HooksDispatcherOnMount = {
           useCallback: mountCallback,
           useEffect: mountEffect,
           useLayoutEffect: mountLayoutEffect,
           useMemo: mountMemo,
           useReducer: mountReducer,
           useRef: mountRef,
           useState: mountState,
         };
       ```

     4. HooksDispatcherOnUpdate 更新组件
       ```
         const HooksDispatcherOnUpdate = {
           useCallback: updateCallback,
           useEffect: updateEffect,
           useLayoutEffect: updateLayoutEffect,
           useMemo: updateMemo,
           useReducer: updateReducer,
           useRef: updateRef,
           useState: updateState
         };

       ```


3. hooks初始化，我们写的hooks会变成什么样子
   1. 几种hooks:
      1. useState：负责组件更新
      2. useEffect：负责执行副作用
      3. useRef：负责保存数据
      4. useMemo：负责缓存优化
      5. useCallback
      6. useReducer
      7. useLayoutEffect
   2. mountWorkInProgressHook
      在组件初始化的时候,每一次hooks执行该函数(react-reconciler/src/ReactFiberHooks.js -> mountWorkInProgressHook)。

    ```
      function mountWorkInProgressHook() {
        const hook: Hook = {
          memoizedState: null,  
          baseState: null,
          baseQueue: null,
          queue: null,
          next: null,
        };
        if (workInProgressHook === null) { 
          currentlyRenderingFiber.memoizedState = workInProgressHook = hook;
        } else {
          workInProgressHook = workInProgressHook.next = hook;
        }
        return workInProgressHook;
      }

    ```

    首先每次执行一个hooks函数产生一个hook对象，保存当前hook信息,然后将**每个hooks以链表形式串联**起来，并赋值给workInProgress的memoizedState。

    ###### 保存的hook信息有哪些？
    - memoizedState： useState中保存 state 信息 ｜ useEffect 中 保存着 effect 对象 ｜ useMemo 中 保存的是缓存的值和 deps ｜ useRef 中保存的是 ref 对象。
    - baseQueue： useState和useReducer中保存最新的更新队列。
    - baseState： usestate和useReducer的一次更新中，产生的最新state值。
    - queue： 保存待更新队列 pendingQueue ，更新函数 dispatch 等信息。
    - next: 指向下一个 hooks对象。



    1. 初始化useState -> mountState
      ```
        function mountState(
          initialState
        ){
          const hook = mountWorkInProgressHook();
          if (typeof initialState === 'function') {
            // 如果 useState 第一个参数为函数，执行函数得到state
            initialState = initialState();
          }
          hook.memoizedState = hook.baseState = initialState;
          const queue = (hook.queue = {
            pending: null,  // 带更新的
            dispatch: null, // 负责更新函数
            lastRenderedReducer: basicStateReducer, //用于得到最新的 state ,
            lastRenderedState: initialState, // 最后一次得到的 state
          });

          const dispatch = (queue.dispatch = (dispatchAction.bind( // 负责更新的函数
            null,
            currentlyRenderingFiber,
            queue,
          )))
          return [hook.memoizedState, dispatch];
        }
      ```
      mountState首先会得到初始化的state，将它赋值给mountWorkInProgressHook产生的hook对象的 memoizedState和baseState属性，然后创建一个queue对象，里面保存了负责更新的信息。

    2. 初始化useEffect -> mountEffect

    ```
      function mountEffect(
        create,
        deps,
      ) {
        const hook = mountWorkInProgressHook();
        const nextDeps = deps === undefined ? null : deps;
        hook.memoizedState = pushEffect(
          HookHasEffect | hookEffectTag, 
          create, // useEffect 第一次参数，就是副作用函数
          undefined,
          nextDeps, // useEffect 第二次参数，deps
        );
      }
    ```
    区分不同场景下的memoizedState：
    - workInProgress / current 树上的 memoizedState 保存的是当前函数组件每个hooks形成的链表。
    - 每个hooks上的memoizedState 保存了当前hooks信息，不同种类的hooks的memoizedState内容不同

    ###### pushEffect 创建effect对象，挂载updateQueue
    ```
      function pushEffect(tag, create, destroy, deps) {
        const effect = {
          tag,
          create,
          destroy,
          deps,
          next: null,
        };
        let componentUpdateQueue = currentlyRenderingFiber.updateQueue
        if (componentUpdateQueue === null) { // 如果是第一个 useEffect
          componentUpdateQueue = {  lastEffect: null  }
          currentlyRenderingFiber.updateQueue = componentUpdateQueue
          componentUpdateQueue.lastEffect = effect.next = effect;
        } else {  // 存在多个effect
          const lastEffect = componentUpdateQueue.lastEffect;
          if (lastEffect === null) {
            componentUpdateQueue.lastEffect = effect.next = effect;
          } else {
            const firstEffect = lastEffect.next;
            lastEffect.next = effect;
            effect.next = firstEffect;
            componentUpdateQueue.lastEffect = effect;
          }
        }
        return effect;
      }
    ```    
    首先创建一个 effect ，判断组件如果第一次渲染，那么创建 componentUpdateQueue ，就是workInProgress的updateQueue。然后将effect放入updateQueue中。

    effectList:
    effect list 可以理解为是一个存储 effectTag 副作用列表容器。它是由 fiber 节点和指针 nextEffect 构成的单链表结构，这其中还包括第一个节点 firstEffect ，和最后一个节点 lastEffect。
    React 采用深度优先搜索算法，在 render 阶段遍历 fiber 树时，把每一个有副作用的 fiber 筛选出来，最后构建生成一个只带副作用的 effect list 链表。
    在 commit 阶段，React 拿到 effect list 数据后，通过遍历 effect list，并根据每一个 effect 节点的 effectTag 类型，执行每个effect，从而对相应的 DOM 树执行更改。

    1. 初始化useMemo -> mountMemo

    ```
      function mountMemo(nextCreate,deps){
        const hook = mountWorkInProgressHook();
        const nextDeps = deps === undefined ? null : deps;
        const nextValue = nextCreate();
        hook.memoizedState = [nextValue, nextDeps];
        return nextValue;
      } 
    ```
    初始化useMemo，就是创建一个hook，然后执行useMemo的第一个参数,得到需要缓存的值，然后将值和deps记录下来，赋值给当前hook的memoizedState。


    1. 初始化useRef -> mountRef

    ```
      function mountRef(initialValue) {
        const hook = mountWorkInProgressHook();
        const ref = {current: initialValue};
        hook.memoizedState = ref;
        return ref;
      }
    ```
    创建一个ref对象， 对象的current 属性来保存初始化的值，最后用memoizedState保存ref。

   #### 总结
   在一个函数组件第一次渲染执行上下文过程中，每个react-hooks执行，都会产生一个hook对象，并形成链表结构，绑定在workInProgress的memoizedState属性上，然后react-hooks上的状态，绑定在当前hooks对象的memoizedState属性上。对于effect副作用钩子，会绑定在workInProgress.updateQueue上，等到commit阶段，dom树构建完成，在执行每个 effect 副作用钩子。


4. hooks更新阶段
对于一次函数组件更新，当再次执行hooks函数的时候，比如 useState(0) ，首先要从current的hooks中找到与当前workInProgressHook，对应的currentHooks，然后复制一份currentHooks给workInProgressHook,接下来hooks函数执行的时候,把最新的状态更新到workInProgressHook，保证hooks状态不丢失。



[](https://juejin.cn/post/6944863057000529933)
[](https://juejin.cn/post/6847902224287285255)