import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './signup.css'

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [registeredUser, setRegisteredUser] = useState(false);
  const [confirmpassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      setPasswordsMatch(false);

      return;

    }


// Post api call to send data to the database
    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
    //Condition to check if the user is already registered
      if(data.id === undefined){
        setRegisteredUser(true)
      }
      else{
      console.log('Signed up successfully with ID:', data.id);
      navigate('/login');
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
   <div className="main-container-s signup-page"> 
    <div className="auth-form-s">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
      <input
          type="text"
          placeholder="Name"
          name = "name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          name="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {registeredUser && <p style={{ color: 'red' }}>email already registerd</p>}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input 
        type="password"  
        name="confirmpassword"
        placeholder=" confirm Password" 
        value={confirmpassword} 
        onChange={(e) => {setConfirmPassword(e.target.value);
          setPasswordsMatch(e.target.value === password);
        }} required />
        {!passwordsMatch && <p style={{ color: 'red' }}>passwords did'nt matched</p>}
        <button type="submit">Sign Up</button>
        <p>Already have account<Link to = '/login'> signin</Link></p>
      </form>
    </div>
    </div>
  );
};

export default Signup;
