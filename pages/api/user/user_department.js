import nc from "next-connect";
import { executeQuery } from "../../../config/db";
const handler=nc();


async function userDepartment(req,res) {
    
    try{
        let userDepartment = await executeQuery("SELECT * FROM `tbl_department` order by `department_name`");
        res.status(200).json(userDepartment);
    }
    catch(err){
        res.status(500).json(err);
    }
}

export default userDepartment;