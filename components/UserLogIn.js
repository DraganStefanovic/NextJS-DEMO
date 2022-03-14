import React, { Fragment } from 'react';
import classes from '../styles/AuthForm.module.css';
import Link from 'next/link';
import { useSelector, useDispatch } from "react-redux";
import {loginPopUpHandler} from '../store/userStore';



function UserLogin(props) {    
    
    const loginPopUpState = useSelector((state) => state.userSlice.loginPopUp);    
    const dispatch = useDispatch();

    function tooglePopUp(e)  {
        e.preventDefault();
        e.stopPropagation();
        dispatch(loginPopUpHandler());
        console.log("toogle")
        
    }  

    return(
        <React.Fragment > 
            {loginPopUpState &&<section className={`popUp ${classes.auth}`}>
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
                                 
                    <button
                        type='button'
                        className={classes.toggle}                        
                    >
                    LogIn
                    </button>
                    </div>
                </form>
            </section>
            }
        </React.Fragment>
        
    )
}

export default UserLogin;