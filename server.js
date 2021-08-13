//1) PACKAGE/HTTP ===============================
const express = require("express");
const path = require("path");
// fs is a Node standard library package for reading and writing files
const fs = require("fs");
//https://www.npmjs.com/package/uniquid
const uniquid = require("uniquid");
//setup the Express app:
const app = express();

//2) PORT  ======================================
//(dynamic for heroku)
const PORT = process.env.PORT || 3000;
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// public folder middleware
app.use(express.static("public"));

//DATA ========================
const notes = [];
// const notes = [
//   {
//     title: "Express Server",
//     text: "1st step, get my Express Server setup. require('expres') is needed.",
//   },
//   {
//     title: "HTML Routes",
//     text: "Add html routes. There are 2, index.html and notes.html",
//   },
//   {
//     title: "API Routes",
//     text: "Add API routes. There will be 2 needed: GET /api/notes & POST /api/notes",
//   },
//   {
//     title: "__dirname Dependency",
//     text: "require('path') to use on path.join(__dirname..",
//   },
//   {
//     title: "Express Data Parsing.",
//     text: "Make sure to do app.use(express.. for both urlencoded & json.",
//   },
// ];

//3) HANDLE REQUEST =============================
//with Express, this is the callback function inside the .get

//HTML ROUTES ======================
//-- home page
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

//-- notes page
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/notes.html"))
);

//API ROUTES ======================
//-- /api/notes GET
app.get("/api/notes", (req, res) => {
  let rawData = fs.readFileSync("./db/db.json", "utf8");
  let notesData = JSON.parse(rawData);
  console.log("app.get /api/notes -----");
  console.log(notesData);
  res.json(notesData);
});

//-- /api/notes POST
app.post("/api/notes", (req, res) => {
  // req.body is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  /* Instead of this using code array, trying with writeFileSync
  const newNote = req.body;

  console.log(newNote.title, newNote.text);

  notes.push(newNote);
  res.json(newNote);
  */
  //must read file 1st and parse out its data in order to add new data to it:
  let rawData = fs.readFileSync("./db/db.json", "utf8");
  let notesData = JSON.parse(rawData);
  console.log("app.post /api/notes -----");
  console.log("notesData, parsed from file -----");
  console.log(notesData);
  //this gets the new data
  const newNoteData = req.body;
  console.log("newNoteData -----");
  console.log(newNoteData);

  //uniquid() usage/example:
  //uniquid(); // atquj2qdjig4
  //this uses uniquid package to generate a unique id assigning it as a property named id to the new data
  console.log("uniquid()");
  console.log(uniquid());
  newNoteData.id = uniquid();
  console.log("newNoteData[0].id unique id:");
  console.log(newNoteData.id);

  //this adds the new data to what was in file
  notesData.push(newNoteData);
  let newNotesData = JSON.stringify(notesData);
  fs.writeFileSync("./db/db.json", newNotesData);

  console.log("app.post /api/notes -----");
  console.log(newNotesData);
  //refreshes response with all the data that now includes new note
  res.json(newNotesData);
});

//4) CREATE SERVER ==============================
//Since using Express, this is app = express()

//5) LISTEN =====================================

app.listen(PORT, () =>
  console.log(`Listening on port http://localhost:${PORT}`)
);
