'use strict'

class getListDoingBuyer {

    constructor () {
        this.param = '/:openid'
    }
    
    async get (c) {        
        let data = await c.service.model.db_buyer.getListDone(c.param.openid)
        c.send(data,200)
    }  

}

module.exports = getListDoingBuyer