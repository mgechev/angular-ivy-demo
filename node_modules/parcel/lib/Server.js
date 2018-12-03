"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

const http = require('http');

const https = require('https');

const serveStatic = require('serve-static');

const getPort = require('get-port');

const serverErrors = require('./utils/customErrors').serverErrors;

const generateCertificate = require('./utils/generateCertificate');

const getCertificate = require('./utils/getCertificate');

const prettyError = require('./utils/prettyError');

const AnsiToHtml = require('ansi-to-html');

const logger = require('./Logger');

const path = require('path');

const url = require('url');

const ansiToHtml = new AnsiToHtml({
  newline: true
});
serveStatic.mime.define({
  'application/wasm': ['wasm']
});

function setHeaders(res) {
  enableCors(res);
}

function enableCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, PUT, PATCH, POST, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Content-Type');
}

function middleware(bundler) {
  const serve = serveStatic(bundler.options.outDir, {
    index: false,
    redirect: false,
    setHeaders: setHeaders
  });
  return function (req, res, next) {
    // Wait for the bundler to finish bundling if needed
    if (bundler.pending) {
      bundler.once('bundled', respond);
    } else {
      respond();
    }

    function respond() {
      let _url$parse = url.parse(req.url),
          pathname = _url$parse.pathname;

      if (bundler.error) {
        return send500(bundler.error);
      } else if (!pathname.startsWith(bundler.options.publicURL) || path.extname(pathname) === '') {
        // If the URL doesn't start with the public path, or the URL doesn't
        // have a file extension, send the main HTML bundle.
        return sendIndex();
      } else {
        // Otherwise, serve the file from the dist folder
        req.url = pathname.slice(bundler.options.publicURL.length);
        return serve(req, res, send404);
      }
    }

    function sendIndex() {
      // If the main asset is an HTML file, serve it
      if (bundler.mainBundle.type === 'html') {
        req.url = `/${path.basename(bundler.mainBundle.name)}`;
        serve(req, res, send404);
      } else {
        send404();
      }
    }

    function send500(error) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.writeHead(500);
      let errorMesssge = '<h1>🚨 Build Error</h1>';

      if (process.env.NODE_ENV === 'production') {
        errorMesssge += '<p><b>Check the console for details.</b></p>';
      } else {
        const _prettyError = prettyError(error, {
          color: true
        }),
              message = _prettyError.message,
              stack = _prettyError.stack;

        errorMesssge += `<p><b>${message}</b></p>`;

        if (stack) {
          errorMesssge += `<div style="background: black; padding: 1rem;">${ansiToHtml.toHtml(stack)}</div>`;
        }
      }

      res.end([`<!doctype html>`, `<head><title>🚨 Build Error</title></head>`, `<body style="font-family: monospace; white-space: pre;">${errorMesssge}</body>`].join(''));
    }

    function send404() {
      if (next) {
        return next();
      }

      res.writeHead(404);
      res.end();
    }
  };
}

function serve(_x, _x2) {
  return _serve.apply(this, arguments);
}

function _serve() {
  _serve = (0, _asyncToGenerator2.default)(function* (bundler, port, useHTTPS = false) {
    let handler = middleware(bundler);
    let server;

    if (!useHTTPS) {
      server = http.createServer(handler);
    } else if (typeof useHTTPS === 'boolean') {
      server = https.createServer(generateCertificate(bundler.options), handler);
    } else {
      server = https.createServer((yield getCertificate(useHTTPS)), handler);
    }

    let freePort = yield getPort({
      port
    });
    server.listen(freePort);
    return new Promise((resolve, reject) => {
      server.on('error', err => {
        logger.error(new Error(serverErrors(err, server.address().port)));
        reject(err);
      });
      server.once('listening', () => {
        let addon = server.address().port !== port ? `- ${logger.chalk.yellow(`configured port ${port} could not be used.`)}` : '';
        logger.persistent(`Server running at ${logger.chalk.cyan(`${useHTTPS ? 'https' : 'http'}://localhost:${server.address().port}`)} ${addon}`);
        resolve(server);
      });
    });
  });
  return _serve.apply(this, arguments);
}

exports.middleware = middleware;
exports.serve = serve;