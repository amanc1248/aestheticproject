const express = require("express");
const {
  adminLoginController,
  adminAddEmployeeController,
  adminFetchEmployeeController,
  adminEditEmployeeController,
} = require("../controllers/adminControllers.js");
const router = express.Router();

router.route("/adminLogin").post(adminLoginController);
router.route("/addEmployee").post(adminAddEmployeeController);
router.route("/fetchEmployee").get(adminFetchEmployeeController);
router.route("/editEmployee").put(adminEditEmployeeController);
router.route("/changeEmployeePassword").put(changeEmployeePasswordController);
module.exports = router;
