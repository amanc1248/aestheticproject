import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import {
  adminEditEmployeeAction,
  adminEditEmployeeClean,
  adminFetchEmployeeAction,
} from "../../actions/adminActions";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { useNavigate } from "react-router-dom";
function EditEmployee({ setEditEmployee, employee }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const closeEditEmployee = () => {
    dispatch(adminEditEmployeeClean());
    setEditEmployee(false);
  };

  // employee details states
  const [name, setName] = useState(employee.name);
  const [email, setEmail] = useState(employee.email);
  const [emailPassword, setEmailPassword] = useState(employee.email_password);
  const [designation, setDesignation] = useState(employee.designation);
  // edit employee handler
  const editEmployeeHandler = (e) => {
    e.preventDefault();
    if (name && email && emailPassword && designation) {
      dispatch(
        adminEditEmployeeAction({
          id: employee.id,
          name,
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
  console.log("adminEditEMployReducer error: ", error);
  useEffect(() => {
    if (editedEmployee === "unAuthorized") {
      navigate("/auth/true/false");
    }
  }, [navigate, editedEmployee]);
  return (
    <div>
      <div>
        <div className="home__admin__login">
          <div className="employee__add__container">
            <div className="title__and__close">
              <div className="admin__login__title">Edit Employee Details</div>
              <div className="close__icon">
                <CloseIcon onClick={closeEditEmployee}></CloseIcon>
              </div>
            </div>

            <div>
              <label htmlFor="name" className="admin__login__label">
                Name<span style={{ color: "red" }}>*</span>
              </label>
              <br />
              <input
                type="text"
                id="name"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
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
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="email_password" className="admin__login__label">
                Email Password<span style={{ color: "red" }}>*</span>
              </label>
              <br />
              <input
                type="password"
                id="email_password"
                required
                value={emailPassword}
                onChange={(e) => {
                  setEmailPassword(e.target.value);
                }}
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
                value={designation}
                onChange={(e) => {
                  setDesignation(e.target.value);
                }}
              />
            </div>
            {!loading && (
              <div>
                <button
                  className="login__employee__button"
                  onClick={editEmployeeHandler}
                >
                  Save Changes
                </button>
              </div>
            )}
            {loading && <Loader></Loader>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditEmployee;
