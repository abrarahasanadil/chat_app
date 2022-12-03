import React, { useState, useEffect } from "react";
import PersonSearchRoundedIcon from "@mui/icons-material/PersonSearchRounded";
import { Avatar } from "@mui/material";

import useStateValue from "./StateProvider";
import SidebarChat from "./SidebarChat";
import db from "../model/firebase.js";
import "../view/Sidebar.css";

function Sidebar() {
  const [rooms, setRooms] = useState([]);
  const [{ user }] = useStateValue();

  useEffect(() => {
    db.collection("rooms")
      .onSnapshot((snapshot) =>
        setRooms(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <div className="avatar">
          <Avatar src={user?.photoURL} />
          <span className="userID">{user.displayName}</span>
        </div>
      </div>

      <div className="sidebar_search">
        <div className="sidebar_searchbox">
          <PersonSearchRoundedIcon />
          <input placeholder="Search People" type="text" />
        </div>
      </div>

      <div className="sidebar_chats">
        <SidebarChat newChat />
        {rooms.map((room) => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
