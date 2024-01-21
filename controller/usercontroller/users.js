const express=require('express');
const router=express.Router();



router.get('/',(req,res)=>{
    res.send("I Am From Router")
})



module.exports=router