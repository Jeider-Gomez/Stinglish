
import React from 'react';
import Card from './common/Card';
import type { AppView, User } from '../types';

interface DashboardProps {
  user: User;
  setView: (view: AppView) => void;
}

const icons = {
  diagnostic: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLineCap="round" strokeLineJoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  ),
  chat: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLineCap="round" strokeLineJoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
  exercise: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLineCap="round" strokeLineJoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  ),
};

const Dashboard: React.FC<DashboardProps> = ({ user, setView }) => {
  return (
    <div className="container mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-secondary">Welcome, {user.name}!</h2>
        <p className="text-lg text-neutral-dark mt-2">I'm Stinglish, ready to help you improve your English. What would you like to do today?</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card
          title="Start Diagnosis"
          description="Take a short test to determine your English level and get personalized exercises."
          icon={icons.diagnostic}
          onClick={() => setView('diagnostic')}
        />
        <Card
          title="Conversational Practice"
          description="Practice your speaking and listening skills in a real-time simulated conversation."
          icon={icons.chat}
          onClick={() => setView('chat')}
        />
        <Card
          title="Grammar/Vocabulary"
          description="Sharpen your skills with targeted exercises on specific topics."
          icon={icons.exercise}
          onClick={() => setView('exercise')}
        />
      </div>
    </div>
  );
};

export default Dashboard;
