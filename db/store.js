const fs = require("fs");
const util = require("util");
const { v4: uuidv4 } = require("uuid");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
  readNotes() {
    return readFileAsync("db/db.json", "utf-8");
  }

  writeNote(notes) {
    return writeFileAsync("db/db.json", JSON.stringify(notes));
  }

  getNotes() {
    return this.readNotes().then((result) => {
      let parsedNotes;
      try {
        parsedNotes = [...JSON.parse(result)];
      } catch (err) {
        parsedNotes = [];
      }
      return parsedNotes;
    });
  }

  addNote(note) {
    const newNote = { id: uuidv4(), title: note.title, text: note.text };
    return this.getNotes()
      .then((notes) => [...notes, newNote])
      .then((updatedNotes) => this.writeNote(updatedNotes))
      .then(() => newNote);
  }

  deleteNote(id) {
    return this.getNotes()
      .then((notes) => notes.filter((note) => note.id !== id))
      .then((filteredNotes) => this.writeNote(filteredNotes));
  }
}

module.exports = new Store();
