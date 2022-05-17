import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import Loader from "../../components/Loader";

import {
  adminDeleteEmployeeAction,
  adminDeleteEmployeeClean,
  adminFetchEmployeeByIdAction,
} from "../../actions/adminActions";
import Message from "../../components/Message";
import { useNavigate } from "react-router-dom";
import BoxLoader from "../../components/BoxLoader";

function FreeEmployee({ setFreeEmployee, employeeId }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const closeDeleteEmployee = () => {
    dispatch(adminDeleteEmployeeClean());
    setFreeEmployee(false);
  };

  // states

  const [buttonDisable, setButtonDisable] = useState(false);

  //  handlers

  const freeEmployeeHandler = () => {
    dispatch(adminDeleteEmployeeAction(employeeId));
    // dispatch(adminLoginClean());
  };

  // use selector
  const {
    loading: deleteLoading,
    deletedEmployee,
    error: deleteEmployeeError,
  } = useSelector((state) => state.adminDeleteEmployeeReducer);

  const { admineEployeeById, loading: employeeDetailsLoading } = useSelector(
    (state) => state.adminFetchEmployeeByIdReducer
  );

  // useEffect
  useEffect(() => {
    console.log("use effect ran this time");
    dispatch(adminFetchEmployeeByIdAction(employeeId));
  }, []);

  useEffect(() => {
    if (deletedEmployee === "expired") {
      navigate("/auth/adminLoginExpired/false");
    }
    if (deletedEmployee === "notLoggedIn") {
      navigate("/auth/adminNotLoggedIn/false");
    }
    if (deletedEmployee === "success") {
      setButtonDisable(true);
    }
  }, [deletedEmployee, navigate]);

  return (
    <div>
      <div>
        <div className="home__admin__login">
          <div className="employee__add__container">
            <div className="title__and__close">
              <div className="admin__login__title">Delete Employee</div>
              <div className="close__icon">
                {!deleteLoading && (
                  <CloseIcon onClick={closeDeleteEmployee}></CloseIcon>
                )}
              </div>
            </div>
            {employeeDetailsLoading ? (
              <BoxLoader></BoxLoader>
            ) : (
              <>
                <div>
                  <label htmlFor="name" className="admin__login__label">
                    <b>NAME</b>: {admineEployeeById && admineEployeeById.name}
                  </label>
                  <br />
                </div>
                <div>
                  <label htmlFor="email" className="admin__login__label">
                    <b>EMAIL</b>: {admineEployeeById && admineEployeeById.email}
                  </label>
                  <br />
                </div>
                <div>
                  <label htmlFor="username" className="admin__login__label">
                    <b>USERNAME</b>:{" "}
                    {admineEployeeById && admineEployeeById.username}
                  </label>
                  <br />
                </div>
                <div>
                  <label htmlFor="designation" className="admin__login__label">
                    <b>DESIGNATION</b> :{" "}
                    {admineEployeeById && admineEployeeById.designation}
                  </label>
                  <br />
                </div>

                <div>
                  {!deleteLoading && (
                    <>
                      {!buttonDisable && (
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
                {/* )} */}
                {deleteLoading && <Loader></Loader>}
                {deleteEmployeeError && (
                  <Message variant="danger">{deleteEmployeeError}</Message>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FreeEmployee;
