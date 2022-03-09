import React, { Fragment } from 'react';
import MainNavigation from './MainNavigation';
import {useDispatch, useSelector} from "react-redux";
import { increment } from '../store/userStore';

function Layout(props) {    

    const count = useSelector((state) => state.userSlice.value)
    console.log(count)


    const dispatch = useDispatch();

    

    return(
        <div className='standard-wrap'>
            <MainNavigation />
            <p>{count}</p>
            <main>{props.children}</main>
        </div>
    )
}

export default Layout;