import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import EditProfileModal from './editprofile';
import './profile.css'

const Profile = () => {
  const location = useLocation();
  const user = location.state.user;
  const [showModal, setShowModal] = useState(false);
  const [profileDetails, setProfileDetails] = useState({
    dob: '',
    mobile: '',
    designition: '',
  });

  useEffect(() => {
    // Fetch user's additional details from the server (if available)
    fetchProfileDetails();
  }, []);

  const fetchProfileDetails = async () => {
    try {
      // Get api call to the profile details of loggedin user
      const response = await fetch(`http://localhost:5000/profile/${user.email}`);
      const data = await response.json();
      console.log(data)
      setProfileDetails(data);
    } catch (error) {
      console.error('Error fetching profile details:', error);
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSaveProfile = async (updatedDetails) => {
    try {
      console.log(updatedDetails)
      // Put api call to update the additional detais of the user
      await fetch(`http://localhost:5000/profile/${user.email}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedDetails),
      });

      fetchProfileDetails(); // Refresh the profile details after saving
      closeModal();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="profile">
      <h2>Profile</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      {profileDetails.dob && <p>Date of birth: {profileDetails.dob}</p>}
      {profileDetails.mobile && <p>Mobile: {profileDetails.mobile}</p>}
      {profileDetails.designition && <p>Designition: {profileDetails.designition}</p>}
      <button onClick={openModal}>Edit Profile</button>
      {showModal && (
        <EditProfileModal
          closeModal={closeModal}
          profileDetails={profileDetails}
          onSaveProfile={handleSaveProfile}
        />
      )}
    </div>
  );
};

export default Profile;
