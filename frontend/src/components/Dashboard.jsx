import React from "react";
import styles from "../styles/dashboard.module.css";
import eye from "../assets/eye.png";

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <div className={styles.stats}>
        <div className={styles.quiz}>
          <p>
            {" "}
            <span>12</span> Quiz
          </p>
          <p>Created</p>
        </div>
        <div className={styles.question}>
          <p>
            {" "}
            <span>110</span> questions
          </p>
          <p>Created</p>
        </div>
        <div className={styles.total}>
          <p>
            {" "}
            <span>
              1.4 <span>K</span>
            </span>{" "}
            Total
          </p>
          <p>Impressions</p>
        </div>
      </div>
      <div className={styles.box}>
        <p>Trending Quizs</p>
        <div className={styles.trending}>
          <div className={styles.quizBox}>
            <div className={styles.para1}>
              <span>Quiz1</span>{" "}
              <div className={styles.numberEye}>
                <span>667</span>
                <img src={eye} alt="" />
              </div>
            </div>
            <p className={styles.para2}>Created on : 04 Sep, 2023</p>
          </div>
          <div className={styles.quizBox}>
            <div className={styles.para1}>
              <span>Quiz1</span>{" "}
              <div className={styles.numberEye}>
                <span>667</span>
                <img src={eye} alt="" />
              </div>
            </div>
            <p className={styles.para2}>Created on : 04 Sep, 2023</p>
          </div>
          <div className={styles.quizBox}>
            <div className={styles.para1}>
              <span>Quiz1</span>{" "}
              <div className={styles.numberEye}>
                <span>667</span>
                <img src={eye} alt="" />
              </div>
            </div>
            <p className={styles.para2}>Created on : 04 Sep, 2023</p>
          </div>
          <div className={styles.quizBox}>
            <div className={styles.para1}>
              <span>Quiz1</span>{" "}
              <div className={styles.numberEye}>
                <span>667</span>
                <img src={eye} alt="" />
              </div>
            </div>
            <p className={styles.para2}>Created on : 04 Sep, 2023</p>
          </div>
          <div className={styles.quizBox}>
            <div className={styles.para1}>
              <span>Quiz1</span>{" "}
              <div className={styles.numberEye}>
                <span>667</span>
                <img src={eye} alt="" />
              </div>
            </div>
            <p className={styles.para2}>Created on : 04 Sep, 2023</p>
          </div>
          <div className={styles.quizBox}>
            <div className={styles.para1}>
              <span>Quiz1</span>{" "}
              <div className={styles.numberEye}>
                <span>667</span>
                <img src={eye} alt="" />
              </div>
            </div>
            <p className={styles.para2}>Created on : 04 Sep, 2023</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
