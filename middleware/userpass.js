'use strict'

module.exports = async (c, next) => {

  //检测如果存在消息头部的Authorization字段或者在URL中携带了token参数，则解密token
  let token = c.headers['authorization'] || c.query.token

  if (!token) {
    c.send('failed', 403)
    return
  }

  let u = c.service.token.verify(token, c.service.tokenKey)

  if (u === null) {
    c.send('token timeout', 403)
    return
  }

  if (u === false) {
    c.send ('bad token', 400)
    return
  }

  //把解密后的用户信息挂载到c.box.user。
  //此后所有中间件和核心请求都可以通过c.box.user访问到用户信息。
  //后续的处理不必关心用户是否登录，因为用户不登录或者token验证失败根本不会到达下一层。

  c.box.user = u

  await next()
  
}
