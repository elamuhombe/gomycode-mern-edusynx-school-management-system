import React from 'react';


interface CTAButtonProps {
  text: string;
  onClick: () => void;
}

const CTAButton: React.FC<CTAButtonProps> = ({ text, onClick }) => {
  return (
 
        <button className="bg-red-400 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-full mt-4" onClick={onClick}>
      {text}
    </button>
   
    
  );
};

export default CTAButton;
