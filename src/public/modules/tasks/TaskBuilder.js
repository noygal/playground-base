import _npmParser from './NpmParser'
import _gulpParser from './GulpParser'

export default class TaskBuilder {
  constructor() {
    this.npmParser = new _npmParser();
    this.gulpParser = new _gulpParser();
  }
  processPath(projectPath) {
    var results = {
      npm : this.npmParser.parsePath(projectPath),
      gulp : this.gulpParser.parsePath(projectPath)
    }
    return results
  }
}
