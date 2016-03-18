/**
 * 企业号摇一摇周边－获取设备及用户信息
 * 详情请见：<http://qydev.weixin.qq.com/wiki/index.php?title=%E8%8E%B7%E5%8F%96%E8%AE%BE%E5%A4%87%E5%8F%8A%E7%94%A8%E6%88%B7%E4%BF%A1%E6%81%AF>
 * Examples:
 * ```
 * var result = yield api.getShakeinfo(ticket);
 * ```
 */
exports.getShakeinfo = function* (ticket) {
  var token = yield* this.ensureAccessToken();
  var url = this.prefix + 'shakearound/getshakeinfo?access_token=' + token.accessToken;
  var data = {
    ticket: ticket
  };
  return yield* this.request(url, postJSON(data));
};