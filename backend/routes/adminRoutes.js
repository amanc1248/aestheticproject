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
// router.route("/admin/ensureLogin").get(ensureAdminAuthentication);
router
  .route("/addEmployee")
  .post(ensureAdminAuthentication, adminAddEmployeeController);
router
  .route("/fetchEmployee")
  .get(ensureAdminAuthentication, adminFetchEmployeeController);
router
  .route("/editEmployee")
  .put(ensureAdminAuthentication, adminEditEmployeeController);
router
  .route("/changeEmployeePassword")
  .put(ensureAdminAuthentication, adminChangeEmployeePasswordController);
router
  .route("/deleteEmployee/:employeeId")
  .delete(ensureAdminAuthentication, adminDeleteEmployeeController);
module.exports = router;
