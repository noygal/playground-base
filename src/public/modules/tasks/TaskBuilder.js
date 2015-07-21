import _npmParser from './NpmParser'

export default class TaskBuilder {
  constructor() {
    this.npmParser = new _npmParser();
  }
  processPath(projectPath) {
    var results = {
      npm : this.npmParser.parsePath(projectPath)
    }
    return results
  }
}
