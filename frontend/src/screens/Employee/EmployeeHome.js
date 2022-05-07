import React, { useEffect } from "react";
import EmployeeUsers from "./EmployeeUsers";
import { useDispatch, useSelector } from "react-redux";
import { checkEmployeeLoginStatusAction } from "../../actions/employeeActions";
import { useNavigate } from "react-router-dom";
import LoaderMain from "../../components/LoaderMain";

function EmployeeHome() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // useSelectors
  const { loading, checkEmployeeLoginStatus, error } = useSelector(
    (state) => state.checkEmployeeLoginStatusReducer
  );
  useEffect(() => {
    dispatch(checkEmployeeLoginStatusAction());
  }, [dispatch]);

  useEffect(() => {
    if (checkEmployeeLoginStatus === "unAuthorized") {
      navigate("/auth/false/notLoggedIn");
    }
  }, [navigate, checkEmployeeLoginStatus]);
  return (
    <>
      {checkEmployeeLoginStatus !== "success" ? (
        <LoaderMain></LoaderMain>
      ) : (
        <div className="admin__home apply__home__margin">
          <div className="row">
            <div className="add__employee__container col-lg-6 col-md-12 col-sm-12 ">
              <img
                src="https://www.aesthetic.com/img/homepage/share.svg"
                alt="share nft to users"
                height="200px"
              />
              <h3>Share NFTs updates to Aesthetic users</h3>
              <h6>
                Share Popular NFTs, recently sold, and many other updates
                fetched from OpeanSea, with a click of a button
              </h6>
            </div>
            <div className="users__container col-lg-6 col-md-12 col-sm-12">
              <EmployeeUsers> </EmployeeUsers>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default EmployeeHome;
