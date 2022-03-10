import React, { Fragment } from 'react';
import MainNavigation from './MainNavigation';
import {useDispatch, useSelector} from "react-redux";
import UserLogin from '../components/UserLogIn'
import { increment } from '../store/userStore';

function Layout(props) {    

    const count = useSelector((state) => state.userSlice.value)
    console.log(count)


    const dispatch = useDispatch();

    

    return(
        <React.Fragment>
            <MainNavigation />
            <div className='standard-wrap'>                
                <UserLogin/>
                <p>{count}</p>
                <main>{props.children}</main>
            </div>      
        </React.Fragment>
        
    )
}

export default Layout;