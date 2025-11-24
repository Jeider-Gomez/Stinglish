
import React from 'react';

interface CardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ title, description, icon, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center p-6 text-center bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out border border-neutral focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
    >
      <div className="mb-4 text-primary">{icon}</div>
      <h3 className="mb-2 text-xl font-bold text-secondary">{title}</h3>
      <p className="text-neutral-dark">{description}</p>
    </button>
  );
};

export default Card;
