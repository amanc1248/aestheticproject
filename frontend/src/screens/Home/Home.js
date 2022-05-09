import React, { useState } from "react";
import "../../styles/screens/Home.css";
import HomeAdminLogin from "./HomeAdminLogin";
import HomeEmployeeLogin from "./HomeEmployeeLogin";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  adminLoginClean,
  adminLogoutClean,
  checkAdminLoginStatusClean,
} from "../../actions/adminActions";
import {
  checkEmployeeLoginStatusClean,
  employeeFetchUsersClean,
  employeeLoginClean,
  employeeLogoutClean,
} from "../../actions/employeeActions";
function Home() {
  const dispatch = useDispatch();

  const { adminError, employeeError } = useParams();
  const adminErrorBool =
    adminError === "adminLoginExpired" || adminError === "notLoggedIn"
      ? true
      : false;
  const employeeErrorBool =
    employeeError === "employeeLoginExpired" || employeeError === "notLoggedIn"
      ? true
      : false;
  const [adminLogin, setAdminLogin] = useState(adminErrorBool);
  const showAdminLogin = () => {
    setAdminLogin(true);
  };

  const [employeeLogin, setEmployeeLogin] = useState(employeeErrorBool);
  const showEmployeeLogin = () => {
    setEmployeeLogin(true);
  };
  dispatch(adminLoginClean());
  dispatch(adminLogoutClean());
  dispatch(checkAdminLoginStatusClean());
  dispatch(employeeLoginClean());
  dispatch(employeeLogoutClean());
  dispatch(checkEmployeeLoginStatusClean());
  dispatch(employeeFetchUsersClean());

  return (
    <>
      <div className="home apply__home__margin">
        {adminLogin && (
          <HomeAdminLogin
            setAdminLogin={setAdminLogin}
            adminError={adminError}
          ></HomeAdminLogin>
        )}

        {employeeLogin && (
          <HomeEmployeeLogin
            setAdminLogin={setEmployeeLogin}
            employeeError={employeeError}
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
      </div>

      <div className="steps__div apply__home__margin">
        <div className="steps__container">
          <div className="part1">
            <img
              src="https://www.aesthetic.com/img/homepage/create.svg"
              alt="adminpart"
            />
          </div>
          <div className="part2">
            <h4>
              {" "}
              <b>Admin</b>
            </h4>
          </div>
          <div className="part3">Admin adds employee to the portal</div>
        </div>
        <div className="steps__container">
          <div className="part1">
            <img
              src="https://www.aesthetic.com/img/homepage/customize.svg"
              alt="employeepart"
            />
          </div>
          <div className="part2">
            <h4>
              {" "}
              <b>Employee </b>
            </h4>
          </div>
          <div className="part3">
            Employee sends NFTs update to Aesthetic users via email
          </div>
        </div>
        <div className="steps__container">
          <div className="part1">
            <img
              src="https://www.aesthetic.com/img/homepage/share.svg"
              alt="userpart"
            />
          </div>
          <div className="part2">
            <h4>
              {" "}
              <b>Users</b>
            </h4>
          </div>
          <div className="part3">Users get NFTs update into their email</div>
        </div>
      </div>
    </>
  );
}

export default Home;
