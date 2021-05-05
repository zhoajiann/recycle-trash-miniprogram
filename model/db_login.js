'use strict'

class db_login{

    constructor (mdb) {
        this.db = mdb
    }

    async findUser(openid,status){
        if(status == 1){
            let sql = `select * from seller where openid='${openid}'`
            let r = await this.db.query(sql);
            let data = r.rows[0]
            console.log(1,data);
            if(typeof(data) == 'undefined'){
                return false
            }
            return true
        }else if(status == 2){
            let sql = `select * from buyer where openid='${openid}'`
            let r = await this.db.query(sql);
            let data = r.rows[0]
            console.log(data);
            if(typeof(data) == 'undefined'){
                return false
            }
            return true
        }
        
    }

    async addUser(openid,status,username){
        if(status == 1){
            let sql =  `insert into seller values('${openid}','${username}','${status}')`
            let r = await this.db.query(sql);
            let data = r.rows;
            console.log('加入了这个seller')
            return data;
        }else if(status == 2){
            let sql =  `insert into buyer values('${openid}','${username}','${status}')`
            let r = await this.db.query(sql);
            let data = r.rows;
            console.log('加入了这个buyer')
            return data;
        }
    }
}

module.exports = db_login
