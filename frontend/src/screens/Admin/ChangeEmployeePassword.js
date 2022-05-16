import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  adminChangeEmployeePasswordAction,
  adminChangeEmployeePasswordActionCleanError,
  adminFetchEmployeeByIdAction,
} from "../../actions/adminActions";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
// import "../../styles/screens/Admin.css";
function ChangeEmployeePassword({ setChangePassword, employeeId }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const closeChangePassword = () => {
    dispatch(adminChangeEmployeePasswordActionCleanError());
    setChangePassword(false);
  };
  // states
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();

  const [buttonDisable, setButtonDisable] = useState(false);

  // changePasswordHandler
  const changePasswordHandler = (e) => {
    e.preventDefault();
    if (oldPassword && newPassword) {
      dispatch(
        adminChangeEmployeePasswordAction(employeeId, oldPassword, newPassword)
      );
    }
  };

  // use selectors
  const { loading, changedPassword, error } = useSelector(
    (state) => state.adminChangeEmployeePasswordReducer
  );
  useEffect(() => {
    if (changedPassword === "expired") {
      navigate("/auth/adminLoginExpired/false");
    }
    if (changedPassword === "notLoggedIn") {
      navigate("/auth/adminNotLoggedIn/false");
    }
    if (changedPassword === "success") {
      dispatch(adminFetchEmployeeByIdAction(employeeId));
      // setMessage("Employee Edited Successfully");
      setButtonDisable(true);
    }
  }, [navigate, changedPassword, dispatch]);

  return (
    <>
      <div>
        <div className="home__admin__login">
          <div className="employee__add__container">
            <div className="title__and__close">
              <div className="admin__login__title">Change Password</div>
              <div className="close__icon">
                {!loading && (
                  <CloseIcon onClick={closeChangePassword}></CloseIcon>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="oldpassword" className="admin__login__label">
                old password<span style={{ color: "red" }}>*</span>
              </label>
              <br />
              <input
                type="password"
                id="oldpassword"
                required
                onChange={(e) => {
                  setOldPassword(e.target.value);
                }}
                disabled={buttonDisable}
              />
            </div>
            <div>
              <label htmlFor="newpassword" className="admin__login__label">
                new password<span style={{ color: "red" }}>*</span>
              </label>
              <br />
              <input
                type="password"
                id="newpassword"
                required
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
                disabled={buttonDisable}
              />
            </div>

            {!loading && (
              <div>
                {!buttonDisable && (
                  <button
                    className="login__employee__button"
                    onClick={changePasswordHandler}
                  >
                    Change Password
                  </button>
                )}
              </div>
            )}
            {loading && <Loader></Loader>}

            {error && <Message variant="danger">{error}</Message>}
            {changedPassword === "success" && (
              <Message>{"Password Changed successfully. "}</Message>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ChangeEmployeePassword;
