'use strict'
//这里是卖家的首页
class getListSeller {

    constructor () {
        this.param = '/:openid'
    }

    async get (c) {        
        let data = await c.service.model.db_seller.getAllList(c.param.openid)
        c.send(data,200)
    }    
}

module.exports = getListSeller
