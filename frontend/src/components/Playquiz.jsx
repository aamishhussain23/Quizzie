import React, { useEffect, useState } from 'react'
import styles from "../styles/playquiz.module.css";
import axios from 'axios';
import { quizServer } from '../App';
import toast from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom';

const Playquiz = () => {
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [timer, setTimer] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate(); 

  const getQuiz = async () => {
    try {
      const {data} = await axios.get(`${quizServer}/getQuiz/${id}`, { withCredentials: true });
      setQuiz(data.quiz);
      setTimer(data.quiz.timer);
      setUserAnswers(data.quiz.questions.map(question => ({
        _id: question._id,
        question: question.question,
        userAnswer: ""
      }))); 
    } catch (err) {
      console.error(err.message);
      console.log(err)
      toast.error(`Error: ${err.message}`);
    }
  };

  useEffect(() => {  
    getQuiz();
  }, [id]);

  useEffect(() => {
    if (timer === 0) {
      if (currentQuestionIndex < quiz.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setTimer(quiz.timer);
      }
    } else {
      const timeout = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(timeout);
    }
  }, [timer]);

  useEffect(() => {
    console.log({
      quizId: id,
      questions: userAnswers
    });
  }, [timer]);

  if (!quiz) {
    return <div>Loading...</div>;
  }

  const question = quiz.questions[currentQuestionIndex];

  const handleOptionClick = (option) => {
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestionIndex].userAnswer = option;
    setUserAnswers(newUserAnswers);
  };

  const handleNextClick = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleSubmit = () => {
    console.log({
      quizId: id,
      questions: userAnswers
    });
    navigate('/home');
  };

  return (
    <div className={styles.parent}>
      <div className={styles.childBox}>
        <section className={styles.section_1}>
            <span>{currentQuestionIndex + 1}/{quiz.questions.length}</span>
            <span className={styles.timer}>00:{timer}s</span>
        </section>
        <h1>{question.question}</h1>
        <section className={styles.section_2}>
            {question.options.map((option, index) => (
              <div 
                key={index} 
                className={option === userAnswers[currentQuestionIndex]?.userAnswer ? styles.selectedOption : ''} 
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </div>
            ))}
        </section>
        {currentQuestionIndex < quiz.questions.length - 1 ? (
          <button onClick={handleNextClick}>Next</button>
        ) : (
          <button onClick={handleSubmit}>SUBMIT</button>
        )}
      </div>
    </div>
  )
}

export default Playquiz;
