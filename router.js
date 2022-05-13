const express = require("express");
const router = express.Router();

const dashboard = require("./app/dashboard/router");
const api = require("./app/api/router");
const user = require("./app/user/router");

router.use("/", dashboard);
router.use("/api", api);
router.use("/user", user);

module.exports = router;
