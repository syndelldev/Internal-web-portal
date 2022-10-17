const { rejects } = require("assert");
const { createPool } = require("mysql");
const { resolve } = require("path");

const pool = createPool({
    host:"127.0.0.1",
    user:"root",
    password:"",
    port:"3306",
    database:"web_portal"
})

pool.getConnection((err)=>{
    if(err)
    {
        console.log("Database Connection Error");
    }
    console.log("Database Connected Successfully");
});

const executeQuery=(query, arraparams)=>{
    return new Promise((resolve,rejects)=>{
        try{
            pool.query(query, arraparams,(err,data)=>{
                if(err)
                {
                    console.log('Error in executing query');
                    rejects(err);
                }
                resolve(data);
            })
        }
        catch(err)
        {
            rejects(err);
        }
    });
}

//module.exports=pool;
module.exports={executeQuery};