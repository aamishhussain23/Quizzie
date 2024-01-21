import React from "react";
import styles from "../styles/leftsidebar.module.css";

const Leftsidebar = ({
  dashboard,
  setDashboard,
  analytics,
  setAnalytics,
  createQuiz,
  setCreateQuiz,
  setHidePopup1,
}) => {
  const handleDashboard = () => {
    setDashboard(true);
    setAnalytics(false);
    setCreateQuiz(false);
  };

  const handleAnalytics = () => {
    setAnalytics(true);
    setDashboard(false);
    setCreateQuiz(false);
  };

  const handleCreateQuiz = () => {
    setCreateQuiz(true);
    setHidePopup1(false);
    setDashboard(false);
    setAnalytics(false);
  };

  return (
    <div className={styles.leftSideBar}>
      <h2>QUIZZIE</h2>
      <div className={styles.content}>
        <p
          onClick={handleDashboard}
          className={dashboard ? `${styles.borderForP}` : null}
        >
          Dashboard
        </p>
        <p
          onClick={handleAnalytics}
          className={analytics ? `${styles.borderForP}` : null}
        >
          Analytics
        </p>
        <p
          onClick={handleCreateQuiz}
          className={createQuiz ? `${styles.borderForP}` : null}
        >
          Create Quiz
        </p>
      </div>
      <div className={styles.logoutSection}>
        <div className={styles.line}></div>
        <span>LOGOUT</span>
      </div>
    </div>
  );
};

export default Leftsidebar;
