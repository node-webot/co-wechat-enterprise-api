var config = require('./config');
var httpx = require('httpx');
var streamx = require('streamx');
var expect = require('expect.js');

describe('httpx', function () {
    it("test post", function* () {
        var url = 'https://qyapi.weixin.qq.com/cgi-bin/invite/send?access_token=DZjwjteVB5IJRReEozyrNF8_UeE6ArKS8THhIYu0az-ycAeFXDKNXqJK39kSrZn0MpRz9NePF4-KIo-AhpZA_w';
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
        var buf = yield streamx.read(res);
        console.log(buf.toString());
    });
});
