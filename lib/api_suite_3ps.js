// 企业号第三方应用套件用到的API
// 功能	API名称
// 获取应用套件令牌			get_suite_token
// 获取预授权码				get_pre_auth_code
// 获取企业号的永久授权码		get_permanent_code
// 获取企业号access_token		get_corp_token
// 获取企业授权信息			get_auth_info
var util = require('./util');
var querystring = require('querystring');
var postJSON = util.postJSON;

exports.get_suite_token = function* (suite_ticket) {
	var suite_ticket = this.ensureSuiteTicket();
  var url = this.prefix + 'service/get_suite_token';
  var data = {
  	suite_id: this.suite_id,
  	suite_secret: this.suite_secret,
  	suite_ticket: suite_ticket,
  };
  return yield* this.request(url, postJSON(data));
};

exports.get_pre_auth_code = function* () {
  var suite_access_token = yield* this.ensureSuiteAccessToken();
  var url = this.prefix + 'service/get_pre_auth_code?suite_access_token=' + suite_access_token;
  var data = {
  	suite_id: this.suite_id,
  };
  return yield* this.request(url, postJSON(data));
};

exports.set_session_info = function* (pre_auth_code, appid) {
  var suite_access_token = yield* this.ensureSuiteAccessToken();
  var url = this.prefix + 'service/set_session_info?suite_access_token=' + suite_access_token;
  var data = {
  	pre_auth_code: pre_auth_code,
  	session_info: {
  		appid: appid
  	},
  };
  return yield* this.request(url, postJSON(data));
};

exports.get_permanent_code = function* (auth_code) {
  var suite_access_token = yield* this.ensureSuiteAccessToken();
  var url = this.prefix + '/service/get_permanent_code?suite_access_token=' + suite_access_token;
  var data = {
    suite_id: this.suite_id,
    auth_code: auth_code,
  };
  return yield* this.request(url, postJSON(data));
};

exports.get_auth_info = function* (auth_corpid, permanent_code) {
  var suite_access_token = yield* this.ensureSuiteAccessToken();
  var url = this.prefix + 'service/get_auth_info?suite_access_token=' + suite_access_token;
  var data = {
    suite_id: this.suite_id,
    auth_corpid: auth_corpid,
    permanent_code: permanent_code,
  };
  return yield* this.request(url, postJSON(data));
};


exports.get_corp_token = function* (auth_corpid, permanent_code) {
  var suite_access_token = yield* this.ensureSuiteAccessToken();
  var url = this.prefix + 'service/get_corp_token?suite_access_token=' + suite_access_token;
  var data = {
    suite_id: this.suite_id,
    auth_corpid: auth_corpid,
  	permanent_code: permanent_code,
  };
  return yield* this.request(url, postJSON(data));
};


