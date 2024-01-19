import React, { useState } from 'react'
import '../index.css'
import styles from '../styles/loginSignup.module.css'

const LoginSignUp = () => {

    const [shadowForSignUp, setShadowForSignUp] = useState(true)
    const [shadowForLogin, setShadowForLogin] = useState(false)

    const[loginBtn, setLoginBtn] = useState(false)
    const[signUpBtn, setSignUpBtn] = useState(true)


    const signup = () => {
        setShadowForSignUp(true)
        setSignUpBtn(true)
        setLoginBtn(false)
        setShadowForLogin(false)
    }

    const login = () => {
        setShadowForLogin(true)
        setLoginBtn(true)
        setSignUpBtn(false)
        setShadowForSignUp(false)
    }

  return (
    <div className={`${styles.parent} container`}>
       <div className={styles.child_box}>
            <div className={styles.box}>
                <h2>quizzie</h2>
                <div className={styles.login_signup_btns}>
                    <button onClick={signup} className={shadowForSignUp ? styles.btn_shadow : null}>Sign Up</button>
                    <button onClick={login} className={shadowForLogin ? styles.btn_shadow : null}>Log In</button>
                </div>
                    { signUpBtn ? 
                        <form className={styles.form}>
                        <div class={styles.form_group}>
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" />
                        </div>

                        <div class={styles.form_group}>
                            <label htmlFor="email">Email</label>
                            <input type="text" id="email" />
                        </div>
        
                        <div class={styles.form_group}>
                            <label htmlFor="pass">Password</label>
                            <input type="text" id="pass" />
                        </div>
        
                        <div class={styles.form_group}>
                            <label htmlFor="cnfPss">Confirm Password</label>
                            <input type="text" id="cnfPss" />
                        </div>
                        <div class={styles.btn_div}>
                            <button>Sign-Up</button>
                        </div>
                    </form>
                    :
                    <form className={styles.form}>
    
                        <div class={styles.form_group}>
                            <label htmlFor="email">Email</label>
                            <input type="text" id="email" />
                        </div>
        
                        <div class={styles.form_group}>
                            <label htmlFor="pass">Password</label>
                            <input type="text" id="pass" />
                        </div>
        
                        <div className={styles.flex}>
                            <button className={` ${styles.login_btn}`}>Log In</button>
                        </div>
                    </form>    
                }
            </div>
       </div>
    </div>
  )
}

export default LoginSignUp
