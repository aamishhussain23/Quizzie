import React, { useState } from 'react';
import styles from "../styles/createquiz.module.css";
import del from '../assets/delete.png';

const TypetextandURL = () => {
  const [options, setOptions] = useState([["", ""], ["", ""]]);

  const handleAddOption = () => {
    if (options.length < 4) {
      setOptions([...options, ["", ""]]);
    }
  };

  const handleOptionChange = (index, value, isUrl) => {
    const newOptions = [...options];
    newOptions[index][isUrl ? 1 : 0] = value;
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
            style={{width : '25%'}}
            type="text"
            placeholder="Text"
            value={option[0]}
            onChange={(e) => handleOptionChange(index, e.target.value, false)}
          />
          <input
            type="text"
            placeholder="Image URL"
            value={option[1]}
            onChange={(e) => handleOptionChange(index, e.target.value, true)}
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

export default TypetextandURL;
