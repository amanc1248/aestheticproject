import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import Loader from "../../components/Loader";

import {
  adminLoginAction,
  adminDeleteEmployeeAction,
  adminEditEmployeeAction,
  adminLoginClean,
  adminDeleteEmployeeClean,
} from "../../actions/adminActions";
import Message from "../../components/Message";
import { useNavigate } from "react-router-dom";

function FreeEmployee({ setFreeEmployee, employee }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const closeDeleteEmployee = () => {
    dispatch(adminLoginClean());
    dispatch(adminDeleteEmployeeClean());
    setFreeEmployee(false);
  };

  // states
  const [adminPass, setAdminPass] = useState();
  const [passConfirm, setPassConfirm] = useState();
  const [message, setMessage] = useState();

  // const handlers
  const passConfirmHandler = () => {
    if (adminPass) {
      dispatch(adminLoginAction(adminPass));
    }
  };
  const freeEmployeeHandler = () => {
    dispatch(adminDeleteEmployeeAction(employee.id));
    dispatch(adminLoginClean());
  };

  // use selector
  const { loading, adminLogin, error } = useSelector(
    (state) => state.adminLoginReducer
  );
  const {
    loading: deleteLoading,
    deletedEmployee,
    error: deleteEmployeeError,
  } = useSelector((state) => state.adminDeleteEmployeeReducer);

  // useEffect
  useEffect(() => {
    if (deletedEmployee === "expired") {
      navigate("/auth/adminLoginExpired/false");
    } else if (deletedEmployee === "notLoggedIn") {
      navigate("/auth/adminNotLoggedIn/false");
    } else if (adminLogin === "success") {
      setPassConfirm(true);
    } else {
      if (error === "Login Failed") {
        setPassConfirm(false);
      }
    }
    if (deletedEmployee === "success") {
      setMessage("Deleted Successfully");
    }
    if (error === "unAuthorized") {
      navigate("/auth/true/false");
    }
  }, [adminLogin, error, deletedEmployee, navigate]);

  return (
    <div>
      <div>
        <div className="home__admin__login">
          <div className="employee__add__container">
            <div className="title__and__close">
              <div className="admin__login__title">Delete Employee</div>
              <div className="close__icon">
                <CloseIcon onClick={closeDeleteEmployee}></CloseIcon>
              </div>
            </div>
            <div>
              <label htmlFor="name" className="admin__login__label">
                <b>NAME</b>: {employee.name}
              </label>
              <br />
            </div>
            <div>
              <label htmlFor="email" className="admin__login__label">
                <b>EMAIL</b>: {employee.email}
              </label>
              <br />
            </div>
            <div>
              <label htmlFor="username" className="admin__login__label">
                <b>USERNAME</b>: {employee.username}
              </label>
              <br />
            </div>
            <div>
              <label htmlFor="designation" className="admin__login__label">
                <b>DESIGNATION</b> : {employee.designation}
              </label>
              <br />
            </div>
            <h6>Confirm that its you, enter your admin pass:</h6>
            <input
              type="password"
              name="adminpass"
              id=""
              required
              onChange={(e) => {
                setAdminPass(e.target.value);
              }}
            />
            <button onClick={passConfirmHandler}>
              {loading
                ? "Confirming Pass..."
                : passConfirm
                ? "Pass Confirmed ✔"
                : passConfirm === false
                ? "Pass Rejected ❌"
                : "Confirm Pass"}
            </button>
            {passConfirm && (
              <div>
                {!deleteLoading && (
                  <>
                    <button
                      className="login__employee__button"
                      onClick={freeEmployeeHandler}
                    >
                      Delete Employee
                    </button>
                  </>
                )}
              </div>
            )}
            {deleteLoading && <Loader></Loader>}
            {deleteEmployeeError && (
              <Message variant="danger">{deleteEmployeeError}</Message>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FreeEmployee;
