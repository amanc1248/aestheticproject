import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import {
  adminEditEmployeeAction,
  adminEditEmployeeClean,
  adminFetchEmployeeByIdAction,
  adminFetchEmployeeByIdClean,
} from "../../actions/adminActions";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { useNavigate } from "react-router-dom";
import BoxLoader from "../../components/BoxLoader";
function EditEmployee({ setEditEmployee, employeeId }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const closeEditEmployee = () => {
    dispatch(adminEditEmployeeClean());
    dispatch(adminFetchEmployeeByIdClean());
    setEditEmployee(false);
  };

  //useEffects
  useEffect(() => {
    console.log("use effect ran this time");
    dispatch(adminFetchEmployeeByIdAction(employeeId));
  }, []);

  // useSelectors
  const { admineEployeeById, loading: employeeDetailsLoading } = useSelector(
    (state) => state.adminFetchEmployeeByIdReducer
  );

  useEffect(() => {
    console.log("I ran.....", admineEployeeById);
    if (admineEployeeById) {
      setName(admineEployeeById.name);
      setHost(admineEployeeById.host);
      setEmail(admineEployeeById.email);
      setEmailPassword(admineEployeeById.email_password);
      setDesignation(admineEployeeById.designation);
    }
  }, [admineEployeeById]);

  // employee details states
  const [name, setName] = useState();
  const [host, setHost] = useState();
  const [email, setEmail] = useState();
  const [emailPassword, setEmailPassword] = useState();
  const [designation, setDesignation] = useState();

  const [buttonDisable, setButtonDisable] = useState(false);
  // edit employee handler
  const editEmployeeHandler = (e) => {
    e.preventDefault();
    if (name && email && emailPassword && designation) {
      dispatch(
        adminEditEmployeeAction({
          id: employeeId,
          name,
          host,
          email,
          emailPassword,
          designation,
        })
      );
    }
  };

  // selectors
  const { loading, editedEmployee, error } = useSelector(
    (state) => state.adminEditEmployeeReducer
  );
  useEffect(() => {
    if (editedEmployee === "expired") {
      navigate("/auth/adminLoginExpired/false");
    }
    if (editedEmployee === "notLoggedIn") {
      navigate("/auth/adminNotLoggedIn/false");
    }
    if (editedEmployee === "success") {
      dispatch(adminFetchEmployeeByIdAction(employeeId));
      // setMessage("Employee Edited Successfully");
      setButtonDisable(true);
    }
  }, [navigate, editedEmployee]);

  console.log("Employee By ID: ");
  return (
    <div>
      <div>
        <div className="home__admin__login">
          <div className="employee__add__container">
            <div className="title__and__close">
              <div className="admin__login__title">Edit Employee Details</div>
              <div className="close__icon">
                {!loading && (
                  <CloseIcon onClick={closeEditEmployee}></CloseIcon>
                )}
              </div>
            </div>
            {employeeDetailsLoading ? (
              <BoxLoader></BoxLoader>
            ) : (
              <>
                <div>
                  <label htmlFor="name" className="admin__login__label">
                    Name<span style={{ color: "red" }}>*</span>
                  </label>
                  <br />
                  <input
                    type="text"
                    id="name"
                    required
                    defaultValue={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    disabled={buttonDisable}
                  />
                </div>
                <div>
                  <label htmlFor="host" className="admin__login__label">
                    Host<span style={{ color: "red" }}>*</span>
                  </label>
                  <br />
                  <input
                    type="text"
                    id="host"
                    required
                    defaultValue={host}
                    onChange={(e) => {
                      setHost(e.target.value);
                    }}
                    disabled={buttonDisable}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="admin__login__label">
                    Email<span style={{ color: "red" }}>*</span>
                  </label>
                  <br />
                  <input
                    type="email"
                    id="email"
                    required
                    defaultValue={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    disabled={buttonDisable}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email_password"
                    className="admin__login__label"
                  >
                    Email Password<span style={{ color: "red" }}>*</span>
                  </label>
                  <br />
                  <input
                    type="password"
                    id="email_password"
                    required
                    defaultValue={emailPassword}
                    onChange={(e) => {
                      setEmailPassword(e.target.value);
                    }}
                    disabled={buttonDisable}
                  />
                </div>

                <div>
                  <label htmlFor="designation" className="admin__login__label">
                    designation<span style={{ color: "red" }}>*</span>
                  </label>
                  <br />
                  <input
                    type="text"
                    id="designation"
                    required
                    defaultValue={designation}
                    onChange={(e) => {
                      setDesignation(e.target.value);
                    }}
                    disabled={buttonDisable}
                  />
                </div>
                {!loading && (
                  <div>
                    {!buttonDisable && (
                      <button
                        className="login__employee__button"
                        onClick={editEmployeeHandler}
                      >
                        Save Changes
                      </button>
                    )}
                  </div>
                )}
                {loading && <Loader></Loader>}
                {editedEmployee === "invalid" && (
                  <Message variant="danger">
                    {"Invalid host, email or email password."}
                  </Message>
                )}
                {editedEmployee === "success" && (
                  <Message>{"Employee Edited successfully. "}</Message>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditEmployee;
