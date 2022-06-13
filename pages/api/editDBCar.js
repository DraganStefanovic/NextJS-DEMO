import {MongoClient, ObjectId} from 'mongodb';
import {useDispatch, } from "react-redux";
import { handleSavingDataEnd} from '../../store/carStore';

async function editCarRow (e) {  
 
  const client = await MongoClient.connect('mongodb+srv://Admin:admin123@cluster0.3rzaz.mongodb.net/Cars?retryWrites=true&w=majority');
  const db = client.db();
  const carCollection = db.collection('Car');  

    if ( e.method == "PUT")  {
      const idRowData = e.body.id.toString().trim();       
      //const result = await userCollection.findOne({_id: ObjectId(idRowData)});

        await carCollection.findOneAndUpdate(
            { _id: ObjectId(idRowData) },
           { $set: { 
             title: e.body.title,
             regvalue: e.body.registration,
             date: e.body.date,
             vehicleUser: e.body.vehicleUser,
             voziloAktivnoOd: e.body.voziloAktivnoOd,
             tipKorisnika: e.body.tipKorisnika,          
            
            }},
            { new: true }

        );
      client.close();

    }

    if (e.method == "POST") {  

      await carCollection.insertOne(
        {
        title: e.body.title,
        regvalue: e.body.registration,
        date: e.body.date,
        vehicleUser: e.body.vehicleUser,
        voziloAktivnoOd: e.body.voziloAktivnoOd,
        tipKorisnika: e.body.tipKorisnika
      });
    
            
      client.close();

    }
  
    if(e.method == "DELETE") {

      const idRowData = e.body.id.toString().trim();   
      await carCollection.findOneAndDelete(
        { _id: ObjectId(idRowData) }  
    );

    client.close();
  }




  
  
     
  }
  
  
  
  export default editCarRow;