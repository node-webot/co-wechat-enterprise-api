var util = require('./util');
var postJSON = util.postJSON;

/**
 * 批量邀请成员
 * 详细请看：http://qydev.weixin.qq.com/wiki/index.php?title=%E5%BC%82%E6%AD%A5%E4%BB%BB%E5%8A%A1%E6%8E%A5%E5%8F%A3#.E9.82.80.E8.AF.B7.E6.88.90.E5.91.98.E5.85.B3.E6.B3.A8
 *
 * Examples:
 * ```
 * var result = yield api.batchInviteUser(to, callback);
 * ```
 * To:
 * ```
 * {
 *   "touser":"xxx|xxx",
 *   "toparty":"xxx|xxx",
 *   "totag":"xxx|xxx",
 *   "invite_tips":"xxx",
 * }
 * ```
 * ```
 * TaskCb:
 * ```
 *   {
 *     "url": "xxx",
 *     "token": "xxx",
 *     "encodingaeskey": "xxx"
 *   }
 * ```
 *
 * Result:
 * ```
 * {
 *   "errcode": 0,
 *   "errmsg": "ok",
 *   "jobid": "IoZW03y44Zcwuz-2K6T6rHTcf1uwyVbcYu2aRALKw-U"
 * }
 * ```
 * @param {Object} to 批量邀请的数据结构
 * @param {Object} callback 任务执行完毕后的回调结构
 */
exports.batchInviteUser = function* (to, callback) {
  var token = yield * this.ensureAccessToken();
  var url = this.prefix + 'batch/inviteuser?access_token=' + token.accessToken;
  var data = to;
  if (callback) {
    data.callback = callback;
  }
  return yield* this.request(url, postJSON(data));
};

/**
 * 批量更新成员
 * 详细请看：http://qydev.weixin.qq.com/wiki/index.php?title=%E5%BC%82%E6%AD%A5%E4%BB%BB%E5%8A%A1%E6%8E%A5%E5%8F%A3#.E9.82.80.E8.AF.B7.E6.88.90.E5.91.98.E5.85.B3.E6.B3.A8
 *
 * Examples:
 * ```
 * var result = yield api.batchSyncUser(mediaId, callback);
 * ```
 *
 * ```
 * TaskCb:
 * ```
 *   {
 *     "url": "xxx",
 *     "token": "xxx",
 *     "encodingaeskey": "xxx"
 *   }
 * ```
 *
 * Result:
 * ```
 * {
 *   "errcode": 0,
 *   "errmsg": "ok",
 *   "jobid": "IoZW03y44Zcwuz-2K6T6rHTcf1uwyVbcYu2aRALKw-U"
 * }
 * ```
 * @param {String} mediaId 数据文件的mediaId
 * @param {Object} callback 任务执行完毕后的回调结构
 */
exports.batchSyncUser = function* (mediaId, callback) {
  var token = yield * this.ensureAccessToken();
  var url = this.prefix + 'batch/syncuser?access_token=' + token.accessToken;
  var data = {
    media_id: mediaId
  };
  if (callback) {
    data.callback = callback;
  }
  return yield* this.request(url, postJSON(data));
};

/**
 * 全量覆盖成员
 * 详细请看：http://qydev.weixin.qq.com/wiki/index.php?title=%E5%BC%82%E6%AD%A5%E4%BB%BB%E5%8A%A1%E6%8E%A5%E5%8F%A3#.E9.82.80.E8.AF.B7.E6.88.90.E5.91.98.E5.85.B3.E6.B3.A8
 *
 * Examples:
 * ```
 * var result = yield api.batchReplaceUser(mediaId, callback);
 * ```
 *
 * ```
 * TaskCb:
 * ```
 *   {
 *     "url": "xxx",
 *     "token": "xxx",
 *     "encodingaeskey": "xxx"
 *   }
 * ```
 *
 * Result:
 * ```
 * {
 *   "errcode": 0,
 *   "errmsg": "ok",
 *   "jobid": "IoZW03y44Zcwuz-2K6T6rHTcf1uwyVbcYu2aRALKw-U"
 * }
 * ```
 * @param {String} mediaId 数据文件的mediaId
 * @param {Object} callback 任务执行完毕后的回调结构
 */
exports.batchReplaceUser = function* (mediaId, callback) {
  var token = yield * this.ensureAccessToken();
  var url = this.prefix + 'batch/replaceuser?access_token=' + token.accessToken;
  var data = {
    media_id: mediaId
  };
  if (callback) {
    data.callback = callback;
  }
  return yield* this.request(url, postJSON(data));
};

/**
 * 全量覆盖部门
 * 详细请看：http://qydev.weixin.qq.com/wiki/index.php?title=%E5%BC%82%E6%AD%A5%E4%BB%BB%E5%8A%A1%E6%8E%A5%E5%8F%A3#.E9.82.80.E8.AF.B7.E6.88.90.E5.91.98.E5.85.B3.E6.B3.A8
 *
 * Examples:
 * ```
 * var result = yield api.batchReplaceParty(mediaId, callback);
 * ```
 *
 * ```
 * TaskCb:
 * ```
 *   {
 *     "url": "xxx",
 *     "token": "xxx",
 *     "encodingaeskey": "xxx"
 *   }
 * ```
 *
 * Result:
 * ```
 * {
 *   "errcode": 0,
 *   "errmsg": "ok",
 *   "jobid": "IoZW03y44Zcwuz-2K6T6rHTcf1uwyVbcYu2aRALKw-U"
 * }
 * ```
 * @param {Object} mediaId 数据文件的mediaId
 * @param {Object} callback 任务执行完毕后的回调结构
 */
exports.batchReplaceParty = function* (mediaId, callback) {
  var token = yield * this.ensureAccessToken();
  var url = this.prefix + 'batch/replaceparty?access_token=' + token.accessToken;
  var data = {
    media_id: mediaId
  };
  if (callback) {
    data.callback = callback;
  }
  return yield* this.request(url, postJSON(data));
};

/**
 * 获取批量任务的结果
 * 详细请看：http://qydev.weixin.qq.com/wiki/index.php?title=%E5%BC%82%E6%AD%A5%E4%BB%BB%E5%8A%A1%E6%8E%A5%E5%8F%A3#.E9.82.80.E8.AF.B7.E6.88.90.E5.91.98.E5.85.B3.E6.B3.A8
 *
 * Examples:
 * ```
 * var result = yield api.batchGetResult(jobid);
 * ```
 *
 * 返回结果参考微信的官方文档
 * @param {String} jobid 启动批量任务时返回的任务id
 */
exports.batchGetResult = function* (jobid) {
  var token = yield * this.ensureAccessToken();
  var url = this.prefix + 'batch/getresult?access_token=' + token.accessToken + '&jobid=' + jobid;
  var opts = {
    dataType: 'json'
  };
  return yield* this.request(url, opts);
};
