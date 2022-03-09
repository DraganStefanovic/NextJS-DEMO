import {MongoClient} from 'mongodb';
import {AddUser} from '../../pages/adduser';

async function handlerUser(req, res) {

  if (req.method === 'POST') {

//  const data = {
//     name: "TestName",
//     age: 21,
//     car: "Audi",
// }

    const data = req.body

    const client = await MongoClient.connect('mongodb+srv://Admin:admin123@cluster0.3rzaz.mongodb.net/Users?retryWrites=true&w=majority');
    const db = client.db();

    const userCollection = db.collection('users');

    const result = await userCollection.insertOne(data);

    console.log(result)

    client.close();

    res.status(201).json({
        message: 'user insert'
    })
  }
}


export default handlerUser;


