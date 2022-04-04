import React, { Fragment, useEffect, useRef  } from 'react';
import classes from '../styles/AuthForm.module.css';
import Link from 'next/link';
import { useSelector, useDispatch } from "react-redux";
import {loginPopUpHandler} from '../store/userStore';



function UserLogInPopUp(props) {    
    
    const loginPopUpState = useSelector((state) => state.userSlice.loginPopUp);    
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


   



    return(
        <React.Fragment > 
            {loginPopUpState &&<section  ref={box} className={`popUp ${classes.auth}`}>
                <form >
                    <div className={classes.control}>
                    <label htmlFor='email'>Your Email</label>
                    <input type='email' id='email' required  />
                    </div>
                    <div className={classes.control}>
                    <label htmlFor='password'>Your Password</label>
                    <input type='password' id='password' required  />
                    </div>
                    <div className={classes.actions + ' ' + classes.flex}>      
                    <div onClick={tooglePopUp}>
                    <Link  href='/adduser'>Create account</Link>    
                    </div>       
                        <button type='button' className={classes.toggle}>LogIn</button>
                    </div>
                </form>
            </section>
            }
        </React.Fragment>
        
    )
}

export default UserLogInPopUp;



