'use strict'

class getListBuyer {

    constructor () {
        
    }

    async list (c) {        
        let data = await c.service.model.db_buyer.getAllList()
        c.send(data,200)
    }    
}

module.exports = getListBuyer
