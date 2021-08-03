
在前端开发过程中，扎实的基础知识储备非常重要。当你学会了原理，不仅能提升代码质量，而且在出现 bug 时能立马知道起因是什么，该如何解决，提升了开发效率。当我们有了一定的实践经验后，再来回顾这些基础知识进行查漏补缺，这种自顶向下的学习方式也不失为一种不错的选择。
我们先从非常重要、使用频率很高的函数开始讲起吧~
那么，函数到底是什么呢？函数存在的意义又是什么呢？


01

 函数的表达方式

1. 共四种表达方式

    a. 函数声明

      ```
      function sum(a, b){
        return a + b
      }
      ```

    b. 函数表达式

      ```
      let sum = function(a, b){
        return a + b
      }
      ```

    c. 箭头函数

      ```
      // 若函数体只有一行代码，那么可以省略{}，默认返回这段代码的返回值
      let sum = (a, b) => a + b

      // 如果返回的是一个对象，那么必须用()包起来，因为{}会被解释成代码块
      let obj = () => ({ id: 1, name: "test" })
      ```

    d. Function构造函数

      ```
      new Function("num1", "num2", "return num1 + num2")
      ```
      不推荐使用Function构造函数语法来定义函数。因为这段代码会被解释两次：第一次是将它当作常规ECMAScript代码，第二次是解释传给构造函数的字符串。这显然会影响性能。


2. 函数声明和函数表达式的区别

    函数的定义时间不同。JavaScript 引擎在任何代码执行之前，会先读取函数声明，并在执行上下文中生成函数定义（即“函数声明提升”）；而函数表达式必须等到代码执行到它那一行，才会在执行上下文中生成函数定义。

    ```
    // 例1
    console.log(sum(1,2)) // 3
    function sum(num1, num2){
      return num1 + num2
    }

    // 例2
    console.log(sum(1,2)) // Uncaught TypeError: sum is not a function
    let sum = function (num1, num2){
      return num1 + num2
    }
    ```

3. 为什么要引入箭头函数？它解决了什么问题？

箭头函数不仅减少重复代码，同时解决了 this 绑定的问题。它把开发者们经常犯的一个错误给标准化了，也就是混淆了 this 绑定规则和词法作用域规则。

因为箭头函数体内的 this 指向定义时所在的对象（即当前的词法作用域所在的 this 的值），而非调用时的对象（标准函数中的 this 指向调用时的对象），利用箭头函数的这个特性有助于封装回调函数。



注意点：

无法使用 apply、call、bind

不能用作构造函数，无法使用 new 命令，没有 prototype 属性

给对象定义方法，且该方法包含 this 时，this 会指向全局对象

当需要动态 this 时，不适合使用箭头函数

不能使用 arguments

可以使用 rest 参数代替

如果使用了arguments ，则指向外层函数的对应变量（同 super 、new.target ）

不能使用 super 和 new.target

不能使用 yield 命令，因此不能用作 Generator 函数



4. IIFE 立即执行函数

通过 IIFE（ Immediately Invoked Function Expression ）形成块级作用域，防止局部变量污染全局作用域。

```
// 写法一
(function sum(){
  // 块级作用域
})()

// 写法二
(function sum(){
  // 块级作用域
}())

// 上述两种写法都可以，依据个人习惯
// sum在局部作用域中，不会污染全局全局作用域
```

IIFE 有哪些妙用？

a. 可以使函数不需要函数名（或者至少函数名可以不污染所在作用域），并且能够自动运行。
```
var num = 1;
(function(){
  var num = 2
  console.log(num) // 2
})()
console.log(num) // 1
```

b. 把 IIFE 当作函数调用并传递参数进去。

```
var num = 1;
(function(global){
  var num = 2
  console.log(num) // 2
  console.log(global.num) // 1
})(window)
console.log(num) // 1
```

c. 解决 undefined 标识符的默认值被错误覆盖导致的异常。

外部作用域改变了 undefined 的默认值，只需在对应的传参位置不传入任何值，就可以确保代码块中的 undefined 标识符的值是默认值。

```
undefined = true;
(function (undefined){
  var a;
  if(a === undefined){
     console.log("true") 
  }
})() // true
```

d. 倒置代码的运行顺序。

