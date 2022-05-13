const express = require("express");
const router = express.Router();
const controllers = require("./controllers/controllers");

router.get("/list", controllers.list);
router.post("/signup", controllers.create);
router.post("/login", controllers.login);
module.exports = router;
