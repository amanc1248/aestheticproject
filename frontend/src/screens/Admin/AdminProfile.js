import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { adminLogoutAction } from "../../actions/adminActions";
function AdminProfile({ setAdminProfile }) {
  const dispatch = useDispatch();

  // handlers
  const closeAdminProfile = () => {
    setAdminProfile(false);
  };

  const logout = () => {
    dispatch(adminLogoutAction());
  };
  return (
    <div>
      <div>
        <div className="home__admin__login">
          <div className="employee__add__container">
            <div className="title__and__close">
              <div className="admin__login__title">
                Logout from your profile:
              </div>
              <div className="close__icon">
                <CloseIcon onClick={closeAdminProfile}></CloseIcon>
              </div>
            </div>

            <div>
              <button className="login__employee__button" onClick={logout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
