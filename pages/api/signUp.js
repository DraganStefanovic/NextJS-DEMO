import {MongoClient} from 'mongodb';
import { hash } from 'bcryptjs';


async function signUp(req, res) {
  //Only POST mothod is accepted
  if (req.method === 'POST') {
      //Getting email and password from body
      const { email, password } = req.body;
      //Validate
      if (!email || !email.includes('@') || !password) {
          res.status(422).json({ message: 'Invalid Data' });
          return;
      }
      //Connect with database
      const client = await MongoClient.connect('mongodb+srv://Admin:admin123@cluster0.3rzaz.mongodb.net/Users?retryWrites=true&w=majority');
        
      
      const db = client.db();
      //Check existing
      const checkExisting = await db
          .collection('users')
          .findOne({ email: email });
      //Send error response if duplicate user is found
      if (checkExisting) {
          res.status(422).json({ message: 'User already exists' });
          client.close();
          return;
      }
      //Hash password
      const status = await db.collection('users').insertOne({
          email,
          password: await hash(password, 12),
      });
      //Send success response
      res.status(201).json({ message: 'User created', ...status });
      //Close DB connection
      client.close();
  } else {
      //Response for other than POST method
      res.status(500).json({ message: 'Route not valid' });
  }
}


// async function signUp(req, res) {

//   if (req.method === 'POST') {

// //  const data = {
// //     name: "TestName",
// //     age: 21,
// //     car: "Audi",
// // }

//     const data = req.body

//     const client = await MongoClient.connect('mongodb+srv://Admin:admin123@cluster0.3rzaz.mongodb.net/Users?retryWrites=true&w=majority');
//     const db = client.db();

//     const userCollection = db.collection('user');

//     const result = await userCollection.insertOne(data);

//     console.log(result)

//     client.close();

//     res.status(201).json({
//         message: 'user insert'
//     })
//   }
// }


export default signUp;


