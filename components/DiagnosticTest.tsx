
import React, { useState, useEffect, useCallback } from 'react';
import type { AppView, DiagnosticQuestion, IncorrectAnswer } from '../types';
import { CEFRLevel } from '../types';
import { getWeaknessTopic } from '../services/geminiService';
import { getRandomDiagnosticQuestions } from '../services/questionBank';
import Loader from './common/Loader';

interface DiagnosticTestProps {
  onTestComplete: (level: CEFRLevel) => void;
  setView: (view: AppView) => void;
  onRecommendExercise: (topic: string) => void;
}

const DiagnosticTest: React.FC<DiagnosticTestProps> = ({ onTestComplete, setView, onRecommendExercise }) => {
  // Load 10 random questions on mount
  const [questions, setQuestions] = useState<DiagnosticQuestion[]>([]);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  
  // State for different answer types
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [textInput, setTextInput] = useState('');
  const [orderedWords, setOrderedWords] = useState<string[]>([]);
  
  const [incorrectAnswers, setIncorrectAnswers] = useState<IncorrectAnswer[]>([]);
  const [recommendedTopic, setRecommendedTopic] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    // Generate fresh questions every time the component mounts
    setQuestions(getRandomDiagnosticQuestions());
  }, []);

  const getLevel = useCallback((finalScore: number): CEFRLevel => {
    if (questions.length === 0) return CEFRLevel.UNKNOWN;
    const percentage = (finalScore / questions.length) * 100;
    if (percentage < 40) return CEFRLevel.A1;
    if (percentage < 70) return CEFRLevel.A2;
    return CEFRLevel.B1;
  }, [questions.length]);

  const finalizeTest = async (finalScore: number, finalIncorrectAnswers: IncorrectAnswer[]) => {
      setIsAnalyzing(true);
      const finalLevel = getLevel(finalScore);
      onTestComplete(finalLevel);

      if (finalIncorrectAnswers.length > 0) {
          const topic = await getWeaknessTopic(finalIncorrectAnswers);
          setRecommendedTopic(topic);
      }
      
      setIsAnalyzing(false);
      setIsFinished(true);
  };

  const submitAnswer = (userResponse: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    let updatedScore = score;
    let updatedIncorrectAnswers = [...incorrectAnswers];
    
    // Normalize string for comparison (trim and lowercase)
    const isCorrect = userResponse.trim().toLowerCase() === currentQuestion.correctAnswer.trim().toLowerCase();

    if (isCorrect) {
      updatedScore++;
      setScore(s => s + 1);
    } else {
        const newIncorrect = {
            question: currentQuestion.question,
            userAnswer: userResponse,
            correctAnswer: currentQuestion.correctAnswer,
        };
        updatedIncorrectAnswers.push(newIncorrect);
        setIncorrectAnswers(prev => [...prev, newIncorrect]);
    }

    // Small delay to show feedback if needed (optional), then move on
    setTimeout(() => {
      // Reset interaction states
      setSelectedOption(null);
      setTextInput('');
      setOrderedWords([]);

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        finalizeTest(updatedScore, updatedIncorrectAnswers);
      }
    }, 500); // Fast transition
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    submitAnswer(option);
  };

  // Logic for Word Ordering
  const handleWordClick = (word: string) => {
      if (!orderedWords.includes(word)) {
          setOrderedWords([...orderedWords, word]);
      }
  };
  
  const handleResetOrder = () => {
      setOrderedWords([]);
  };

  const handleSubmitOrder = () => {
      const sentence = orderedWords.join(' ');
      submitAnswer(sentence);
  };

  const handleSubmitText = (e: React.FormEvent) => {
      e.preventDefault();
      if(textInput.trim()) {
          submitAnswer(textInput);
      }
  };

  if (questions.length === 0) {
      return <div className="p-8 text-center"><Loader text="Preparing your test..." /></div>;
  }

  if (isFinished) {
    const finalLevel = getLevel(score);
    return (
      <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-lg mx-auto border-2 border-primary">
        <h2 className="text-3xl font-bold text-secondary mb-4">🎉 Test Complete! 🎉</h2>
        <div className="text-6xl mb-4">🏆</div>
        <p className="text-neutral-dark mb-2 text-lg">You answered <span className="font-bold text-primary">{score}</span> out of {questions.length} questions correctly.</p>
        <p className="text-2xl font-bold text-secondary mb-6 mt-4">Level: <span className="text-primary">{finalLevel}</span></p>
        
        {isAnalyzing && <Loader text="AI is analyzing your results..." size="sm" />}
        
        {!isAnalyzing && recommendedTopic && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-accent animate-pulse">
                <p className="font-semibold text-secondary">🤖 AI Recommendation:</p>
                <p className="text-neutral-dark mt-1">Focus your practice on:</p>
                <p className="text-xl font-bold text-primary my-3 uppercase tracking-wide">{recommendedTopic}</p>
                 <button
                    onClick={() => onRecommendExercise(recommendedTopic)}
                    className="w-full mt-2 px-6 py-3 font-bold text-white bg-primary rounded-full hover:bg-opacity-90 transition-transform hover:scale-105 shadow-lg"
                >
                    Start Practice: {recommendedTopic}
                </button>
            </div>
        )}

        <button
          onClick={() => setView('dashboard')}
          className="mt-6 px-8 py-3 font-semibold text-primary hover:bg-neutral-light rounded-full border border-primary transition-colors"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg border border-neutral">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-bold text-primary">QUESTION {currentQuestionIndex + 1} / {questions.length}</span>
            <span className="text-xs text-neutral-dark uppercase tracking-widest">{currentQuestion.type.replace('-', ' ')}</span>
        </div>
        <div className="w-full bg-neutral rounded-full h-3 mt-1">
          <div className="bg-primary h-3 rounded-full transition-all duration-500 ease-out" style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}></div>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-secondary mb-8 text-center">{currentQuestion.question}</h3>
      
      {/* RENDER BASED ON QUESTION TYPE */}
      
      {currentQuestion.type === 'multiple-choice' && (
        <div className="grid grid-cols-1 gap-3">
            {currentQuestion.options.map((option, index) => (
            <button
                key={index}
                onClick={() => handleOptionSelect(option)}
                disabled={!!selectedOption}
                className={`w-full text-left p-4 rounded-xl border-2 font-medium text-lg transition-all transform active:scale-95
                    ${selectedOption === option ? 'bg-primary text-white border-primary' : 'bg-white border-neutral hover:border-primary hover:bg-blue-50 text-secondary'}
                `}
            >
                {option}
            </button>
            ))}
        </div>
      )}

      {currentQuestion.type === 'fill-in-the-blank' && (
          <form onSubmit={handleSubmitText} className="flex flex-col gap-4">
              <input 
                type="text" 
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Type your answer here..."
                className="w-full p-4 text-lg border-2 border-neutral rounded-xl focus:border-primary focus:outline-none focus:ring-2 focus:ring-blue-200"
                autoFocus
              />
              <button 
                type="submit"
                disabled={!textInput.trim()}
                className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-blue-600 disabled:bg-gray-300 transition-colors"
              >
                  Check Answer
              </button>
          </form>
      )}

      {currentQuestion.type === 'order-sentence' && (
          <div className="space-y-6">
              {/* Sentence Construction Area */}
              <div className="min-h-[80px] p-4 bg-neutral-light rounded-xl border-2 border-dashed border-neutral flex flex-wrap gap-2 items-center justify-center">
                  {orderedWords.length === 0 ? (
                      <span className="text-neutral-dark italic">Tap words below to build the sentence</span>
                  ) : (
                      orderedWords.map((word, idx) => (
                          <span key={idx} className="px-3 py-1 bg-white border border-primary text-primary font-bold rounded-lg shadow-sm">
                              {word}
                          </span>
                      ))
                  )}
              </div>

              {/* Word Bank */}
              <div className="flex flex-wrap gap-2 justify-center">
                  {currentQuestion.options.map((word, idx) => {
                      const isUsed = orderedWords.filter(w => w === word).length >= currentQuestion.options.filter(w => w === word).length;
                      return (
                        <button
                            key={idx}
                            onClick={() => handleWordClick(word)}
                            // Simple logic: if word is in sentence, user can still click others, but let's just purely append
                            // For simplicity, we allow adding duplicates if they exist in source options? 
                            // Actually, standard drag/drop usually hides the source word.
                            // Let's hide it if used (simple version)
                            className={`px-4 py-2 rounded-lg font-semibold border-b-4 active:border-b-0 active:translate-y-1 transition-all
                                ${orderedWords.filter(w => w === word).length < currentQuestion.options.filter(opt => opt === word).length 
                                    ? 'bg-white border-neutral-dark text-secondary hover:bg-gray-50' 
                                    : 'bg-gray-200 border-gray-300 text-gray-400 cursor-default'}
                            `}
                        >
                            {word}
                        </button>
                      )
                  })}
              </div>

              <div className="flex gap-3">
                  <button 
                    onClick={handleResetOrder}
                    className="flex-1 py-3 text-secondary font-bold border-2 border-neutral rounded-xl hover:bg-gray-100"
                  >
                      Reset
                  </button>
                  <button 
                    onClick={handleSubmitOrder}
                    disabled={orderedWords.length === 0}
                    className="flex-[2] py-3 bg-primary text-white font-bold rounded-xl hover:bg-blue-600 disabled:bg-gray-300 shadow-md"
                  >
                      Check Answer
                  </button>
              </div>
          </div>
      )}

    </div>
  );
};

export default DiagnosticTest;