将需要运行的函数放在第二位，在 IIFE 执行之后当作参数传递进去。
  ```
  var num = 1;
  (function IIFE(def){
    def(window)
  })(function def(global){
    var num = 2;
    console.log(num); // 2
    console.log(global.num); // 1
  })
  console.log(num); // 1
  ```



02

 函数的调用方式





1. 一般形式的函数调用
```
function foo(){
  console.log(this.a)
}
var a = 10;
foo(); // 10
```
2. 作为对象的方法调用
```
function foo(){
  console.log(this.a)
}
var obj = {
  a: 2,
  foo: foo
}
obj.foo()；// 2
```
3. 使用 call / apply / bind 动态调用
```
function foo(x,y) {  
  return x + y;
}
foo.call(null, 3, 4);  // 7
```
4. new 间接调用
```
function Foo(a){
  this.a = a
}
var bar = new Foo(2)
console.log(bar.a); // 2
```



03

 函数名

函数名是指向函数的指针，所以一个函数可以有多个函数名。

```
function sum(num1, num2){
  return num1 + num2
}
console.log(sum(1,2)) // 3

let anotherSum = sum
console.log(anotherSum(1,2))  // 3
sum = null
console.log(anotherSum(1,2))  // 3
console.log(sum(1,2)) // Uncaught TypeError: sum is not a function
ES6中每个函数对象都有一个只读的name属性。

function foo() 
foo.name // "foo"
(()=>{}).name // ""
(new Function).name // "anonymous"

// bind返回的函数，name属性值会加上bound前缀。
foo.bind({}).name // "bound foo"
(function(){}).bind({}).name // "bound "
```

JS 函数有重载吗？
没有。重载指的是一个函数可以有多个定义，只要入参（数量或类型）不同即可。JS 函数没有重载，若有多个命名相同的函数同时存在，那么后者会覆盖前者。不过，我们可以通过检查传参类型和数量的不同，模拟重载。

```
function doAdd(num1, num2){
  if(arguments.length === 1){
    console.log(num1 + 10)
  }else if(arguments.length === 2){
    console.log(arguments[0] + num2)
  }
}

doAdd(10) // 20
doAdd(10, 20) // 3
匿名函数
setTimeout(function(){
  console.log("我是匿名函数呀～")
}, 1000)
```

优点：书写起来简单快捷，很多库和工具也倾向鼓励使用这种风格的代码。
缺点：
1．匿名函数在栈追踪中不会显示出有意义的函数名，使得调试很困难。
2．如果没有函数名，当函数需要引用自身时只能使用已经过期的 arguments.callee 引用，比如在递归中。另一个函数需要引用自身的例子，是在事件触发后事件监听器需要解绑自身。
3．匿名函数省略了对于代码可读性/可理解性很重要的函数名。一个描述性的名称可以让代码不言自明。
具名函数便解决了上面的问题。
```
setTimeout(function timeoutHandler(){
  console.log("我是具名函数呀～")
}, 1000)
```

04

 函数内部

1. 内部对象

    a. this 对象

当一个函数被调用时，会创建一个活动记录（有时候也称为执行上下文）。这个记录会包含函数在哪里被调用（调用栈）、函数的调用方式、传入的参数等信息。this就是这个记录的一个属性。——《你不知道的JavaScript 》

this 提供了一种更优雅的方式来隐式“传递”一个对象引用，因此可以将API设计得更加简洁并且易于复用。
那么，在函数的执行过程中调用位置（在代码中被调用的位置）如何决定this的绑定对象?
我们可以先找到调用位置，再判断是下面四种绑定规则中的哪种绑定关系。

i. 默认绑定

```
// 例1                        
function foo(){
  console.log(this.a)
}
var a = 10;
foo(); // 10

// 例2
function foo(){
  "use strict";
  console.log(this.a)
}
var a = 10;
foo(); // TypeError: this is undefined

// 例3
function foo(){
  console.log(this.a)
}
var a = 10;
(function (){
  "use strict";
  foo(); // 10
})()
```
如果 foo 运行在非 strict mode 下，this 会默认绑定到全局对象，否则会绑定到 undefined 。但在严格模式下调用 foo( ) 不影响默认绑定。


