const fs = require("fs");

class FileParser {
  path;
  constructor(path) {
    this.path = path;
  }

  // ----------------------------------- Methods
  parseFileContent() {
    return JSON.parse(this.#readFile());
  }
  #readFile() {
    let data;
    try {
      data = fs.readFileSync(this.path, "utf8");
    } catch (err) {
      console.error(err);
    }

    return data;
  }

  // ----------------------------------- Getters and setters
  getPath = () => {
    return this.path;
  };
  setPath = (path) => {
    this.path = path;
  };
}

exports.FileParser = FileParser;
