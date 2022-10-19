import nc from "next-connect";
import { executeQuery } from "../../config/db";
const handler=nc();


async function Department(req,res) {
    
    try{
        let department = await executeQuery("SELECT * FROM `tbl_language` group by `language_department` ");
        res.status(200).json(department);
    }
    catch(err){
        res.status(500).json(err);
    }
}

export default Department;