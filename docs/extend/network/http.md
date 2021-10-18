<!--
 * @Descripttion: 
 * @version: 
 * @Author: shenjia
 * @Date: 2021-10-08 15:51:53
 * @LastEditors: shenjia
 * @LastEditTime: 2021-10-08 18:41:28
-->
## HTTP 2.0
二进制分帧传输
多路复用
头部压缩
服务器推送

## HTTP 3.0
http 协议是应用层协议，都是建立在传输层之上的。我们也都知道传输层上面不只有 TCP 协议，还有另外一个强大的协议 UDP 协议，2.0 和 1.0 都是基于 TCP 的，因此都会有 TCP 带来的硬伤以及局限性。而 Http3.0 则是建立在 UDP 的基础上。所以其与 Http2.0 之间有质的不同。

连接迁移
无队头阻塞
自定义的拥塞控制
前向安全和前向纠错

## 状态码
http 状态码 204 （无内容） 服务器成功处理了请求，但没有返回任何内容
http 状态码 301 （永久移动） 请求的网页已永久移动到新位置。 服务器返回此响应（对 GET 或 HEAD 请求的响应）时，会自动将请求者转到新位置。
http 状态码 302 （临时移动） 服务器目前从不同位置的网页响应请求，但请求者应继续使用原有位置来进行以后的请求。
http 状态码 304 （未修改） 自从上次请求后，请求的网页未修改过。 服务器返回此响应时，不会返回网页内容。
http 状态码 400 （错误请求） 服务器不理解请求的语法（一般为参数错误）。
http 状态码 401 （未授权） 请求要求身份验证。 对于需要登录的网页，服务器可能返回此响应。
http 状态码 403 （禁止） 服务器拒绝请求。（一般为客户端的用户权限不够）
http 状态码 404 （未找到） 服务器找不到请求的网页。