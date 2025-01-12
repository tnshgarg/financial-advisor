"use client"
import React, { useState } from 'react';
import { questions } from './data/questions';

import { Trophy, AlertCircle, ArrowRight, RefreshCcw, Coins } from 'lucide-react';

interface GameState {
  currentQuestion: number;
  score: number;
  showExplanation: boolean;
  selectedAnswer: number | null;
  isCorrect: boolean | null;
  questionsAnswered: number;
}

function QuizPage() {
  const [gameState, setGameState] = useState<GameState>({
    currentQuestion: 0,
    score: 0,
    showExplanation: false,
    selectedAnswer: null,
    isCorrect: null,
    questionsAnswered: 0,
  });

  const currentQuestion = questions[gameState.currentQuestion];
  const progress = (gameState.questionsAnswered / questions.length) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    if (gameState.showExplanation) return;

    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    setGameState(prev => ({
      ...prev,
      selectedAnswer: answerIndex,
      isCorrect,
      showExplanation: true,
      score: isCorrect ? prev.score + 1 : prev.score,
    }));
  };

  const handleNext = () => {
    if (gameState.currentQuestion === questions.length - 1) {
      setGameState(prev => ({
        ...prev,
        questionsAnswered: prev.questionsAnswered + 1,
      }));
      return;
    }

    setGameState(prev => ({
      ...prev,
      currentQuestion: prev.currentQuestion + 1,
      showExplanation: false,
      selectedAnswer: null,
      isCorrect: null,
      questionsAnswered: prev.questionsAnswered + 1,
    }));
  };

  const handleRestart = () => {
    setGameState({
      currentQuestion: 0,
      score: 0,
      showExplanation: false,
      selectedAnswer: null,
      isCorrect: null,
      questionsAnswered: 0,
    });
  };

  const isGameComplete = gameState.questionsAnswered === questions.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 w-full">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Coins className="w-6 h-6 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-800">Financial IQ Quiz</h1>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span className="font-semibold">Score: {gameState.score}/{questions.length}</span>
            </div>
          </div>

          {!isGameComplete ? (
            <>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                  {currentQuestion.question}
                </h2>
                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={gameState.showExplanation}
                      className={`w-full p-4 text-left rounded-lg transition-all ${
                        gameState.selectedAnswer === index
                          ? gameState.isCorrect
                            ? 'bg-green-100 border-green-500'
                            : 'bg-red-100 border-red-500'
                          : 'bg-gray-50 hover:bg-gray-100'
                      } border-2 ${
                        gameState.showExplanation && index === currentQuestion.correctAnswer
                          ? 'border-green-500'
                          : 'border-transparent'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {gameState.showExplanation && (
                <div className={`p-4 rounded-lg mb-4 ${
                  gameState.isCorrect ? 'bg-green-50' : 'bg-red-50'
                }`}>
                  <div className="flex items-start gap-2">
                    <AlertCircle className={`w-5 h-5 mt-0.5 ${
                      gameState.isCorrect ? 'text-green-600' : 'text-red-600'
                    }`} />
                    <div>
                      <p className={`font-semibold ${
                        gameState.isCorrect ? 'text-green-800' : 'text-red-800'
                      }`}>
                        {gameState.isCorrect ? 'Correct!' : 'Incorrect'}
                      </p>
                      <p className="text-gray-700 mt-1">{currentQuestion.explanation}</p>
                    </div>
                  </div>
                </div>
              )}

              {gameState.showExplanation && (
                <button
                  onClick={handleNext}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                >
                  {gameState.currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                  <ArrowRight className="w-5 h-5" />
                </button>
              )}
            </>
          ) : (
            <div className="text-center py-8">
              <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Quiz Complete!</h2>
              <p className="text-gray-600 mb-4">
                You scored {gameState.score} out of {questions.length}
                {' '}({Math.round((gameState.score / questions.length) * 100)}%)
              </p>
              <button
                onClick={handleRestart}
                className="bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center gap-2 mx-auto"
              >
                <RefreshCcw className="w-5 h-5" />
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuizPage;