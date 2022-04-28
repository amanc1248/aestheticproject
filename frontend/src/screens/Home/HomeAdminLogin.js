import React, { useState, useEffect } from "react";
import "../../styles/screens/Home.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import CloseIcon from "@mui/icons-material/Close";
import { adminLoginAction } from "../../actions/adminActions";
function HomeAdminLogin({ setAdminLogin }) {
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

  // actions
  const dispatch = useDispatch();
  const adminLoginHandler = (e) => {
    e.preventDefault();
    if (adminPass) {
      dispatch(adminLoginAction(adminPass));
    }
  };

  // store state
  const { loading, adminLogin, error } = useSelector(
    (state) => state.adminLoginReducer
  );

  // useeffect
  useEffect(() => {
    if (adminLogin === "success") {
      navigate("/admin");
    } else {
      console.log(adminLogin);
    }
  }, [adminLogin, navigate]);

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
