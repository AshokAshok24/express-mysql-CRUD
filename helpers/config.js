const mysql=require('mysql2');
require('dotenv').config();


// Connection String For Mysql

const dbconnection=mysql.createConnection({
    user:process.env.MYSQL_USER,
    host:process.env.MYSQL_HOST,
    password:process.env.MYSQLPASSWORD,
    database:process.env.MYSQL_DATABASE
})

// Check if Database is Connected or Not

dbconnection.connect((err)=>{
    if(err){ 
        console.log(`Error connecting to MySQL database:`, err);
        return;
     }else{
        console.log(`Connected To Database : ${process.env.MYSQL_DATABASE}`);
     }
})
 
dbconnection.on('error',(err)=>{
    console.error('MySQL database error:', err);
})


// Export Database Connection

module.exports=dbconnection