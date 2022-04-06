import React, { Fragment, useEffect, useRef  } from 'react';
import classes from '../styles/AuthForm.module.css';
import Link from 'next/link';
import { useSelector, useDispatch } from "react-redux";
import {loginPopUpHandler, login,logout, userServerName, userServerSurname, insertuserLoginMsg} from '../store/userStore';
import { useRouter } from "next/router";



function UserLogInPopUp(props) {    

    const emailInputRef = useRef();
    const passwordInputRef = useRef();      
    const loginPopUpState = useSelector((state) => state.userSlice.loginPopUp); 
    const msguserLoginMsg = useSelector((state) => state.userSlice.userLoginMsg);   
    
    const isUserLogin = useSelector((state) => state.userSlice.isAuthenticated);
    const router = useRouter()
        

    const dispatch = useDispatch();

    function tooglePopUp(e)  {
        e.preventDefault();       
        dispatch(loginPopUpHandler());            
    }  


    const box = useRef(null);
    useOutsideAlerter(box);

    function useOutsideAlerter(ref) { 
        useEffect(() => {          
          function handleOutsideClick(event) {
            if (ref.current && !ref.current.contains(event.target)) { 
                if(loginPopUpState) {                    
                    dispatch(loginPopUpHandler());                     
                } 
            }             
        }        
          document.addEventListener("click", handleOutsideClick);
          return () => document.removeEventListener("click", handleOutsideClick);
        }, [ref, loginPopUpState]);

    }

    function LogOut() {
        dispatch(logout());  
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

        const responseData = await response.json(); 
        console.log(responseData) 
        dispatch(insertuserLoginMsg(responseData.message));    
        
        if(responseData.UserExisting) {            
            dispatch(login());            
            router.push('/user');
                     
            
            
        }


    }   



    return(
        <React.Fragment > 
            {loginPopUpState &&<section  ref={box} className={`popUp ${classes.auth}`}>
                <form >
                    <div className={classes.control}>
                        <label htmlFor='email'>Your Email</label>
                        <input type='email' id='email' required  ref={emailInputRef}  />
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='password'>Your Password</label>
                        <input type='password' id='password' required   ref={passwordInputRef} />
                    </div>
                    <p>{msguserLoginMsg}</p>
                    <div className={classes.actions + ' ' + classes.flex}>      
                        <div onClick={tooglePopUp}>
                           {!isUserLogin && <Link  href='/adduser'>Create account</Link>    }
                        </div>       
                           {!isUserLogin && <button type='button' onClick={logIn} className={classes.toggle}>LogIn</button> } 
                           {isUserLogin && <button type='button' onClick={LogOut} className={classes.toggle}>LogOut</button> } 
                    </div>
                </form>
            </section>
            }
        </React.Fragment>
        
    )
}

export default UserLogInPopUp;



