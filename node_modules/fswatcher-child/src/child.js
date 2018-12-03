const { FSWatcher } = require('chokidar');
const { errorToJson } = require('./errorUtils');
const optionsTransfer = require('./options');

let watcher;
function sendEvent(event, path) {
  process.send({
    event: event,
    path: path
  });
}

function handleError(e) {
  sendEvent('watcherError', errorToJson(e));
}

function init(options) {
  options = optionsTransfer.decode(options);
  watcher = new FSWatcher(options);
  watcher.on('all', sendEvent);
  sendEvent('ready');
}

function executeFunction(functionName, args) {
  try {
    watcher[functionName](...args);
  } catch (e) {
    handleError(e);
  }
}

process.on('message', (msg) => {
  switch (msg.type)  {
    case 'init':
      init(msg.options);
      break;
    case 'function':
      executeFunction(msg.name, msg.args);
      break;
    case 'die':
      process.exit();
      break;
    case 'emulate_error':
      throw new Error('this is an emulated error');
  }
});

process.on('error', handleError);
process.on('disconnect', () => {
  process.exit();
});
