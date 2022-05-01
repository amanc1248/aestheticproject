import React, { useState } from "react";
import "../../styles/screens/Home.css";
import HomeAdminLogin from "./HomeAdminLogin";
import HomeEmployeeLogin from "./HomeEmployeeLogin";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  adminAddEmployeeClear,
  adminChangeEmployeePasswordActionCleanError,
  adminDeleteEmployeeClean,
  adminFetchEmployeeCleanAction,
  adminLoginClean,
} from "../../actions/adminActions";
function Home() {
  const dispatch = useDispatch();

  const { adminError, employeeError } = useParams();
  const adminErrorBool = adminError === "true";
  const employeeErrorBool = employeeError === "true";
  console.log(adminError, "  ", employeeError);
  const [adminLogin, setAdminLogin] = useState(adminErrorBool);
  const showAdminLogin = () => {
    setAdminLogin(true);
  };

  const [employeeLogin, setEmployeeLogin] = useState(employeeErrorBool);
  const showEmployeeLogin = () => {
    setEmployeeLogin(true);
  };

  dispatch(adminAddEmployeeClear());
  dispatch(adminChangeEmployeePasswordActionCleanError());
  dispatch(adminDeleteEmployeeClean());
  dispatch(adminLoginClean());
  dispatch(adminFetchEmployeeCleanAction());

  return (
    <div className="home apply__home__margin">
      {adminLogin && (
        <HomeAdminLogin
          setAdminLogin={setAdminLogin}
          adminError={adminErrorBool}
        ></HomeAdminLogin>
      )}

      {employeeLogin && (
        <HomeEmployeeLogin
          setAdminLogin={setEmployeeLogin}
          employeeError={employeeErrorBool}
        ></HomeEmployeeLogin>
      )}
      <div className="home__title">
        Portal to send NFTs update to Aesthetic Users.
      </div>
      <div className="home__subtitle">
        employee can send NFTs updates to Aesthetic users
      </div>
      <div className="home__buttons">
        <button className=" login__employee__button" onClick={showAdminLogin}>
          Login as admin
        </button>
        <span> " "</span>
        <button className="login__admin__button" onClick={showEmployeeLogin}>
          Login as employee
        </button>
      </div>
      <a href="/admin">Go to admin</a>
    </div>
  );
}

export default Home;
