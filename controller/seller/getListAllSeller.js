'use strict'
//这里是卖家的全部订单
class getListAllSeller {

    constructor () {
        this.param = '/:openid'
    }

    async get (c) {
        console.log(c.param.openid);
        let data = await c.service.model.db_seller.getList(c.param.openid)
        c.send(data,200)
    }

    
}

module.exports = getListAllSeller