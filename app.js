const express = require("express");
const router = require("./router");
const app = express();
require("dotenv").config();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use("/static", express.static("public"));
app.set("views", "views");
app.set("view engine", "hbs");

const hbs = require("hbs");
hbs.registerHelper("selected", function (a, b, options) {
  if (a.toLowerCase() === b.toLowerCase())
    return new hbs.SafeString(`selected`);
});

const PORT = process.env.PORT || 8080;
const ROUTER = require("./router");
const { options } = require("./router");

app.use("/", ROUTER);

app.listen(PORT, () => {
  console.log(`Server Is Running on Port ${PORT}`);
});
