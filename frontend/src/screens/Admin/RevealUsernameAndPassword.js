import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { adminFetchEmployeeByIdAllDetailsAction } from "../../actions/adminActions";
import BoxLoader from "../../components/BoxLoader";

function RevealUsernameAndPassword({ setRevealUPass, employeeId }) {
  const dispatch = useDispatch();

  const closeRevealUPass = () => {
    setRevealUPass(false);
  };

  // states
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [email_password, setEmail_password] = useState();

  // useSelectors
  const { admineEployeeByIdAllDetails, loading, error } = useSelector(
    (state) => state.adminFetchEmployeeByIdAllDetailsReducer
  );

  // useEffects
  useEffect(() => {
    dispatch(adminFetchEmployeeByIdAllDetailsAction(employeeId));
  }, [dispatch]);
  useEffect(() => {
    if (admineEployeeByIdAllDetails) {
      setUserName(admineEployeeByIdAllDetails.username);
      setPassword(admineEployeeByIdAllDetails.password);
      setEmail(admineEployeeByIdAllDetails.email);
      setEmail_password(admineEployeeByIdAllDetails.email_password);
    }
  }, [admineEployeeByIdAllDetails]);

  return (
    <>
      <div>
        <div className="home__admin__login">
          <div className="employee__add__container">
            <div className="title__and__close">
              <div className="admin__login__title">Employee Credentials</div>
              <div className="close__icon">
                <CloseIcon onClick={closeRevealUPass}></CloseIcon>
              </div>
            </div>

            {loading ? (
              <BoxLoader></BoxLoader>
            ) : (
              <div>
                <b>USERNAME: </b> {userName} <br />
                <b>PASSWORD: </b> {password} <br />
                <b>EMAIL: </b> {email} <br />
                <b>EMAIL PASSWORD: </b> {email_password} <br />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default RevealUsernameAndPassword;
