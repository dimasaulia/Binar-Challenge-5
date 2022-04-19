const express = require("express");
const router = express.Router();

const dashboard = require("./app/dashboard/router");
const api = require("./app/api/router");

router.use("/", dashboard);
router.use("/api", api);

module.exports = router;
