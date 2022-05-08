const express = require("express");
const {
  adminLoginController,
  adminAddEmployeeController,
  adminFetchEmployeeController,
  adminEditEmployeeController,
  adminChangeEmployeePasswordController,
  adminDeleteEmployeeController,
  adminLogoutController,
  checkAdminLoginStatus,
  adminEmployeeByIdController,
} = require("../controllers/adminControllers.js");
const {
  ensureAdminAuthentication,
  smtpVerify,
} = require("../middleware/middleWare.js");
const router = express.Router();

router.route("/adminLogin").post(adminLoginController);
router.route("/adminLoginStatus").get(checkAdminLoginStatus);
router
  .route("/addEmployee")
  .post(ensureAdminAuthentication, smtpVerify, adminAddEmployeeController);
router
  .route("/fetchEmployee")
  .get(ensureAdminAuthentication, adminFetchEmployeeController);
router
  .route("/fetchEmployeeById/:id")
  .get(ensureAdminAuthentication, adminEmployeeByIdController);
router
  .route("/editEmployee")
  .put(ensureAdminAuthentication, smtpVerify, adminEditEmployeeController);
router
  .route("/changeEmployeePassword")
  .put(ensureAdminAuthentication, adminChangeEmployeePasswordController);
router
  .route("/deleteEmployee/:employeeId")
  .delete(ensureAdminAuthentication, adminDeleteEmployeeController);
router.route("/logout").get(adminLogoutController);
module.exports = router;
