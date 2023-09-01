import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ForgotPassword from '../forgetpassword';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [IsPasswordCorrect, setIsPasswordCorrect] = useState(true);

  // Post method to send the entered email and password to verify
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:5000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
  
        if (response.ok) {
          const userData = await response.json();
          // Redirect to profile page and pass user data
          navigate('/profile', { state: { user: userData } });
        } else {
            setIsPasswordCorrect(false);
            const errorData = await response.json();
            console.error('Error logging in:', errorData.error);
          }
      } catch (error) {
        console.error('Error logging in:', error);
      }
    };
  
    


    return (
      <div className="login-page">
        <div className="auth-form-l">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {!IsPasswordCorrect && <p style={{ color: 'red' }}>passwords did'nt matched</p>}
            {!IsPasswordCorrect && <button onClick={() => setShowForgotPasswordModal(true)}>Forgot Password</button>}
            {showForgotPasswordModal && (
            <ForgotPassword
            closeModal={() => setShowForgotPasswordModal(false)}
            />
      )}
            <button type="submit">Login</button>
            <p>Dont have account <Link to="/signup"> Register here</ Link></p>
          </form>
        </div>
        </div>
      );
    };

export default Login;