const express = require("express");
const { adminLoginController } = require("../controllers/adminControllers.js");
const router = express.Router();

router.route("/adminLogin").post(adminLoginController);
module.exports = router;
