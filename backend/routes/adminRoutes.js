const express = require("express");
const {
  adminLoginController,
  adminAddEmployeeController,
} = require("../controllers/adminControllers.js");
const router = express.Router();

router.route("/adminLogin").post(adminLoginController);
router.route("/addEmployee").post(adminAddEmployeeController);
module.exports = router;
