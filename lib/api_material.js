var path = require('path');
var fs = require('co-fs');
var formstream = require('formstream');
var util = require('./util');
var postJSON = util.postJSON;

/**
 * 上传图文消息素材，接口返回素材资源标识ID：media_id。media_id是可复用的，同一个media_id可用于消息的多次发送。
 * 管理组须拥有agent的使用权限，media_id可以在同一个应用的不同管理组共享。
 * 详情请见：<http://qydev.weixin.qq.com/wiki/index.php?title=%E4%B8%8A%E4%BC%A0%E6%B0%B8%E4%B9%85%E7%B4%A0%E6%9D%90>
 * Examples:
 * ```
 * var result = yield api.addMPNews(agentid, articles);
 * ```
 * Result:
 * ```
 * {"errcode": "0","errmsg": "ok","media_id": "2-G6nrLmr5EC3MMfasdfb_-zK1dDdzmd0p7"}
 * ```
 * @param {Integer} agentid 企业应用的id，整型。可在应用的设置页面查看
 * @param {Array} articles 图文消息，一个图文消息支持1到10个图文
 */
exports.addMPNews = function* (agentid, articles) {
  var token = yield* this.ensureAccessToken();
  var url = this.prefix + 'material/add_mpnews?access_token=' + token.accessToken;
  var data = {
    agentid: agentid,
    mpnews: {
      articles: articles
    }
  };
  return yield* this.request(url, postJSON(data));
};

/**
 * 通过media_id删除上传的图文消息、图片、语音、文件、视频素材。
 * 管理组须拥有agent的使用权限，media_id可以在同一个应用的不同管理组共享。
 * 详情请见：<http://qydev.weixin.qq.com/wiki/index.php?title=%E4%B8%8A%E4%BC%A0%E6%B0%B8%E4%B9%85%E7%B4%A0%E6%9D%90>
 * Examples:
 * ```
 * var result = yield api.updateMPNews(agentid, media_id, articles);
 * ```
 * Result:
 * ```
 * {"errcode": "0","errmsg": "ok","media_id": "2-G6nrLmr5EC3MMfasdfb_-zK1dDdzmd0p7"}
 * ```
 * @param {Integer} agentid 企业应用的id，整型。可在应用的设置页面查看
 * @param {String} media_id 素材资源标识ID
 * @param {Array} articles 图文消息，一个图文消息支持1到10个图文
 */
exports.updateMPNews = function* (agentid, media_id, articles) {
  var token = yield* this.ensureAccessToken();
  var url = this.prefix + 'material/update_mpnews?access_token=' + token.accessToken;
  var data = {
    agentid: agentid,
    media_id: media_id,
    mpnews: {
      articles: articles
    }
  };
  return yield* this.request(url, postJSON(data));
};

/**
 * 上传图片、语音、视频等媒体资源文件以及普通文件（如doc，ppt），接口返回素材资源标识ID：media_id。media_id是可复用的，同一个media_id可用于消息的多次发送。
 * 详情请见：<http://qydev.weixin.qq.com/wiki/index.php?title=%E4%B8%8A%E4%BC%A0%E6%B0%B8%E4%B9%85%E7%B4%A0%E6%9D%90>
 * Examples:
 * ```
 * var result = yield api.addMaterial(agentid, 'filepath', type);
 * ```
 * Result:
 * ```
 * { "errcode":0, "errmsg":"ok", "media_id": "2-G6nrLmr5EFSDC3MMfasdfb_-zK1dDdzmd0p7"}
 * ```
 * Shortcut:
 *
 * - `exports.addImage(agentid, filepath);`
 * - `exports.addVoice(agentid, filepath);`
 * - `exports.addVideo(agentid, filepath);`
 * - `exports.addFile(agentid, filepath);`
 *
 * @param {Integer} agentid 企业应用的id，整型。可在应用的设置页面查看
 * @param {String} filepath 文件路径
 * @param {String} type 媒体类型，可用值有image、voice、video、file
 */
exports.addMaterial = function* (agentid, filepath, type) {
  var token = yield* this.ensureAccessToken();
  var stat = yield fs.stat(filepath);

  var form = formstream();
  form.file('media', filepath, path.basename(filepath), stat.size);
  var url = this.prefix + 'material/add_material?access_token=' + token.accessToken + '&agentid=' + agentid + '&type=' + type;
  var opts = {
    dataType: 'json',
    type: 'POST',
    timeout: 60000, // 60秒超时
    headers: form.headers(),
    data: form
  };
  return yield* this.request(url, opts);
};

exports.addImage = function* (agentid, filepath) {
  return yield* this.addMaterial(agentid, filepath, 'image');
};
exports.addVoice = function* (agentid, filepath) {
  return yield* this.addMaterial(agentid, filepath, 'voice');
};
exports.addVideo = function* (agentid, filepath) {
  return yield* this.addMaterial(agentid, filepath, 'video');
};
exports.addFile = function* (agentid, filepath) {
  return yield* this.addMaterial(agentid, filepath, 'file');
};

