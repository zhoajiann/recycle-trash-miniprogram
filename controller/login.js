'use strict'

const wxkey = require('../wxkey.js')
const fetch = require("node-fetch");

class login {
    constructor () {
        // this.param = ''
    }

    async get (c){
        c.send('true',200)
      }
      
    async post (c) {
        //发起请求调用小程序服务器api

        let status = JSON.parse(c.body).state,
            username = JSON.parse(c.body).username;

        let login_url = `https://api.weixin.qq.com/sns/jscode2session`
        +   `?appid=${wxkey.appid}`
        +   `&secret=${wxkey.secret}`
        +   `&js_code=${JSON.parse(c.body).code}`
        +   `&grant_type=authorization_code`

        let r;

        await fetch(login_url)
        .then(res=>res.json())
        .then(res=>{
            r = res
        })

        console.log(r);

        //如果获取openid失败则返回500错误码
        if(r.openid === undefined){
            c.statues = 500
            console.log('获取openid失败');
            return
        }

        //检测数据库中是否有此用户
        let myuser = await c.service.model.db_login.findUser(r.openid,status)

        console.log(status);
        console.log(2,myuser);

        //if this user not exists
        if(myuser == false)
        {
            console.log('没有这个用户,加入此新用户~')
            await c.service.model.db_login.addUser(r.openid,status,username);
        }

        //返回openid
        c.res.body = r.openid;
    }
}

module.exports = login
