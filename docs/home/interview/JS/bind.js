/*
 * @Descripttion:
 * @version:
 * @Author: shenjia
 * @Date: 2021-07-24 14:06:01
 * @LastEditors: shenjia
 * @LastEditTime: 2021-07-24 14:21:38
 */
function bindFunc(name) {
  this.name = name;
  this.getName = function() {
    return this.name;
  };
}

let getFunc = bindFunc.getName();
getFunc();
