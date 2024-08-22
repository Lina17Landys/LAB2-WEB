import React from 'react';

const Question = ({ question, options, selectedOption, onOptionChange }) => {
  return (
    <div className="question-container">
      <h3>{question}</h3>
      {options.map((option, index) => (
        <div key={index}>
          <input
            type="radio"
            id={`${question}-${index}`}
            name={question}
            value={option.value}
            checked={selectedOption === option.value}
            onChange={onOptionChange}
          />
          <label htmlFor={`${question}-${index}`}>{option.label}</label>
        </div>
      ))}
    </div>
  );
};

export default Question;