/**
 * 获取永久素材
 * 详情请见：<http://qydev.weixin.qq.com/wiki/index.php?title=%E8%8E%B7%E5%8F%96%E6%B0%B8%E4%B9%85%E7%B4%A0%E6%9D%90>
 * Examples:
 * ```
 * var ret = yield api.getMaterial(agentid, mediaId);
 * ```
 * - `result`, 调用正常时得到的文件Buffer对象
 *
 * @param {Integer} agentid 企业应用的id，整型。可在应用的设置页面查看
 * @param {String} mediaId 媒体文件的ID
 */
exports.getMaterial = function* (agentid, mediaId) {
  var token = yield* this.ensureAccessToken();
  var url = this.prefix + 'material/get?access_token=' + token.accessToken + '&agentid=' + agentid + '&media_id=' + mediaId;
  var opts = {
    timeout: 60000 // 60秒超时
  };
  return yield* this.request(url, opts);
};

/**
 * 删除永久素材
 * 详情请见：<http://qydev.weixin.qq.com/wiki/index.php?title=%E5%88%A0%E9%99%A4%E6%B0%B8%E4%B9%85%E7%B4%A0%E6%9D%90>
 * Examples:
 * ```
 * var ret = yield api.delMaterial(agentid, mediaId);
 * ```
 * - `result`,  {"errcode": 0, "errmsg": "deleted"}
 *
 * @param {Integer} agentid 企业应用的id，整型。可在应用的设置页面查看
 * @param {String} mediaId 媒体文件的ID
 */
exports.delMaterial = function* (agentid, mediaId) {
  var token = yield* this.ensureAccessToken();
  var url = this.prefix + 'material/del?access_token=' + token.accessToken + '&agentid=' + agentid + '&media_id=' + mediaId;
  var opts = {
    dataType: 'json'
  };
  return yield* this.request(url, opts);
};

/**
 * 获取素材总数
 * 详情请见：<http://qydev.weixin.qq.com/wiki/index.php?title=%E8%8E%B7%E5%8F%96%E7%B4%A0%E6%9D%90%E6%80%BB%E6%95%B0>
 * Examples:
 * ```
 * var ret = yield api.countMaterial(agentid);
 * ```
 * {
 *   "errcode": 0, 
 *   "errmsg": "ok",
 *   "total_count": 37, 
 *   "image_count": 12, 
 *   "voice_count": 10, 
 *   "video_count": 3, 
 *   "file_count": 3, 
 *   "mpnews_count": 6
 * }
 *
 * @param {Integer} agentid 企业应用的id，整型。可在应用的设置页面查看
 */
exports.countMaterial = function* (agentid) {
  var token = yield* this.ensureAccessToken();
  var url = this.prefix + 'material/get_count?access_token=' + token.accessToken + '&agentid=' + agentid;
  var opts = {
    dataType: 'json'
  };
  return yield* this.request(url, opts);
};

/**
 * 获取素材列表
 * 详情请见：<http://qydev.weixin.qq.com/wiki/index.php?title=%E8%8E%B7%E5%8F%96%E7%B4%A0%E6%9D%90%E5%88%97%E8%A1%A8>
 * Examples:
 * ```
 * var ret = yield api.batchgetMaterial(agentid, type, offset, count);
 * ```
 * - `result`,  {"errcode": 0, "errmsg": "deleted"}
 *
 * @param {Integer} agentid 企业应用的id，整型。可在应用的设置页面查看
 * @param {String} type 素材类型，可以为图文(mpnews)、图片（image）、音频（voice）、视频（video）、文件（file） 
 * @param {String} offset 从该类型素材的该偏移位置开始返回，0表示从第一个素材 返回
 * @param {String} count 返回素材的数量，取值在1到50之间
 */
exports.batchgetMaterial = function* (agentid, type, offset, count) {
  var token = yield* this.ensureAccessToken();
  var url = this.prefix + 'material/batchget?access_token=' + token.accessToken;
  var data = {
    agentid: agentid,
    type: type,
    offset: offset || 0,
    count: count || 50,
  };
  return yield* this.request(url, postJSON(data));
};

/**
 * 上传图文消息内的图片
 * 详情请见：<http://qydev.weixin.qq.com/wiki/index.php?title=%E4%B8%8A%E4%BC%A0%E5%9B%BE%E6%96%87%E6%B6%88%E6%81%AF%E5%86%85%E7%9A%84%E5%9B%BE%E7%89%87>
 * 用于上传图片到企业号服务端，接口返回图片url，请注意，该url仅可用于图文消息的发送，且每个企业每天最多只能上传100张图片。
 * Examples:
 * ```
 * var ret = yield api.batchgetMaterial(agentid, type, offset, count);
 * ```
 * - `result`,  {"url": "http://shp.qpic.cn/mmocbiz/xxxxxxxxxxxxx/"}
 * @param {String} filepath 文件路径
 */
exports.uploadImgForMp = function* (filepath) {
  var token = yield* this.ensureAccessToken();
  var stat = yield fs.stat(filepath);

  var form = formstream();
  form.file('media', filepath, path.basename(filepath), stat.size);
  var url = this.prefix + 'media/uploadimg?access_token=' + token.accessToken;
  var opts = {
    dataType: 'json',
    type: 'POST',
    timeout: 60000, // 60秒超时
    headers: form.headers(),
    data: form
  };
  return yield* this.request(url, opts);
};