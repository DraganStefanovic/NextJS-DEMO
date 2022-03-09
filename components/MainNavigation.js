import React from 'react';
import Link from 'next/link';
import classes from './mainNavigation.module.css';
import { useRouter } from "next/router";
import { useSelector, useDispatch} from "react-redux";
import {logout, login} from '../store/userStore';


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



    return(
        <header className={classes.header}>
            <h1>Logo!</h1>  
            <p onClick={hlogin}>Login in</p>   
            <p onClick={hlogout}>Login OUT</p>          
            <ul>
                <li className={router.pathname == "/cars" ? "active" : ""}><Link href='/cars'>Cars</Link></li>
                <li className={router.pathname == "/user" ? "active" : ""}><Link href='/user'>User</Link></li>
                <li className={router.pathname == "/adduser" ? "active" : ""}><Link href='/adduser'>Add User</Link></li>                
            </ul>
        </header>
    )
}

export default MainNavigation;