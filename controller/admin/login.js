import { executeQuery } from "../../config/db";
const getdata=async (req,res) =>{
    let adminData=await executeQuery(" SELECT * FROM `tbl_user` ", [] );
    res.send(adminData);
}
export { getdata };