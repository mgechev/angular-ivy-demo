"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

const _require = require('events'),
      EventEmitter = _require.EventEmitter;

const errorUtils = require('./errorUtils');

const Worker = require('./Worker');

const cpuCount = require('../utils/cpuCount');

let shared = null;

class WorkerFarm extends EventEmitter {
  constructor(options, farmOptions = {}) {
    super();
    this.options = Object.assign({
      maxConcurrentWorkers: WorkerFarm.getNumWorkers(),
      maxConcurrentCallsPerWorker: WorkerFarm.getConcurrentCallsPerWorker(),
      forcedKillTime: 500,
      warmWorkers: true,
      useLocalWorker: true,
      workerPath: '../worker'
    }, farmOptions);
    this.warmWorkers = 0;
    this.workers = new Map();
    this.callQueue = [];
    this.localWorker = require(this.options.workerPath);
    this.run = this.mkhandle('run');
    this.init(options);
  }

  warmupWorker(method, args) {
    // Workers are already stopping
    if (this.ending) {
      return;
    } // Workers are not warmed up yet.
    // Send the job to a remote worker in the background,
    // but use the result from the local worker - it will be faster.


    let promise = this.addCall(method, [...args, true]);

    if (promise) {
      promise.then(() => {
        this.warmWorkers++;

        if (this.warmWorkers >= this.workers.size) {
          this.emit('warmedup');
        }
      }).catch(() => {});
    }
  }

  shouldStartRemoteWorkers() {
    return this.options.maxConcurrentWorkers > 1 || process.env.NODE_ENV === 'test' || !this.options.useLocalWorker;
  }

  mkhandle(method) {
    return (...args) => {
      // Child process workers are slow to start (~600ms).
      // While we're waiting, just run on the main thread.
      // This significantly speeds up startup time.
      if (this.shouldUseRemoteWorkers()) {
        return this.addCall(method, [...args, false]);
      } else {
        if (this.options.warmWorkers && this.shouldStartRemoteWorkers()) {
          this.warmupWorker(method, args);
        }

        return this.localWorker[method](...args, false);
      }
    };
  }

  onError(error, worker) {
    // Handle ipc errors
    if (error.code === 'ERR_IPC_CHANNEL_CLOSED') {
      return this.stopWorker(worker);
    }
  }

  startChild() {
    let worker = new Worker(this.options);
    worker.fork(this.options.workerPath, this.bundlerOptions);
    worker.on('request', data => this.processRequest(data, worker));
    worker.on('ready', () => this.processQueue());
    worker.on('response', () => this.processQueue());
    worker.on('error', err => this.onError(err, worker));
    worker.once('exit', () => this.stopWorker(worker));
    this.workers.set(worker.id, worker);
  }

  stopWorker(worker) {
    var _this = this;

    return (0, _asyncToGenerator2.default)(function* () {
      if (!worker.stopped) {
        _this.workers.delete(worker.id);

        worker.isStopping = true;

        if (worker.calls.size) {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = worker.calls.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              let call = _step.value;
              call.retries++;

              _this.callQueue.unshift(call);
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        }

        worker.calls = null;
        yield worker.stop(); // Process any requests that failed and start a new worker

        _this.processQueue();
      }
    })();
  }

  processQueue() {
    var _this2 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      if (_this2.ending || !_this2.callQueue.length) return;

      if (_this2.workers.size < _this2.options.maxConcurrentWorkers) {
        _this2.startChild();
      }

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = _this2.workers.values()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          let worker = _step2.value;

          if (!_this2.callQueue.length) {
            break;
          }

          if (!worker.ready || worker.stopped || worker.isStopping) {
            continue;
          }

          if (worker.calls.size < _this2.options.maxConcurrentCallsPerWorker) {
            worker.call(_this2.callQueue.shift());
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    })();
  }

  processRequest(data, worker = false) {
    return (0, _asyncToGenerator2.default)(function* () {
      let result = {
        idx: data.idx,
        type: 'response'
      };
      let method = data.method;
      let args = data.args;
      let location = data.location;
      let awaitResponse = data.awaitResponse;

      if (!location) {
        throw new Error('Unknown request');
      }

      const mod = require(location);

      try {
        result.contentType = 'data';

        if (method) {
          result.content = yield mod[method](...args);
        } else {
          result.content = yield mod(...args);
        }
      } catch (e) {
        result.contentType = 'error';
        result.content = errorUtils.errorToJson(e);
      }

      if (awaitResponse) {
        if (worker) {
          worker.send(result);
        } else {
          return result;
        }
      }
    })();
  }

  addCall(method, args) {
    if (this.ending) {
      throw new Error('Cannot add a worker call if workerfarm is ending.');
    }

    return new Promise((resolve, reject) => {
      this.callQueue.push({
        method,
        args: args,
        retries: 0,
        resolve,
        reject
      });
      this.processQueue();
    });
  }

  end() {
    var _this3 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      _this3.ending = true;
      yield Promise.all(Array.from(_this3.workers.values()).map(worker => _this3.stopWorker(worker)));
      _this3.ending = false;
      shared = null;
    })();
  }

  init(bundlerOptions) {
    this.bundlerOptions = bundlerOptions;

    if (this.shouldStartRemoteWorkers()) {
      this.persistBundlerOptions();
    }

    this.localWorker.init(bundlerOptions);
    this.startMaxWorkers();
  }

  persistBundlerOptions() {
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = this.workers.values()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        let worker = _step3.value;
        worker.init(this.bundlerOptions);
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
          _iterator3.return();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }
  }

  startMaxWorkers() {
    // Starts workers untill the maximum is reached
    if (this.workers.size < this.options.maxConcurrentWorkers) {
      for (let i = 0; i < this.options.maxConcurrentWorkers - this.workers.size; i++) {
        this.startChild();
      }
    }
  }

  shouldUseRemoteWorkers() {
    return !this.options.useLocalWorker || this.warmWorkers >= this.workers.size || !this.options.warmWorkers;
  }

  static getShared(options) {
    if (!shared) {
      shared = new WorkerFarm(options);
    } else if (options) {
      shared.init(options);
    }

    if (!shared && !options) {
      throw new Error('Workerfarm should be initialised using options');
    }

    return shared;
  }

  static getNumWorkers() {
    return process.env.PARCEL_WORKERS ? parseInt(process.env.PARCEL_WORKERS, 10) : cpuCount();
  }

  static callMaster(request, awaitResponse = true) {
    if (WorkerFarm.isWorker()) {
      const child = require('./child');

      return child.addCall(request, awaitResponse);
    } else {
      return WorkerFarm.getShared().processRequest(request);
    }
  }

  static isWorker() {
    return process.send && require.main.filename === require.resolve('./child');
  }

  static getConcurrentCallsPerWorker() {
    return parseInt(process.env.PARCEL_MAX_CONCURRENT_CALLS, 10) || 5;
  }

}

module.exports = WorkerFarm;