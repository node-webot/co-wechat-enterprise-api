var util = require('./util');
var postJSON = util.postJSON;

/**
 * 获取企业号应用
 * 详细请看：<http://qydev.weixin.qq.com/wiki/index.php?title=获取企业号应用>
 * 
 * Examples:
 * ```
 * var result = yield api.getAgent(agentid);
 * ```
 *
 * Result:
 * ```
 * {
 * "errcode":"0",
 * "errmsg":"ok" ,
 * "agentid":"1" ,
 * "name":"NAME" ,
 * "square_logo_url":"xxxxxxxx" ,
 * "round_logo_url":"yyyyyyyy" ,
 * "description":"desc" ,
 * "allow_userinfos":{
 *     "user":[
 *           {
 *               "userid":"id1",
 *               "status":"1"
 *           },
 *           {
 *               "userid":"id2",
 *               "status":"1"
 *           },
 *           {
 *               "userid":"id3",
 *               "status":"1"
 *           }
 *            ]
 *  },
 * "allow_partys":{
 *     "partyid": [1]
 *  },
 * "allow_tags":{
 *     "tagid": [1,2,3]
 *  }
 * "close":0 ,
 * "redirect_domain":"www.qq.com",
 * "report_location_flag":0,
 * "isreportuser":0,
 * "isreportenter":0
 * ```
 * @param {String} agentid 企业号应用的id
 */
exports.getAgent = function* (agentid) {
  var token = yield * this.ensureAccessToken();
  var url = this.prefix + 'agent/get?access_token=' + token.accessToken + '&agentid=' + agentid;
  var opts = {
    dataType: 'json'
  };
  return yield* this.request(url, opts);
};

/**
 * 设置企业号应用
 * 详细请看：<http://qydev.weixin.qq.com/wiki/index.php?title=设置企业号应用>
 *
 * Examples:
 * ```
 * var result = yield api.setAgent(opts);
 * ```
 * Opts:
 * ```
 * {
 *   "agentid": "5",
 *   "report_location_flag": "0",
 *   "logo_mediaid": "xxxxx",
 *   "name": "NAME",
 *   "description": "DESC",
 *   "redirect_domain": "xxxxxx",
 *   "isreportuser":0,
 *   "isreportenter":0
 * }
 * ```
 *
 * Callback:
 *
 * - `err`, 调用失败时得到的异常
 * - `result`, 调用正常时得到的对象
 *
 * ```
 *
 * Result:
 * {
 *   "errcode":"0",
 *   "errmsg":"ok" ,
 * }
 * ```
 * @param {Object} opts 更新的数据
 */
exports.setAgent = function* (opts) {
  var token = yield * this.ensureAccessToken();
  var url = this.prefix + 'agent/set?access_token=' + token.accessToken;
  return yield* this.request(url, postJSON(opts));
};

/**
 * 获取应用概况列表
 * 详细请看：<http://qydev.weixin.qq.com/wiki/index.php?title=获取应用概况列表>
 *
 * Examples:
 * ```
 * var result = yield api.listAgent();
 * ```
 *
 * ```
 *
 * Result:
 * {
 *  "errcode": 0,
 *  "errmsg": "ok",
 *  "agentlist": [
 *    {
 *       "agentid": "5",
 *       "name": "企业小助手",
 *       "square_logo_url": "url",
 *       "round_logo_url": "url"
 *    },
 *    {
 *       "agentid": "8",
 *       "name": "HR小助手",
 *       "square_logo_url": "url",
 *       "round_logo_url": "url"
 *    }
 *  ]  
 * }
 * ```
 */
exports.listAgent = function* () {
  var token = yield * this.ensureAccessToken();
  var url = this.prefix + 'agent/list?access_token=' + token.accessToken;
  var opts = {
    dataType: 'json'
  };
  return yield* this.request(url, opts);
};
