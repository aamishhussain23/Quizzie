import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/analytics.module.css";
import del from "../assets/delete.png";
import edit from "../assets/edit.png";
import share from "../assets/share.png";
import { Link } from "react-router-dom";
import { Context } from "..";
import axios from "axios";
import { quizServer } from "../App";
import toast from "react-hot-toast";
import Viewquizanalysis from "./Viewquizanalysis";
import Viewpollanalysis from "./Viewpollanalysis";

const Analytics = () => {
  const { user, setUser, loading, setLoading, isAuthenticated, setIsAuthenticated } = useContext(Context)
  const [quizes, setQuizes] = useState([{}])
  const [deleteQuizID, setDeleteQuizID] = useState("")
  const [viewquizanalysis, setViewquizanalysis] = useState(false)
  const [viewpollanalysis, setViewpollanalysis] = useState(false)

  const getAllQuizes = async (userId) => {
    if (!userId) {
      return;
    }

    setLoading(true)
    try {
      const { data } = await axios.get(`${quizServer}/getAllQuizes/${userId}`, { withCredentials: true });
      setLoading(false)
      setIsAuthenticated(true)
      const sortedQuizzes = data.quizzes.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      setQuizes(sortedQuizzes);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

  const handleDeletion = async () => {
    setLoading(true)
    try {
      const { data } = await axios.delete(`${quizServer}/delete-quize/${deleteQuizID}`, { withCredentials: true });
      setLoading(false)
      toast.success(data.message)
      setIsAuthenticated(true)
    } catch (error) {
      toast.error(error.response.data.message)
      console.error('Error deleting quiz:', error);
    }
    setDeleteQuizID("")
    getAllQuizes(user._id)
  };

  useEffect(() => {
    if (user && user._id) {
      getAllQuizes(user._id);
    }
  }, [user]);

  return (
    <>
      {viewquizanalysis ? (
        <Viewquizanalysis />
      ) : viewpollanalysis ? (
        <Viewpollanalysis />
      ) : (
        <div className={styles.analytics}>
          <h2>Quiz Analytics</h2>
          <div className={styles.table_div}>
            <table>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Quiz Name</th>
                  <th>Created on</th>
                  <th>Impression</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              {loading ? (
                <tbody>
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center' }}>
                      Loading...
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {quizes.map((quiz, index) => {
                    const createdDate = new Date(quiz.createdAt);
                    const formattedDate = createdDate.toLocaleString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{quiz.quizName}</td>
                        <td>{formattedDate}</td>
                        <td>{quiz.impressions >= 1000 ? (quiz.impressions / 1000).toFixed(1) + "k" : quiz.impressions}</td>
                        <td className={styles.images}>
                          <img src={edit} alt="description" />
                          <img onClick={() => setDeleteQuizID(quiz._id)} src={del} alt="description" />
                          <img src={share} alt="description" />
                        </td>
                        <td>
                          <Link onClick={() => setViewpollanalysis(true)} to="#">Question Wise Analysis</Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              )}
            </table>
          </div>
        </div>
      )}
      {deleteQuizID !== "" ? (
        <div onClick={() => setDeleteQuizID("")} className={styles.dark_overlay}>
          <div onClick={(e) => e.stopPropagation()} className={styles.deletePopup}>
            <span>Are you confirm you want to delete ?</span>
            <div className={styles.btn}>
              <button onClick={handleDeletion} className={styles.deletebtn}>Confirm Delete</button>
              <button onClick={() => setDeleteQuizID("")} className={styles.cancelbtn}>Cancel</button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Analytics;