ii. 隐式绑定
```
function foo(){
  console.log(this.a)
}
var obj = {
  a: 2,
  foo: foo
}
obj.foo() // 2
```
通过判断调用位置是否有上下文对象，或者说是否被某个对象拥有或者包含。虽然 foo 函数并不属于 obj ，但是调用位置会使用 obj 上下文来引用函数，因此可以说 obj “拥有” foo 。
```
// 例1
function foo(){
  console.log(this.a)
}

var obj = {
  a: 2,
  foo: foo
}

var bar = obj.foo;
var a = "global a";
bar() // global a

// 例2 参数传递
function foo(){
  console.log(this.a)
}

function doFoo(fn){
  fn()
}

var obj = {
  a: 2,
  foo: foo
}

var a = "global a";
doFoo(obj.foo); // global a
setTimeout(obj.foo, 0); // global a
```
虽然 bar 是 obj.foo 的一个引用，但是它引用的是 foo 函数本身，因此此时的 bar() 其实是一个不带任何修饰的函数调用，因此应用了默认绑定。例2的参数传递方式也同理，就算是内置的 setTimeout 也不例外。
我们发现被隐式绑定的函数会丢失绑定对象，存在隐式丢失的问题，因此会降级使用默认绑定。
可以用显式绑定解决这个问题。

iii. 显式绑定
通过 apply / call / bind 的方式直接指定 this 的绑定对象来实现显式绑定。
```
// 硬绑定
function foo(something){
  console.log(this.a, something)
  return this.a + something
}
function bind(fn, obj){
    return function (){
      return fn.apply(obj, arguments)
    }
}
var obj = {
  a: 3
}
var test = bind(foo, obj);
test(2) // 3 2

var test2 = foo.bind(obj); // ES5
test2(2) // 3 2

// API调用的“上下文”
function foo(el){
  console.log(el, this.id)
}
var obj = {
  id: "awesome"
}
[1,2,3].forEach(foo, obj);
// 1 "awesome" 2 "awesome" 3 "awesome"
iv. new 绑定
function foo(a){
  this.a = a
}
var bar = new foo(2)
console.log(bar.a); // 2
```
使用 new 来调用函数，或者说发生构造函数调用时，会自动执行下面的操作：
1. 创建（或者构造）一个全新的对象；

2. 这个新对象会被执行 [[Prototype]] 连接；

3. 这个新对象会绑定到函数调用的 this；

4. 如果函数没有返回其他对象，那么 new 表达式中的函数调用会自动返回这个新对象。

在 new 中使用硬绑定函数，主要目的是预先设置函数的一些参数，这样在使用 new 进行初始化时就可以只传入其余的参数。
```
function foo(p1, p2){
  this.val = p1 + p2;
}
var bar = foo.bind(null, "p1");
var baz = new bar("p2");
baz.val // "p1p2"
    绑定优先级：new 绑定 > 显式绑定 > 隐式绑定 > 默认绑定

function foo(something){
    this.a = something;
}
var obj1 = {
    foo: foo
}
var obj2 = {}
obj1.foo(2)
console.log(obj1.a); // 2 

obj1.foo.call(obj2, 3);
console.log(obj2.a); // 3 

var bar = new obj1.foo(4);
console.log(obj1.a); // 2
console.log(bar.a); // 4
```
    绑定的特殊情况：

    当 this 绑定的对象是 null / undefined 时，会使用的是默认绑定；

    如果想“更安全”地忽略 this 绑定，你可以使用一个 DMZ 对象，比如 ø = Object.create(null)，以保护全局对象。
```
// Object.create(null)和{}很像，但是并不会创建Object.prototype这个委托，所以它比{}“更空”。
function foo(p1, p2){
  console.log(p1 + p2);
}
var ø = Object.create(null);
foo.apply(ø, [2, 3]) // 5

var bar = foo.bind(null, "p1");
bar("p"); // p1p
```

this 词法

箭头函数根据外层（函数或者全局）作用域来决定 this ，箭头函数用更常见的词法作用域取代了传统的 this 机制。

箭头函数最常用于回调函数中，例如事件处理器或者定时器。
```
function foo(){
  var self = this;
  setTimeout(() => {
    console.log(this.a);
  }, 0)
}
var obj = {
  a: 2
}
foo.call(obj) // 2
```

