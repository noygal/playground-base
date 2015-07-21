export class TaskRunner {
  constructor(cmd) {
    this._process = exec('cmd', {async:true}, (code, output) => {
      this.exitHandler(code)
    });
    this._process.stdout.on('data', (data) => {
      this.updateHandler(data)
    });
  }
  onConsoleUpdate(handler) {
    this.updateHandler = handler
    return this;
  }
  onError(handler) {
    this.errorHandler = handler
    return this;
  }
  onExit(handler) {
    this.exitHandler = handler
    return this;
  }
}
