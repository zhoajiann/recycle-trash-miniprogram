'use strict'
//用于提交插入得测试案例
class confirm {

    constructor() {
    }


    async post(c) {//更新列表
        let { id, openid, money } = JSON.parse(c.body);  //减少积分和增加记录
        let data = await c.service.model.db_confirm.confirm(id,openid,money)
        console.log(data);
        c.send(data,200)

    }

}
module.exports = confirm

