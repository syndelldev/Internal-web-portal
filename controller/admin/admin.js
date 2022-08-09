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

const AddUser = async () =>{
    let id = req.query.id;
    try{
        let createUser = await executeQuery(" INSERT INTO `tbl_user`( `username`, `password`, `mobile_no`, `department`, `position`, `status`, `role`, `creation_time`) VALUES (?,?,?,?,?,?,?,?) ")
    }
    catch(err){
        res.status(500).json(err);
    }
}
export { getAllUser,getUserById,AddUser }