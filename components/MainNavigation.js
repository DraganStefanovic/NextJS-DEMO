import React from 'react';
import Link from 'next/link';
import classes from '../styles/mainNavigation.module.css';
import { useRouter } from "next/router";
import { useSelector, useDispatch} from "react-redux";
import {logout, login, loginPopUpHandler} from '../store/userStore';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'


function MainNavigation(props) {

    const router = useRouter();
    const dispatch = useDispatch();

    const isUserLogin = useSelector((state) => state.userSlice.isAuthenticated);
    console.log(isUserLogin)      
    

      function hlogin()  {
        dispatch(login());
        console.log(isUserLogin)
    }
   
    function hlogout()  {
        dispatch(logout());
        console.log(isUserLogin)
    }

    function tooglePopUp()  {
        dispatch(loginPopUpHandler());
        
    }  


    return(
        <header className={classes.header}>
            <div className='standard-wrap menu'>
            <Link href='/'>
                <div className={classes.logo}>
                    <img src="https://cdn.mikroe.com/img/mega-menu/mikroe-timesaving-white.png"/>
                </div>
            </Link>
            <p onClick={hlogin}>Login in</p>   
            <p onClick={hlogout}>Login OUT</p>          
            <ul>
                <li className={router.pathname == "/cars" ? "active" : ""}><Link href='/cars'>Cars</Link></li>
                <li className={router.pathname == "/user" ? "active" : ""}><Link href='/user'>User</Link></li>
                <li className={router.pathname == "/adduser" ? "active" : ""}><Link href='/adduser'>Add User</Link></li> 
                <li className={router.pathname == "/addcar" ? "active" : ""}><Link href='/addcar'>Add Car</Link></li>     
                <li onClick={tooglePopUp}><FontAwesomeIcon icon={faUser} /></li>             
            </ul>
            </div>
        
        </header>
    )
}

export default MainNavigation;