const express=require('express');
const app=express();
const mysql=require('mysql2');


app.use(express.json());



app.get('/',(req,res)=>{
    res.send("Hii Hello")
})



app.listen(1000,()=>{
    console.log("Server Running in the port 1000");
})