import React, { useState, useEffect } from "react";
import styles from "../styles/createquiz.module.css";
import cross from "../assets/cross.png";
import plus from "../assets/plus.png";
import Typetext from "./Typetext";
import TypeURL from "./TypeURL";
import TypetextandURL from "./TypetextandURL";
import toast from 'react-hot-toast';

const Createquiz = ({quizName, quizType}) => {
  const [questions, setQuestions] = useState([{
    question: "",
    optionType: "",
    options: ["", ""],
    correctAnswer: null,
    timer: "",
  }])

  const [currentOptionType, setCurrentOptiontype] = useState("text")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState("")
  const [currentOptions, setCurrentOptions] = useState([""])
  const [correctAnswer, setCorrectAnswer] = useState("")
  const [options, setOptions] = useState(["", ""]);
  const [count, setCount] = useState(1)

  const questionRefs = questions.map(() => React.createRef());

  const handleRemoveQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
    setCount(count - 1);
  
    if (currentIndex >= newQuestions.length) {
      setCurrentIndex(Math.max(newQuestions.length - 1, 0));
    }
  
    if (index === currentIndex) {
      setOptions(newQuestions[currentIndex]?.options || ["", ""]);
      setCorrectAnswer(newQuestions[currentIndex]?.correctAnswer || null);
    }
  };
  

  const handleAddQuestion = () => {
    const newQuestion = {
      question: "",
      optionType: "",
      options: ["", ""],
      correctAnswer: "",
      timer: "",
    };

    setQuestions([...questions, newQuestion]);
    setCount(count + 1);
    setCurrentIndex(count);
  };

  useEffect(() => {
    setCurrentQuestion(questions[currentIndex]?.question || "");
    setCurrentOptions(questions[currentIndex]?.options || [""]);
  }, [currentIndex, questions]);

  console.log(questions)

  return (
    <div className={styles.popup_2} onClick={(e) => e.stopPropagation()}>
      <section className={styles.section_1}>
        <div className={styles.circleAndPlus}>
          {Array.from({ length: count }).map((_, index) => (
            <div 
              ref={questionRefs[index]}
              onClick={() => {setCurrentIndex(index); }} 
              key={index} 
              className={styles.circle}
            >
              {index+1}  {count === 1 ? null : <img onClick={() => handleRemoveQuestion(index)} src={cross} alt="cross img" />}
            </div>
          ))}
          {count >= 5 ? null : <img onClick={handleAddQuestion} src={plus} alt="add img" />}
        </div>
        <span>Max 5 questions</span>
      </section>
      <section className={styles.section_2}>
  <input 
    onChange={(e) => {
      const newQuestions = [...questions];
      newQuestions[currentIndex].question = e.target.value;
      setQuestions(newQuestions);
    }} 
    value={questions[currentIndex] ? questions[currentIndex].question : ""}
    type="text" 
    name="poll question" 
    placeholder="Poll Question" 
  />
  <div className={styles.optionType}>
    <span>Option Type</span>
    <label>
      <input 
        type="radio" 
        name="option" 
        value="text"
        checked={questions[currentIndex]?.optionType === "text"}
        onClick={() => {
          setCurrentOptiontype("text");
          const newQuestions = [...questions];
          newQuestions[currentIndex].optionType = "text";
          setQuestions(newQuestions);
        }} 
      />
      <span>Text</span>
    </label>
    <label>
      <input 
        type="radio" 
        name="option" 
        value="url"
        checked={questions[currentIndex]?.optionType === "url"}
        onClick={() => {
          setCurrentOptiontype("url");
          const newQuestions = [...questions];
          newQuestions[currentIndex].optionType = "url";
          setQuestions(newQuestions);
        }} 
      />
      <span>Image URL</span>
    </label>
    <label>
      <input 
        type="radio" 
        name="option" 
        value="textandurl"
        checked={questions[currentIndex]?.optionType === "textandurl"}
        onClick={() => {
          setCurrentOptiontype("textandurl");
          const newQuestions = [...questions];
          newQuestions[currentIndex].optionType = "textandurl";
          setQuestions(newQuestions);
        }} 
      />
      <span>Text & Image URL</span>
    </label>
  </div>
</section>

      <section className={styles.section_3}>
        {currentOptionType === "text" && <Typetext questions={questions} setQuestions={setQuestions} currentIndex={currentIndex} />}
        {currentOptionType === "url" && <TypeURL questions={questions} setQuestions={setQuestions} currentIndex={currentIndex} />}
        {currentOptionType === "textandurl" && <TypetextandURL questions={questions} setQuestions={setQuestions} currentIndex={currentIndex} />}
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
