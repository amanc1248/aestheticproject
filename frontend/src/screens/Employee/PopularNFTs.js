import React from "react";
import CloseIcon from "@mui/icons-material/Close";

function PopularNFTs({ setPopularNFTs }) {
  const closePopularNFTs = () => {
    setPopularNFTs(false);
  };
  return (
    <div>
      <div>
        <div className="home__admin__login">
          <div className="employee__add__container">
            <div className="title__and__close">
              <div className="admin__login__title">Popular NFTs this week</div>
              <div className="close__icon">
                <CloseIcon onClick={closePopularNFTs}></CloseIcon>
              </div>
            </div>
            <p>
              See the email format you are about to send to the user.
              <a href="/imageformat">click here to see the email format</a>
            </p>
            <div>
              <button className="login__employee__button">
                SEND POPULAR NFTs
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopularNFTs;
