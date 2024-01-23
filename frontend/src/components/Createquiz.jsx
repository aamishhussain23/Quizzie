import React, { useState, useEffect } from "react";
import styles from "../styles/createquiz.module.css";
import cross from "../assets/cross.png";
import plus from "../assets/plus.png";
import Typetext from "./Typetext";
import TypeURL from "./TypeURL";
import TypetextandURL from "./TypetextandURL";
import toast from "react-hot-toast";

const Createquiz = ({ quizName, quizType }) => {
  const [selectedOption, setSelectedOption] = useState("text");
  const [question, setQuestion] = useState("");
  const [correctAnswer, setCorrectedAnswer] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", optionType: "", options: ["", "", "", ""], correctAnswer: "" },
  ]);
  const [count, setCount] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [options, setOptions] = useState(["", ""]);
  const [timer1, setTimer1] = useState("");
  const [timer2, setTimer2] = useState("");
  const [timer, setTimer] = useState(0);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const deleteQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
    setCount((prevCount) => Math.max(1, prevCount - 1));
    setCurrentIndex(null);
  };

  const addQuestion = () => {
    if (question.trim() === "") {
      toast.error("Enter the question");
      return;
    }

    if (selectedOption.trim() === "") {
      toast.error("Select an option type");
      return;
    }

    if (options.some((option) => option.trim() === "")) {
      toast.error("Enter all options");
      return;
    }

    if (correctAnswer.trim() === "") {
      toast.error("Select the correct answer");
      return;
    }

    if (count < 5) {
      setCount(count + 1);
    }

    const newQuestion = {
      question: question,
      optionType: selectedOption,
      options: options,
      correctAnswer: correctAnswer,
    };

    const isExistingQuestionEmpty =
      questions.length === 1 &&
      questions[0].question === "" &&
      questions[0].optionType === "" &&
      questions[0].options.every((option) => option === "") &&
      questions[0].correctAnswer === "";

    if (isExistingQuestionEmpty) {
      setQuestions([]);
    }

    setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
    setQuestion("");
    setOptions(["", ""]);
    setCurrentIndex(null);
  };

  const handle5sec = () => {
    setTimer(5);
    setTimer1("#D60000");
    setTimer2("");
  };

  const handle10sec = () => {
    setTimer(10);
    setTimer2("#D60000");
    setTimer1("");
  };

  const handleOff = () => {
    setTimer(0);
    setTimer2("");
    setTimer1("");
  };

  const handleCreate = () => {
    // Handle quiz creation logic
  };
  console.log(questions)
  return (
    <div className={styles.popup_2} onClick={(e) => e.stopPropagation()}>
      <section className={styles.section_1}>
        <div className={styles.circleAndPlus}>
          {Array.from({ length: count }).map((_, index) => (
            <div
              onClick={() => {
                setCurrentIndex(index);
                toast.success(index);
                setQuestion(questions[index]?.question || "");
              }}
              key={index}
              className={styles.circle}
            >
              {index + 1} {count > 1 && <img onClick={() => deleteQuestion(index)} src={cross} alt="cross img" />}
            </div>
          ))}
          {count === 5 ? null : <img onClick={addQuestion} src={plus} alt="add img" />}
        </div>
        <span>Max 5 questions</span>
      </section>

      <section className={styles.section_2}>
        <input onChange={(e) => setQuestion(e.target.value)} value={question} type="text" name="poll question" placeholder="Poll Question" />
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
            currentIndex={currentIndex}
            questions={questions}
            options={options}
            setOptions={setOptions}
            setCorrectedAnswer={setCorrectedAnswer}
            setQuestions={setQuestions}
            correctAnswer={correctAnswer}
          />
        ) : selectedOption === "url" ? (
          <TypeURL handleOptionChange={handleOptionChange} selectedOption={selectedOption} />
        ) : selectedOption === "textAndUrl" ? (
          <TypetextandURL handleOptionChange={handleOptionChange} selectedOption={selectedOption} />
        ) : null}
      </section>
      <div className={styles.timer}>
        <span className={styles.text}>Timer</span>
        <span onClick={handleOff}>OFF</span>
        <span style={{ backgroundColor: timer1 }} onClick={handle5sec}>
          5 sec
        </span>
        <span style={{ backgroundColor: timer2 }} onClick={handle10sec}>
          10 sec
        </span>
      </div>
      <section className={styles.section_4}>
        <div className={styles.cancelContinue}>
          <button className={styles.cancelbtn}>Cancel</button>
          <button onClick={handleCreate} className={styles.continuebtn}>
            Create Quiz
          </button>
        </div>
      </section>
    </div>
  );
};

export default Createquiz;
