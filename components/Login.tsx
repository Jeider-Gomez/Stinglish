
import React, { useState } from 'react';

interface LoginProps {
  onLogin: (username: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() && password.trim()) {
      onLogin(username);
    } else {
      setError('Please enter both username and password.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-light">
      <div className="w-full max-w-md p-8 space-y-8 bg-secondary rounded-2xl shadow-2xl">
        <div className="text-center">
            <div className="flex items-center justify-center gap-3">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 011.087.121l4 5a1 1 0 001.414 0l4-5a1 1 0 011.087-.121l2.646-1.323a1 1 0 000-1.84l-7-3zM10 6a1 1 0 00-1 1v3a1 1 0 002 0V7a1 1 0 00-1-1z" />
                </svg>
                <h1 className="text-4xl font-bold text-white">Stinglish</h1>
            </div>
          <p className="mt-2 text-gray-300">Your Personal AI English Tutor</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="text-sm font-medium text-gray-200">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 mt-1 text-white bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-gray-400"
              placeholder="e.g., alex_student"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-200">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 mt-1 text-white bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-gray-400"
              placeholder="••••••••"
            />
          </div>
          {error && <p className="text-sm text-red-400 bg-red-900/30 p-2 rounded border border-red-800">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 font-bold text-white bg-primary rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all shadow-lg transform hover:scale-[1.02]"
          >
            Start Learning
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
