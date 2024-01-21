const express=require('express');
const app=express();
const dbconnection = require('./helpers/config');
require('dotenv').config()

app.use(express.json());



app.get('/',(req,res)=>{
    
    dbconnection.query(`select * from users`,(err,result)=>{
        res.send(result)
    })
})

// For User Controller

const users=require('./controller/usercontroller/users');
app.use('/users',users)



const port=process.env.PORT
// For Listining the server

app.listen(port,()=>{
    console.log(`Server Running in the port http://localhost:${port}`);
})