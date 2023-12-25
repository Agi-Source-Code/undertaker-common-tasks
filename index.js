"use strict";

var fs = require("fs");
var http = require("http");
var util = require("util");

var logger = require("gulplog");
var DefualtRegistry = require("undertaker-registry");

function CommonRegistry(opts) {
  DefualtRegistry.call(this);

  opts = opts || {};

  this.config = {
    port: opts.port || 8080,
    buildDir: opts.buildDir || "./build",
  };
}

util.inherits(CommonRegistry, DefualtRegistry);

CommonRegistry.prototype.init = function init(taker) {
  var port = this.config.port;
  var buildDir = this.config.buildDir;
  var exist = fs.existsSync(buildDir);

  if (exist) {
    throw new Error(
      "Cannot initialize undertaker-common-tasks registry. " +
        buildDir +
        " directory exists."
    );
  }
  taker.task("clean", function () {
    return [buildDir];
  });

  taker.task("serve", function (cb) {
    http.createServer(buildDir).listen(port, function () {
      logger.info("Server started at http://0.0.0.0: " + port);
      cb();
    });
  });
};

module.exports = CommonRegistry;
