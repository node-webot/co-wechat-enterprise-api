var util = require('./util');
var postJSON = util.postJSON;
var querystring = require('querystring');

/**
 * 创建部门
 * 详细请看：http://qydev.weixin.qq.com/wiki/index.php?title=管理部门
 *
 * Examples:
 * ```
 * var result = yield api.createDepartment(name, opts);
 * ```
 * Opts:
 * - `parentid`, 父部门id，根部门id为1
 * - `order`，在父部门中的次序。从1开始，数字越大排序越靠后
 * - `id`，部门ID。用指定部门ID新建部门，不指定此参数时，则自动生成
 *
 * Result:
 * ```
 * {
 *  "errcode": 0,
 *  "errmsg": "created",
 *  "id": 2
 * }
 * ```
 * @param {String} name 部门名字
 * @param {Object} opts 选项
 */
exports.createDepartment = function* (name, opts) {
  // https://qyapi.weixin.qq.com/cgi-bin/department/create?access_token=ACCESS_TOKEN
  var token = yield * this.ensureAccessToken();
  
  var url = this.prefix + 'department/create?access_token=' + token.accessToken;
  var data = {
    name: name
  };
  if (typeof opts === 'object') {
    data.parentid = Number(opts.parentid) || 1;
    data.order = Number(opts.order) || 1;
    if (opts.id) {
      data.id = Number(opts.id);
    };
  } else {
    data.parentid = Number(opts);
  }

  return yield* this.request(url, postJSON(data));
};

/**
 * 更新部门
 *
 * Examples:
 * ```
 * var opts = {name: 'new name', parentid: 1, order: 5};
 * var result = yield api.updateDepartment(id, opts);
 * ```
 *
 * Opts:
 * - `name`, 新的部门名字。可选
 * - `parentid`, 父部门id，根部门id为1。可选
 * - `order`，在父部门中的次序。从1开始，数字越大排序越靠后。可选，默认为1
 *
 * Result:
 * ```
 * {
 *  "errcode": 0,
 *  "errmsg": "updated"
 * }
 * ```
 * @param {Number} id 部门ID
 * @param {Object} opts 选项
 */
exports.updateDepartment = function (id, opts) {
  // https://qyapi.weixin.qq.com/cgi-bin/department/update?access_token=ACCESS_TOKEN
  var token = yield * this.ensureAccessToken();
  var url = this.prefix + 'department/update?access_token=' + token.accessToken;
  var data = {
    id: Number(id)
  };
  if (typeof opts === 'object') {
    if (opts.name) {
      data.name = opts.name;
    }
    if (opts.parentid) {
      data.parentid = Number(opts.parentid);
    }
    if (opts.order) {
      data.order = Number(opts.order) || 1;
    }
  } else {
    data.name = opts;
  }
  return yield* this.request(url, postJSON(data));
};

/**
 * 删除部门
 *
 * Examples:
 * ```
 * var result = yield api.deleteDepartment(id);
 * var result = yield api.deleteDepartment([id1, id2]);
 * ```
 *
 * Result:
 * ```
 * {
 *  "errcode": 0,
 *  "errmsg": "deleted"
 * }
 * ```
 * @param {Number|Array} id 部门ID
 */
exports.deleteDepartment = function (id) {
  // https://qyapi.weixin.qq.com/cgi-bin/department/delete?access_token=ACCESS_TOKEN&id=1&id=2
  var token = yield * this.ensureAccessToken();
  var url = this.prefix + 'department/delete?access_token=' + token.accessToken;
  url += '&' + querystring.stringify({id: id});
  var opts = {dataType: 'json'};
  return yield* this.request(url, opts);
};

/**
 * 查看所有部门
 *
 * Examples:
 * ```
 * var result = yield api.getDepartments();
 * ```
 *
 * Result:
 * ```
 * {
 *  "errcode": 0,
 *  "errmsg": "ok",
 *  "department": [
 *    {
 *      "id": 1,
 *      "name": "广州研发中心",
 *      "parentid": 0
 *    },
 *    {
 *      "id": 2
 *      "name": "邮箱产品部",
 *      "parentid": 1
 *    }
 *  ]
 * }
 * ```
 */
exports.getDepartments = function (callback) {
  // https://qyapi.weixin.qq.com/cgi-bin/department/list?access_token=ACCESS_TOKEN
  var token = yield * this.ensureAccessToken();
  var url = this.prefix + 'department/list?access_token=' + token.accessToken;
  var opts = {dataType: 'json'};
  return yield* this.request(url, opts);
};
