import React, { useState, useEffect, useContext } from "react";
import styles from "../styles/createquiz.module.css";
import cross from "../assets/cross.png";
import plus from "../assets/plus.png";
import Typetext from "./Typetext";
import TypeURL from "./TypeURL";
import TypetextandURL from "./TypetextandURL";
import toast from 'react-hot-toast';
import axios from 'axios'
import { quizServer } from '../App'
import { Context } from "..";

const Createquiz = ({setDashboard, setCreateQuiz, quizName, quizType}) => {
  const [questions, setQuestions] = useState([{
    question: "",
    optionType: "",
    options: ["", ""],
    correctAnswer: null,
  }])
  const {loading, setLoading} = useContext(Context)
  const [currentOptionType, setCurrentOptiontype] = useState("text")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState("")
  const [currentOptions, setCurrentOptions] = useState([""])
  const [correctAnswer, setCorrectAnswer] = useState("")
  const [options, setOptions] = useState(["", ""]);
  const [count, setCount] = useState(1)
  const [timer, setTimer] = useState(0)
  const [quizId, setQuizID] = useState("")
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

  const handleQuizCreation = async () => {
    // Validation
    
    
    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].question.trim()) {
        toast.error(`Question ${i+1} is required`);
        return;
      }
      if (!questions[i].optionType.trim()) {
        toast.error(`Option type for question ${i+1} is required`);
        return;
      }
      if (questions[i].options.length < 2) {
        toast.error(`Question ${i+1} should have at least two options`);
        return;
      }
      for (let j = 0; j < questions[i].options.length; j++) {
        if (!questions[i].options[j].trim()) {
          toast.error(`Option ${j+1} for question ${i+1} is required`);
          return;
        }
      }
      if (questions[i].correctAnswer === null) {
        toast.error(`Correct answer for question ${i+1} is required`);
        return;
      }
    }
  
    const obj = {
      quizName: quizName,
      quizType: quizType,
      questions: questions,
      timer: timer
    }
    setLoading(true);
    try {
      const {data} = await axios.post(`${quizServer}/create-quiz`, obj, {withCredentials : true, headers : {"Content-Type" : "application/json"}})
      
      setQuizID(data.quizId);
      setLoading(false);
      toast.success(data.message);
      setDashboard(true); 
      setCreateQuiz(false);
  } catch (error) {
      // Handle the error here
      console.error(error);
      toast.error('An error occurred while creating the quiz');
      setLoading(false);
      setDashboard(true); 
      setCreateQuiz(false);
  }
  }
  

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
        onChange={() => {
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
        onChange={() => {
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
        onChange={() => {
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
          <button className={styles.cancelbtn} onClick={() => {setDashboard(true); setCreateQuiz(false);}}>Cancel</button>
          <button disabled={loading} className={styles.continuebtn} onClick={handleQuizCreation}>Create Quiz</button>
        </div>
      </section>
    </div>
  );
};

export default Createquiz;
