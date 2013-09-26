var normalize = require('path').normalize;
module.exports = function pathPrefixProxy(prefix) {
  // normalize to always having no leading slash and 1 trailing slash
  prefix = normalize('/' + prefix).replace(/\/$/, "");
  return function(req, res, next) {
    req.path = req.path.replace(prefix, '/');
    req.app.handle(req, res, next);
  };
};
