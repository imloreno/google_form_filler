const fs = require("fs");

export class FileParser {
  path;
  content;
  constructor(path) {
    this.path = path;
  }

  // ----------------------------------- Methods
  parseFileContent() {
    return JSON.parse(this.#readFile());
  }
  #readFile() {
    const content = fs.readFileSync(this.path).toString();
    this.content = content;
  }

  // ----------------------------------- Getters and setters
  getPath = () => {
    return this.path;
  };
  setPath = (path) => {
    this.path = path;
  };
}
