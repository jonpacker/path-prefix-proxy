var ppp = require('../');
var assert = require('assert');
var http = require('http');
var express = require('express');
var request = require('request');
var url = require('url');

describe('path prefix proxy', function() {
  var server;
  var app;
  before(function(done) {
    app = express();
    app.use('/proxy', ppp('/proxy'));
    server = http.createServer(app);
    server.listen(0, done);
  });
  after(function(done) {
    server.close(done);
  });
  function mkurl(path) {
    return url.format({
      hostname: 'localhost',
      port: server.address().port,
      pathname: path || '',
      protocol: 'http'
    });
  };

  it('should proxy a basic path', function(done) {
    var gotReq = false;
    app.get('/path', function(req, res) {
      gotReq = true;
      res.end();
    });
    request(mkurl('/proxy/path'), function(err) {
      assert(gotReq);
      done();
    });
  });

  
});
