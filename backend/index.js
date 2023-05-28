const express = require('express');
const cors = require('cors')
const app = express();
app.use(express.json());
const db = require('./connect');
const createUser = require('./createUser');
app.use(cors())
app.use(cors({ credentials: true, origin: "http://localhost:3000" })); //Cross-origin resource sharing 
//app.use(cookieparser());

app.post('/createUser', async(req,res)=>{
  console.log('Create User called')
  const  { name , mobileNumber, email, password } = req.body;
  try {
     await createUser.create({name,email, mobileNumber, password}).then(response=>{
      res.json({status:"ok", message : 'Successfully created user'})
    },err=>{
      res.status(400).json({status:"bad request"})
    })
   
  } catch (error) {
  //  res.status(500).send(error);
  }
});

app.post('/login', async(req,res)=>{
  const  { email , password} = req.body;
  try {
     await createUser.find({email : email}).then(response=>{
      console.log(response);
      if(response[0].email == email && response[0].password == password){
        res.json({status : 'ok' ,mesg : 'Validated successfully'})
      }else{
        res.status(401).send({mesg : 'Invalid email Id or password'})
      }
    })
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/verifydata", async (req, res) => {
  const { email ,mobileNumber} = req.body;
  console.log(email);
  try {
    await createUser.find({ email: email }).then((response) => {
      const list = response.filter((user) => user.email == email);
      console.log("response email", list);
      if (list.length > 0) {
        res.status(400).json({ mesg: "Mail already exists" });
      } else {
        res.json({ status: "ok", message: "Valid mail id" });
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
});
//server port
  app.listen(3007,()=>{
    console.log('App listening to 3007');
  })