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

//HTML ROUTES ======================
//-- home page
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

//-- notes page
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "notes.html")));

//API ROUTES ======================

//3) HANDLE REQUEST =============================

//4) CREATE SERVER

//5) LISTEN =====================================

app.listen(PORT, () =>
  console.log(`Listening on port http://localhost:${PORT}`)
);
