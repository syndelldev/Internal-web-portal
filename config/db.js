const { createPool } = require("mysql");

const pool = createPool({
    host:"localhost",
    user:"root",
    password:"",
    port:"3306",
    database:"web portal"
})

pool.getConnection((err)=>{
    if(err)
    {
        console.log("connection Error");
    }
    console.log("connection Succesfully");
});
module.exports=pool;