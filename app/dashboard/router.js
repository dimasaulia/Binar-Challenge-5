const express = require("express");
const router = express.Router();
const controllers = require("./controllers/controllers");

router.get("/", controllers.index);
router.get("/add", controllers.add);
router.get("/update", controllers.edit);

module.exports = router;
