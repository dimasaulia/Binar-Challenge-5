const express = require("express");
const router = express.Router();
const controller = require("./controllers/controller");

router.get("/cars", controller.list);
router.get("/car/:id", controller.get);
router.post("/update/:id", controller.update);
router.post("/car", controller.create);
router.get("/delete/:id", controller.delete);
router.get("/filter/:size", controller.filter);

module.exports = router;
