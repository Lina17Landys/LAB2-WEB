import React from 'react';

const Result = ({ answers }) => {
  const calculateResult = () => {
    const counts = {
      A: 0,
      B: 0,
      C: 0,
      D: 0,
    };

    answers.forEach(answer => {
      counts[answer] += 1;
    });

    const maxAnswer = Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b));

    switch (maxAnswer) {
      case 'A':
        return 'Sailor Mercury';
      case 'B':
        return 'Sailor Mars';
      case 'C':
        return 'Sailor Jupiter';
      case 'D':
        return 'Sailor Venus';
      default:
        return 'No se pudo determinar el personaje';
    }
  };

  return (
    <div className="result-container">
      <h2>¡Eres {calculateResult()}!</h2>
    </div>
  );
};

export default Result;
