'use strict'

class getListAllBuyer {

    constructor () {
        this.param = '/:openid'
    }

    async get (c) {
        console.log(c.param.openid);
        let data = await c.service.model.db_buyer.getList(c.param.openid)
        c.send(data,200)
    }

    
}

module.exports = getListAllBuyer