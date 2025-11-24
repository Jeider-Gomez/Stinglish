
import React, { useState, useEffect } from 'react';
import type { User, AppView, ExerciseQuestion } from '../types';
import { topics } from '../services/geminiService';
import { exerciseQuestions } from '../services/questionBank';

interface ExerciseProps {
    user: User;
    initialTopic: string | null;
    onExerciseComplete: () => void;
    setView: (view: AppView) => void;
}

const Exercise: React.FC<ExerciseProps> = ({ user, initialTopic, onExerciseComplete, setView }) => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [questions, setQuestions] = useState<ExerciseQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: string}>({});
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (initialTopic) {
        handleStartExercise(initialTopic);
    }
  }, [initialTopic]);

  const handleStartExercise = (topic: string) => {
    setSelectedTopic(topic);
    const generatedQuestions = exerciseQuestions[topic] || [];
    setQuestions(generatedQuestions);
  };
  
  const handleAnswerSelect = (questionIndex: number, answer: string) => {
    setSelectedAnswers(prev => ({ ...prev, [questionIndex]: answer }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
    } else {
        setIsFinished(true);
    }
  }
  
  const resetExercise = () => {
    setSelectedTopic(null);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setIsFinished(false);
    if (initialTopic) {
      onExerciseComplete();
    }
  };

  if (!selectedTopic) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-secondary mb-4">Grammar & Vocabulary Exercises</h2>
        <p className="text-neutral-dark mb-6">Choose a topic to practice:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {topics.map(topic => (
            <button key={topic} onClick={() => handleStartExercise(topic)} className="p-4 text-left font-semibold text-primary bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              {topic}
            </button>
          ))}
        </div>
      </div>
    );
  }
  
  if (questions.length === 0) {
     return (
        <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-lg mx-auto">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
            <p className="text-neutral-dark mb-6">We couldn't find an exercise for "{selectedTopic}". Please try another topic.</p>
            <button onClick={resetExercise} className="px-6 py-2 font-semibold text-white bg-primary rounded-md hover:bg-opacity-90">
              Choose another topic
            </button>
        </div>
    );
  }
  
  if (isFinished) {
    const score = Object.keys(selectedAnswers).reduce((acc, key) => {
        const qIndex = parseInt(key, 10);
        if (selectedAnswers[qIndex] === questions[qIndex].correctAnswer) {
            return acc + 1;
        }
        return acc;
    }, 0);
    return (
        <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-lg mx-auto">
            <h2 className="text-3xl font-bold text-secondary mb-4">Exercise Complete!</h2>
            <p className="text-xl font-semibold text-primary mb-6">Your score: {score} / {questions.length}</p>
             <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button onClick={resetExercise} className="px-6 py-2 font-semibold text-white bg-primary rounded-md hover:bg-opacity-90">
                  Try another topic
                </button>
                <button onClick={() => { resetExercise(); setView('dashboard'); }} className="px-6 py-2 font-semibold text-primary rounded-md hover:bg-neutral-light border border-neutral">
                  Back to Dashboard
                </button>
            </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const userAnswer = selectedAnswers[currentQuestionIndex];

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-xl font-bold text-secondary mb-2">{selectedTopic}</h2>
        <p className="text-sm text-neutral-dark mb-4">Question {currentQuestionIndex + 1} of {questions.length}</p>
        <h3 className="text-2xl font-semibold text-secondary mb-6">{currentQuestion.question}</h3>
        <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
                const isSelected = userAnswer === option;
                const isCorrect = currentQuestion.correctAnswer === option;
                
                let buttonClass = "w-full text-left p-4 rounded-lg border-2 transition-colors duration-300";
                if (userAnswer) {
                    if (isSelected) {
                        buttonClass += isCorrect ? ' bg-green-100 border-green-500 text-green-800' : ' bg-red-100 border-red-500 text-red-800';
                    } else if (isCorrect) {
                         buttonClass += ' bg-green-100 border-green-500 text-green-800';
                    } else {
                        buttonClass += ' bg-white border-neutral text-neutral-dark opacity-70';
                    }
                } else {
                     buttonClass += ' bg-white border-neutral hover:bg-neutral-light hover:border-accent';
                }

                return (
                    <button key={index} onClick={() => handleAnswerSelect(currentQuestionIndex, option)} disabled={!!userAnswer} className={buttonClass}>
                        {option}
                    </button>
                )
            })}
        </div>
        {userAnswer && (
            <div className={`mt-6 p-4 rounded-lg ${userAnswer === currentQuestion.correctAnswer ? 'bg-green-50' : 'bg-red-50'}`}>
                <h4 className="font-bold">{userAnswer === currentQuestion.correctAnswer ? 'Correct!' : 'Needs improvement!'}</h4>
                <p className="text-sm mt-1">{currentQuestion.explanation}</p>
            </div>
        )}
        {userAnswer && (
            <div className="mt-6 text-right">
                <button onClick={handleNext} className="px-6 py-2 font-semibold text-white bg-primary rounded-md hover:bg-opacity-90">
                    {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish'}
                </button>
            </div>
        )}
    </div>
  );
};

export default Exercise;