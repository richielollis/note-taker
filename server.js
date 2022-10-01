const express = require("express");
const path = require("path");
const fs = require("fs");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

function loadNotes() {
  return JSON.parse(
    fs.readFileSync("./db/db.json", "utf8", function (err, data) {
      if (err) {
        return;
      }
      return data;
    })
  );
}

function newNote(note) {
  const notes = loadNotes();
  note.id = notes.length.toString();
  notes.push(note);
  fs.writeFileSync(
    path.join(__dirname, "./db/db.json"),
    JSON.stringify(notes, null, 2),
    (err) => {
      if (err) throw err;
    }
  );
}

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  return res.json(loadNotes());
});

app.post("/api/notes", (req, res) => {
  newNote(req.body);
  res.end();
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.delete("/api/notes/:id", (req, res) => {
  let id = req.params.id;
  let notes = loadNotes();
  notes.splice(id, 1);
  for (let i = 0; i < notes.length; i++) {
    notes[i].id = i.toString();
  }
  fs.writeFileSync(
    __dirname + "/db/db.json",
    JSON.stringify(notes, null, 2),
    (err) => {
      if (err) throw err;
    }
  );

  res.end();
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
