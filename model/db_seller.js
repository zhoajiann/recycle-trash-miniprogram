'use strict'

class db_seller{

    constructor (mdb) {
        this.db = mdb
    }
    //这里是卖家的首页 有接单的和未接单的
    async getAllList(openid){
        console.log(openid+'openid')
        let sql = `select id,text,picture,name,tel,location,time,seller,buyer,state,money from list where seller='${openid}' and state !='已完成'`
        let r = await this.db.query(sql);
        let data = r.rows;
        console.log(data);
        if(typeof(data) == 'undefined'){
            return false
        }
        return data
 
    }

    //这里是卖家的全部订单
    async getList(openid){
        console.log(openid);
        let sql =  `select id,text,picture,name,tel,location,time,seller,buyer,state,money from list where seller='${openid}'`
        let r = await this.db.query(sql);
        let data = r.rows;
        console.log(25,data);
        if(typeof(data) == 'undefined'){
            return false
        }
        return data
    }
    //这里是卖家的正在进行订单
    async getListDoing(openid){
        let sql =  `select id,text,picture,name,tel,location,time,seller,buyer,state,money from list where seller='${openid}' and state='进行中'`
        let r = await this.db.query(sql);
        let data = r.rows;
        if(typeof(data) == 'undefined'){
            return false
        }
        return data
    }
    //这里是卖家的已完成订单
    async getListDone(openid){
        let sql =  `select id,text,picture,name,tel,location,time,seller,buyer,state,money from list where seller='${openid}' and state='已完成'`
        let r = await this.db.query(sql);
        let data = r.rows;
        if(typeof(data) == 'undefined'){
            return false
        }
        return data
    }
    //这里是卖家的全部收入
   
    async incomeAll(openid){
        let sql =  `select SUM(money) from list where seller='${openid}' and state='已完成'`
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
        let sql =  `select SUM(money) from list where seller='${openid}' and state='已完成' and time like '${timeNow}%'`
        console.log(sql);
        let r = await this.db.query(sql);
        let data = r.rows[0];
        if(typeof(data) == 'undefined'){
            return false
        }
        return data
    }

    //上传订单
    async addNewOrder(openid,text,filename,name,tel,location){
        let time = new Date().toLocaleString();
        let sql =  `insert into list(text,picture,name,tel,location,seller,time,state) values('${text}','${filename}','${name}','${tel}','${location}','${openid}','${time}','未接单');`
        let r = await this.db.query(sql);
        let data = r.rows;
        if(typeof(data) == 'undefined'){
            return false
        }
        return true
    }


}

module.exports = db_seller
