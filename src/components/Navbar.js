import React, {useState, useEffect, useContext} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

import "../styles/Navbar.css"
function Navbar() {
  const {isLoggedIn, setisLoggedIn} = useContext(AuthContext);
  const navigate = useNavigate();

  

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.setItem('logoutFlag', 'true');
    setisLoggedIn(false);
    navigate('/');
  };
  
  return (
    <nav className='navbar'>

{     isLoggedIn?
        (
          <ul>
        
        <li>
         <Link to="/" onClick={handleLogout}>Logout</Link>
       </li>
       <li>
         <Link to="/chat">Chat</Link>
       </li>
       <li>
         <Link to="/friends">Friends</Link>
       </li>
       
            
     </ul>

        ):
        <ul>
            <li>
         <Link to="/">Login</Link>
            </li>
        </ul>
        
        }


     
    </nav>
  );
}

export default Navbar;