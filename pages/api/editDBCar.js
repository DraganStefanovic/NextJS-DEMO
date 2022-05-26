import {MongoClient, ObjectId} from 'mongodb';
import {useDispatch, } from "react-redux";
import { handleSavingDataEnd} from '../../store/carStore';

async function editCarRow (e) {  
 
      
      const idRowData = e.body.id.toString().trim();
      //const idRowData = "627d32f1ad51a50e16ee86e6";

      console.log(e.body)


     
  
      const client = await MongoClient.connect('mongodb+srv://Admin:admin123@cluster0.3rzaz.mongodb.net/Cars?retryWrites=true&w=majority');
      const db = client.db();
      const carCollection = db.collection('Car');
  
      //const result = await userCollection.findOne({_id: ObjectId(idRowData)});



        const result = await carCollection.findOneAndUpdate(
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
  
  
  
  export default editCarRow;