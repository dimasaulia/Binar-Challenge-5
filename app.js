const express = require("express");
const router = require("./router");
const hbs = require("hbs");
const helper = require("./hbs");
const app = express();
require("dotenv").config();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use("/static", express.static("public"));
app.set("views", "views");
app.set("view engine", "hbs");

hbs.registerHelper("selected", helper.selected);
hbs.registerHelper("price", helper.price);
hbs.registerHelper("date", helper.date);

const PORT = 8080;
const ROUTER = require("./router");
const { options } = require("./router");

app.use("/", ROUTER);

app.listen(PORT, () => {
  console.log(`Server Is Running on Port ${PORT}`);
});
