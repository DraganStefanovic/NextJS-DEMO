import {MongoClient} from 'mongodb';


async function AddCarToMongo (req, res) {

  if (req.method === 'POST') {
    const data = req.body

    const client = await MongoClient.connect('mongodb+srv://Admin:admin123@cluster0.3rzaz.mongodb.net/Cars?retryWrites=true&w=majority');
    const db = client.db();
    const userCollection = db.collection('Car');

    const result = await userCollection.insertOne(data);

    console.log(result)

    client.close();


    res.status(201).json({
        message: 'Car insert'
    })
  }
}


export default AddCarToMongo;


