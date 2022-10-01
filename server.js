const express = require("express");
const notes = require("./db/db.json");

console.log(notes);

const PORT = process.env.PORT || 3001;
const app = express();

app.get("/notes", (req, res) => {});

app.get("*", (req, res) => {});

app.get("/api/notes", (req, res) => {});

app.post("/api/notes", (req, res) => {});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
