//import pool from "../../config/db";
import { executeQuery } from "../../config/db";

const getAllUser = async (req,res) =>{
    try{
        let userData=await executeQuery(" SELECT * FROM `tbl_user` ", [] );
        res.send(userData);
    }
    catch(err){
        res.status(500).json(err);
    }
}

const getUserById = async (req,res) => {
    let id = req.query.id;
    try{
        let userDataById=await executeQuery(` SELECT * FROM tbl_user where id= ${id}`, [] );
        res.status(200).json(userDataById);
    }
    catch(err){
        res.status(500).json(err);
    }
}

/*const logindata = async (req,res) => {
    
        //const username = req.body.username;
        //const password = req.body.password;

        
    try{
        let loginQuery = await executeQuery(" select * from tbl_user where `username`= ? and `password`=? ", [req.body.username,req.body.password] );
        res.status(200).json(loginQuery);
    }
    catch(err){
        res.status(500).json(err);
    }
}*/
export { getAllUser,getUserById }