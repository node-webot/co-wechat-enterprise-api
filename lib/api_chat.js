var util = require('./util');
var querystring = require('querystring');
var postJSON = util.postJSON;

/**
 * 创建会话
 * 详细请看：http://qydev.weixin.qq.com/wiki/index.php?title=%E4%BC%81%E4%B8%9A%E4%BC%9A%E8%AF%9D%E6%8E%A5%E5%8F%A3%E8%AF%B4%E6%98%8E
 *
 * Examples:
 * ```
 * var result = yield api.createChat(chatid, name, owner, userlist);
 * ```
 * @param {String} chatid 会话id。字符串类型，最长32个字符。只允许字符0-9及字母a-zA-Z, 如果值内容为64bit无符号整型：要求值范围在[1, 2^63)之间，[2^63, 2^64)为系统分配会话id区间
 * @param {String} name 会话标题
 * @param {String} owner 管理员userid，必须是该会话userlist的成员之一
 * @param {Array} userlist 会话成员列表，成员用userid来标识。会话成员必须在3人或以上，1000人以下
 */
exports.createChat = function* (chatid, name, owner, userlist) {
  var token = yield* this.ensureAccessToken();
  var url = this.prefix + 'chat/create?access_token=' + token.accessToken;
  var data = {
  	chatid: chatid,
  	name: name,
  	owner: owner,
  	userlist: userlist,
  };
  return yield* this.request(url, postJSON(data));
};

/**
 * 获取会话
 *
 * Examples:
 * ```
 * var result = yield api.getChat(chatid);
 * ```
 * @param {Number} chatid 成员ID
 */
exports.getChat = function* (chatid) {
  var token = yield* this.ensureAccessToken();
  var url = this.prefix + 'chat/get?access_token=' + token.accessToken + '&chatid=' + chatid;
  var opts = {dataType: 'json'};
  return yield* this.request(url, opts);
};

/**
 * 更新会话
 *
 * Examples:
 * ```
 * var result = yield api.updateChat(chatid, op_user, name, owner, add_user_list, del_user_list);
 * ```
 * @param {Number} chatid 成员ID
 */
exports.updateChat = function* (chatid, op_user, name, owner, add_user_list, del_user_list) {
  var token = yield* this.ensureAccessToken();
  var url = this.prefix + 'chat/update?access_token=' + token.accessToken;
  var data = {
  	chatid: chatid,
  	op_user: op_user
  };
  if (name) {
  	data.name = name;
  }
  if (add_user_list && add_user_list.length) {
  	data.add_user_list = add_user_list;
  }
  if (del_user_list && del_user_list.length) {
  	data.del_user_list = del_user_list;
  }
  return yield* this.request(url, postJSON(data));
};

/**
 * 退出会话
 *
 * Examples:
 * ```
 * var result = yield api.quitChat(chatid, op_user);
 * ```
 * @param {Number} chatid 成员ID
 */
exports.quitChat = function* (chatid, op_user) {
  var token = yield* this.ensureAccessToken();
  var url = this.prefix + 'chat/quit?access_token=' + token.accessToken;
  var data = {
  	chatid: chatid,
  	op_user: op_user
  };
  return yield* this.request(url, postJSON(data));
};

/**
 * 清除会话未读状态
 *
 * Examples:
 * ```
 * var result = yield api.clearnotifyChat(op_user, chat);
 * ```
 * @param {Number} chatid 成员ID
 */
exports.clearnotifyChat = function* (op_user, chat) {
  var token = yield* this.ensureAccessToken();
  var url = this.prefix + 'chat/clearnotify?access_token=' + token.accessToken;
  var data = {
  	chat: chat,
  	op_user: op_user
  };
  return yield* this.request(url, postJSON(data));
};

/**
 * 发送消息（文本）
 *
 * Examples:
 * ```
 * var result = yield api.sendTextChat(type, receiver, sender, text);
 * ```
 * @param {String} type 接收人类型：single|group，分别表示：群聊|单聊
 * @param {String} receiver 接收人
 * @param {String} sender 发送人
 * @param {String} text 消息内容
 */
exports.sendTextChat = function* (type, receiver, sender, text) {
  var token = yield* this.ensureAccessToken();
  var url = this.prefix + 'chat/send?access_token=' + token.accessToken;
  var data = {
  	receiver: {
  		type: type,
  		id: receiver
  	},
  	sender: sender,
  	msgtype: "text",
  	text: {
  		content: text
  	}
  };
  return yield* this.request(url, postJSON(data));
};

/**
 * 发送消息（图片）
 *
 * Examples:
 * ```
 * var result = yield api.sendImageChat(type, receiver, sender, media_id);
 * ```
 * @param {String} type 接收人类型：single|group，分别表示：群聊|单聊
 * @param {String} receiver 接收人
 * @param {String} sender 发送人
 * @param {String} media_id 消息内容
 */
exports.sendImageChat = function* (type, receiver, sender, media_id) {
  var token = yield* this.ensureAccessToken();
  var url = this.prefix + 'chat/send?access_token=' + token.accessToken;
  var data = {
  	receiver: {
  		type: type,
  		id: receiver
  	},
  	sender: sender,
  	msgtype: "image",
  	image: {
  		media_id: media_id
  	}
  };
  return yield* this.request(url, postJSON(data));
};

/**
 * 发送消息（文件）
 *
 * Examples:
 * ```
 * var result = yield api.sendFileChat(type, receiver, sender, media_id);
 * ```
 * @param {String} type 接收人类型：single|group，分别表示：群聊|单聊
 * @param {String} receiver 接收人
 * @param {String} sender 发送人
 * @param {String} media_id 消息内容
 */
exports.sendFileChat = function* (type, receiver, sender, media_id) {
  var token = yield* this.ensureAccessToken();
  var url = this.prefix + 'chat/send?access_token=' + token.accessToken;
  var data = {
  	receiver: {
  		type: type,
  		id: receiver
  	},
  	sender: sender,
  	msgtype: "file",
  	file: {
  		media_id: media_id
  	}
  };
  return yield* this.request(url, postJSON(data));
};

/**
 * 发送消息（语音）
 *
 * Examples:
 * ```
 * var result = yield api.sendVoiceChat(type, receiver, sender, media_id);
 * ```
 * @param {String} type 接收人类型：single|group，分别表示：群聊|单聊
 * @param {String} receiver 接收人
 * @param {String} sender 发送人
 * @param {String} media_id 消息内容
 */
exports.sendVoiceChat = function* (type, receiver, sender, media_id) {
  var token = yield* this.ensureAccessToken();
  var url = this.prefix + 'chat/send?access_token=' + token.accessToken;
  var data = {
  	receiver: {
  		type: type,
  		id: receiver
  	},
  	sender: sender,
  	msgtype: "voice",
  	voice: {
  		media_id: media_id
  	}
  };
  return yield* this.request(url, postJSON(data));
};

/**
 * 设置成员新消息免打扰
 *
 * Examples:
 * ```
 * var result = yield api.setmuteChat(user_mute_list);
 * ```
 * @param {Array} user_mute_list 成员新消息免打扰参数，数组，最大支持10000个成员
 */
exports.setmuteChat = function* (user_mute_list) {
  var token = yield* this.ensureAccessToken();
  var url = this.prefix + 'chat/setmute?access_token=' + token.accessToken;
  var data = {
  	user_mute_list: user_mute_list,
  };
  return yield* this.request(url, postJSON(data));
};

exports.wx_emotion = util.wx_emotion;
