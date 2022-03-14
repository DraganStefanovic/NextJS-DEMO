import React, {useEffect} from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout';
import {MongoClient} from 'mongodb';
import CarsHorisontBox from '../../components/CarsHorisontBox';





function Cars(props) {   
  



    console.log(props.cars )

    
    return(            
        <Layout>
            <h1>Cars Page</h1>
            <p>List All Cars</p>
            <ul>
                <li><Link href='/cars/car1'>Car 1</Link></li>
                <li><Link href='/cars/car2'>Car 2</Link></li>
            </ul>         



            {props.cars.map((car) => (
                <CarsHorisontBox
                key={car.id}
                id={car.id}
                image={car.image}
                title={car.title}      
                registration={car.regvalue} 
                date={car.date}         
                />
      ))}






        </Layout>        
    )


}


export async function getStaticProps() {
    // fetch data from an API
    const client = await MongoClient.connect(
      'mongodb+srv://Admin:admin123@cluster0.3rzaz.mongodb.net/Cars?retryWrites=true&w=majority'
    );
    const db = client.db();
  
    const meetupsCollection = db.collection('Car');
  
    const cars = await meetupsCollection.find().toArray();

    console.log("sasas")
  
    client.close();
  
    return {
      props: {
        cars: cars.map((car) => ({
          title: car.title,
          registration: car.regvalue,
          image: car.image,
          id: car._id.toString(),
          date: car.date
        })),
      },
      revalidate: 1,
      
      
    };

   
  }
  










export default Cars;