const express=require('express');
const dbconnection = require('../../helpers/config');
const router=express.Router();
const app=express();
app.use(express.json())


// For User GetById

router.get('/getById/:id',(req,res)=>{

    const id=req.params.id
    
    if (/^\d+$/.test(id)) {
        
        dbconnection.query(`SELECT * FROM users WHERE id=${id}`, (err, result) => {
            if (err) {
                console.log("Error in Database", err);
                return res.status(500).json({ status: 0, message: 'Internal Server Error' });
            } else {
                 
                return res.status(200).json({ status: 1, data: result });
            }
        });
    } else {
        return res.status(404).json({ status: 0, message: 'Invalid Arguments Not Found' });
    }
})

// For User Add

router.post('/add',(req,res)=>{

    const {...users}=req.body;

    if(typeof users.name !=="undefined" && users.name !==""){ var name=users.name}else{ name=''}
    if(typeof users.email !=="undefined" && users.email !==""){ var email=users.email}else{ email=''}
    if(typeof users.city !=="undefined" && users.city !==""){ var city=users.city}else{ city=''}

    const insertingValues=[name,email,city];

    dbconnection.query(`INSERT INTO users(name,email,city) VALUES (?,?,?)`,insertingValues,(err,result)=>{
        if(err){
            console.log("Error in Database",err);
            return res.status(500).json({ status: 0, message: 'Internal Server Error' });
        }else{
            return res.status(200).json({status:1,message:'User Added Successfully'})
        }
    })
})

// For User Update

router.put('/updateusers/:id',(req,res)=>{

    const id=req.params.id
    
    const {...users}=req.body;

    if (/^\d+$/.test(id)) {
        
        dbconnection.query(`SELECT * FROM users WHERE id=${id}`, (err, result) => {
            if (err) {
                console.log("Error in Database", err);
                return res.status(500).json({ status: 0, message: 'Internal Server Error' });
            }else if( typeof result[0]== "undefined"){
                return res.status(200).json({ status: 0, message: 'User Not Found' });
            } else {
                 
                const existingValues=result[0]
                
                if(typeof users.name !=="undefined" && users.name !=="") { var name=users.name}else{ name=existingValues.name}
                if(typeof users.email !=="undefined" && users.email !=="") { var email=users.email}else{ email=existingValues.email}
                if(typeof users.city !=="undefined" && users.city !=="") { var city=users.city}else{ city=existingValues.city}

                const updatingvalues=[name,email,city,id];

                dbconnection.query('UPDATE `users` SET `name`=?,`email`=?,`city`=? WHERE id=?',updatingvalues,(err,result)=>{
                    if(err){
                        console.log("Error in Database",err);
                        return res.status(500).json({ status: 0, message: 'Internal Server Error' });
                    }else{
                        return res.status(200).json({ status: 1, message: 'User Updated Successfully' });                                                
                    }
                })                
            }
        });
    } else {
        return res.status(404).json({ status: 0, message: 'Invalid Arguments Not Found' });
    }
})

// For User Delete

router.delete('/delete/:id',(req,res)=>{

    const id=req.params.id
    
    if (/^\d+$/.test(id)) {
        
        dbconnection.query(`SELECT * FROM users WHERE id=${id}`, (err, result) => {
            if (err) {
                console.log("Error in Database", err);
                return res.status(500).json({ status: 0, message: 'Internal Server Error' });
            } else if(result.length == 0){

                    return res.status(200).json({ status: 1, message: 'User Not Found' });    
                 }else{
                    dbconnection.query(`UPDATE users SET status=0 WHERE id=${id}`,(err,result)=>{
                        if (err) {
                            console.log("Error in Database", err);
                            return res.status(500).json({ status: 0, message: 'Internal Server Error' });
                        } else {
                            return res.status(200).json({ status: 1, message: 'User Deleted Successfully' });     
                        }
                    })
                
            }
        });
    } else {
        return res.status(404).json({ status: 0, message: 'Invalid Arguments Not Found' });
    }
})

module.exports=router