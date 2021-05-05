'use strict'

class addNewOrder {

    constructor () {

    }
    
    async post (c) {   
        
        let openid = c.body.openid,
            text = c.body.text,
            name = c.body.name,
            tel = c.body.tel,
            location = c.body.location;
        let f = c.getFile('media');

        let filename = `${c.helper.makeName()}` + `${c.helper.extName(f.filename)}`;
        console.log(filename);
        //移动文件到目标路径
        await c.moveFile(f, c.service.publicPath+`/trashImage/${filename}`)

        // await f.toFile(c.service.publicPath+'/trashImage', filename)
        let path = `/static/trashImage/${filename}`;
        let data = await c.service.model.db_seller.addNewOrder(openid,text,path,name,tel,location)

        c.send(data,200)
    }  

}

module.exports = addNewOrder