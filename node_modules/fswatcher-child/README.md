# FSWatcher child

[![Build Status](https://dev.azure.com/DeMoorJasper/fswatcher-child/_apis/build/status/DeMoorJasper.fswatcher-child)](https://dev.azure.com/DeMoorJasper/fswatcher-child/_build/latest?definitionId=1)

FSWatcher child is a wrapper around chokidar's FSWatcher to provide an error prone layer between your code and chokidar using a child process.

To get a reliable result in testing listen for the `ready` event, as the watcher will not be able to look for file changes during startup times.

## License

MIT
