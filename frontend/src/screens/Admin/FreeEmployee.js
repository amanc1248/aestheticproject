import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { adminLoginAction } from "../../actions/adminActions";

function FreeEmployee({ setFreeEmployee }) {
  const dispatch = useDispatch();
  const closeDeleteEmployee = () => {
    setFreeEmployee(false);
  };

  // states
  const [adminPass, setAdminPass] = useState();
  const [passConfirm, setPassConfirm] = useState();
  const [message, setMessage] = useState();

  // const passConfirmHandler
  const passConfirmHandler = () => {
    if (adminPass) {
      dispatch(adminLoginAction(adminPass));
    }
  };

  // use selector
  const { loading, adminLogin, error } = useSelector(
    (state) => state.adminLoginReducer
  );

  // useEffect
  useEffect(() => {
    if (adminLogin === "success") {
      setPassConfirm(true);
    } else {
      if (error === "failure") {
        setPassConfirm(false);
      }
    }
  }, [adminLogin, error]);

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
                Name:
              </label>
              <br />
            </div>
            <div>
              <label htmlFor="email" className="admin__login__label">
                Email:
              </label>
              <br />
            </div>
            <div>
              <label htmlFor="username" className="admin__login__label">
                username:
              </label>
              <br />
            </div>

            <div>
              <label htmlFor="designation" className="admin__login__label">
                designation:
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
            <div>
              {passConfirm && (
                <button className="login__employee__button">
                  Delete Employee
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FreeEmployee;
