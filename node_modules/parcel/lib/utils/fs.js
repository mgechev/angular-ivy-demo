"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

const promisify = require('./promisify');

const fs = require('fs');

const mkdirp = require('mkdirp');

exports.readFile = promisify(fs.readFile);
exports.writeFile = promisify(fs.writeFile);
exports.stat = promisify(fs.stat);
exports.readdir = promisify(fs.readdir);
exports.unlink = promisify(fs.unlink);

exports.realpath =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(function* (path) {
    const realpath = promisify(fs.realpath);

    try {
      path = yield realpath(path);
    } catch (e) {// do nothing
    }

    return path;
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.lstat = promisify(fs.lstat);

exports.exists = function (filename) {
  return new Promise(resolve => {
    fs.exists(filename, resolve);
  });
};

exports.mkdirp = promisify(mkdirp);