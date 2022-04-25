import React from "react";
import CloseIcon from "@mui/icons-material/Close";

function RecentlySold({ setRecentlySold }) {
  const closeRecentlySold = () => {
    setRecentlySold(false);
  };
  return (
    <div>
      <div>
        <div>
          <div className="home__admin__login">
            <div className="employee__add__container">
              <div className="title__and__close">
                <div className="admin__login__title">
                  Recently sold NFTs of this week
                </div>
                <div className="close__icon">
                  <CloseIcon onClick={closeRecentlySold}></CloseIcon>
                </div>
              </div>
              <p>
                See the email format you are about to send to the user.
                <a href="/imageformat">click here to see the email format</a>
              </p>
              <div>
                <button className="login__employee__button">
                  SEND Recently sold NFTs
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecentlySold;
