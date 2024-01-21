import React from "react";
import styles from "../styles/analytics.module.css";
import del from "../assets/delete.png";
import edit from "../assets/edit.png";
import share from "../assets/share.png";
import { Link } from "react-router-dom";

const Analytics = () => {
  const data = [
    { id: 1, name: "Quiz 1", createdOn: "01 Sep, 2023", impression: 345 },
    { id: 2, name: "Quiz 2", createdOn: "04 Sep, 2023", impression: 667 },
    { id: 3, name: "Quiz 2", createdOn: "04 Sep, 2023", impression: 667 },
    { id: 4, name: "Quiz 2", createdOn: "04 Sep, 2023", impression: 667 },
    { id: 1, name: "Quiz 1", createdOn: "01 Sep, 2023", impression: 345 },
  ];

  return (
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
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>{row.createdOn}</td>
                <td>{row.impression}</td>
                <td className={styles.images}>
                  <img src={edit} alt="description" />
                  <img src={del} alt="description" />
                  <img src={share} alt="description" />
                </td>
                <td>
                  <Link to="#">Question Wise Analysis</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Analytics;
