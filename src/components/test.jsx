

// [09:55] Lokesh Sukhela

// import React, { useState } from 'react';

// import { useNavigate } from 'react-router-dom';

 

// const Signup = () => {

//   const [name, setName] = useState('');

//   const [email, setEmail] = useState('');

//   const [password, setPassword] = useState('');

//   const [dob, setDob] = useState('');

//   const [phno, setPhno] = useState('');

//   const [adharnum, setAdharnum] = useState('');

 

//   const [confirmpassword, setConfirmPassword] = useState('');

//   const [passwordsMatch, setPasswordsMatch] = useState(true);

//   const navigate = useNavigate();

 

//   const handleSignUp = async (e) => {

//     e.preventDefault();

 

//     if (password !== confirmpassword) {

//       console.error("password and confirm password din't matched");

//       alert("password and confirm password din'nt match");

//       setPasswordsMatch(false);

//       return;

//     }

 

//     try {

//       const response = await fetch('http://localhost:3000/signup', {

//         method: 'POST',

//         headers: {

//           'Content-Type': 'application/json',

//         },

//         body: JSON.stringify({ name, email, password, dob, phno, adharnum }),

//       });

 

//       const data = await response.json();

//       console.log('Signed up successfully with ID:', data.id);

//       alert("Registration successful");

//       navigate('/login');

//     }

//     catch (error) {

//       console.error('Error signing up:', error);

//     }

//   };

 

 

//   return (

//     <div className="auth-form">

//       <h2>Sign Up</h2>

//       <form onSubmit={handleSignUp}>

//         <input type="text" class="input-feild" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />

//         <input type="email" class="input-feild" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />

//         <input type="password" class="input-feild" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />

//         <input type="date" class="input-feild" placeholder="date of birth" value={dob} onChange={(e) => setDob(e.target.value)} required />

//         <input type="text" class="input-feild" placeholder="phone number" value={phno} onChange={(e) => setPhno(e.target.value)} required />

//         <input type="text" class="input-feild" placeholder="adhar number" value={adharnum} onChange={(e) => setAdharnum(e.target.value)} required />

//         <input type="password" class="input-feild" placeholder=" confirm Password" value={confirmpassword} onChange={(e) => {

//           setConfirmPassword(e.target.value);

//           setPasswordsMatch(e.target.value === password);

//         }} required />

//         {!passwordsMatch && <p style={{ color: 'red' }}>passwords did'nt matched</p>}

//         <button type="submit">Sign Up</button>

//       </form>

//     </div>

//   );

// };

 

// export default Signup;