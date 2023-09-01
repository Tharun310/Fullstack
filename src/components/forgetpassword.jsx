import React, { useState } from 'react';

const ForgotPassword = ({ closeModal, handleChangePassword }) => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleChangePassword(email, newPassword);
    closeModal();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Forgot Password</h2>
        {!isPasswordChanged ? (
          <form onSubmit={handleSubmit}>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>New Password:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button type="submit">Change Password</button>
            <button onClick={closeModal}>Cancel</button>
          </form>
        ) : (
          <p>Password changed successfully.</p>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
