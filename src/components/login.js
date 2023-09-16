// HomePage.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import '../styles/HomePage.css'; // Import your CSS file for styling

const Login = () => {

    const { isLoggedIn, setisLoggedIn } = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();

   
   

    useEffect(() => {
        if (localStorage.getItem('logoutFlag') === 'true')
            setTimeout(() => {
                localStorage.removeItem('logoutFlag');
                document.getElementById('msg').style.display='none' // Trigger re-render to remove the message
            }, 5000);
    }, [])




    const [activeForm, setActiveForm] = useState('login');
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const toggleForm = () => {
        setActiveForm(activeForm === 'login' ? 'signup' : 'login');
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (activeForm === 'signup'){
            fetch('https://mern-api-9vf7.onrender.com/allusers/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: formData.username, email: formData.email, password: formData.password })
            })
            
             setActiveForm('login')
        }
        else {

            fetch('https://mern-api-9vf7.onrender.com/allusers/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: formData.username, password: formData.password })
            }).then(res => res.json()).then(res => {
                if (res.token) {
                    localStorage.setItem('token', res.token);
                    setisLoggedIn(true);
                    navigate('/chat')
                }
            });


        }

        // Handle login or signup logic here
        console.log('Form submitted:', formData);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div className="home-page">
            {(localStorage.getItem('logoutFlag') == 'true') && <div id='msg' style={{
                background: '#63a69f',
                color: '#fff',
                padding: '10px',
                textAlign: 'center',
                position: 'fixed',
                top: '0',
                left: '0',
                right: '0',
                zIndex: '999',
                animation: 'slideIn 0.5s ease-in-out',
                fontFamily: 'Arial, sans-serif',
            }}>
                Successfully Logged Out
            </div>}
            <div className="form-container">
                <div className="form-tabs">
                    <button
                        className={`tab-button ${activeForm === 'login' ? 'active' : ''}`}
                        onClick={() => setActiveForm('login')}
                    >
                        Log In
                    </button>
                    <button
                        className={`tab-button ${activeForm === 'signup' ? 'active' : ''}`}
                        onClick={() => setActiveForm('signup')}
                    >
                        Sign Up
                    </button>
                </div>
                <form className="login-form" onSubmit={handleSubmit}>
                    {activeForm === 'signup' && (
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    )}

                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <button type="submit">{activeForm === 'login' ? 'Log In' : 'Sign Up'}</button>
                </form>
                <p className="toggle-form" onClick={toggleForm}>
                    {activeForm === 'login'
                        ? 'Don\'t have an account? Sign up'
                        : 'Already have an account? Log in'}
                </p>
            </div>
        </div>
    );
};

export default Login;
