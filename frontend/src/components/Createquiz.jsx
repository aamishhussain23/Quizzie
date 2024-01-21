import React, { useState } from "react";
import styles from "../styles/createquiz.module.css";
import cross from "../assets/cross.png";
import plus from "../assets/plus.png";
import Typetext from "./Typetext";
import TypeURL from "./TypeURL";
import TypetextandURL from "./TypetextandURL";

const Createquiz = () => {
  const [selectedOption, setSelectedOption] = useState("text");

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className={styles.popup_2} onClick={(e) => e.stopPropagation()}>
      <section className={styles.section_1}>
        <div className={styles.circleAndPlus}>
          <div className={styles.circle}>
            1 <img src={cross} alt="cross img" />
          </div>
          <div className={styles.circle}>
            2 <img src={cross} alt="cross img" />
          </div>
          <div className={styles.circle}>
            3 <img src={cross} alt="cross img" />
          </div>
          <div className={styles.circle}>
            4 <img src={cross} alt="cross img" />
          </div>
          <div className={styles.circle}>
            5 <img src={cross} alt="cross img" />
          </div>
          {/* <img src={plus} alt="add img" /> */}
        </div>
        <span>Max 5 questions</span>
      </section>

      <section className={styles.section_2}>
        <input type="text" name="poll question" placeholder="Poll Question" />
        <div className={styles.optionType}>
          <span>Option Type</span>
          <label>
            <input
              type="radio"
              value="text"
              checked={selectedOption === "text"}
              onChange={() => handleOptionChange("text")}
            />
            <span>Text</span>
          </label>
          <label>
            <input
              type="radio"
              value="url"
              checked={selectedOption === "url"}
              onChange={() => handleOptionChange("url")}
            />
            <span>Image URL</span>
          </label>
          <label>
            <input
              type="radio"
              value="textAndUrl"
              checked={selectedOption === "textAndUrl"}
              onChange={() => handleOptionChange("textAndUrl")}
            />
            <span>Text & Image URL</span>
          </label>
        </div>
      </section>

      <section className={styles.section_3}>
        {selectedOption === "text" ? (
          <Typetext
            handleOptionChange={handleOptionChange}
            selectedOption={selectedOption}
          />
        ) : selectedOption === "url" ? (
          <TypeURL
          handleOptionChange={handleOptionChange}
          selectedOption={selectedOption}
          />
        ) : selectedOption === "textAndUrl" ? (
          <TypetextandURL
          handleOptionChange={handleOptionChange}
          selectedOption={selectedOption}
          />) : null}
      </section>
      <div className={styles.timer}>
          <span className={styles.text}>Timer</span>
          <span>OFF</span>
          <span>5 sec</span>
          <span>10 sec</span>
      </div>
      <section className={styles.section_4}>
        <div className={styles.cancelContinue}>
          <button className={styles.cancelbtn}>Cancel</button>
          <button className={styles.continuebtn}>Create Quiz</button>
        </div>
      </section>
    </div>
  );
};

export default Createquiz;
