import React, { Fragment } from 'react';
import classes from '../styles/AuthForm.module.css';
import Link from 'next/link';
import { useSelector } from "react-redux";



function UserLogin(props) {    
    
    const loginPopUpState = useSelector((state) => state.userSlice.loginPopUp);

    console.log(loginPopUpState + " stateLogin")

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
                        <Link href='/adduser'>Create account</Link>             
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