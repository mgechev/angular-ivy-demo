"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

const errorUtils = require('./errorUtils');

class Child {
  constructor() {
    if (!process.send) {
      throw new Error('Only create Child instances in a worker!');
    }

    this.module = undefined;
    this.childId = undefined;
    this.callQueue = [];
    this.responseQueue = new Map();
    this.responseId = 0;
    this.maxConcurrentCalls = 10;
  }

  messageListener(data) {
    if (data === 'die') {
      return this.end();
    }

    let type = data.type;

    if (type === 'response') {
      return this.handleResponse(data);
    } else if (type === 'request') {
      return this.handleRequest(data);
    }
  }

  send(data) {
    var _this = this;

    return (0, _asyncToGenerator2.default)(function* () {
      process.send(data, err => {
        if (err && err instanceof Error) {
          if (err.code === 'ERR_IPC_CHANNEL_CLOSED') {
            // IPC connection closed
            // no need to keep the worker running if it can't send or receive data
            return _this.end();
          }
        }
      });
    })();
  }

  childInit(module, childId) {
    this.module = require(module);
    this.childId = childId;
  }

  handleRequest(data) {
    var _this2 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      let idx = data.idx;
      let child = data.child;
      let method = data.method;
      let args = data.args;
      let result = {
        idx,
        child,
        type: 'response'
      };

      try {
        result.contentType = 'data';

        if (method === 'childInit') {
          result.content = _this2.childInit(...args, child);
        } else {
          result.content = yield _this2.module[method](...args);
        }
      } catch (e) {
        result.contentType = 'error';
        result.content = errorUtils.errorToJson(e);
      }

      _this2.send(result);
    })();
  }

  handleResponse(data) {
    var _this3 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      let idx = data.idx;
      let contentType = data.contentType;
      let content = data.content;

      let call = _this3.responseQueue.get(idx);

      if (contentType === 'error') {
        call.reject(errorUtils.jsonToError(content));
      } else {
        call.resolve(content);
      }

      _this3.responseQueue.delete(idx); // Process the next call


      _this3.processQueue();
    })();
  } // Keep in mind to make sure responses to these calls are JSON.Stringify safe


  addCall(request, awaitResponse = true) {
    var _this4 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      let call = request;
      call.type = 'request';
      call.child = _this4.childId;
      call.awaitResponse = awaitResponse;
      let promise;

      if (awaitResponse) {
        promise = new Promise((resolve, reject) => {
          call.resolve = resolve;
          call.reject = reject;
        });
      }

      _this4.callQueue.push(call);

      _this4.processQueue();

      return promise;
    })();
  }

  sendRequest(call) {
    var _this5 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      let idx;

      if (call.awaitResponse) {
        idx = _this5.responseId++;

        _this5.responseQueue.set(idx, call);
      }

      _this5.send({
        idx: idx,
        child: call.child,
        type: call.type,
        location: call.location,
        method: call.method,
        args: call.args,
        awaitResponse: call.awaitResponse
      });
    })();
  }

  processQueue() {
    var _this6 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      if (!_this6.callQueue.length) {
        return;
      }

      if (_this6.responseQueue.size < _this6.maxConcurrentCalls) {
        _this6.sendRequest(_this6.callQueue.shift());
      }
    })();
  }

  end() {
    process.exit();
  }

}

let child = new Child();
process.on('message', child.messageListener.bind(child));
module.exports = child;