import React from 'react';
import './CTAButton.css';

interface CTAButtonProps {
  text: string;
  onClick: () => void;
}

const CTAButton: React.FC<CTAButtonProps> = ({ text, onClick }) => {
  return (
    <button className="cta-button" onClick={onClick}>
      {text}
    </button>
  );
};

export default CTAButton;
