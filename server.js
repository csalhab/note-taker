//1) PACKAGE/HTTP ===============================
const express = require("express");
const path = require("path");
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
const notes = [
  {
    title: "Express Server",
    text: "1st step, get my Express Server setup. require('expres') is needed.",
  },
  {
    title: "HTML Routes",
    text: "Add html routes. There are 2, index.html and notes.html",
  },
  {
    title: "API Routes",
    text: "Add API routes. There will be 2 needed: GET /api/notes & POST /api/notes",
  },
  {
    title: "__dirname Dependency",
    text: "require('path') to use on path.join(__dirname..",
  },
  {
    title: "Express Data Parsing.",
    text: "Make sure to do app.use(express.. for both urlencoded & json.",
  },
];

//3) HANDLE REQUEST =============================

//HTML ROUTES ======================
//-- home page
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

//-- notes page
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/notes.html"))
);

//API ROUTES ======================
//-- /api/notes GET
app.get("/api/notes", (req, res) => res.json(notes));

//-- /api/notes POST
app.post("/api/notes", (req, res) => {
  // req.body is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  const newNote = req.body;

  console.log(newNote.title, newNote.text);

  notes.push(newNote);
  res.json(newNote);
});

//4) CREATE SERVER ==============================
//Since using Express, this is app = express()

//5) LISTEN =====================================

app.listen(PORT, () =>
  console.log(`Listening on port http://localhost:${PORT}`)
);
