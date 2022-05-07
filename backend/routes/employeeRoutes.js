const express = require("express");
const {
  employeeLoginController,
  employeeFetchUsersController,
  employeeLogoutController,
  employeeMostPopularNFTsController,
  employeeSendEmailController,
  employeeByIdController,
  checkEmployeeLoginStatus,
} = require("../controllers/employeeControllers");
const { ensureEmployeeAuthentication } = require("../middleware/middleWare");

const router = express.Router();
router.route("/employeeLogin").post(employeeLoginController);
router.route("/employeeLoginStatus").get(checkEmployeeLoginStatus);
router
  .route("/employeeById")
  .get(ensureEmployeeAuthentication, employeeByIdController);
router
  .route("/fetchUsers")
  .get(ensureEmployeeAuthentication, employeeFetchUsersController);
router.route("/logout").get(employeeLogoutController);
router
  .route("/sendEmail")
  .post(ensureEmployeeAuthentication, employeeSendEmailController);

module.exports = router;
