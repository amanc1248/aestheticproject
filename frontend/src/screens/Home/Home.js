import React from "react";
import "../../styles/screens/Home.css";
function Home() {
  return (
    <div className="home apply__home__margin">
      <div className="home__title">
        Portal to send NFTs update to Aesthetic Users.
      </div>
      <div className="home__subtitle">
        employee can send NFTs updates to Aesthetic users
      </div>
      <div className="home__buttons">
        <button className=" login__employee__button">Login as admin</button>
        <span> " "</span>
        <button className="login__admin__button">Login as employee</button>
      </div>
    </div>
  );
}

export default Home;
