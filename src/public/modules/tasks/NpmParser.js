import path from 'path'

export class NpmParser {
  constructor() {

  }
  parsePath(projectPath) {
    try {
      return this._processPackage(require(path.join(projectPath, 'package.json')), projectPath)
    } catch (error) {
      return null
    }
  }
  _processPackage(pack, projectPath) {
    if (!path.scripts) return null
    return Object.keys(path.scripts).map((key) => {
      return {
        name: key,
        cmd : path.join(projectPath, 'npm run ' + key)
      }
    })
  }
}
