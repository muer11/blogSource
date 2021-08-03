<!--
 * @Descripttion: 
 * @version: 
 * @Author: shenjia
 * @Date: 2020-11-30 11:25:08
 * @LastEditors: shenjia
 * @LastEditTime: 2021-06-24 11:42:19
-->
# 数组
   存储：根据数组大小分配内存，占据一块连续的内存并按照顺序存储数据，

## 创建方法

1. 使用Array构造函数

```
let arr = new Array(2)
```

2. 数组字面量

```
let arr = [1, 2]
```

注：使用此方法定义的数组不会调用Array的构造函数 (???)

3. Array.from( arrayLike, function,  )
将类数组结构转化成数组，如 字符串、Map、Set、generator、 arguments参数、带类数组格式的对象

```
let obj = {
  0:1,
  1:2,
  2:3,
  3:4,
  length: 4
}

Array.from(obj); // [1,2,3,4]
```

参考： [ES6 Array.from( )](https://es6.ruanyifeng.com/#docs/array#Array-from)

4. Array.of()
将一组数值转化成数组。为了弥补数组的缺点

```
Array(3); // [undefined, undefined, undefined]
Array.of(3); //[3]
```


## 数组空位

由于可能存在不同函数对空位的处理不同，因此建议直接赋值undefined

```
const arr = [1,,,2];

arr.join("*"); // "1***2"
arr.map(()=>6); 
```


## 检测数组

1. instanceof 
2. Array.isArray()



## 数组方法

1. 迭代器方法
  - keys()
  - values()
  - entries()

2. 复制方法
  - fill()

3. 填充方法
  - copyWithin()

4. 转换方法
  - toString()
  - valueOf()
  - toLocalString()

5. 栈方法
  - push()
  - pop()

6. 队列方法
  - unshift()
  - shift()

7. 排序方法
  - reserve()
  - sort()
  ```
  若数组中全都Number类型，则可以通过减法优化sort
  let arr = [1,6,2,1,9,7]
  arr.sort((v1,v2)=>(v1-v2)) // [1, 1, 2, 6, 7, 9]
  ```

8. 操作方法
   - concat() 合并数组
     - 拷贝一份原数组的副本，将concat对应参数添加至副本数组后面
     - [Symbol.isConcatSpreadable]: 阻止concat()打平参数数组，如值为true，则为打平
     
   - slice() 获取数组中的部分元素
     - 参数：
       - 返回数组的开始索引
       - 结束索引（可不填）
     - 不影响原数组
     - 返回结果中不包含结束索引对应的元素
     
   - splice() 
    ```
      let arr = [1,2,3,4,5,6]
      // 1. 删除: splice(开始索引, 删除元素数量)
      arr.splice(0,2); // [1,2]
      arr; // [3,4,5,6]

      // 2. 插入: splice(开始索引, 0, ...所需添加的元素)
      arr.splice(2, 0, 8,8,8); // []
      arr;  // [1, 2, 8, 8, 8, 3, 4, 5, 6]

      // 3. 替换 splice(开始索引, 替换元素数量, ...所需替换的元素)
      arr.splice(2,2,9,9); // [3, 4]
      arr; // [1, 2, 9, 9, 5, 6]
    ```

9.  搜索和位置方法
  - 严格相等
    - indexOf(需查找的元素，开始索引)
      - 从前往后查找
      - 找到元素则返回元素所在的索引值，未找到则返回-1
    - lastIndexOf(需查找的元素，开始索引)
      - 从后往前找
      - 找到元素则返回元素所在的索引值，未找到则返回-1
      - ```
        - let arr = [1,2,3,4,3,2,1];
        - arr.indexOf(3,3); // 4
        - arr.lastIndexOf(3,3); // 2
      - ```
    - includes(需查找的元素，开始索引) 
      - ES7新增
      - 表示是否找到元素，找到则返回true，反之则返回false


  - 断言函数
    - find()
    - findIndex()
    ```
      let arr = [
        {
          name: "t1",
          age:28,
        },
        {
          name: "t2",
          age:8,
        },
        {
          name: "t3",
          age:18,
        },
        {
          name: "t4",
          age:8,
        },
      ]
      arr.find((element,index,array)=>element.age<18); // {name: "t2", age: 8}
      arr.findIndex((element,index,array)=>element.age<18); // 1 
    ```
    以上两种方法均查找第一个符合期望的元素

10.  迭代方法
  - every() 若每个元素均符合条件，则返回true，反之为false
  - some() 若其一元素符合条件，则返回true，反之为false
  - filter() 筛选符合条件的元素
  - forEach() 对数组中的元素进行处理
  - map() 对数组的每一项进行计算后再返回一个结果数组
  
11.  归并方法
  - reduce(上一个归并值，当前项，当前项的索引，数组本身)
  - reduceRight(上一个归并值，当前项，当前项的索引，数组本身)

  ```
    let arr = [1,2,3,4,5]
    let sum = arr.reduce((prev,cur,index,array)=>prev+cur);
    console.log(sum) // 15
  ```

  <!-- 补充一些高级用法 https://www.jianshu.com/p/e375ba1cfc47 -->

## 快数组与慢数组
fast: 快速的后备存储结构是 FixedArray ， 并且数组长度 <= elements.length
slow: 缓慢的后备存储结构是 一个以数字为键的 HashTable 。

HashTable： 散列表（哈希表） 
根据键（key）直接访问在内存存储位置的数据结构。即，它通过计算一个关于键值的函数，将所需查询的数据映射到表中一个位置来访问记录，这加快了查找速度。这个映射函数称做散列函数，存放记录的数组称做散列表。

### 快数组
一种线性的存储方式。数组长度可变，会根据删除和新增来动态调整存储空间的大小。
- 扩容后，会将数组拷贝到新的内存空间中，扩容后的新容量 = 旧容量 * 1.5 + 16 ；
  当 容量 >= length * 2 + 16 ，则进行收缩容量调整，否则使用holes对象填充未被初始化的位置。
- 新创建数组时（let arr = new Array(1,2,3)），如果没有设置容量，V8会默认使用 Fast Elements 的模式实现；
如果要对数组设置容量，但并未进行内部元素的初始化（let arr = new Array(10)），则数组内部存在了数组空洞，就会以 Fast Holey Elements 模式实现。

### 慢数组
一种字典的内存形式。不用开辟大块连续的存储空间，节省内存，但维护 HashTable 的成本较高。

### 比较快数组和慢数组
| 比较 | 快数组 | 慢数组 |
| ---- | ---- |  ---- | 
| 存储方式 | 连续 | 零散分配 |
| 内存使用 | 大块连续，可能存在空洞，比较费内存 | 零散无空洞，比较节省内存 |
| 遍历效率 | 快 | 慢 |

所以两者各有优劣势，快数组是以空间换时间的方式，申请大块连续的内存，提高了查找的效率，而慢数组时以时间换空间，比较省内存，但查找比较费时间。

### 快慢数组之间的切换



<!-- 补充数组的底层原理 https://zhuanlan.zhihu.com/p/96959371 -->
[数据的存储方式](https://www.html.cn/qa/other/22672.html)
- 顺序
- 链接
- 索引
- 散列



## 定型数组
目的：提升向原生库传输数据的效率
为了解决WebGL的早期版本中，每次WebGL与JS运行期间之间传递数组时，期间花费了较多的转换过程，产生了更多的时间消耗。

定型数组可以直接传给底层图形绘制驱动程序API，也可以直接从底层获取到JS所需的数组。

- ArrayBuffer
  - 即JS构造函数，也是所有定型数组及视图引用的基本单位
  - 用于在内存中分配特定数量的字节空间，创建后不许更改
    - 区分于 C++ 中的 malloc
      - 1. 
      - 2. 
      - 3. 
      - 4. 

- DataView
  - 



- 比较几种遍历方法
  | 方法 | for | forEach | for ... in ...(主要是遍历Object) |  for ... of ... | 
  | ----- | ----- | ----- | ----- | ----- |
  | return | 1 | 1 | 0 | 0 |
  | break | 1 | 0 | 1 | 1 | 
  | continue | 1 | 0 | 1 | 1 |

区分 for ... in ... 和 for ... of ... :


- 比较几种循环方法
  | 方法 | map | filter | reduce | every | some
  | ----- | ----- | ----- | ----- | ----- |  ----- |
  | 返回值 | 新数组 | 新数组 | 新值 | true/false | true/false |

   
## 特点

### 存储 
连续空间的内存地址且按照顺序存储数据

### 空间效率
由于创建数组时，我们需要首先制定数组的容量大小，再根据大小分配内存，因此会导致数组的空间效率不高，经常会有空闲的区域没有得到充分利用。

### 时间效率
因为可以凭借数组下标直接访问目标数据（为“随机访问”），所以，访问简单，时间效率高，但添加和删除数据较麻烦。

## 复杂度
查找时：O(1)
添加/删除时：O(n)

比较链表和数组：
|  | 访问 | 添加 | 删除 |
| ---- | ---- | ---- | ---- |
| 链表 | 慢 | 快 | 快 |
| 数组 | 快 | 慢 | 慢 |


## 算法经验
当我们需要解决一个复杂的问题时，一个很有效的办法就是从一个具体的问题入手，通过分析简单具体的例子，试图寻找普遍的规律。  



## 参考

[leetcode 数组和字符串](https://leetcode-cn.com/leetbook/read/array-and-string/cuxq3/)
[leetcode 算法题自测](https://leetcode-cn.com/problem-list/2cktkvj/)
[JavaScript 数组遍历方法的对比](https://juejin.cn/post/6844903538175262734)
[剑指Offer](https://weread.qq.com/web/reader/1f132a805a61751f1674656k1ff325f02181ff1de7742fc)
[探究JS V8引擎下的“数组”底层实现](https://zhuanlan.zhihu.com/p/96959371)
[Chrome V8引擎代码](https://github.com/v8/v8)