总结：
1. 如果内部函数没有使用箭头函数定义，this 对象会在运行时绑定到执行函数的上下文；
2. 如果在全局函数中调用，则this在非严格模式下等于 window ，在严格模式下等于 undefined；
3. 如果作为某个对象的方法调用，则 this 等于这个对象；
4. 匿名函数未绑定到某个对象，那么 this 会指向 window ，除非在严格模式下 this 是 undefined。


b. arguments 实参

它是一个类数组对象，因此可以通过中括号([])访问对应元素。ECMAScript 中的所有参数都按值传递的，不可能按引用传递参数。如果把对象作为参数传递，那么传递的值就是这个对象的引用。
它可以和命名参数（形参）一起使用。
```
function doAdd(num1, num2){
  if(arguments.length === 1){
    console.log(num1 + 10)
  }else if(arguments.length === 2){
    console.log(arguments[0] + num2)
  }
}

doAdd(10) // 20
doAdd(10, 20) // 30
arguments.length 是根据传入参数个数决定的，而非函数命名时的长度。

function doAdd(num1, num2){
  console.log(arguments.length)
}

doAdd(10) // 1
arguments 的值始终与对应的命名参数同步。

function doAdd(num1, num2){
  arguments[1] = 10; // ⚠️严格模式下不支持，会导致语法错误
  console.log(arguments[0] + num2)
}

doAdd(10, 20) // 20  arguments[1]和num2位于不同的内存地址，但会保持同步
doAdd(10) // NaN  因为此时arguments长度为1，arguments[1] = 10赋值无效，num2为undefined
箭头函数没有 arguments ，不过可以用普通函数包装。

function outter(){
  let inner = () => {
    console.log(arguments[0]) // 10
  }
  inner()
}
outter(10)
arguments.callee 表示 arguments 对象所在函数的指针，可以用它让函数逻辑和函数名解耦。

// 实现递归
// 例1：使用 arguments.callee ( 早期版本的 JavaScript不允许使用命名函数表达式, 为了解决这个问题，引入了 arguments.callee ）
function factorial(num){
  if(num <= 1){
    return 1
  }else{
    return num * arguments.callee(num-1) // factorial(num-1)
  }
}

// 例2：使用命名函数表达式 ( 由于在 ES5+ 严格模式下不支持 arguments.callee ，因此可以用命名函数表达式的方式达到递归效果 ）
const factorial = (function foo(num){
  if(num <= 1){
    return 1
  }else{
    return num * foo(num-1)
  }
})
// 优点：
// foo 函数可以像代码内部的任何其他函数一样被调用
// 它不会在外部作用域中创建一个变量
// 它具有比访问 arguments 对象更好的性能
arguments.caller 表示调用当前函数的函数 （已废弃）
```


默认参数
```
// 1. ES6+可设置默认参数
// 优点：简洁、便于理解函数、利于代码优化
function log(x, y = 'World') {
  console.log(x, y);
}

// 2. 不能有重名参数
function log(x, x, y = 'World') {
   console.log("xxxx") // Uncaught SyntaxError: Duplicate parameter name not allowed in this context
}

// 3. 惰性求值
let x = 99;
function foo(p = x + 1) {
  console.log(p);
}
foo() // 100
x = 100;
foo() // 101

// 4. 参数默认值的位置
// 通常情况下，会处于函数的尾参数。如果不是尾参数，那么这个参数是无法省略，必须显式传参 undefined ，而非 null 。
function f(x, y = 5, z) {
  return [x, y, z];
}
f() // [undefined, 5, undefined]
f(1) // [1, 5, undefined]
f(1, ,2) // 报错
f(1, undefined, 2) // [1, 5, 2]
函数的 length 属性表示预计入参个数。

// 指定了默认值后，函数的 length 属性会失效
(function (a) {}).length // 1
(function (a = 5) {}).length // 0
(function (a, b, c = 5) {}).length // 2
// rest 参数也不会计入 length 属性
(function(...args) {}).length // 0

// 如果设置了默认值的参数不是尾参数，那么后面的参数不计入 length 
(function (a = 0, b, c) {}).length // 0
(function (a, b = 1, c) {}).length // 1
c. new Target（ ES6 ）

检测函数或构造方法是否是通过new运算符被调用。
class Shape {
 constructor() {
  if (new.target === Shape) {
   throw new Error('本类不能实例化');
  }
 }
}

class Rectangle extends Shape {
 constructor(length, width) {
  super();
  // ...
 }
}

var x = new Shape(); // 报错
var y = new Rectangle(3, 4); // 正确
（ 之后的对象篇会详细描述，尽情期待～ ）
```

