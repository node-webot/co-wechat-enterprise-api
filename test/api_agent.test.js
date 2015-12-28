var config = require('./config');
var API = require('../');
var expect = require('expect.js');

describe('api_agent', function () {
    var api = new API(config.corpid, config.corpsecret);

    describe('listAgent', function () {
        it('should ok', function* () {
            var ret = yield api.listAgent();
            expect(ret).to.only.have.keys(['errcode', 'errmsg', 'agentlist']);
            expect(ret.errcode).to.be(0);
            expect(ret.errmsg).to.be("ok");
            expect(ret.agentlist).to.be.an(Array);
        });
    });

    describe('getAgent', function () {
        it('should ok', function* () {
            var agentid = config.agentid;
            var ret = yield api.getAgent(agentid);
            expect(ret.errcode).to.be(0);
            expect(ret.errmsg).to.be("ok");
            expect(ret.agentid).to.eql(agentid);
        });
    });

    describe('setAgent', function () {
        it('should ok', function* () {
            var agentid = config.agentid;
            var agent_info = {
                agentid: agentid,
                name: '企业小助手',
                description: '由setAgent在' + new Date() + '设置',
            };
            var ret = yield api.setAgent(agent_info);
            expect(ret.errcode).to.be(0);
            expect(ret.errmsg).to.be("ok");
        });
    });


});
