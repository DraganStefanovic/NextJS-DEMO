import React, { Fragment } from 'react';
import Layout from '../components/Layout';
import classes from '../styles/AuthForm.module.css'
import { useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { insertuserSignUpMsg} from '../store/userStore';


function AddUser() {

    const dispatch = useDispatch();

    const emailInputRef = useRef();
    const passwordInputRef = useRef();  
    const nameInputRef = useRef();  
    const surnameInputRef = useRef();  
    const birthdayInputRef = useRef();
   
    const msguserLoginMsg = useSelector((state) => state.userSlice.userSignUpMsg);      

    console.log(msguserLoginMsg)

    

   async function sendUserData(event) {
        event.preventDefault();  
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        const enteredName = nameInputRef.current.value;
        const enteredSurname = surnameInputRef.current.value;
        const enteredbirthday = birthdayInputRef.current.value;
        
         /// Add Validation...  
                
         const data = {
            email: enteredEmail,
            password: enteredPassword,
            name:enteredName,
            surname:enteredSurname,
            birthday:enteredbirthday           
        }        

        console.log(data)

        const response = await fetch('./api/signUp', {
            method:'POST',
            body:JSON.stringify(data),
            headers:{
                'Content-Type' : 'application/json'
            }
        });          

        const responseData = await response.json(); 
        console.log(responseData.message) 

        dispatch(insertuserSignUpMsg(responseData.message));  
        
        
                
        
    } ///// END ASYNC
    
    
     

    return(
       
        <Layout>
            <h1 className={classes.pageTitle}>Create account</h1>            
            <section className={classes.auth}>
                <form>
                    <div className='row'>
                        <div className='col-md-6'>
                            <div className={classes.control}>
                                <label htmlFor='name'>First Name</label>
                                <input type='text' id='name' required ref={nameInputRef} />
                            </div>
                            <div className={classes.control}>
                                <label htmlFor='name'>Last Name</label>
                                <input type='text' id='surname' required ref={surnameInputRef} />
                            </div>

                            <div className={classes.control}>
                                <label htmlFor='birthday'>Birthday</label>
                                <input type='date' id='birthday' required ref={birthdayInputRef} />
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className={classes.control}>
                                <label htmlFor='email'>Your Email</label>
                                <input type='email' id='email' required ref={emailInputRef} />
                            </div>
                            <div className={classes.control}>
                                <label htmlFor='password'>Your Password</label>
                                <input type='password' id='password' required ref={passwordInputRef} />
                            </div>
                            <div className={classes.actions}>                
                                <button type='button' className={classes.toggle}  onClick={sendUserData} >SignUp</button>
                            </div>
                        </div>

                    </div>                    
                </form>
                <p className='alert'>{msguserLoginMsg}</p>
            </section>
        </Layout>
        
    )
}

export default AddUser;
