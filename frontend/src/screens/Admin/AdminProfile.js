import React, { useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminLogoutAction } from "../../actions/adminActions";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
function AdminProfile({ setAdminProfile }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // handlers
  const closeAdminProfile = () => {
    setAdminProfile(false);
  };

  const logout = () => {
    dispatch(adminLogoutAction());
  };

  // useSelectors
  const { loading, adminLogout, error } = useSelector(
    (state) => state.adminLogoutReducer
  );
  // useEffect
  useEffect(() => {
    if (adminLogout === "destroyed") {
      navigate("/");
    }
  }, [adminLogout, navigate]);
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
            {loading && <Loader></Loader>}
            {error && <Message variant="danger">{error}</Message>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
