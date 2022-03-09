import React, { Fragment } from 'react';
import Layout from '../components/Layout';
import {useDispatch, useSelector} from "react-redux";
import { increment } from '../store/userStore';

function User() {

    const dispatch = useDispatch();

    const isUserLogin = useSelector((state) => state.userSlice.isAuthenticated);
    console.log(isUserLogin)

    function clickfun()  {
        dispatch(increment());
    }
  

    return(
        <Layout>
            <h1>User Page</h1>
            {isUserLogin ? <h3>User is Login</h3> : <h3>User is LogOUT</h3> }
            <p>Some User description</p>
            <p onClick={clickfun}>Pluse +</p>
        </Layout>
    )
}

export default User;