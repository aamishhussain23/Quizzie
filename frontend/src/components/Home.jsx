import React, { useState } from "react";
import styles from "../styles/home.module.css";
import Analytics from "./Analytics";
import Dashboard from "./Dashboard";
import Popup1 from "./Popup1";
import Createquiz from "./Createquiz";
import Leftsidebar from "./Leftsidebar";

const Home = () => {
  const [dashboard, setDashboard] = useState(true);
  const [analytics, setAnalytics] = useState(false);
  const [createQuiz, setCreateQuiz] = useState(false);

  const [hidePopup1, setHidePopup1] = useState(false);

  return (
    <div className={`container ${styles.parent}`}>
      <Leftsidebar
        dashboard={dashboard}
        setDashboard={setDashboard}
        analytics={analytics}
        setAnalytics={setAnalytics}
        createQuiz={createQuiz}
        setCreateQuiz={setCreateQuiz}
        setHidePopup1={setHidePopup1}
      />
      {dashboard ? (
        <Dashboard />
      ) : analytics ? (
        <Analytics />
      ) : createQuiz ? (
        <div
          onClick={(e) => {
            e.preventDefault();
            setCreateQuiz(false);
            setDashboard(true);
          }}
          className={styles.dark_overlay}
        >
          {hidePopup1 ? (
            <Createquiz />
          ) : (
            <Popup1
              hidePopup1={hidePopup1}
              setCreateQuiz={setCreateQuiz}
              setDashboard={setDashboard}
              setHidePopup1={setHidePopup1}
            />
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Home;
