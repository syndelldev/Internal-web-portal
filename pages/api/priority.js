import nc from "next-connect";
import { executeQuery } from "../../config/db";
const handler=nc();


async function Priority(req,res) {
    
    try{
        let priority = await executeQuery("SELECT * FROM `tbl_priority` group by `priority_name`  ORDER BY FIELD(`priority_name`,'High','Medium','Low') ");
        res.status(200).json(priority);
    }
    catch(err){
        res.status(500).json(err);
    }
}

export default Priority;