2. 私有变量
任何定义在函数或块中的变量都被称为私有变量。而通过私有作用域定义私有变量和函数被称为静态私有变量。

特权方法能够访问函数私有变量（及私有函数）的公有方法。
```
function MyObject(){
  // 私有变量和私有函数
  let privateVariable = 10;
  function privateFunction(){
    return false
  }
  // 特权方法
  this.publicMethod = function(){
    privateVariable++;
    return privateFunction()
  }
}
```
使用闭包和私有变量会导致作用域链变长，作用域链越长，则查找变量所需的时间也越多。


模块模式是在单例对象基础上加以扩展，使其通过作用域链来关联私有变量和特权方法。
```
// 通过IIFE创建一个实例的方式形成单例模式
var foo = (function CoolModule(){
    var something = "cool";
    var another = [1,2,3];

    function doSomething(){
        console.log(something)
    }

    function doAnother(){
        console.log(another.join("!"))
    }

    return {
        doSomething: doSomething,
        doAnother: doAnother
    }
})();

foo.doSomething(); // cool
foo.doAnother(); // 1!2!3  
```
首先，CoolModule( ) 只是一个函数，必须要通过调用它来创建一个模块实例。如果不执行外部函数，内部作用域和闭包都无法被创建。
其次，CoolModule( ) 返回一个用对象字面量语法 { key: value, ... } 来表示的对象。这个返回的对象中含有对内部函数而不是内部数据变量的引用。我们保持内部数据变量是隐藏且私有的状态。可以将这个对象类型的返回值看作本质上是模块的公共 API 。
doSomething( ) 和 doAnother( ) 函数具有涵盖模块实例内部作用域的闭包（通过调用 CoolModule( ) 实现）。当通过返回一个含有属性引用的对象的方式来将函数传递到词法作用域外部时，我们已经创造了可以观察和实践闭包的条件。
模块模式需要具备两个必要条件：
1．必须有外部的封闭函数，该函数必须至少被调用一次（每次调用都会创建一个新的模块实例）；
2．封闭函数必须返回至少一个内部函数，这样内部函数才能在私有作用域中形成闭包，并且可以访问或者修改私有的状态。
模块模式的特点：
1. 调用包装了函数定义的包装函数；
2. 将返回值作为该模块的API。


Module（ ES6 ）
ES6 的模块没有“行内”格式，必须被定义在独立的文件中（一个文件一个模块）。浏览器或引擎有一个默认的“模块加载器”（可以被重载），可以在导入模块时同步地加载模块文件。
```
// bar.js
function hello(who){
    return "Let me introduce: " + who;
}
export hello;

// foo.js
import hello from "bar";
var hungry = "hippo";
function awesome(){
    console.log(hello(hungry).toUpperCase)
}
export awesome;

// baz.js
import foo from "foo";
import bar from "bar"

console.log(bar.hello("rhino")) // Let me introduce: rhino
foo.awesome(); // Let me introduce: HIPPO
```

3. 通用属性

length
保存函数定义时的命名参数的个数。
prototype
保存引用类型所有实例方法（不可枚举）。

4. 通用方法

call 和 apply ：可控制函数调用上下文即函数体内 this 值的能力
```
// call：参数逐个传递
sum.call(this, num1, num2)

// apply：传参可为数组或类数组
sum.apply(this, [num1, num2])
sum.apply(this, arguments)
bind ：将this绑定到传给bind函数的对象
window.color = 'red';
let bag = {
  color: "blue"
};
function sayColor(){
  console.log(this.color)
};
let bagColor = sayColor.bind(bag);
bagColor(); // "blue"

toLocalString 和 toString：返回函数代码
valueOf：返回函数本身
```



05
  作用域




