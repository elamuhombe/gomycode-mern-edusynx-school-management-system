import React, { ReactNode } from "react";

// Define the props interface for your Card component
interface CardProps {
  title: string;
  description: string;
  children?: ReactNode; // Make children prop optional
}

// Define your Card component
const Card: React.FC<CardProps> = ({ title, description, children }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 m-2 w-64 h-64">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
      {children} {/* Render children if provided */}
    </div>
  );
};

export default Card;
