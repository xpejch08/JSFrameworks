// App.js

import React, { useState, useEffect } from "react";
import { w3cwebsocket as WebSocket } from "websocket";
import "./App.css"

const wsUrl = "ws://localhost:8000"; // Replace with your server URL

function App() {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const newWs = new WebSocket(wsUrl);
    newWs.onopen = () => {
      console.log("Connected to server");
    };
    newWs.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((messages) => [...messages, message]);
    };
    setWs(newWs);

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (messageInput.trim() !== "") {
      const message = {
        text: messageInput,
        user: "me",
      };
      ws.send(JSON.stringify(message));
      setMessageInput("");
    }
  };

  return (
    <div className = "mainApp">
      <h1>Chat App</h1>
      <div className="message-container">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.user === "me" ? "me" : "other"}`}>
            <div>{message.text}</div>
            <div className="user">{message.user}</div>
          </div>
        ))}
        <form class="form" onSubmit={handleMessageSubmit}>
        <input class="input" type="text" value={messageInput} placeholder="Input message here" onChange={(e) => setMessageInput(e.target.value)} />
        <button type="submit" class = "submit">Send</button>
      </form>
      </div>
    </div>
  );
}

export default App;