作用域是负责收集并维护由所有声明的标识符（变量）组成的一系列查询，并实施一套非常严格的规则，确定当前执行的代码对这些标识符的访问权限。
作用域有助于维护更加优秀、简洁的代码。


编译过程

 1. 分词/词法分析（ Tokenizing / Lexing ）
将由字符组成的字符串分解成（对编程语言来说）有意义的词法单元。空格是否会被当作词法单元，取决于空格在这门语言中是否具有意义。var a = 2; 会被分解成 var、a、=、2 、;
 2. 解析/语法分析（ Parsing ）
将词法单元流（数组）转换成一个由元素逐级嵌套所组成的代表了程序语法结构的抽象语法树（ AST ）。
3. 代码生成
将 AST 转换为可执行代码的过程。

词法作用域

词法作用域的定义过程发生在代码的书写阶段，也就是由你在写代码时将变量和块作用域写在哪里来决定的，因此当词法分析器处理代码时会保持作用域不变（大部分情况下是这样的）。

除非使用 eval、with 方法欺骗词法，在运行时修改或创建新的作用域，以此来欺骗其他在书写时定义的词法作用域。
```
// eval
function foo(str, num1){
  eval(str)
  console.log(num1) // 1
}

foo("var num1 = 2", 1)

// with
function foo(obj){
  with(obj){
     a = 2
  }
}
var o1 = {
  a: 3
}
var o2 = {
  b: 3
}
foo(o1); 
console.log(o1.a); // 2
foo(o2); 
console.log(o2.a); // undefined
console.log(a); // 2
```
当我们传递 o1 给 with 时，with 所声明的作用域是 o1 ，而这个作用域中含有一个同 o1.a 属性相符的标识符。但当我们将 o2 作为作用域时，其中并没有 a 标识符，因此进行了正常的 LHS 标识符查找。o2 的作用域、foo(..) 的作用域和全局作用域中都没有找到标识符 a ，因此当 a=2 执行时，自动创建了一个全局变量（因为是非严格模式）。

弊端：影响性能。JavaScript 引擎会在编译阶段进行数项的性能优化。其中有些优化依赖于能够根据代码的词法进行静态分析，并预先确定所有变量和函数的定义位置，才能在执行过程中快速找到标识符。而使用 eval、with 无法得知会创建的内容，因此优化的意义不大。



函数作用域
定义：属于这个函数的全部变量都可以在整个函数的范围内使用及复用（在嵌套的作用域中也可以使用）。
函数作用域将变量和函数定义隐藏起来，以致于外部作用域无法访问内部作用域，借此可优化代码结构。
```
var a = 1;
function foo(){
  var a = 3;
  console.log(a); // 3
}
foo();
console.log(a); // 1
```

块作用域

块作用域是一个用来对最小授权原则进行扩展的工具，将代码从在函数中隐藏信息扩展为在块中隐藏信息。
它有如下几种实现方式：
1. try / catch
```
try{
  undefined()
}catch(err){
  console.log(err)
}
console.log(err);  // Uncaught ReferenceError: err is not defined
```
2. let (ES6)
```
// 经典面试题
for(let i = 0; i < 10; i++){
  console.log(i);
}
let为其声明的变量隐式地劫持了所在的块作用域。利于垃圾收集。
```
3. const (ES6)
```
if (true) {
  const MAX = 5;
}
MAX // Uncaught ReferenceError: MAX is not defined
```
4. with 


闭包
先来看看不同书籍中对闭包的定义吧~
闭包就是引用了其它函数作用域中的变量的函数。——《JavaScript高级程序设计》
当函数可以记住并访问所在的词法作用域时，就产生了闭包，即使函数是在当前词法作用域之外执行。——《你不知道的JavaScript》
```
function outer(){
  var num = 1;
  function inner(){
    console.log(num + 1)
  }
  return inner;
}

var getValue = outer();
getValue(); // 2
```
在 outer( ) 执行后，通常会期待 outer( ) 的整个内部作用域都被销毁，因为我们知道引擎有垃圾回收器，用来释放不再使用的内存空间。由于看上去 outer( ) 的内容不会再被使用，所以很自然地会考虑对其进行回收。而闭包的“神奇”之处正是可以阻止这件事情的发生。事实上内部作用域依然存在，因此没有被回收。谁在使用这个内部作用域？原来是 inner( ) 本身在使用。
inner( ) 依然持有对该作用域的引用，而这个引用就叫作闭包。
闭包使得函数可以继续访问定义时的词法作用域。
```
function sum(){
  var num = 1;
  function inner(){
    console.log(num + 1)
  }
  sum2(inner)
}

function sum2(func){
  func()
}

sum(); // 2
```
作用域链

