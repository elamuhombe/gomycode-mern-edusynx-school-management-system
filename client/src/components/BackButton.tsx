import React from 'react';
import { FaArrowLeft } from 'react-icons/fa'; // Import the FaArrowLeft icon
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <button onClick={goBack} style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
      <FaArrowLeft style={{ marginRight: '5px' }} /> {/* Use the FaArrowLeft icon */}
      <span>Back</span>
    </button>
  );
};

export default BackButton;
