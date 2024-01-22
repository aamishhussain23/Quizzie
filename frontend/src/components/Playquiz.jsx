import React from 'react'
import styles from "../styles/playquiz.module.css";

const Playquiz = () => {
  return (
    <div className={styles.parent}>
      <div className={styles.childBox}>
        <section className={styles.section_1}>
            <span>04/04</span>
            <span className={styles.timer}>00:10s</span>
        </section>
        <h1>Your question text comes here, its a sample text.</h1>
        <section className={styles.section_2}>
            <div>Option 1</div>
            <div className={styles.option2}>Option 2</div>
        </section>
        <section className={styles.section_3}>
            <div className={styles.option3}>Option 3</div>
            <div>Option 4</div>
        </section>
        <button>SUBMIT</button>
      </div>
    </div>
  )
}

export default Playquiz
