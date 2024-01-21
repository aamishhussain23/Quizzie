import React, { useState } from 'react'
import styles from "../styles/createquiz.module.css";
import del from '../assets/delete.png'

const Typetext = () => {
    const [answer, setAnswer] = useState("")
  return (
    <div className={styles.section_3}>
            <label>
              <input 
                type="radio"
                name="option"
                value="option1"
                
         
              />
              <input type="text" placeholder="Text" />
            </label>

            <label>
              <input
                type="radio"
                name="option"
                value="option2"
                
       
              />
              <input type="text" placeholder="Text" />
            </label>

            <label>
              <input
                type="radio"
                name="option"
                value="option3"
          
              />
              <input type="text" placeholder="Text" />
              <img src={del} alt="Image description" />
            </label>

            <label>
              <input
                type="radio"
                name="option"
                value="option4"
           
              />
              <input type="text" placeholder="Text" />
              <img src={del} alt="Image description" />
            </label>
          </div>
  )
}

export default Typetext
