var util = require('./util');
var postJSON = util.postJSON;

exports.createUser = function* (user) {
  var token = yield* this.ensureAccessToken();
  var url = this.prefix + 'user/create?access_token=' + token.accessToken;
  console.log(url);
  console.log(postJSON(user));
  return yield* this.request(url, postJSON(user));
};

exports.updateUser = function* (user) {
  var token = yield* this.ensureAccessToken();
  var url = this.prefix + 'user/update?access_token=' + token.accessToken;
  return yield* this.request(url, postJSON(user));
};

exports.deleteUser = function* (userid) {
  var token = yield* this.ensureAccessToken();
  var url = this.prefix + 'user/delete?access_token=' + token.accessToken + '&userid=' + userid;
  var opts = {dataType: 'json'};
  return yield* this.request(url, opts);
};

exports.getUser = function* (userid) {
  var token = yield* this.ensureAccessToken();
  var url = this.prefix + 'user/get?access_token=' + token.accessToken + '&userid=' + userid;
  var opts = {dataType: 'json'};
  return yield* this.request(url, opts);
};

exports.getDepartmentUsers = function* (departmentId, fetchChild, status) {
  var token = yield* this.ensureAccessToken();
  var url = this.prefix + 'user/simplelist?access_token=' + token.accessToken;
  var opts = {
    dataType: 'json',
    data: {
      department_id: departmentId,
      fetch_child: fetchChild,
      status: status
    }
  };
  return yield* this.request(url, opts);
};

exports.getDepartmentUsersDetail = function* (departmentId, fetchChild, status) {
  var token = yield* this.ensureAccessToken();
  var url = this.prefix + 'user/list?access_token=' + token.accessToken;
  var opts = {
    dataType: 'json',
    data: {
      department_id: departmentId,
      fetch_child: fetchChild,
      status: status
    }
  };
  return yield* this.request(url, opts);
};

exports.inviteUser = function* (userid, invite_tips) {
  var token = yield* this.ensureAccessToken();
  var url = this.prefix + 'invite/send?access_token=' + token.accessToken;
  var opts = {
    dataType: 'json',
    data: {
      userid: userid,
      invite_tips: invite_tips
    }
  };
  return yield* this.request(url, opts);
};

/**
 * [*getUserIdByCode description]
 * @param {String} code          OAuth返回的code
 * @param {String} agentid       应用的id
 * 
 */
exports.getUserIdByCode = function* (code, agentid) {
  var token = yield* this.ensureAccessToken();
  var url = this.prefix + 'user/getuserinfo?access_token=' + token.accessToken;
  var opts = {
    dataType: 'json',
    data: {
      code: code,
      agentid: agentid
    }
  };
  return yield* this.request(url, opts);
};

