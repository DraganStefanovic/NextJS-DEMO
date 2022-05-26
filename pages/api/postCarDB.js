import {MongoClient, ObjectId} from 'mongodb';
import {useDispatch, } from "react-redux";


/// NE KORISTIM u komponenti stavljen  getServerSideProps u [cardID] iskoristii za nesto drugoo

async function postCarDB (e) {  
 
      
    


      console.log(e.body.currentUrlis)
     
  
      const client = await MongoClient.connect('mongodb+srv://Admin:admin123@cluster0.3rzaz.mongodb.net/Cars?retryWrites=true&w=majority');
      const db = client.db();
      const carCollection = db.collection('Car');
  
      const result = await carCollection.updateOne(
            { regvalue: e.body.currentUrlis },
           { $push: { 
            gallery: e.body.image
            
            
            }},
            { new: true }

        );              
 
      
     client.close();
  
  
     
  }
  
  
  
  export default postCarDB;