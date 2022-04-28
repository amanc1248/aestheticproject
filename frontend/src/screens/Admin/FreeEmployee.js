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

function FreeEmployee({ setFreeEmployee, employee }) {
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

  // const [name, setName] = useState(employee.name);
  // const [email, setEmail] = useState(employee.email);
  // const [username, setUsername] = useState(employee.username);
  // const [designation, setDesignation] = useState(employee.designation);

  // const handlers
  const passConfirmHandler = () => {
    if (adminPass) {
      dispatch(adminLoginAction(adminPass));
    }
  };
  const freeEmployeeHandler = () => {
    dispatch(adminDeleteEmployeeAction(employee.id));
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
    if (adminLogin === "success") {
      setPassConfirm(true);
    } else {
      if (error === "Login Failed") {
        setPassConfirm(false);
      }
    }
    if (deletedEmployee === "success") {
      setMessage("Deleted Successfully");
    }
  }, [adminLogin, error, deletedEmployee]);

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
                    {!deletedEmployee && (
                      <button
                        className="login__employee__button"
                        onClick={freeEmployeeHandler}
                      >
                        Delete Employee
                      </button>
                    )}
                  </>
                )}
              </div>
            )}
            {deleteLoading && <Loader></Loader>}
            {message && <Message>{message}</Message>}
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
