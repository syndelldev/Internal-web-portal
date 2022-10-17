const { rejects } = require("assert");
const { createPool } = require("mysql");
const { resolve } = require("path");

const pool = createPool({
    host:"dbportal.crq074bejaot.ap-northeast-1.rds.amazonaws.com",
    user:"admin",
    password:"12345678",
    port:"3306",
    database:"dbportal"
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