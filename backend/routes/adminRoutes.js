const express = require("express");
const {
  adminLoginController,
  adminAddEmployeeController,
  adminFetchEmployeeController,
  adminEditEmployeeController,
  adminChangeEmployeePasswordController,
  adminDeleteEmployeeController,
} = require("../controllers/adminControllers.js");
const { ensureAdminAuthentication } = require("../middleware/middleWare.js");
const router = express.Router();

router.route("/adminLogin").post(adminLoginController);
router
  .route("/addEmployee")
  .post(ensureAdminAuthentication, adminAddEmployeeController);
router
  .route("/fetchEmployee")
  .get(ensureAdminAuthentication, adminFetchEmployeeController);
router
  .route("/editEmployee")
  .put(ensureAdminAuthentication, adminEditEmployeeController);
router.route("/authenticateAdmin").get(ensureAdminAuthentication);
router
  .route("/changeEmployeePassword")
  .put(adminChangeEmployeePasswordController);
router
  .route("/deleteEmployee/:employeeId")
  .delete(adminDeleteEmployeeController);
module.exports = router;
