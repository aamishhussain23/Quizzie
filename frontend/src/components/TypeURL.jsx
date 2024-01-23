import React, { useState } from 'react';
import styles from "../styles/createquiz.module.css";
import del from '../assets/delete.png';

const TypeURL = () => {
  const [options, setOptions] = useState(["", ""]);

  const handleAddOption = () => {
    if (options.length < 4) {
      setOptions([...options, ""]);
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleDeleteOption = (index) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  return (
    <div className={styles.section_3}>
      {options.map((option, index) => (
        <div className={styles.input_img} key={index}>
          <input type="radio" name="option" value={`option${index + 1}`} />
          <input
            type="text"
            placeholder="Image URL"
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
          />
          {index > 1 && <img src={del} alt="Delete option" onClick={() => handleDeleteOption(index)} />}
        </div>
      ))}
      {options.length < 4 && (
        <button className={styles.addOption} onClick={handleAddOption}>
          Add Option
        </button>
      )}
    </div>
  );
};

export default TypeURL;
