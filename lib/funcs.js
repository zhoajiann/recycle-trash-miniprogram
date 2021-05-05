'use strict';

const fs = require('fs');
const crypto = require('crypto');

exports.aesEncrypt = function (data, key, iv='1234569087123456', options = {}) {
    var h = crypto.createCipheriv('aes-256-cbc', key, iv, options);
    let hd = h.update(data, 'utf8', 'hex');
    hd += h.final('hex');
    return hd;
};

exports.aesDecrypt = function (data, key, iv='1234569087123456', options = {}) {
    var h = crypto.createDecipheriv('aes-256-cbc', key, iv, options);
    let hd = h.update(data, 'hex', 'utf8');
    hd += h.final('utf8');
    return hd;
};

exports.md5 = function (data) {
    let h = crypto.createHash('md5');
    h.update(data);
    return h.digest('hex');
};

exports.sha1 = function (data) {
    let h = crypto.createHash('sha1');
    h.update(data);
    return h.digest('hex');
};

exports.sha256 = function (data) {
    let h = crypto.createHash('sha256');
    h.update(data);
    return h.digest('hex');
};

exports.sha512 = function (data) {
    let h = crypto.createHash('sha512');
    h.update(data);
    return h.digest('hex');
};

exports.hashPasswd = function (passwd, salt = '') {
    var h = crypto.createHash('sha256');
    h.update(`${passwd}${salt}`);
    return h.digest('hex');
};

exports.makeSalt = function (length = 8) {
    let saltArr = [
        'a','b','c','d','e','f','g',
        'h','i','j','k','l','m','n',
        'o','p','q','r','s','t','u',
        'v','w','x','y','z','1','2',
        '3','4','5','6','7','8','9'
    ];

    let total = saltArr.length;
    let saltstr = '';
    let ind = 0;

    for(let i=0; i<length; i++) {
        ind = parseInt( Math.random() * 10000) % total;
        saltstr += saltArr[ ind ];
    }
    return saltstr;
};

exports.timestr = function () {
  let t = new Date();
  let year = t.getFullYear();
  let month = t.getMonth()+1;
  let day = t.getDate();
  let hour = t.getHours();
  let min = t.getMinutes();
  let sec = t.getSeconds();

  return `${year}-${month > 9 ? '' : '0'}${month}-${day > 9 ? '' : '0'}${day}_${hour > 9 ? '' : '0'}${hour}-${min > 9 ? '' : '0'}${min}-${sec > 9 ? '' : '0'}${sec}`;
};

exports.nmrand = function (f, t) {
    let discount = t - f;
    return parseInt((Math.random() * discount) + f);
};
