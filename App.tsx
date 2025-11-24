
import React, { useState, useCallback } from 'react';
import type { AppView, User } from './types';
import { CEFRLevel } from './types';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import DiagnosticTest from './components/DiagnosticTest';
import ChatPractice from './components/ChatPractice';
import Exercise from './components/Exercise';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [view, setView] = useState<AppView>('login');
  const [exerciseTopic, setExerciseTopic] = useState<string | null>(null);

  const handleLogin = (username: string) => {
    setUser({ name: username, level: CEFRLevel.UNKNOWN });
    setView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setExerciseTopic(null);
    setView('login');
  };

  const handleTestComplete = useCallback((level: CEFRLevel) => {
    if (user) {
      setUser(prevUser => ({ ...prevUser!, level }));
    }
  }, [user]);

  const startRecommendedExercise = (topic: string) => {
    setExerciseTopic(topic);
    setView('exercise');
  };

  const handleHomeClick = () => {
      setExerciseTopic(null);
      setView('dashboard');
  }

  const renderView = () => {
    if (!user) {
      return <Login onLogin={handleLogin} />;
    }

    switch (view) {
      case 'dashboard':
        return <Dashboard user={user} setView={setView} />;
      case 'diagnostic':
        return <DiagnosticTest onTestComplete={handleTestComplete} setView={setView} onRecommendExercise={startRecommendedExercise} />;
      case 'chat':
        return <ChatPractice user={user} />;
      case 'exercise':
        return <Exercise user={user} initialTopic={exerciseTopic} onExerciseComplete={() => setExerciseTopic(null)} setView={setView}/>;
      default:
        return <Dashboard user={user} setView={setView} />;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-light font-sans text-secondary">
      {user && <Header user={user} onLogout={handleLogout} onHomeClick={handleHomeClick}/>}
      <main className="p-4 sm:p-6 md:p-8">
        {renderView()}
      </main>
    </div>
  );
}

export default App;
