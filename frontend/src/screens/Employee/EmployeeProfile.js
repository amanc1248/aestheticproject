import React, { useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { employeeLogoutAction } from "../../actions/employeeActions";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

function EmployeeProfile({ setEmployeeProfile, employee }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const closeEmployeeProfile = () => {
    setEmployeeProfile(false);
  };

  // handlers
  const logout = () => {
    dispatch(employeeLogoutAction());
  };

  // useSelectors
  const { loading, employeeLogout, error } = useSelector(
    (state) => state.employeeLogoutReducer
  );

  // useEffects
  useEffect(() => {
    if (employeeLogout === "destroyed") {
      navigate("/");
    }
  }, [employeeLogout, navigate]);
  return (
    <div>
      <div>
        <div>
          <div className="home__admin__login">
            <div className="employee__add__container">
              <div className="title__and__close">
                <div className="admin__login__title">
                  Logout from your profile:
                </div>
                <div className="close__icon">
                  <CloseIcon onClick={closeEmployeeProfile}></CloseIcon>
                </div>
              </div>
              <div>
                <b>NAME:</b> {employee && employee.name} <br />
                <b>EMAIL:</b> {employee && employee.email} <br />
                <b>DESIGNATION:</b> {employee && employee.designation}
              </div>
              <div>
                <button className="login__employee__button" onClick={logout}>
                  Logout
                </button>
              </div>
              {loading && <Loader></Loader>}
              {error && <Message variant="danger">{error}</Message>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeProfile;
