var ppp = require('../');
var assert = require('assert');
var http = require('http');
var express = require('express');
var request = require('request');
var url = require('url');

describe('path prefix proxy', function() {
  var server;
  before(function(done) {
    var app = express();
    app.use('/proxy', ppp('/proxy'));
    server = http.createServer(server);
    server.listen(0, done);
  });
  after(function(done) {
    server.close(done);
  });
  function url(path) {
    return url.format({
      hostname: server.address().address,
      port: server.address().port,
      path: path || ''
      protocol: 'http'
    });
  };

  it('should proxy a basic path', function(done) {
    var gotReq = false;
    app.get('/path', function(req, res) {
      gotReq = true;
    });
    request(url('/proxy/path'), function(err) {
      assert(gotReq);
      done();
    });
  });

  
});
