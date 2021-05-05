'use strict'

class incomeAllSeller {

    constructor () {
        this.param = '/:openid'
    }
    
    async get (c) {        
        let data = await c.service.model.db_seller.incomeAll(c.param.openid)
        c.send(data,200)
    }  

}

module.exports = incomeAllSeller