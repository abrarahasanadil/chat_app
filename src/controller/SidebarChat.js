import { React, useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";

import "../view/SidebarChat.css";
import db from "../model/firebase";

function SidebarChat({ id, name, newChat }) {
  const [seed, setSeed] = useState("");

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = () => {
    const roomName = prompt("Please enter a name to create a group");

    if (roomName) {
      db.collection("rooms").add({
        name: roomName,
      });
    }
  };

  return !newChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <div className="avatar">
          <Avatar
            src={`https://avatars.dicebear.com/api/adventurer-neutral/${seed}.svg`}
          />
        </div>

        <div className="sidebar_inbox_details">
          <h3> {name}</h3>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h3>Add new Chat</h3>
    </div>
  );
}

export default SidebarChat;
