import NpmParser from './NpmParser'

export class TaskBuilder {
  constructor() {
    this.npmParser = new npmParser();
  }
  processPath(projectPath) {
    var results = {
      npm : this.npmParser.processPath(projectPath)
    }
    return results
  }
}
