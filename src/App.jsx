import React, { useState } from 'react';
import Question from './components/question';
import Result from './components/result';
import questions from './data/questions';  
import './App.css';


function App() {
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setIsEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value));
  };

  const handleStartQuiz = () => {
    if (isEmailValid) {
      localStorage.setItem('userEmail', email);
      setIsQuizStarted(true);
    } else {
      alert('Por favor, ingresa un correo electrónico válido.');
    }
  };

  const handleOptionChange = (question, value) => {
    setAnswers({
      ...answers,
      [question]: value,
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <div className="App">
      {!isQuizStarted ? (
        <div className="welcome-container">
          <header>
            <h1>Descubre qué personaje de Sailor Moon eres</h1>
          </header>
          <div className="banner-container">
            <img src="./src/img/sm.webp" alt="Sailor Moon Banner" className="bannerImg" />
          </div>
          <div className="input-email">
            <input
              type="email"
              placeholder="Introduce tu correo electrónico"
              value={email}
              onChange={handleEmailChange}
              className="email"
            />
            <button id="sendBtn" onClick={handleStartQuiz} disabled={!isEmailValid}>
              Comenzar Quiz
            </button>
          </div>
        </div>
      ) : !showResult ? (
        <div>
          <Question
            question={questions[currentQuestionIndex].question}
            options={questions[currentQuestionIndex].options}
            selectedOption={answers[questions[currentQuestionIndex].question]}
            onOptionChange={(e) => handleOptionChange(questions[currentQuestionIndex].question, e.target.value)}
          />
          <div className="navigation-buttons">
            <button onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
              Volver
            </button>
            <button onClick={handleNext}>
              {currentQuestionIndex < questions.length - 1 ? 'Seguir' : 'Ver Resultados'}
            </button>
          </div>
        </div>
      ) : (
        <Result answers={Object.values(answers)} />
      )}
    </div>
  );
}

export default App;