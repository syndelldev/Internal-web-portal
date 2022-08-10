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

const AddUser = async (req,res) =>{
    let id = req.query.id;
    try{
        let createUser = await executeQuery(" INSERT INTO `tbl_user`( `username`, `password`, `mobile_no`, `department`, `position`, `status`, `role`, `creation_time`) VALUES (?,?,?,?,?,?,?,?) ")
        res.status(200).json(createUser);
    }
    catch(err){
        res.status(500).json(err);
    }
}

const deleteUser = async (req,res) => {
    //let id = req.query.id;
    try{
        let delUser = await executeQuery(` DELETE FROM tbl_user WHERE id = ?", [req.query.id] `)
        res.status(200).json(delUser);
    }
    catch(err){
        res.status(500).json(err);
    }
}
export { getAllUser,getUserById,AddUser,deleteUser }