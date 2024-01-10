import React, { useState, useEffect } from 'react';
import './chatapp.css';

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []); // The empty array ensures this effect runs only once after the initial render

const fetchMessages = async () => {
  try {
    const response = await fetch("http://localhost:5296/api/chat");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Fetched messages:", data); // Log the fetched messages
    setMessages(data);
  } catch (error) {
    console.error("Could not fetch messages: ", error);
  }
};


const deleteMessages = async () => {
  try {
    const response = await fetch("http://localhost:5296/api/chat", {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = [];
    console.log("Deleted messages:", data); // Log the fetched messages
    setMessages(data);
  } catch (error){
    console.error("Could not delete messages: ", error);
  }
}

  const handleSendMessage = async (e) => {
    e.preventDefault(); // Prevent page reload on form submit
    if (!newMessage.trim()) return; // Do not send empty messages

    try {
      const response = await fetch("http://localhost:5296/api/chat", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newMessage }),
      });

      if (response.ok) {
        setNewMessage('');
        fetchMessages(); // Re-fetch messages to update the list
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Could not send message: ", error);
    }
  };

  return (
    <div className="chat-container">
      <header className="chat-header">
        <h1>Free for all chat</h1>
      </header>
      <ul className="message-list">
        {messages.map((message, index) => (
          <li key={index} className={message.isUser ? 'user-message' : 'other-message'}>
            <span className="message-text">{message}</span>
          </li>
        ))}
      </ul>
      <form className="input-container" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit">Send</button>
        <button type="button" onClick={deleteMessages}>delete</button>
      </form>
    </div>
  );
};

export default ChatApp;
