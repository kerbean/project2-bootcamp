const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");

const app = express();


app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use(express.static('static'))

app.get("/index", function(req, res) {
  res.render("index");
});

app.listen(3000);
