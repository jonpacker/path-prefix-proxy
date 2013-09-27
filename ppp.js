var normalize = require('normalize-pathname');
module.exports = function pathPrefixProxy(prefix) {
  // normalize to always having no leading slash and 1 trailing slash
  prefix = normalize(prefix);
  return function(req, res, next) {
    req.path = req.path.replace(prefix, '/');
    req.app.handle(req, res, next);
  };
};
