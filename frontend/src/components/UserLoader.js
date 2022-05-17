import React from "react";
import "../styles/components/UserLoader.css";
function UserLoader() {
  const array = [1, 2, 3, 4, 5, 6];
  return (
    <div>
      {array.map((element) => {
        return (
          <div className="user_list_main" key={element}>
            <div className="inner_div_1"></div>
            <div className="inner_div_1"></div>
            <div className="inner_div_1"></div>
            <div className="inner_div_1"></div>
          </div>
        );
      })}
    </div>
  );
}

export default UserLoader;
