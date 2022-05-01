const express = require("express");
const {
  employeeLoginController,
  employeeFetchUsersController,
  employeeLogoutController,
} = require("../controllers/employeeControllers");
const { ensureEmployeeAuthentication } = require("../middleware/middleWare");

const router = express.Router();
router.route("/employeeLogin").post(employeeLoginController);
router
  .route("/fetchUsers")
  .get(ensureEmployeeAuthentication, employeeFetchUsersController);
router.route("/logout").get(employeeLogoutController);

module.exports = router;
