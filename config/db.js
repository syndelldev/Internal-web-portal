import mysql from 'serverless-mysql';

const { rejects } = require("assert");
const { createPool } = require("mysql");
const { resolve } = require("path");

const pool = createPool({
    // host:"127.0.0.1",
    // user:"root",
    // password:"",
    // port:"3306",
    // database:"web_portal"
    //============live database connection=================//
    host:"dbportal.crq074bejaot.ap-northeast-1.rds.amazonaws.com",
    user:"admin",
    password:"12345678",
    port:"3306",
    database:"dbportal"
    // host: process.env.MYSQL_HOST,
    // port: process.env.MYSQL_PORT,
    // database: process.env.MYSQL_DATABASE,
    // user: process.env.MYSQL_USER,
    // password: process.env.MYSQL_PASSWORD

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