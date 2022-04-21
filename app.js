const express = require("express");
const connectLiveReload = require("connect-livereload");
const session = require("express-session");
const flash = require("connect-flash");
const hbs = require("hbs");
const path = require("path");
const livereload = require("livereload");
const helper = require("./hbs");
const app = express();
require("dotenv").config();

const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "views"));
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

app.use(connectLiveReload());
app.use(
  session({
    secret: "geeksforgeeks",
    saveUninitialized: true,
    resave: true,
  })
);
app.use(flash());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use("/static", express.static("public"));
app.set("views", "views");
app.set("view engine", "hbs");

hbs.registerHelper("selected", helper.selected);
hbs.registerHelper("priceTag", helper.price);
hbs.registerHelper("date", helper.date);

const PORT = 8080;
const ROUTER = require("./router");
const { options } = require("./router");

app.use("/", ROUTER);

app.listen(PORT, () => {
  console.log(`Server Is Running on Port ${PORT}`);
});
