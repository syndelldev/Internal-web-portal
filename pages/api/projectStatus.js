import nc from "next-connect";
import { executeQuery } from "../../config/db";
const handler=nc();


async function Status(req,res) {
    
    try{
        let status = await executeQuery("SELECT * FROM `tbl_projectstatus` group by `projectstatus_name` ORDER BY FIELD(`projectstatus_name`,'Running','On hold','Completed') ");
        res.status(200).json(status);
    }
    catch(err){
        res.status(500).json(err);
    }
}

export default Status;