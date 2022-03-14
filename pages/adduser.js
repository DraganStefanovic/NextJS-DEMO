import React, { Fragment } from 'react';
import Layout from '../components/Layout';
import classes from '../styles/AuthForm.module.css'
import { useRef } from 'react';


function AddUser() {

    const emailInputRef = useRef();
    const passwordInputRef = useRef();   

  


   async function sendUserData(event) {

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        event.preventDefault();
        /// Add Validation...       

        console.log(enteredEmail,  enteredPassword)

         const data = {
            email: enteredEmail,
            password: enteredPassword,
            age: 21,
            car: "Audi",
        }

        console.log(data)        
        
        
            const response = await fetch('./api/userApi', {
                method:'POST',
                body:JSON.stringify(data),
                headers:{
                    'Content-Type' : 'application/json'
                }
            });           

            console.log(response)
        
    }    

    return(
       
        <Layout>
            <h1 className={classes.pageTitle}>Create account</h1>            
            <section className={classes.auth}>
                <form>
                    <div className={classes.control}>
                    <label htmlFor='email'>Your Email</label>
                    <input type='email' id='email' required ref={emailInputRef} />
                    </div>
                    <div className={classes.control}>
                    <label htmlFor='password'>Your Password</label>
                    <input type='password' id='password' required ref={passwordInputRef} />
                    </div>
                    <div className={classes.actions}>                
                    <button
                        type='button'
                        className={classes.toggle}
                        onClick={sendUserData}
                    >
                    Send
                    </button>
                    </div>
                </form>
            </section>
        </Layout>
        
    )
}

export default AddUser;
