import React from 'react';
import {useRouter} from 'next/router';
import Layout from '../../components/Layout';


function CarId() {

    const router = useRouter();
    console.log(router.query.carId)

    // Send a request to the backEND API
    // to Fetch some data etc

    return(
        <Layout>
            <h1>Car ID Detail Page</h1>
            <p>All about this car!</p>
        </Layout>
    )
}

export default CarId;