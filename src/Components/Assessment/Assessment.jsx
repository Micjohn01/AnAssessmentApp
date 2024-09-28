import React, { useRef, useState } from 'react';
import './Assessment.css';
import { data } from '../../assets/data';

const Assessment = () => {
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(data[index]);
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);

  let Option1 = useRef(null);
  let Option2 = useRef(null);
  let Option3 = useRef(null);
  let Option4 = useRef(null);

  let arrayOfOptions = [Option1, Option2, Option3, Option4];

  const checkAnswer = (e, ans) => {
    if (lock === false) {
      if (question.ans === ans) {
        e.target.classList.add('correct');
        setLock(true);
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add('wrong');
        setLock(true);
        arrayOfOptions[question.ans - 1].current.classList.add('correct');
      }
    }
  };

  const nextButton = () => {
    if (lock === true) {
      if (index === data.length - 1) {
        setResult(true);
        return;
      }
      setIndex(index + 1);
      setQuestion(data[index + 1]);
      setLock(false);
      arrayOfOptions.map((option) => {
        option.current.classList.remove('correct');
        option.current.classList.remove('wrong');
        return null;
      });
    }
  };

  const previousButton = () => {
    if (index > 0) {
      setIndex(index - 1);
      setQuestion(data[index - 1]);
      setLock(false);
      arrayOfOptions.map((option) => {
        option.current.classList.remove('correct');
        option.current.classList.remove('wrong');
        return null;
      });
    }
  };

  const resetButton = () => {
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setLock(false);
    setResult(false);
  };

  return (
    <div className='assessment'>
      <h1>Assessment App</h1>
      <hr />
      {result ? (
        <></>
      ) : (
        <>
          <h2>
            {index + 1}. {question.question}
          </h2>
          <ul>
            <li ref={Option1} onClick={(e) => checkAnswer(e, 1)}>
              {question.option1}
            </li>
            <li ref={Option2} onClick={(e) => checkAnswer(e, 2)}>
              {question.option2}
            </li>
            <li ref={Option3} onClick={(e) => checkAnswer(e, 3)}>
              {question.option3}
            </li>
            <li ref={Option4} onClick={(e) => checkAnswer(e, 4)}>
              {question.option4}
            </li>
          </ul>
          <button onClick={previousButton} disabled={index === 0}>
            Previous
          </button>
          <button onClick={nextButton}>Next</button>
          <div className='index'>
            {index + 1} of {data.length} questions
          </div>
        </>
      )}
      {result ? (
        <>
          <h2>
            You Scored {score} out of {data.length}
          </h2>
          <button onClick={resetButton}>Reset</button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Assessment;
