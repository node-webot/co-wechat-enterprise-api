var config = require('./config');
var API = require('../');
var expect = require('expect.js');

describe('api_menu', function () {
    var api = new API(config.corpid, config.corpsecret);

    describe('createMenu', function () {
        it('should ok', function* () {
            var ret = yield api.createMenu(config.agentid, config.test_menu);
            console.log(ret);
            expect(ret).to.only.have.keys(['errcode', 'errmsg']);
            expect(ret.errcode).to.be(0);
            expect(ret.errmsg).to.be("ok");
        });
    });

    describe('getMenu', function () {
        it('should ok', function* () {
            var ret = yield api.getMenu(config.agentid);
            console.log(ret);
            expect(ret).to.only.have.keys(['errcode', 'errmsg']);
            expect(ret.errcode).to.be(0);
            expect(ret.errmsg).to.be("ok");
        });
    });

    describe('removeMenu', function () {
        it('should ok', function* () {
            var ret = yield api.removeMenu(config.agentid);
            console.log(ret);
            expect(ret).to.only.have.keys(['errcode', 'errmsg']);
            expect(ret.errcode).to.be(0);
            expect(ret.errmsg).to.be("ok");
        });
    });


});
