'use strict'

class getListDoneSeller {

    constructor () {
        this.param = '/:openid'
    }
    
    async get (c) {        
        let data = await c.service.model.db_seller.getListDone(c.param.openid)
        c.send(data,200)
    }  

}

module.exports = getListDoneSeller