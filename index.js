// 微信企业号主动调用接口API
var API = require('./lib/api_common');
// 部门管理
API.mixin(require('./lib/api_department'));
// 媒体管理（上传、下载）
API.mixin(require('./lib/api_media'));
// 菜单管理
API.mixin(require('./lib/api_menu'));
// 消息发送
API.mixin(require('./lib/api_message'));
// 标签管理
API.mixin(require('./lib/api_tag'));
// 用户管理
API.mixin(require('./lib/api_user'));
// IP段查询
API.mixin(require('./lib/api_ip'));
// JS SDK
API.mixin(require('./lib/api_js'));
// 企业号应用
API.mixin(require('./lib/api_agent'));
// 通讯录批量操作接口
API.mixin(require('./lib/api_batch'));
// 永久素材管理接口
API.mixin(require('./lib/api_material'));
// 摇一摇接口
API.mixin(require('./lib/api_shake'));
// 企业会话接口
API.mixin(require('./lib/api_chat'));
// 企业号客服接口
API.mixin(require('./lib/api_kf'));

module.exports.API = API;

// 微信企业号第三方应用套件接口API
var SuiteAPI = require('./lib/api_suite_common');
// 第三方应用接口
SuiteAPI.mixin(require('./lib/api_suite_3ps'));
module.exports.SuiteAPI = SuiteAPI;
