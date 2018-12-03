const fork = require('child_process').fork;
const { EventEmitter } = require('events');
const { noop } = require('./utils');
const { jsonToError } = require('./errorUtils');
const Path = require('path');
const optionsTransfer = require('./options');

class Watcher extends EventEmitter {
  constructor(options = {}) {
    super();
    this.options = optionsTransfer.encode(options);
    this.watchedPaths = new Set();
    this.child = null;
    this.ready = false;
    this.readyQueue = [];

    this.on('ready', () => {
      this.ready = true;
      for (let func of this.readyQueue) {
        func();
      }
      this.readyQueue = [];
    });

    this.startchild();
  }

  startchild() {
    if (this.child) return;
    
    let filteredArgs = process.execArgv.filter(
      v => !/^--(debug|inspect)/.test(v)
    );

    let options = {
      execArgv: filteredArgs,
      env: process.env,
      cwd: process.cwd()
    };

    this.child = fork(Path.join(__dirname, 'child'), process.argv, options);

    if (this.watchedPaths.size > 0) {
      this.sendCommand('add', [Array.from(this.watchedPaths)]);
    }

    this.child.send({
      type: 'init',
      options: this.options
    });

    this.child.on('message', msg => this.handleEmit(msg.event, msg.path));
    this.child.on('error', noop);
    this.child.on('exit', () => this.handleClosed());
    // this.child.on('close', () => this.handleClosed());
  }

  handleClosed() {
    if (!this.closed) {
      // Restart the child
      this.child = null;
      this.ready = false;
      this.startchild();
    }

    this.emit('childDead');
  }

  handleEmit(event, data) {
    if (event === 'watcherError') {
      data = jsonToError(data);
    }

    this.emit(event, data);
  }

  sendCommand(func, args) {
    if (!this.ready) {
      return this.readyQueue.push(() => this.sendCommand(func, args));
    }

    this.child.send({
      type: 'function',
      name: func,
      args: args
    });
  }

  _addPath(path) {
    if (!this.watchedPaths.has(path)) {
      this.watchedPaths.add(path);
      return true;
    }
  }

  add(paths) {
    let added = false;
    if (Array.isArray(paths)) {
      for (let path of paths) {
        added = !added ? this._addPath(path) : true;
      }
    } else {
      added = this._addPath(paths);
    }
    if (added) this.sendCommand('add', [paths]);
  }

  unwatch(paths) {
    let removed = false;
    if (Array.isArray(paths)) {
      for (let p of paths) {
        removed = !removed ? this.watchedPaths.delete(p) : true;
      }
    } else {
      removed = this.watchedPaths.delete(paths);
    }
    if (removed) this.sendCommand('unwatch', [paths]);
  }

  getWatched() {
    let watchList = {};
    for (let path of this.watchedPaths) {
      let key = this.options.cwd ? Path.relative(this.options.cwd, path) : path;
      watchList[key || '.'] = [];
    }
    return watchList;
  }

  _closePath(path) {
    if (this.watchedPaths.has(path)) {
      this.watchedPaths.delete(path);
    }
    this.sendCommand('_closePath', [path]);
  }

  close() {
    this.closed = true;

    if (this.child) {
      this.child.kill();

      return new Promise(resolve => this.once('childDead', resolve));
    }
  }

  _emulateChildDead() {
    if (!this.child) {
      return;
    }

    this.child.send({
      type: 'die'
    });
  }

  _emulateChildError() {
    if (!this.child) {
      return;
    }

    this.child.send({
      type: 'emulate_error'
    });
  }
}

module.exports = Watcher;
