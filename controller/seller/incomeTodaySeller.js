'use strict'

class incomeAllBuyer {

    constructor () {
        this.param = '/:openid'
    }
    
    async get (c) {        
        let data = await c.service.model.db_seller.incomeToday(c.param.openid)
        c.send(data,200)
    }  

}

module.exports = incomeAllBuyer