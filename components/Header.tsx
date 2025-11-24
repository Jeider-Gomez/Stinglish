
import React from 'react';
import type { User } from '../types';

interface HeaderProps {
  user: User;
  onLogout: () => void;
  onHomeClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout, onHomeClick }) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex items-center justify-between h-16">
          <button onClick={onHomeClick} className="flex items-center gap-3 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 011.087.121l4 5a1 1 0 001.414 0l4-5a1 1 0 011.087-.121l2.646-1.323a1 1 0 000-1.84l-7-3zM10 6a1 1 0 00-1 1v3a1 1 0 002 0V7a1 1 0 00-1-1z" />
            </svg>
            <h1 className="text-2xl font-bold text-secondary">Stinglish</h1>
          </button>
          <div className="flex items-center gap-4">
            <div className="text-right">
                <span className="text-secondary font-medium hidden sm:inline">Welcome, {user.name}</span>
                <span className="block text-sm text-neutral-dark">{user.level}</span>
            </div>
            <button
              onClick={onLogout}
              className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
