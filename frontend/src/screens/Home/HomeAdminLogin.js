import React, { useState, useEffect } from "react";
import "../../styles/screens/Home.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import CloseIcon from "@mui/icons-material/Close";
import { adminLoginAction, adminLoginClean } from "../../actions/adminActions";
function HomeAdminLogin({ setAdminLogin, adminError }) {
  const navigate = useNavigate();
  const closeLogin = () => {
    setAdminLogin(false);
  };

  // admin state
  const [adminPass, setAdminPass] = useState();
  const saveAdminPass = (value) => {
    setAdminPass(value);
    console.log(adminPass);
  };

  // USE
  const { loading, adminLogin, error } = useSelector(
    (state) => state.adminLoginReducer
  );

  // actions
  const dispatch = useDispatch();
  const adminLoginHandler = (e) => {
    e.preventDefault();
    if (adminPass) {
      dispatch(adminLoginAction(adminPass));
      // dispatch(adminLoginClean());
    }
    console.log("navigate is not working ");

    if (adminLogin === "success") {
      console.log("navigate is working ");
      navigate("/admin");
    }
  };

  // useeffect
  useEffect(() => {
    if (adminLogin === "success") {
      dispatch(adminLoginClean());

      navigate("/admin");
    }
  }, [adminLogin, navigate]);

  console.log("AdminLogin: ", adminLogin);
  return (
    <div className="home__admin__login">
      <form action="">
        <div className="login__container">
          <div className="title__and__close">
            <div className="admin__login__title">Login as admin</div>
            <div className="close__icon">
              <CloseIcon onClick={closeLogin}></CloseIcon>
            </div>
          </div>
          {adminError === true && (
            <Message variant="danger">{"Please login first"}</Message>
          )}
          <label htmlFor="admin__login" className="admin__login__label">
            Admin pass<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="password"
            id="admin__login"
            onChange={(event) => {
              saveAdminPass(event.target.value);
            }}
            required
          />
          <div>
            <button
              className="login__employee__button"
              type="submit"
              onClick={adminLoginHandler}
            >
              Login as Admin
            </button>
          </div>
          {loading && <Loader></Loader>}
          {error && <Message variant="danger">{error}</Message>}
        </div>
      </form>
    </div>
  );
}
export default HomeAdminLogin;
