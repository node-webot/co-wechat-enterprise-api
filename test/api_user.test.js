var config = require('./config');
var API = require('../');
var expect = require('expect.js');

describe('api_user', function () {
    var api = new API(config.corpid, config.corpsecret);
    // describe('getUser', function () {
    //     it('get user should ok', function* () {
    //         var ret = yield api.getUser('00001');
    //         console.log(ret);
    //         // expect(ret).to.only.have.keys(['errcode', 'errmsg']);
    //         expect(ret.errcode).to.be(0);
    //         expect(ret.errmsg).to.be("ok");
    //     });

    // });
    describe('createUser', function () {
        it('create user should ok', function* () {
        	var user_info = config.test_user;
        	console.log(user_info);
            var ret = yield api.createUser(config.test_user);
            console.log(ret);
            expect(ret).to.only.have.keys(['errcode', 'errmsg']);
            expect(ret.errcode).to.be(0);
            expect(ret.errmsg).to.be("created");
        });
        // it('check should ok', function* () {
        //     var ret = yield api.getUser(config.test_user.userid);
        //     expect(ret).to.eql(config.test_user);
        // });
    });
    // describe('updateUser', function () {
    //     it('should ok', function* () {
    //         var user_info = {
    //             userid: config.test_user.userid,
    //             name: '张三三'
    //         };
    //         var ret = yield api.updateUser(user_info);
    //         expect(ret).to.only.have.keys(['errcode', 'errmsg']);
    //     });
    //     it('check should ok', function* () {
    //         var ret = yield api.getUser(config.test_user.userid);
    //         expect(ret.name).to.eql('张三三');
    //     });
    // });
    // describe('deleteUser', function () {
    //     it('should ok', function* () {
    //         var ret = yield api.deleteUser(config.test_user.userid);
    //         expect(ret).to.only.have.keys(['errcode', 'errmsg']);
    //     });
    // });
});
