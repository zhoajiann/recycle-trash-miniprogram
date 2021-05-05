'use strict'

class takeOrderBuyer {

    constructor () {

    }
    
    async post (c) {   
        
        let id = JSON.parse(c.body).id,
            openidBuyer = JSON.parse(c.body).openid;

        let data = await c.service.model.db_buyer.takeOrder(id,openidBuyer)
        c.send(data,200)
    }  

}

module.exports = takeOrderBuyer