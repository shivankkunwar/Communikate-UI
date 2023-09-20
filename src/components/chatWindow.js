import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import "../styles/ChatWindow.css"; // Update with the correct path for CSS // Update the path accordingly
import axios from "axios";

const ChatWindow = ({ conversationId }) => {
  console.log(localStorage.getItem("username"));

  const [newMessage, setNewMessage] = useState("");
  const [messages, setConversation] = useState([]);
  const messageListRef = useRef(null);

  useEffect(() => {
    // fetch("https://mern-api-9vf7.onrender.com/getchats", {
    //   headers: {
    //     from: localStorage.getItem("token"),
    //     to: conversationId,
    //   },
    // })
    //   .then((res) => res.json())
    axios.get("https://mern-api-9vf7.onrender.com/getchats", {
        headers: {
          from: localStorage.getItem("token"),
          to: conversationId,
        }
      })
      .then((res) => {
        setConversation(res.data.msgs);
      });
  }, [conversationId]);

  // Establish socket connection

  useEffect(() => {
    console.log("ndfhhd");
    const socket = io("https://mern-api-9vf7.onrender.com/", {
      transports: ["websocket", "polling", "flashsocket"],
      auth: {
        token: localStorage.getItem("token"),
        // Replace with the actual token
      },
    });

    socket.on("send", (res) => {
      console.log(res);
      setConversation(res.msgs);
    });

    return () => {
      if (socket.readyState === 1) {
        // <-- This is important
        socket.disconnect();
      }
    };
  }, []);

  //   Empty dependency array to run this effect only once

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const socket = io("https://mern-api-9vf7.onrender.com/", {
      transports: ["websocket", "polling", "flashsocket"],
      auth: {
        token: localStorage.getItem("token"),
        to: conversationId, // Replace with the actual token
      },
    });

    socket.emit("send", {
      fromtoken: localStorage.getItem("token"),
      to: conversationId,
      content: newMessage,
      time: new Date().toLocaleTimeString(),
    });

    socket.on("send", (res) => {
      console.log(res);
      setConversation(res.msgs);
    });

    // Event listener for receiving messages

    // const newMessageObj = {
    //   id: conversation.messages.length + 1,
    //   sender: 'You',
    //   text: newMessage,
    //   timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    // };

    // const updatedConversation = {
    //   ...conversation,
    //   messages: [...conversation.messages, newMessageObj],
    // };

    // setConversation(updatedConversation);
    setNewMessage("");

    // Scroll to the bottom of the message list after a short delay to ensure rendering
    setTimeout(() => {
      const messageList = messageListRef.current;
      if (messageList) {
        messageList.scrollTop = messageList.scrollHeight;
      }
    }, 100); // Adjust the delay as needed
  };

  //   if (!conversation) {
  //     return <div className="chat-window">Loading...</div>;
  //   }

  return (
    <div className="chat-window">
      <div className="chat-header">
        {<h2 className="chat-title">{localStorage.getItem("username")}</h2>}
      </div>
      <div className="message-list" ref={messageListRef}>
        {messages &&
          messages.map((message) => (
            <div
              key={message._id}
              className={`message ${
                message.to === conversationId ? "sent" : "received"
              }`}
            >
              <div className="message-content">
                <p className="message-text">{message.content}</p>
                <p className="message-timestamp">{message.timestamp}</p>
              </div>
            </div>
          ))}
      </div>
      <div className="message-input-container">
        <div className="message-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(event) => setNewMessage(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSendMessage();
                event.preventDefault(); // Prevents the addition of a new line in the input after pressing 'Enter'
              }
            }}
          />
          <button className="send-button" onClick={handleSendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
