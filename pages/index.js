import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Layout from '../components/Layout';
import {MongoClient} from 'mongodb';
import CarsHorisontBox from '../components/CarsHorisontBox';
import EditCarData from '../components/EditeCarData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus,} from '@fortawesome/free-solid-svg-icons'
import AddCarData from '../components/AddCarData';
import { handlePopAddData } from '../store/carStore';


function HomePage(props) {   

 const popUpEditeDataState = useSelector((state) => state.carSlice.popUpEditeDataState);
 const popUpAddDataState = useSelector((state) => state.carSlice.popAddData ) 

 const dispatch = useDispatch(); 

 const handlePopAddDataFn = () => {
  dispatch(handlePopAddData());
 }

 
 
    return(        
            <Layout>
                <div className='baner'></div> 
                <h1>SLUŽBENA VOZILA</h1> 
                <div className='headMenu'>
                  <p className='addCarBtn' onClick={handlePopAddDataFn} ><FontAwesomeIcon icon={faPlus} /> Add car</p>
                </div>               


                <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Marka i tip</th>
                    <th>Registracioni Broj</th>
                    <th>Tip korisnika</th>                   
                    <th>Korisnik vozila</th>
                    <th>Isticanje registracije</th>
                    <th>Vozilo Aktivno od</th>
                    <th>Vozilo Aktivno do</th>
                    <th className='actions'>Action</th>
                  </tr>
                </thead>
                <tbody>
                {props.cars.map((car) => (
                  <CarsHorisontBox                  
                    key={car.id}
                    id={car.id}                    
                    title={car.title}      
                    registration={car.registration} 
                    vehicleUser={car.vehicleUser}
                    tipKorisnika={car.tipKorisnika}  
                    date={car.date} 
                    voziloAktivnoOd={car.voziloAktivnoOd} 
                           
                  />
                ))}
                </tbody>
                </table>
                
                {popUpEditeDataState && <EditCarData />}
                {popUpAddDataState && <AddCarData/>}                
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
  
    client.close();
  
    return {
      props: {
        cars: cars.map((car) => ({
          title: car.title,
          registration: car.regvalue.toString(),        
          id: car._id.toString(),
          vehicleUser:car.vehicleUser,
          date: car.date,
          tipKorisnika: car.tipKorisnika,
          voziloAktivnoOd: car.voziloAktivnoOd
        })),
      },
      revalidate: 1,    
      
    };

   
  }




export default HomePage;

