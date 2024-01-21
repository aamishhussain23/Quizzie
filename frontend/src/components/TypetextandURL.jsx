import React from 'react'
import styles from "../styles/createquiz.module.css";
import del from '../assets/delete.png'

const TypetextandURL = () => {
  return (
    <div className={styles.section_3}>
            <label>
              <input 
                type="radio"
                name="option"
                value="option1"
                
         
              />
              <input style={{width : '25%'}} type="text" placeholder="text" />
              <input type="text" placeholder="image URL" />
            </label>

            <label>
              <input
                type="radio"
                name="option"
                value="option2"
                
       
              />
              <input style={{width : '25%'}} type="text" placeholder="text" />
              <input type="text" placeholder="image URL" />
            </label>

            <label>
              <input
                type="radio"
                name="option"
                value="option3"
          
              />
              <input style={{width : '25%'}} type="text" placeholder="text" />
              <input type="text" placeholder="image URL" />
              <img src={del} alt="Image description" />
            </label>

            <label>
              <input
                type="radio"
                name="option"
                value="option4"
           
              />
              <input style={{width : '25%'}} type="text" placeholder="text" />
              <input type="text" placeholder="image URL" />
              <img src={del} alt="Image description" />
            </label>
          </div>
  )
}

export default TypetextandURL
