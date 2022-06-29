import {MongoClient, ObjectId} from 'mongodb';


async function editCarRow (e, res) {  
 
  const client = await MongoClient.connect('mongodb+srv://Admin:admin123@cluster0.3rzaz.mongodb.net/Cars?retryWrites=true&w=majority');
  const db = client.db();
  const carCollection = db.collection('Car');  

    if ( e.method == "PUT")  {
      const idRowData = e.body.id.toString().trim();       
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

        res.status(200).json({ result })
            
        client.close();


      client.close();

    }

    if (e.method == "POST") {  

      const result =  await carCollection.insertOne(
        {
        title: e.body.title,
        regvalue: e.body.registration,
        date: e.body.date,
        vehicleUser: e.body.vehicleUser,
        voziloAktivnoOd: e.body.voziloAktivnoOd,
        tipKorisnika: e.body.tipKorisnika,
        gallery:[]
      });

      res.status(200).json({ result })
            
      client.close();
    

    }
  
    if(e.method == "DELETE") {

      const idRowData = e.body.id.toString().trim();   
      const result = await carCollection.findOneAndDelete(
        { _id: ObjectId(idRowData) }  
    );

    res.status(200).json({ result })

    client.close();
  }




  
  
     
  }
  
  
  
  export default editCarRow;