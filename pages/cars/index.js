import React from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout';

function Cars() {
    
    return(            
        <Layout>
            <h1>Cars Page</h1>
            <p >List All Cars</p>
            <ul>
                <li><Link href='/cars/car1'>Car 1</Link></li>
                <li><Link href='/cars/car2'>Car 2</Link></li>
            </ul>
        </Layout>        
    )
}

export default Cars;