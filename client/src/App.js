import "./App.css";
import "./styles/chat.scss";
import { useEffect, useState } from "react";
import Chat from "./Chat";
import Cookies from "js-cookie";
import UserPopUp from "./popUps/userPopUp.tsx";
import io from "socket.io-client";

function App() {
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [isUserSave, setIsUserSave] = useState(false);
  const [socket, setSocket] = useState();

  useEffect(() => {
    Cookies.get("userInfo") ? setIsUserSave(true) : setIsUserSave(false);

    const initializeSocket = async () => {
      const socket = await io.connect("http://localhost:3001");
      await new Promise((resolve) => setTimeout(resolve, 100));
      setSocket(socket);
    };

    initializeSocket();
  }, [socket]);

  const changeUserName = () => {
    Cookies.remove("userInfo");
  };

  const joinRoom = () => {
    socket.emit("join_room", room);
    setShowChat(true);
  };

  return (
    <>
      {!showChat && (
        <>
          <div className="App">
            <div className="joinChatContainer">
              <h3>Join A Chat</h3>
              <input
                type="text"
                placeholder="Room ID..."
                onChange={(event) => {
                  setRoom(event.target.value);
                }}
              />
              <button onClick={joinRoom}>Join A Room</button>
            </div>
          </div>
        </>
      )}

      {showChat && (
        <div>
          <div className="inRoom--container">
            <div className="inRoom--container-current-room">
              <span>Current room {room}</span>
            </div>
            <div className="inRoom--container-change-room">
              <span>Change Room</span>
              <input
                type="text"
                placeholder="Room ID..."
                onChange={(event) => {
                  setRoom(event.target.value);
                }}
              />
              <button onClick={joinRoom}>Change Room</button>
            </div>
          </div>

          <Chat socket={socket} room={room} />
        </div>
      )}
      {isUserSave && <button onClick={changeUserName}>Change Username</button>}

      {!isUserSave && socket && <UserPopUp socket={socket} />}
    </>
  );
}

export default App;
