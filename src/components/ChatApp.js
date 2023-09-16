import React, { useEffect, useState,useContext } from "react";
import ConversationList from "./ConversationList";
import ChatWindow from "./chatWindow";
import FriendsComponent from "./friends";
import { AuthContext } from "./AuthContext";

import "../styles/ChatApp.css"; // Import your CSS file for styling

const ChatApp = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext);//debug this

  const handleConversationSelect = (conversationId) => {
    setSelectedConversation(conversationId);
  };

  return (
    <div>
      {isLoggedIn ? (
        <div className="chat-app">
          {/* Show the Login component if not logged in */}
          {/* <button  to get chat full screen
            id="responsive-btn"
            onClick={() => {
              let val = document.getElementById("list").style.display;

              console.log(typeof val);

              if (val === "none") val = "block";
              else val = "none";

              document.getElementById("list").style.display = val;
              console.log(document.getElementById("list").style.display);
            }}
          >
            Select Chat
          </button> */}


          {/* left side List of all the chat */}
          <div id="list" className="conversation-list-container">
            {isLoggedIn && (
              <ConversationList
                selectedConversation={selectedConversation}
                onConversationSelect={handleConversationSelect}
              />
            )}
          </div>

             {/* Right side -specific- user Chat - selected from list    */}
          {localStorage.getItem("chatWindow") == "true" && (
            <div className="chat-window-container">
              {isLoggedIn && selectedConversation ? (
                <ChatWindow conversationId={selectedConversation} />
              ) : (
                <div className="no-conversation-message">
                  
                  {isLoggedIn ? (
                      <>
                        <h1 className="home__title"> Select Chat to connect </h1>
                        <p className="home__text">
                         load your chats click on one of your friends
                        </p>
                      </>
                    ) : null}

                  
                </div>
              )}
            </div>
          )}

          {localStorage.getItem("chatWindow") == "false" && (
            <div style={{ flex: 2 }}>
              <FriendsComponent />
            </div>
          )}
        </div>
      ) : (
        "You need to login first"
      )}
    </div>
  );
};

export default ChatApp;
