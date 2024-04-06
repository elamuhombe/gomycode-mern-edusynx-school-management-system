import React from 'react';
import { Link } from 'react-router-dom';
import { LinkedIn, Facebook, Mail } from '@mui/icons-material'; // Import Material Icons

interface SocialMediaIconsProps {
  // Define props here if needed
}

const SocialMediaIcons: React.FC<SocialMediaIconsProps> = () => {
  // Implement the component logic here
  return (
    <div className="social-media-icons">
      {/* LinkedIn Icon */}
      <Link to="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
        <LinkedIn className="social-media-icon" />
      </Link>
      
      {/* Facebook Icon */}
      <Link to="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
        <Facebook className="social-media-icon" />
      </Link>
      
      {/* Gmail Icon */}
      <Link to="mailto:example@gmail.com" target="_blank" rel="noopener noreferrer">
        <Mail className="social-media-icon" />
      </Link>
    </div>
  );
};

export default SocialMediaIcons;
