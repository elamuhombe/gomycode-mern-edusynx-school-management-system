import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CTAButton = ({ text, to }:{text:string; to: string}) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
  };

  return (
    <Link
      to={to}
      onClick={handleClick}
      className={`mt-4 inline-block ${clicked ? 'bg-red-200' : 'bg-red-400'} hover:bg-orange-400 text-white font-bold py-2 px-4 rounded-full`}
    >
      {text}
    </Link>
  );
};

export default CTAButton;