理解作用域链创建和使用的细节对理解闭包非常重要。在调用一个函数时，会为这个函数调用创建一个执行上下文，并创建一个作用域链。然后用 arguments 和形参来初始化这个函数的活动对象。外部函数的活动对象是内部函数作用域链上的第二个对象。这个作用域链一直向外串起了所有包含函数的活动对象，直到全局执行上下文才终止。在函数执行时，要从作用域链中查找变量，以便读、写值。
```
function createComparisionFunction(propertyName){
    return function(object1, object2){
        let value1 = object1[propertyName];
        let value2 = object2[propertyName];
        if(value1 < value2){
            return -1;
        }else if(value1 > value2){
            return 1;
        }else{
            return 0;
        }
    }
}
let compareNames = createComparisionFunction("name");
let result = compareNames({name: 'Nicholas'}, {name: 'Matt'});
compareNames = null; // 解除对函数的引用，释放内存
```
图片

    在一个函数内部定义的函数会把其包含函数的活动对象添加到自己的作用域链中。因此，在createComparisonFunction()（以下简称为“C”）函数中，匿名函数的作用域链中实际上包含 C 的活动对象。  

在 C 返回匿名函数后，它的作用域链被初始化为包含 C 的活动对象和全局变量对象。这样，匿名函数就可以访问到 C 可以访问的所有变量。不过，副作用是 C 的活动对象并不能在它执行完毕后销毁，因为匿名函数的作用域链中仍然有对它的引用。在 C 执行完毕后，其执行上下文的作用域链会销毁，但它的活动对象仍然会保留在内存中，直到匿名函数被销毁后才会被销毁。
    为防止内存泄露，需要把 compareNames 设置为 null 就会解除对函数的引用，从而让垃圾回收程序可以将内存释放掉。作用域链也会被销毁，其他作用域（除全局作用域之外）也可以销毁。

其中涉及了一些概念：
1. 变量对象（局部变量对象和全局变量对象）
    a. 处于全局上下文中
    b. 在代码执行期间始终存在
    c. 作用域链中的每个指针指向一个变量对象
2. 活动对象
    a. 处于函数局部上下文中
    b. 只在函数执行期间存在

闭包的使用场景：
在定时器、事件监听器、Ajax 请求、跨窗口通信、Web Workers 或者任何其他的异步（或者同步）任务中，只要使用了回调函数，实际上就是在使用闭包！



06
  提升
函数声明和变量声明都会被提升，但是函数声明比变量声明先提升。
```
foo() // 1
var foo;
function foo(){
  console.log(1);
}
foo = function(){
  console.log(2);
}
```



07
 尾调用优化




尾调用 是指某个函数的最后一步是调用另一个函数。它是 ES6 新增的内存管理优化机制，让 JS 引擎在满足条件时可以重用栈帧，因此可以只保留内层函数的调用帧。
函数调用会在内存形成一个"调用记录"，又称"调用帧"（call frame），保存调用位置和内部变量等信息。如果在函数 A 的内部调用函数 B ，那么在A的调用记录上方，还会形成一个 B 的调用记录。等到 B 运行结束，将结果返回到 A ，B 的调用记录才会消失。如果函数 B 内部还调用函数 C ，那就还有一个 C 的调用记录栈，以此类推。所有的调用记录，就形成一个"调用栈"（call stack）。

图片


尾调用由于是函数的最后一步操作，所以不需要保留外层函数的调用记录，因为调用位置、内部变量等信息都不会再用到了，只要直接用内层函数的调用记录，取代外层函数的调用记录就可以了。
当满足以下条件时可以实现尾调用优化：
在严格模式下执行；

外部函数的返回值是对尾调用函数的调用；

尾调用函数返回后不需要执行额外的逻辑；

