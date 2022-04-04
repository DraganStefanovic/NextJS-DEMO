import {MongoClient} from 'mongodb';
import { hash } from 'bcryptjs';

var bcrypt = require('bcryptjs');

async function logIn(req, res) {
  //Only POST mothod is accepted
  if (req.method === 'POST') {
      //Getting email and password from body
      const { email, password } = req.body;
      //Validate
      if (!email || !email.includes('@') || !password) {
          res.status(422).json({ message: 'Invalid Data' });
          return;
      }     
      const client = await MongoClient.connect('mongodb+srv://Admin:admin123@cluster0.3rzaz.mongodb.net/Users?retryWrites=true&w=majority'); 
      const db = client.db();
      //Check existing
      const UserExisting = await db
          .collection('users')
          .findOne({ email: email });          

      if(!UserExisting){
          return console.log("Incorrect email or password")
      }  

      if (UserExisting) {           
       

        console.log("Body " + req.body.password)

        console.log("DB "+ UserExisting.password)

        const validPassword = await bcrypt.compare(password, UserExisting.password);
        if (!validPassword) {
            console.log("Incorrect email or password") 
            client.close();
            return 
            
        }
        
        console.log("User IN")
          
        
          client.close();
          return;
      }
     

      //Close DB connection
      client.close();
  } 
}


export default logIn;




//https://vegibit.com/node-js-mongodb-user-registration/