import React, { Fragment } from 'react';
import Layout from '../components/Layout';
import classes from '../styles/AuthForm.module.css'
import { useRef } from 'react';
import { hash, bcrypt } from 'bcryptjs';


function AddUser() {

    const emailInputRef = useRef();
    const passwordInputRef = useRef();  


   async function sendUserData(event) {
        event.preventDefault();  
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        
         /// Add Validation...  
                
         const data = {
            email: enteredEmail,
            password: enteredPassword,
           
        }

        console.log(data)

        const response = await fetch('./api/signUp', {
            method:'POST',
            body:JSON.stringify(data),
            headers:{
                'Content-Type' : 'application/json'
            }
        });           

        console.log(response)            
        
    } 
    
    
    async function logIn (event) {
        event.preventDefault();  
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        
         /// Add Validation...  
                
         const data = {
            email: enteredEmail,
            password: enteredPassword,
           
        }

        const response = await fetch('./api/logIn', {
            method:'POST',
            body:JSON.stringify(data),
            headers:{
                'Content-Type' : 'application/json'
            }
        }); 

        console.log("Login")

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
                    SignUp
                    </button>

                    <button
                        type='button'
                        className={classes.toggle}
                        onClick={logIn}
                    >
                    LogIn
                    </button>


                    </div>
                </form>
            </section>
        </Layout>
        
    )
}

export default AddUser;
