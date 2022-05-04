import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { adminLoginAction, adminLoginClean } from "../../actions/adminActions";
function RevealUsernameAndPassword({ setRevealUPass, employee }) {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const closeRevealUPass = () => {
    dispatch(adminLoginClean());
    setRevealUPass(false);
  };
  // states
  const [adminPass, setAdminPass] = useState();
  const [passConfirm, setPassConfirm] = useState();

  // const handlers
  const passConfirmHandler = () => {
    if (adminPass) {
      dispatch(adminLoginAction(adminPass));
    }
  };
  // use selectors
  const { loading, adminLogin, error } = useSelector(
    (state) => state.adminLoginReducer
  );

  // useEffect
  useEffect(() => {
    if (adminLogin === "success") {
      setPassConfirm(true);
    } else if (adminLogin === "unAuthorized") {
      navigate("/auth/true/false");
    } else {
      if (error === "Login Failed") {
        setPassConfirm(false);
      }
    }
  }, [adminLogin, error, navigate]);
  return (
    <>
      <div>
        <div className="home__admin__login">
          <div className="employee__add__container">
            <div className="title__and__close">
              <div className="admin__login__title">Verification</div>
              <div className="close__icon">
                <CloseIcon onClick={closeRevealUPass}></CloseIcon>
              </div>
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
                <b>USERNAME: </b> {employee.username} <br />
                <b>PASSWORD: </b> {employee.password} <br />
                <b>EMAIL: </b> {employee.email} <br />
                <b>EMAIL PASSWORD: </b> {employee.email_password} <br />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default RevealUsernameAndPassword;
