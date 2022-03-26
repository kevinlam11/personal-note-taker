const fs = require("fs");
const util = require("util");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
  readNotes() {
    return readFileAsync("db/db.json", "utf-8");
  }

  writeNote(note) {
    return readFileAsync("db/db.json", JSON.stringify(note));
  }

  getNotes() {
    return this.readNotes().then((result) => {
      return JSON.parse(result);
    });
  }
}

module.exports = new Store();
