'use strict'

class getListDoingSeller {

    constructor () {
        this.param = '/:openid'
    }
    
    async get (c) {        
        let data = await c.service.model.db_seller.getListDoing(c.param.openid)
        c.send(data,200)
    }  

}

module.exports = getListDoingSeller