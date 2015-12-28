// var API = require('./index');
var config = require('./test/config');
var httpx = require('httpx');
var streamx = require('streamx');
var co = require('co');

// var api = new API(config.corpid, config.corpsecret)
var x = function* () {
    var url = 'https://qyapi.weixin.qq.com/cgi-bin/user/update?access_token=m3bEweu8-G2RJBcs0RyI6nQ_t-eH32HKuEyyaIUHQvvCe-nxA54ilMm01Baee1WwOCEZP0AIXIImWDcax9FVDg';
    var options = {
        dataType: 'json',
        method: 'POST',
        data: '{"userid":"mochatestuser","name":"张三","department":[1],"position":"产品经理","mobile":"","gender":"1","email":"mochatestuser@cctv.com","weixinid":"","avatar_mediaid":"2-G6nrLmr5EC3MNb_-zL1dDdzkd0p7cNliYu9V5w7o8K0"}',
        // data: 'xxxx',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    var res = yield httpx.request(url, options);
    console.log(res.statusCode);
    var buf = yield streamx.read(res);
    console.log(buf.toString());
    return buf;
}

co(x());
