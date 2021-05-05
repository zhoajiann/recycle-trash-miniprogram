'use strict'

class db_confirm{

    constructor (mdb) {
        this.db = mdb
    }

    async confirm(id,openid,money){
            // console.log(c.body);
            // let { id, openid, money } = JSON.parse(c.body);  //减少积分和增加记录
            console.log(id,openid,money)
            let sql = `update list set money='${money}',state='已完成' where seller='${openid}' and id='${id}'`
            let r = await this.db.query(sql);
            let data = r.rows;
            console.log('加入了这个confirm')
            return data;
        
    }
}

module.exports = db_confirm
