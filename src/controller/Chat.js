import { Avatar, IconButton } from "@mui/material";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { React, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import useStateValue from "./StateProvider";
import "../view/Chat.css";
import db from "../model/firebase.js";
import firebase from "firebase/compat/app";

function Chat() {
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }] = useStateValue();

  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  let { roomId } = useParams();

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const sendMessage = async (e) => {
    e.preventDefault();

    db.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat_header">
        <div className="avatar">
          <Avatar
            src={`https://avatars.dicebear.com/api/adventurer-neutral/${seed}.svg`}
          />
        </div>
        <div className="chat_headerInfo">
          <h3>{roomName}</h3>
          <p>
            Last text on{" "}
            {new Date(messages[0]?.timestamp?.toDate()).toLocaleString(
              "en-US",
              {
                day: "numeric",
                month: "numeric",
                year: "numeric",

                hour: "2-digit",
                minute: "2-digit",

                hour12: false,
              }
            )}
          </p>
        </div>

        <div className="chat_headerRight">
          <Link to="/">
            <IconButton>
              <div className="header_icon">
                <CancelRoundedIcon />
              </div>
            </IconButton>
          </Link>
        </div>
      </div>

      <div className="chat_body">
        {messages.map((message) => (
          <p
            className={`chat_message ${
              message.name === user.displayName && "chat_receive"
            }`}
          >
            <span className="chat_name">
              {message.name.split(" ")[0].toLowerCase()}
            </span>
            {message.message}
            <span className="chat_time">
              {new Date(message.timestamp?.toDate()).toLocaleTimeString(
                "en-US",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                }
              )}
            </span>
          </p>
        ))}
      </div>

      <div className="chat_footer">
        <IconButton>
          <div className="chat_footer_icon">
            <EmojiEmotionsIcon />
          </div>
        </IconButton>
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your message"
            type="text"
          />
          <button onClick={sendMessage} type="submit"></button>
        </form>
      </div>
    </div>
  );
}
export default Chat;
