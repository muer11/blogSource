/*
 * @Descripttion:
 * @version:
 * @Author: shenjia
 * @Date: 2021-07-25 14:00:24
 * @LastEditors: shenjia
 * @LastEditTime: 2021-07-25 23:57:40
 */

/* 
  1. 实现一个 compose 函数
      
  用法如下:
    function fn1(x) {
      return x + 1;
    }
    function fn2(x) {
      return x + 2;
    }
    function fn3(x) {
      return x + 3;
    }
    function fn4(x) {
      return x + 4;
    }
    const a = compose(fn1, fn2, fn3, fn4);
    console.log(a(1)); // 1+4+3+2+1=11
*/
function fn1(x) {
  return x + 1;
}
function fn2(x) {
  return x + 2;
}
function fn3(x) {
  return x + 3;
}
function fn4(x) {
  return x + 4;
}
function compose(args){
  retun function(num){
    let func = null;
    if(args.length){
      func = args[args.length-1](num)
      return compose(args.slice(0, args.length-1))
    }
  }
}


/* 
2. settimeout 模拟实现 setinterval(带清除定时器的版本)
setinterval 用来实现循环定时调用 可能会存在一定的问题 能用 settimeout 解决吗?



*/

/* 原文链接：[最全的手写JS面试题](https://juejin.cn/post/6968713283884974088) */
