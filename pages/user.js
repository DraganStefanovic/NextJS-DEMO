import React, { Fragment } from 'react';
import Layout from '../components/Layout';
import {useDispatch, useSelector} from "react-redux";



function User() {

    const dispatch = useDispatch();

    const isUserLogin = useSelector((state) => state.userSlice.isAuthenticated);
    const userName = useSelector((state) => state.userSlice.userName);
    const userSurname = useSelector((state) => state.userSlice.userSurname);

    console.log(isUserLogin)

  
  

    return(
        <Layout>
            <h1>User Page</h1>
            {isUserLogin ? <h3>User is Login</h3> : <h3>User is LogOUT</h3> }
            <p>Some User description</p>

            {userName}{userSurname}
            
        </Layout>
    )
}

export default User;