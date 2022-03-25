const express = require("express");
const path = require("path");
const fs = 

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/index", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// app.get("/api/notes", (req, res) => res.json(db.json));
// app.post("/api/notes", (req, res) => res.json(db.json));



app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
