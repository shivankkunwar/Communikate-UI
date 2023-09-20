import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ConversationList.css";
import axios from "axios";

const ConversationList = ({ selectedConversation, onConversationSelect }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [allfriends, setallfriends] = useState([]);
  const [all, setall] = useState([]);

  const handleSearch = () => {
    if (searchQuery == "") {
      console.log("ddd");
      setSearchResults([]);
      return;
    }
    const results = all.filter((conversation) => {
      return conversation.username
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    });
    console.log("results", results);
    setSearchResults(results);
  };

  console.log(searchResults);
  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  const handleSendRequest = (conversationId) => {
    // fetch("https://mern-api-9vf7.onrender.com/friends/request", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     token: localStorage.getItem("token"),
    //     to: conversationId,
    //   }),
    // });

    axios.post("https://mern-api-9vf7.onrender.com/friends/request", {
      token: localStorage.getItem("token"),
      to: conversationId,
    });
  };

  console.log("all", all);
  console.log("allfriends", allfriends);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.setItem("logoutFlag", "true");
    navigate("/");
  };

  const handleFriends = () => {
    localStorage.setItem("chatWindow", "false");
    localStorage.setItem("freinds", "true");
    window.location.reload();
  };

  const handleChat = () => {
    localStorage.setItem("chatWindow", "true");
    localStorage.setItem("freinds", "false");
    window.location.reload();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const getFriends = () => {
    // fetch("https://mern-api-9vf7.onrender.com/friends/getfriends", {
    //   headers: {
    //     token: localStorage.getItem("token"),
    //   },
    // })
    axios
      .get("https://mern-api-9vf7.onrender.com/friends/getfriends", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })

      .then((res) => {
        setallfriends(res.data.users);
        if (res.data.users.length === 0) {
          navigate("/friends");
        }
      });
  };
  // fetching all users for search

  const getall = () => {
    // fetch("https://mern-api-9vf7.onrender.com/allusers/allusers")
    //   .then((res) => res.json())
      axios.get("https://mern-api-9vf7.onrender.com/allusers/allusers")
      .then((res) => setall(res.data.allusers));
  };
  useEffect(() => {
    getFriends();

    getall();
  }, []);

  return (
    <>
      <div className="search-people">
        <input
          type="text"
          placeholder="Search people..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
      </div>
      <div id="list" className="conversation-list">
        {searchQuery.length > 0 && (
          <div className="search-results">
            <h4>Search Results</h4>
            {searchResults.map((conversation) => (
              <div key={conversation._id} className="search-result">
                <div className="profile-pic">
                  <img
                    src={
                      "https://www.imagediamond.com/blog/wp-content/uploads/2020/06/cartoon-boy-images-4.jpg"
                    }
                    alt={`Profile of ${conversation.name}`}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  className="search-result-info"
                >
                  <h4 className="name">{conversation.username}</h4>
                  <button
                    style={{
                      backgroundColor: "rgb(231, 176, 176)",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      padding: "10px 20px",
                      fontSize: "8px",
                      cursor: "pointer",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                      transition: "background-color 0.3s, transform 0.3s",
                    }}
                    id="sendreq"
                    onClick={() => {
                      handleSendRequest(conversation._id);
                    }}
                  >
                    {allfriends.includes(conversation)
                      ? "Friend"
                      : "Send Request"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* <div className="menu-container">
          <div className="menu-toggle" onClick={toggleMenu}>
            <div className={`menu-icon ${isMenuOpen ? "open" : ""}`}>
              &#9776;
            </div>
          </div>
          <div
            id="men"
            onClick={() => {
              document.getElementById("men").style.display =
                document.getElementById("men").style.display == "block"
                  ? "none"
                  : "block";
            }}
            className={`menu ${isMenuOpen ? "open" : ""}`}
          >
            <button onClick={handleLogout} className="menu-item">
              Logout
            </button>
            <button onClick={handleFriends} className="menu-item">
              Friends
            </button>
            <button onClick={handleChat} className="menu-item">
              Chat
            </button>
          </div>
        </div> */}

        {allfriends.map((conversation) => (
          <div
            key={conversation._id}
            className={`conversation ${
              selectedConversation === conversation._id ? "active" : ""
            }`}
            onClick={() => {
              localStorage.setItem("chatWindow", "true");
              localStorage.setItem("freinds", "false");
              localStorage.setItem("username", conversation.username);

              if (window.innerWidth <= "800px") {
                let val = document.getElementById("list").style.display;

                console.log(typeof val);

                if (val === "none") val = "block";
                else val = "none";

                document.getElementById("list").style.display = val;
              }

              onConversationSelect(conversation._id);
            }}
          >
            <div className="profile-pic">
              <img
                src="https://www.imagediamond.com/blog/wp-content/uploads/2020/06/cartoon-boy-images-4.jpg"
                alt={`Profile of ${conversation.name}`}
              />
            </div>
            <div className="conversation-info">
              <h4 className="name">{conversation.username}</h4>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ConversationList;
