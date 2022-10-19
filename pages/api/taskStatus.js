import nc from "next-connect";
import { executeQuery } from "../../config/db";
const handler=nc();


async function Status(req,res) {
    
    try{
        let status = await executeQuery(" SELECT * FROM `tbl_taskstatus` group by `taskStatus_name` ORDER BY FIELD(`taskStatus_name`,'Task to do','Task on hold','Task running','Task completed') ");
        res.status(200).json(status);
    }
    catch(err){
        res.status(500).json(err);
    }
}

export default Status;