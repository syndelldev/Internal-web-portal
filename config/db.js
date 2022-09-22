const { rejects } = require("assert");
const { createPool } = require("mysql");
const { resolve } = require("path");

const pool = createPool({
    host:"192.249.127.21",
    user:"spms_Masteradmin",
    password:"yG#919G!Zv)i",
    port:"3306",
    database:"spms_automation_tool"


    

})

pool.getConnection((err)=>{
    if(err)
    {
        console.log("Database Connection Error");
    }
    console.log("Database Connected Succesfully");
});

const executeQuery=(query, arraparams)=>{
    return new Promise((resolve,rejects)=>{
        try{
            pool.query(query, arraparams,(err,data)=>{
                if(err)
                {
                    console.log('Error in executing Query');
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