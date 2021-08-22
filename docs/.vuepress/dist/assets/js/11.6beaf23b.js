(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{375:function(t,_,v){"use strict";v.r(_);var a=v(45),r=Object(a.a)({},(function(){var t=this,_=t.$createElement,v=t._self._c||_;return v("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[v("h1",{attrs:{id:"c语言"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#c语言"}},[t._v("#")]),t._v(" C语言")]),t._v(" "),v("h2",{attrs:{id:"基础知识"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#基础知识"}},[t._v("#")]),t._v(" 基础知识")]),t._v(" "),v("h3",{attrs:{id:"背景"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#背景"}},[t._v("#")]),t._v(" 背景")]),t._v(" "),v("ol",[v("li",[t._v("一个C语言有且只有一个main函数，是程序运行的起点")]),t._v(" "),v("li",[t._v("每个C语言程序写完后，都是先编译(.c)，后链接(.obj)，最后运行(.exe) (这三个后缀的文件中，只有.exe文件可运行)")])]),t._v(" "),v("h3",{attrs:{id:"标识符"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#标识符"}},[t._v("#")]),t._v(" 标识符")]),t._v(" "),v("ol",[v("li",[t._v("它由字母、数字、下划线组成，并且第一个必须为字母或下划线")]),t._v(" "),v("li",[t._v("标识符分为关键字、预定义标识符、用户标识符")])]),t._v(" "),v("table",[v("thead",[v("tr",[v("th",[t._v("标识符")]),t._v(" "),v("th",[t._v("特点")])])]),t._v(" "),v("tbody",[v("tr",[v("td",[t._v("关键字")]),t._v(" "),v("td",[t._v("不可以作为用户标识符")])]),t._v(" "),v("tr",[v("td",[t._v("预定义标识符")]),t._v(" "),v("td",[t._v("可以作为用户标识符，即define(预定义)、scanf(输出)、printf(输入)、include(头文件)")])]),t._v(" "),v("tr",[v("td",[t._v("用户标识符")]),t._v(" "),v("td",[t._v("用户在写代码时自己命名的合法标识符")])])])]),t._v(" "),v("p",[t._v("*严格区分大小写，但尽量采用能说明程序对象意义的标识符。")]),t._v(" "),v("p",[t._v("关键字如下：\n"),v("img",{attrs:{src:"/docs/extend/C/images/keywords.jpg",alt:"关键字"}})]),t._v(" "),v("h3",{attrs:{id:"进制转换"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#进制转换"}},[t._v("#")]),t._v(" 进制转换")]),t._v(" "),v("ol",[v("li",[t._v("C语言只有八、十、十六进制，无二进制，但在运行的时候，所有的进制都要转换成二进制进行处理\n"),v("ol",[v("li",[t._v("八进制以0开头，没有8，逢8进1")]),t._v(" "),v("li",[t._v("十六进制以0x开头")])])]),t._v(" "),v("li",[t._v("小数的合法写法\n"),v("ol",[v("li",[t._v("1.0 可写成 1.")]),t._v(" "),v("li",[t._v("0.1 可写成 .1")])])]),t._v(" "),v("li",[t._v("实型数据的合法形式\n"),v("ol",[v("li",[t._v("2.333e-1")]),t._v(" "),v("li",[t._v("e前e后必有数，e后必为整数")])])]),t._v(" "),v("li",[t._v("整型(int)、浮点数(float)是4个字节，字符型(char)是1个字节，双精度(double)是8个字节")])]),t._v(" "),v("h3",{attrs:{id:"算数表达式和赋值表达式"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#算数表达式和赋值表达式"}},[t._v("#")]),t._v(" 算数表达式和赋值表达式")]),t._v(" "),v("ol",[v("li",[v("p",[t._v("算数表达式： + - * / %")]),t._v(" "),v("ol",[v("li",[t._v('"/" 两边都是整型的话，结果一定是整型，即自动省去小数部分。 3/2 为 1.')]),t._v(" "),v("li",[t._v('"/" 如果有一边是小数，那么结果就是小数。 3/2.0 为 1.5')]),t._v(" "),v("li",[t._v('"%" 符合左右两边必须为整型')]),t._v(" "),v("li",[t._v("若参加运算的两个数中有一个数为实数，则结果是实数。 5.6/2=2.800000 8.34/5=1.686000")])])]),t._v(" "),v("li",[v("p",[t._v("赋值表达式")]),t._v(" "),v("ol",[v("li",[t._v("赋值的左边只能是变量，不能是常量或表达式")]),t._v(" "),v("li",[t._v("int x = 7.7; (得到 x = 7 )")]),t._v(" "),v("li",[t._v("float y = 7; (得到 7.0 )")])])]),t._v(" "),v("li",[v("p",[t._v("复合的赋值表达式")]),t._v(" "),v("ol",[v("li",[t._v("a *= 2 + 3;  (即 a = a * ( 2 + 3 ))")])])]),t._v(" "),v("li",[v("p",[t._v("自加、自减表达式\na++ a-- ++a --a")])]),t._v(" "),v("li")]),t._v(" "),v("h2",{attrs:{id:"参考"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#参考"}},[t._v("#")]),t._v(" 参考")]),t._v(" "),v("p",[v("a",{attrs:{href:"https://zhuanlan.zhihu.com/p/134093277",target:"_blank",rel:"noopener noreferrer"}},[t._v("mac VS Code配置C语言开发环境（小白简单版）"),v("OutboundLink")],1),t._v(" "),v("a",{attrs:{href:"https://www.bilibili.com/video/BV1e44y1z7RG?p=2&spm_id_from=pageDriver",target:"_blank",rel:"noopener noreferrer"}},[t._v("c程序设计3小时期末考试不挂科，赠资料！"),v("OutboundLink")],1)])])}),[],!1,null,null,null);_.default=r.exports}}]);