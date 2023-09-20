import React, { useState, useEffect } from "react";
import "../styles/FriendsComponent.css";
import axios from "axios";
const FriendsComponent = () => {
  const [activeTab, setActiveTab] = useState("allFriends");
  const [searchGlobal, setSearchGlobal] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [all, setall] = useState([]);
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  useEffect(() => {
    handleSearch();
  }, [searchGlobal]);

  const [allFriendsData, setAllFriendsData] = useState([]);

  const handleSearch = () => {
    if (searchGlobal == "") {
      console.log("ddd");
      setSearchResults([]);
      return;
    }
    const results = all.filter((conversation) => {
      return conversation.username
        .toLowerCase()
        .includes(searchGlobal.toLowerCase());
    });
    console.log("results", results);
    setSearchResults(results);
  };
  //to fetch all the users
  const API_BASE_URL = "https://mern-api-9vf7.onrender.com";

  const getall = () => {
    axios
      .get(`${API_BASE_URL}/allusers/allusers`)
      .then((res) => {
        setall(res.data.allusers);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getFriends = () => {
    axios
      .get(`${API_BASE_URL}/friends/getfriends`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setAllFriendsData(res.data.users);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [friendRequestsData, setFriendRequestsData] = useState([
    // Add more friend requests here
  ]);

  const getrequest = () => {
    axios
      .get(`${API_BASE_URL}/friends/getrequest`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
        setFriendRequestsData(res.data.users);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    getFriends();
    getrequest();
    getall();
  }, []);
  const handleSendRequest = (conversationId) => {
    axios
      .post(`${API_BASE_URL}/friends/request`, {
        token: localStorage.getItem("token"),
        to: conversationId,
      })
      .catch((error) => {
        console.error(error);
      });
  };

  function handleAccept(id) {
    axios
      .get(`${API_BASE_URL}/friends/accept`, {
        headers: {
          token: localStorage.getItem("token"),
          id: id,
        },
      })
      .then((res) => {
        if (res.data.status === "successful") {
          getrequest();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleReject(id) {
    axios
      .get(`${API_BASE_URL}/friends/reject`, {
        headers: {
          token: localStorage.getItem("token"),
          id: id,
        },
      })
      .then((res) => {
        if (res.data.status === "successful") {
          getrequest();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="friends-component">
      <div className="search-global">
        <input
          type="text"
          placeholder="Search people..."
          value={searchGlobal}
          onChange={(e) => {
            setSearchGlobal(e.target.value);
          }}
        />
      </div>
      {searchGlobal.length > 0 && (
        <div className="search-results">
          {searchResults.map((conversation) => {
            const isFriend = allFriendsData.some(
              (friend) => friend._id === conversation._id
            );

            // Conditionally render based on whether the conversation is not a friend
            if (!isFriend) {
              return (
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
                      width: "30vw",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                    className="search-result-info"
                  >
                    <h4 className="name">{conversation.username}</h4>
                    <button
                      id="sendreq"
                      onClick={() => {
                        handleSendRequest(conversation._id);
                      }}
                    >
                      Send Request
                    </button>
                  </div>
                </div>
              );
            }

            // Return null if the conversation is a friend (nothing will be rendered)
            return null;
          })}
        </div>
      )}
      <div className="tabs">
        <button
          className={`friend-buttons ${
            activeTab === "allFriends" ? "active" : ""
          }`}
          onClick={() => {
            handleTabChange("allFriends");
            getFriends();
          }}
        >
          All Friends
        </button>
        <button
          className={`friend-buttons ${
            activeTab === "requests" ? "active" : ""
          }`}
          onClick={() => {
            handleTabChange("requests");
            getrequest();
          }}
        >
          Requests
        </button>
        <button
          className={`friend-buttons ${
            activeTab === "sentRequests" ? "active" : ""
          }`}
          onClick={() => {
            handleTabChange("sentRequests");
            getrequest();
          }}
        >
          Sent Requests
        </button>
      </div>
      <div className="content">
        {activeTab === "allFriends" && (
          <div className="friends-list">
            {allFriendsData.map((friend) => (
              <div key={friend._id} className="friend-item">
                <img
                  src="https://www.imagediamond.com/blog/wp-content/uploads/2020/06/cartoon-boy-images-4.jpg"
                  alt={friend.name}
                />
                <p>{friend.username}</p>
              </div>
            ))}
          </div>
        )}
        {activeTab === "requests" && (
          <div className="requests-list">
            {friendRequestsData.map((request) => (
              <div key={request._id} className="request-item">
                <img
                  src="https://www.imagediamond.com/blog/wp-content/uploads/2020/06/cartoon-boy-images-4.jpg"
                  alt={request.username}
                />
                <p>{request.username}</p>
                <button
                  className="accept-button"
                  onClick={() => {
                    handleAccept(request._id);
                  }}
                >
                  Accept
                </button>
                <button
                  className="reject-button"
                  onClick={() => {
                    handleReject(request._id);
                  }}
                >
                  Reject
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendsComponent;
