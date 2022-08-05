//import pool from "../../config/db";
import { executeQuery } from "../../config/db";

const getAllData = async (req,res) =>{
    let adminData=await executeQuery(" SELECT * FROM `tbl_user` ", [] );
    res.send(adminData);
}
export { getAllData };