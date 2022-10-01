const express = require("express");
const path = require("path");
const fs = require("fs");

// console.log(notes);

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

function loadNotes() {
  return JSON.parse(
    fs.readFileSync("./db/db.json", "utf8", function (err, data) {
      return data;
    })
  );
}

// function newNote(notes) {}

app.get("/notes", (req, res) => {
  loadNotes();
  console.log(typeof loadNotes());
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  res.json(loadNotes());
});

app.post("/api/notes", (req, res) => {
  if (!req.body.title || !req.body.text) {
    res.status(400).send("Note title is required.");
    return;
  }
  res.status(200);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
