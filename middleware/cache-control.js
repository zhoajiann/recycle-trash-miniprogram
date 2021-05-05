'use strict'

module.exports = async (c, next) => {

  //请求缓存30秒
  c.setHeader('cache-control', 'public, max-age=30')

  await next()
}
