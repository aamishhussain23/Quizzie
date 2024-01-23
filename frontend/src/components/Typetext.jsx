import React, { useState } from 'react';
import styles from "../styles/createquiz.module.css";
import del from '../assets/delete.png';

const Typetext = () => {

  
  return (
    <div className={styles.section_3}>
        <div className={styles.input_img}>
            <input type="radio" name="option" />
            <input type="text" placeholder="Text"/>
         <img src={del} alt="Delete option" />
        </div>
      <button className={styles.addOption}>
        Add Option
      </button>
    </div>
  );
};

export default Typetext;
