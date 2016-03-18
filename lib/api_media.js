var path = require('path');
var fs = require('co-fs');
var formstream = require('formstream');
var util = require('./util');
var postJSON = util.postJSON;

/**
 * 上传多媒体文件，分别有图片（image）、语音（voice）、视频（video）和普通文件（file）
 * 详情请见：<http://qydev.weixin.qq.com/wiki/index.php?title=上传媒体文件>
 * Examples:
 * ```
 * api.uploadMedia('filepath', type);
 * ```
 * Result:
 * ```
 * {"type":"image","media_id":"0000001","created_at":123456789}
 * ```
 * Shortcut:
 *
 * - `exports.uploadImage(filepath);`
 * - `exports.uploadVoice(filepath);`
 * - `exports.uploadVideo(filepath);`
 * - `exports.uploadFile(filepath);`
 *
 * @param {String} filepath 文件路径
 * @param {String} type 媒体类型，可用值有image、voice、video、file
 */
exports.uploadMedia = function* (filepath, type) {
  var token = yield* this.ensureAccessToken();
  var stat = yield fs.stat(filepath);

  var form = formstream();
  form.file('media', filepath, path.basename(filepath), stat.size);
  var url = this.prefix + 'media/upload?access_token=' + token.accessToken + '&type=' + type;
  var opts = {
    dataType: 'json',
    type: 'POST',
    timeout: 60000, // 60秒超时
    headers: form.headers(),
    data: form
  };
  return yield* this.request(url, opts);
};

exports.uploadImage = function* (filepath) {
  return yield* this.uploadMedia(filepath, 'image');
};
exports.uploadVoice = function* (filepath) {
  return yield* this.uploadMedia(filepath, 'voice');
};
exports.uploadVideo = function* (filepath) {
  return yield* this.uploadMedia(filepath, 'video');
};
exports.uploadFile = function* (filepath) {
  return yield* this.uploadMedia(filepath, 'file');
};


/**
 * 根据媒体ID获取媒体内容
 * 详情请见：<http://qydev.weixin.qq.com/wiki/index.php?title=获取媒体文件>
 * Examples:
 * ```
 * var ret = yield api.getMedia(mediaId);
 * ```
 * - `result`, 调用正常时得到的文件Buffer对象
 *
 * @param {String} mediaId 媒体文件的ID
 */
exports.getMedia = function* (mediaId) {
  var token = yield* this.ensureAccessToken();
  var url = this.prefix + 'media/get?access_token=' + token.accessToken + '&media_id=' + mediaId;
  var opts = {
    timeout: 60000 // 60秒超时
  };
  return yield* this.request(url, opts);
};
