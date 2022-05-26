import Link from 'next/link';
import Layout from '../../components/Layout';
import {MongoClient} from 'mongodb';
import CarsHorisontBox from '../../components/CarsHorisontBox';
import CarDriftLoader from '../../components/CarDriftLoader';
import UserLogInPopUp from '../../components/UserLogInPopUp';

function Cars(props) {     
      
  console.log(props)


    return(     
      
        <Layout>
        <UserLogInPopUp/>

            <h1>Cars Page</h1>
            <p>List All Cars</p>
            <ul>
                <li><Link href='/cars/car1'>Car 1</Link></li>
                <li><Link href='/cars/car2'>Car 2</Link></li>
            </ul>           


            <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Marka i tip</th>
                    <th>Registracioni Broj</th>
                    <th>Korisnik vozila</th>
                    <th>Isticanje registracije</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {props.cars.map((car) => (
                        <CarsHorisontBox key={car.id} id={car.id}  title={car.title}  registration={car.registration}  vehicleUser={car.vehicleUser} date={car.date} />
                  ))}
                </tbody>
                </table>
                <CarDriftLoader/> 
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
          registration: car.regvalue,         
          id: car._id.toString(),
          vehicleUser: car.vehicleUser,
          date: car.date
        })),
      },
      revalidate: 1,
      
      
    };

   
  }
  
  export default Cars;