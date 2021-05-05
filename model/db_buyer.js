'use strict'

class db_buyer{

    constructor (mdb) {
        this.db = mdb
    }

    async getAllList(){
        let sql = `select id,text,picture,name,tel,location,time,state from list where state!='已完成' and state!='进行中'`
        let r = await this.db.query(sql);
        let data = r.rows;
        console.log(data);
        if(typeof(data) == 'undefined'){
            return false
        }
        return data
 
    }

    async getList(openid){
        console.log(openid);
        let sql =  `select id,text,picture,name,tel,location,time,state from list where buyer='${openid}'`
        let r = await this.db.query(sql);
        let data = r.rows;
        if(typeof(data) == 'undefined'){
            return false
        }
        return data
    }

    async getListDoing(openid){
        let sql =  `select id,text,picture,name,tel,location,time,state from list where buyer='${openid}' and state='进行中'`
        let r = await this.db.query(sql);
        let data = r.rows;
        if(typeof(data) == 'undefined'){
            return false
        }
        return data
    }

    async getListDone(openid){
        let sql =  `select id,text,picture,name,tel,location,time,state from list where buyer='${openid}' and state='已完成'`
        let r = await this.db.query(sql);
        let data = r.rows;
        if(typeof(data) == 'undefined'){
            return false
        }
        return data
    }

    async incomeAll(openid){
        let sql =  `select SUM(money) from list where buyer='${openid}' and state='已完成'`
        let r = await this.db.query(sql);
        let data = r.rows[0];
        if(typeof(data) == 'undefined'){
            return false
        }
        return data
    }

    async incomeToday(openid){
        let timeNow = new Date().toLocaleDateString();
        let timeNow1 = new Date().toLocaleString();
        console.log(timeNow);
        console.log(timeNow1);
        let sql =  `select SUM(money) from list where buyer='${openid}' and state='已完成' and time like '${timeNow}%'`
        console.log(sql);
        let r = await this.db.query(sql);
        let data = r.rows[0];
        if(typeof(data) == 'undefined'){
            return false
        }
        return data
    }

    async takeOrder(id,openidBuyer){
        let sql =  `update list set buyer='${openidBuyer}',state='进行中' where id='${id}'`
        let r = await this.db.query(sql);
        let data = r.rows;
        if(typeof(data) == 'undefined'){
            return false
        }
        return true
    }
}

module.exports = db_buyer
