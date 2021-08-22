<!--
 * @Descripttion: 
 * @version: 
 * @Author: shenjia
 * @Date: 2021-08-05 14:59:31
 * @LastEditors: shenjia
 * @LastEditTime: 2021-08-06 14:07:39
-->
# Promise

## 一、 基本介绍
1. 是什么？
   1. 它是一个构造函数，其中包含all、resolve、reject方法，原型上有then、catch等方法。（如何判断这些方法是在构造函数中还是原型中？？？）
   2. 三种状态
      1. pending（初始值）
      2. resolve（返回成功值）
      3. reject（返回失败原因reason）
   3. 可链式调用
      1. 因为每个Promise的返回值是一个保存了当前状态的Promise，通过维护状态、传递状态的方式使得回调函数能够及时调用，比callback简单、灵活的多。
2. 为什么需要它？它的好处是什么？
   1. 解决callback的回调地狱问题，使得代码更易维护，
   2. 解决多个并发请求，获取请求后的结果
   3. 解决异步的问题
3. 运用？
   1. 接口请求
   2. 支付流程
   3. 微信小程序图片下载后绘制
4. 用法：
   1. resolve
   2. reject
   3. then
   4. catch
   5. all
      1. 数组中的所有请求完成后才会返回
      2. 使用场景：所有接口都请求成功后才处理接下来的逻辑
   6. race
      1. 若有一个已请求完成就返回值
      2. 使用场景：某些接口请求超时后返回超时信息，比如图片下载超时的提示(可以研究一下axios、fetch框架中的timeout是如何实现的）
      
      ```
      //请求某个图片资源
      function requestImg(){
          var p = new Promise((resolve, reject) => {
              var img = new Image();
              img.onload = function(){
                  resolve(img);
              }
              img.src = '图片的路径';
          });
          return p;
      }

      //延时函数，用于给请求计时
      function timeout(){
          var p = new Promise((resolve, reject) => {
              setTimeout(() => {
                  reject('图片请求超时');
              }, 5000);
          });
          return p;
      }

      Promise.race([requestImg(), timeout()]).then((data) =>{
          console.log(data);
      }).catch((err) => {
          console.log(err);
      });
      ```

   7. 


## 二、如何实现一个 Promise

