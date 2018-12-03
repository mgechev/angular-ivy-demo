"use strict";

const chalk = require('chalk');

const readline = require('readline');

const prettyError = require('./utils/prettyError');

const emoji = require('./utils/emoji');

const _require = require('grapheme-breaker'),
      countBreaks = _require.countBreaks;

const stripAnsi = require('strip-ansi');

const ora = require('ora');

const WorkerFarm = require('./workerfarm/WorkerFarm');

const path = require('path');

const fs = require('fs');

class Logger {
  constructor(options) {
    this.lines = 0;
    this.spinner = null;
    this.setOptions(options);
  }

  setOptions(options) {
    this.logLevel = options && isNaN(options.logLevel) === false ? Number(options.logLevel) : 3;
    this.color = options && typeof options.color === 'boolean' ? options.color : chalk.supportsColor;
    this.chalk = new chalk.constructor({
      enabled: this.color
    });
    this.isTest = options && typeof options.isTest === 'boolean' ? options.isTest : process.env.NODE_ENV === 'test';
  }

  countLines(message) {
    return stripAnsi(message).split('\n').reduce((p, line) => {
      if (process.stdout.columns) {
        return p + Math.ceil((line.length || 1) / process.stdout.columns);
      }

      return p + 1;
    }, 0);
  }

  writeRaw(message) {
    this.stopSpinner();
    this.lines += this.countLines(message) - 1;
    process.stdout.write(message);
  }

  write(message, persistent = false) {
    if (this.logLevel > 3) {
      return this.verbose(message);
    }

    if (!persistent) {
      this.lines += this.countLines(message);
    }

    this.stopSpinner();

    this._log(message);
  }

  verbose(message) {
    if (this.logLevel < 4) {
      return;
    }

    let currDate = new Date();
    message = `[${currDate.toLocaleTimeString()}]: ${message}`;

    if (this.logLevel > 4) {
      if (!this.logFile) {
        this.logFile = fs.createWriteStream(path.join(process.cwd(), `parcel-debug-${currDate.toLocaleDateString()}@${currDate.toLocaleTimeString()}.log`));
      }

      this.logFile.write(stripAnsi(message) + '\n');
    }

    this._log(message);
  }

  log(message) {
    if (this.logLevel < 3) {
      return;
    }

    this.write(message);
  }

  persistent(message) {
    if (this.logLevel < 3) {
      return;
    }

    this.write(this.chalk.bold(message), true);
  }

  warn(err) {
    if (this.logLevel < 2) {
      return;
    }

    this._writeError(err, emoji.warning, this.chalk.yellow);
  }

  error(err) {
    if (this.logLevel < 1) {
      return;
    }

    this._writeError(err, emoji.error, this.chalk.red.bold);
  }

  success(message) {
    this.log(`${emoji.success}  ${this.chalk.green.bold(message)}`);
  }

  _writeError(err, emoji, color) {
    let _prettyError = prettyError(err, {
      color: this.color
    }),
        message = _prettyError.message,
        stack = _prettyError.stack;

    this.write(color(`${emoji}  ${message}`));

    if (stack) {
      this.write(stack);
    }
  }

  clear() {
    if (!this.color || this.isTest || this.logLevel > 3) {
      return;
    }

    while (this.lines > 0) {
      readline.clearLine(process.stdout, 0);
      readline.moveCursor(process.stdout, 0, -1);
      this.lines--;
    }

    readline.cursorTo(process.stdout, 0);
    this.stopSpinner();
  }

  progress(message) {
    if (this.logLevel < 3) {
      return;
    }

    if (this.logLevel > 3) {
      return this.verbose(message);
    }

    let styledMessage = this.chalk.gray.bold(message);

    if (!this.spinner) {
      this.spinner = ora({
        text: styledMessage,
        stream: process.stdout,
        enabled: this.isTest ? false : undefined // fall back to ora default unless we need to explicitly disable it.

      }).start();
    } else {
      this.spinner.text = styledMessage;
    }
  }

  stopSpinner() {
    if (this.spinner) {
      this.spinner.stop();
      this.spinner = null;
    }
  }

  handleMessage(options) {
    this[options.method](...options.args);
  }

  _log(message) {
    console.log(message);
  }

  table(columns, table) {
    // Measure column widths
    let colWidths = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = table[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        let row = _step.value;
        let i = 0;
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = row[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            let item = _step3.value;
            colWidths[i] = Math.max(colWidths[i] || 0, stringWidth(item));
            i++;
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
      } // Render rows

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

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = table[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        let row = _step2.value;
        let items = row.map((item, i) => {
          // Add padding between columns unless the alignment is the opposite to the
          // next column and pad to the column width.
          let padding = !columns[i + 1] || columns[i + 1].align === columns[i].align ? 4 : 0;
          return pad(item, colWidths[i] + padding, columns[i].align);
        });
        this.log(items.join(''));
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
  }

} // Pad a string with spaces on either side


function pad(text, length, align = 'left') {
  let pad = ' '.repeat(length - stringWidth(text));

  if (align === 'right') {
    return pad + text;
  }

  return text + pad;
} // Count visible characters in a string


function stringWidth(string) {
  return countBreaks(stripAnsi('' + string));
} // If we are in a worker, make a proxy class which will
// send the logger calls to the main process via IPC.
// These are handled in WorkerFarm and directed to handleMessage above.


if (WorkerFarm.isWorker()) {
  class LoggerProxy {}

  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = Object.getOwnPropertyNames(Logger.prototype)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      let method = _step4.value;

      LoggerProxy.prototype[method] = (...args) => {
        WorkerFarm.callMaster({
          location: __filename,
          method,
          args
        }, false);
      };
    }
  } catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
        _iterator4.return();
      }
    } finally {
      if (_didIteratorError4) {
        throw _iteratorError4;
      }
    }
  }

  module.exports = new LoggerProxy();
} else {
  module.exports = new Logger();
}