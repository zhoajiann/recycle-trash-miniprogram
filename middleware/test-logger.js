'use strict'

module.exports = async (c, next) => {

  console.log(c.method, c.path, c.routepath, c.headers['user-agent'] || '')

  await next()

}
