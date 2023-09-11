import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/Navbar.css"
function Navbar() {
  return (
    <nav className='navbar'>
      <ul>
        <li >
          <Link to="/">Login</Link>
        </li>
        <li>
          <Link to="/chat">Chat</Link>
        </li>
        <li>
          <Link to="/friends">Friends</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;