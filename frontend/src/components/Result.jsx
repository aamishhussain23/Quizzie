import React from 'react'
import styles from "../styles/result.module.css";
import cup from "../assets/cup.png";

const Result = () => {
  return (
    <div className={styles.parent}>
      <div className={styles.childBox}>
        <h1>Congrats Quiz is completed</h1>
        <img src={cup} alt="" />
        <h2>Your Score is <span>03</span><span>/04</span></h2>
      </div>
    </div>
  )
}

export default Result
