'use strict'

const funcs = require('./funcs')

/**
 * 一些关键数据需要加密，而通用的数据则需要公开，比如用户昵称，头像等
 * 
 * key必须是32位的密钥
 * 
 */

exports.make = function (userinfo, key, iv = '1234567908123456') {

    //如果没有设置expires则默认为10小时
    if (userinfo.expires === undefined) {
        userinfo.expires = 36000000;
    }

    if (userinfo.time === undefined) {
        userinfo.time = Date.now();
    }

    let edata = funcs.aesEncrypt(JSON.stringify(userinfo), key, iv);

    return edata;
};

exports.verify = function (edata, key, iv = '1234567908123456') {
    try {

        let u = funcs.aesDecrypt(edata, key, iv);

        let uj = JSON.parse(u);

        if (uj.timestamp + uj.expires < Date.now()) {
            //通过null表示超时，而错误返回false。
            return null;
        }

        //正常则返回解密后的用户信息。

        return uj;
        
    } catch (err) {
        return false;
    }
};

exports.verifyNoTime = function (edata, key, iv = '1234567908123456') {
    try {

        let u = funcs.aesDecrypt(edata, key, iv);
        
        let uj = JSON.parse(u);

        return uj;
        
    } catch (err) {
        return false;
    }
};
