import React, { useState } from 'react';
// Gets additional details of the user
const EditProfileModal = ({ closeModal, profileDetails, onSaveProfile }) => {
  const [editedDetails, setEditedDetails] = useState({
    dob: profileDetails.dob || '',
    mobile: profileDetails.mobile || '',
    designition: profileDetails.designition || '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSaveProfile(editedDetails);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Profile</h2>
        <label>Date of Birth: </label>
        <input type="text" name="dob" value={editedDetails.dob} onChange={handleInputChange} />
        <label>Mobile: </label>
        <input type="text" name="mobile" value={editedDetails.mobile} onChange={handleInputChange} />
        <label>Designition: </label>
        <input type="text" name="designition" value={editedDetails.designition} onChange={handleInputChange} />
        <div><button onClick={handleSave}>Save</button></div>
        <button onClick={closeModal}>Cancel</button>
      </div>
    </div>
  );
};

export default EditProfileModal;
