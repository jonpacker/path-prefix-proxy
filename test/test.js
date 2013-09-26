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
  function mkurl(path,query) {
    return url.format({
      hostname: 'localhost',
      port: server.address().port,
      pathname: path || '',
      protocol: 'http',
      query: query 
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

  it('should preserve the original path on the request', function(done) {
    app.get('/path', function(req, res) {
      assert(req.url == '/path')
      res.end();
    });
    request(mkurl('/proxy/path'), function(err) {
      assert(!err);
      done();
    });
  });

  it('should preserve the original path on the request with repeated prefix', function(done) {
    app.get('/proxy/path/proxy', function(req, res) {
      assert(req.url == '/proxy/path/proxy')
      res.end();
    });
    request(mkurl('/proxy/proxy/path/proxy'), function(err) {
      assert(!err);
      done();
    });
  });

  it('should preserve any query values', function(done) {
    app.get('/path', function(req, res) {
      assert(req.url == '/path?proxy=true')
      res.end();
    });
    request(mkurl('/proxy/path', 'proxy=true'), function(err) {
      assert(!err);
      done();
    });
  });

});
