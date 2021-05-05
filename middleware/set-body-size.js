'use strict'

module.exports = async (c, next) => {
  //设置最大允许提交body数据为5M，按照1K = 1000B计算。
  c.maxBody = 5000000

  await next()

}
