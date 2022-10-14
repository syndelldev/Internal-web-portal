import nc from "next-connect";
import { executeQuery } from "../../../config/db";
const handler=nc();


async function userDepartment(req,res) {
    
    console.log(req.cookies);

    try{
        let userDepartment = await executeQuery("SELECT * FROM `tbl_department` order by `department_name`");
        res.status(200).json(userDepartment);
        console.log("user task");
        console.log(userDepartment)
    }
    catch(err){
        res.status(500).json(err);
    }
}

export default userDepartment;