import React, { useEffect } from 'react';
import styles from "../styles/createquiz.module.css";
import del from '../assets/delete.png';

const Typetext = ({correctAnswer, currentIndex, questions, options, setOptions, setCorrectedAnswer, setQuestions }) => {
  useEffect(() => {
    if (currentIndex !== null && questions[currentIndex]) {
      const selectedQuestion = questions[currentIndex];
      setOptions(selectedQuestion.options);
      setCorrectedAnswer(selectedQuestion.correctAnswer);
    }
  }, [currentIndex, questions, setOptions, setCorrectedAnswer]);

  const handleAddOption = () => {
    if (options.length < 4) {
      setOptions([...options, ""]);
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);

    if (currentIndex !== null) {
      const newQuestions = [...questions];
      newQuestions[currentIndex].options = newOptions;
      setQuestions(newQuestions);
    }
  };

  const handleDeleteOption = (index) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);

    if (currentIndex !== null) {
      const newQuestions = [...questions];
      newQuestions[currentIndex].options = newOptions;
      setQuestions(newQuestions);
    }
  };

  return (
    <div className={styles.section_3}>
      {options.map((option, index) => (
        <div className={styles.input_img} key={index}>
          <input
            type="radio"
            name="option"
            onChange={() => setCorrectedAnswer(option)}
            checked={option === correctAnswer && correctAnswer !== ""}
          />
          <input
            type="text"
            placeholder="Text"
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
          />
          {index > 1 && <img src={del} alt="Delete option" onClick={() => handleDeleteOption(index)} />}
        </div>
      ))}
      <button className={styles.addOption} onClick={handleAddOption} style={{ display: options.length >= 4 ? 'none' : 'block' }}>
        Add Option
      </button>
    </div>
  );
};

export default Typetext;
