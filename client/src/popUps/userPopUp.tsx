import React, { useState } from "react";
import Cookies from "js-cookie";
import socketTyping from "../types/globalTypes";

import "../../src/styles/popUp.scss";

const UserPopUp: React.FC<socketTyping> = ({ socket }) => {
  const [username, setUsername] = useState("");
  const [showPopUp, setShowPopUp] = useState(true);

  const currentUser = {
    username: username,
    userId: socket.id,
  };

  function saveUserName() {
    Cookies.set("userInfo", JSON.stringify(currentUser));
    socket.emit(
      "sendCookie",
      { currentUser },
      { sameSite: "None", secure: true }
    );
    setShowPopUp(false);
  }

  return (
    <>
      {showPopUp && (
        <div className="popUp--container">
          <div className="popUp--innerContainer">
            <div className="popUp--header">
              <div className="popUp--title-container">
                <h3>
                  Welcome to <strong>Lite Chat</strong>
                </h3>
              </div>

              <div className="popUp--welcome-message">
                <p>
                  Welcome to my chat app, to start talking, enter a suitable
                  username to you and get going!
                </p>
                <span>
                  Project made with{" "}
                  <span className="popUp--heart">&#10084;</span>
                </span>
              </div>
            </div>

            <div className="popUp--input-container">
              <label>Username</label>
              <input
                type="text"
                placeholder="Enter your username..."
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />
            </div>

            <div className="popUp--btn-container">
              <button className="generic-btn-1" onClick={saveUserName}>
                Join
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserPopUp;
