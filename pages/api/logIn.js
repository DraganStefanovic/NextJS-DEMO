import {MongoClient} from 'mongodb';
import { hash } from 'bcryptjs';


var bcrypt = require('bcryptjs');

async function logIn(req, res) {
  //Only POST mothod is accepted
  if (req.method === 'POST') {
      //Getting email and password from body
      const { email, password, name,  } = req.body;
      //Validate
      if (!email || !email.includes('@') || !password) {
          res.status(422).json({ message: 'Invalid email' });
          return;
      }     
      const client = await MongoClient.connect('mongodb+srv://Admin:admin123@cluster0.3rzaz.mongodb.net/Users?retryWrites=true&w=majority'); 
      const db = client.db();
      //Check existing
      const UserExisting = await db
          .collection('users')
          .findOne({ email: email });          

      if(!UserExisting){
            res.status(422).json({ message: 'Incorrect email or password' });
          return console.log("Incorrect email or password")
          
      }  

      if (UserExisting) { 
        console.log("Body " + req.body.password)
        console.log("DB "+ UserExisting.password)

        const validPassword = await bcrypt.compare(password, UserExisting.password);

        if (!validPassword) {
            res.status(422).json({ message: 'Incorrect Password' });
            client.close();           
             return           
        }
        
        console.log("User IN")    
        res.status(200).json({UserExisting, message: `Welcome ${UserExisting.name}`}); 
        client.close();          
      }
     

      //Close DB connection
      client.close();
  } 
}


export default logIn;




//https://vegibit.com/node-js-mongodb-user-registration/