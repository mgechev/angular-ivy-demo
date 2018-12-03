"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

const localRequire = require('../utils/localRequire');

const loadPlugins = require('../utils/loadPlugins');

const postcss = require('postcss');

const semver = require('semver');

module.exports =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(function* (asset) {
    let config = yield getConfig(asset);

    if (!config) {
      return;
    }

    yield asset.parseIfNeeded();
    let res = yield postcss(config.plugins).process(asset.getCSSAst(), config);
    asset.ast.css = res.css;
    asset.ast.dirty = false;
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

function getConfig(_x2) {
  return _getConfig.apply(this, arguments);
}

function _getConfig() {
  _getConfig = (0, _asyncToGenerator2.default)(function* (asset) {
    let config = yield asset.getConfig(['.postcssrc', '.postcssrc.json', '.postcssrc.js', 'postcss.config.js'], {
      packageKey: 'postcss'
    });
    let enableModules = asset.options.rendition && asset.options.rendition.modules;

    if (!config && !asset.options.minify && !enableModules) {
      return;
    }

    config = config || {};

    if (typeof config !== 'object') {
      throw new Error('PostCSS config should be an object.');
    }

    let postcssModulesConfig = {
      getJSON: (filename, json) => asset.cssModules = json
    };

    if (config.plugins && config.plugins['postcss-modules']) {
      postcssModulesConfig = Object.assign(config.plugins['postcss-modules'], postcssModulesConfig);
      delete config.plugins['postcss-modules'];
    }

    config.plugins = yield loadPlugins(config.plugins, asset.name);

    if (config.modules || enableModules) {
      let postcssModules = yield localRequire('postcss-modules', asset.name);
      config.plugins.push(postcssModules(postcssModulesConfig));
    }

    if (asset.options.minify) {
      let _ref2 = yield Promise.all(['cssnano', 'cssnano/package.json'].map(name => localRequire(name, asset.name).catch(() => require(name)))),
          _ref3 = (0, _slicedToArray2.default)(_ref2, 2),
          cssnano = _ref3[0],
          version = _ref3[1].version;

      config.plugins.push(cssnano((yield asset.getConfig(['cssnano.config.js'])) || {
        // Only enable safe css transforms if cssnano < 4
        // See: https://github.com/parcel-bundler/parcel/issues/698
        // See: https://github.com/ben-eb/cssnano/releases/tag/v4.0.0-rc.0
        safe: semver.satisfies(version, '<4.0.0-rc')
      }));
    }

    config.from = asset.name;
    config.to = asset.name;
    return config;
  });
  return _getConfig.apply(this, arguments);
}