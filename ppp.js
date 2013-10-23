var normalize = require('normalize-pathname');
module.exports = function pathPrefixProxy(prefix, denyUnproxied) {
  // normalize to always having no leading slash and 1 trailing slash
  prefix = normalize(prefix);
  function proxy(req, res, next) {
    req.path = req.path.replace(prefix, '/');
    req.proxied = true;
    req.app.handle(req, res, next);
  };
  proxy.denyUnproxied = function(req, res, next) {
    if (req.proxied) return next();
    res.send(403);
  };
  return proxy;
};