尾调用函数不是引用外部函数作用域中自由变量的闭包。
```
function f() {
  let m = 1;
  let n = 2;
  return g(m + n);
}
f();

// 等同于
function f() {
  return g(3);
}
f();

// 等同于
g(3);
尾递归 就是尾调用自身。
递归非常耗费内存，因为需要同时保存成千上百个调用记录，很容易发生"栈溢出"错误（stack overflow）。但对于尾递归来说，由于只存在一个调用记录，所以永远不会发生"栈溢出"错误。
// 例1：递归 
// 普通递归 复杂度 O(n)
function factorial(n) {
  if (n === 1) return 1;
  return n * factorial(n - 1);
}
factorial(5) // 120

// 尾递归 复杂度 O(1)
function factorial(n, total) {
  if (n === 1) return total;
  return factorial(n - 1, n * total);
}
factorial(5, 1) // 120

// 柯里化的尾递归
// 柯里化（ Currying ）是把接受多个参数的函数变换成接受一个单一参数(最初函数的第一个参数)的函数，并且返回接受余下的参数且返回结果的新函数。这种写法既能减少代码冗余，也能增加可读性。
function currying(fn, n) {
  return function (m) {
    return fn.call(this, m, n);
  };
}
function tailFactorial(n, total) {
  if (n === 1) return total;
  return tailFactorial(n - 1, n * total);
}
const factorial = currying(tailFactorial, 1);
factorial(5) // 120

// ES6 默认值
function factorial(n, total = 1) {
  if (n === 1) return total;
  return factorial(n - 1, n * total);
}
factorial(5) // 1


// 例2：Fibonacci 数列
function Fibonacci (n) {
  if ( n <= 1 ) {return 1};
  return Fibonacci(n - 1) + Fibonacci(n - 2);
}
Fibonacci(10) // 89
Fibonacci(100) // 超时
Fibonacci(500) // 超时

// 尾递归的 Fibonacci 数列 
function Fibonacci2 (n , ac1 = 1 , ac2 = 1) {
  if( n <= 1 ) {return ac2};
  return Fibonacci2 (n - 1, ac2, ac1 + ac2);
}
Fibonacci2(100) // 573147844013817200000
Fibonacci2(1000) // 7.0330367711422765e+208
Fibonacci2(10000) // Infinity
// 不会发生栈溢出（或者层层递归造成的超时），相对节省内存
目前尾调用在各大浏览器的兼容性如下图所示：
图片
```




08
 严格模式




上文中提到了很多在严格模式下不成立的例子，那什么是严格模式？怎么触发严格模式呢？
严格模式是从 ES5 产生的概念。
```
'use strict'
可以在函数内设置严格模式。
function doSomething(a, b) {
  'use strict';
  // code
}
ES6中，只要函数参数用了解构解析、默认值、rest参数，那么函数内不允许使用严格模式。
// 报错
function doSomething(a, b = a) {
  'use strict';
  // code
}
// 报错
const doSomething = function ({a, b}) {
  'use strict';
  // code
};
// 报错
const doSomething = (...a) => {
  'use strict';
  // code
};
const obj = {
  // 报错
  doSomething({a, b}) {
    'use strict';
    // code
  }
};
```



09
 补充：异常的含义




上文中提到过了一些错误提示，下面解释一下每种错误的情况：
ReferenceError 和作用域判别失败相关；
TypeError 代表作用域判别成功了，但是对结果的操作是非法或不合理的。






本文从函数定义、作用域、闭包、尾调用等各个角度解析了函数的调用原理和特性，可以得知函数的本质是对象，每个函数是 Function 类型的实例，其含有属性和方法，它可以帮助我们存储一些变量，并且可以良好地封装方法。

希望这篇文章能够帮助你建立自己的知识体系，对知识进行归纳和内化、找出知识之间的关联。
如果你觉得此文对你有用的话，欢迎 点赞 + 在看 ，你的支持是我持续更新的动力哦～


参考:

《JavaScript高级程序设计（第四版）》

《你不知道的JavaScript（上卷）》

《ECMAScript6 入门》：https://es6.ruanyifeng.com

MDN Web Docx：https://developer.mozilla.org/

JS方法兼容性查询：http://kangax.github.io/compat-table/es6/