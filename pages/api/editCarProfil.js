import {MongoClient, ObjectId} from 'mongodb';
import {useDispatch, } from "react-redux";



async function editCarProfil (e, res) {    
      
      console.log(e.body.currentUrl)     

      console.log("Sasa")
  
      const client = await MongoClient.connect('mongodb+srv://Admin:admin123@cluster0.3rzaz.mongodb.net/Cars?retryWrites=true&w=majority');
      const db = client.db();
      const carCollection = db.collection('Car');
  
      const result = await carCollection.updateOne(
            { regvalue: e.body.currentUrl },
            { $push: { 
            gallery: e.body.image            
            
            }},
            { new: true }

        );              
        res.status(200).json({ result })
      
     client.close();
  
  
     
  }
  
  
  
  export default editCarProfil;