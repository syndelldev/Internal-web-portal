import nc from "next-connect";
import { executeQuery } from "../../../../config/db";
const handler=nc();


async function projectStatus(req,res) {
    
    console.log("sucess");

    try{
        let projectStatus = await executeQuery("SELECT * FROM `tbl_project` WHERE project_status='Completed'  and `project_delete`='no' ORDER BY FIELD(`project_priority`,'high','medium','low')");
        res.status(200).json(projectStatus);
    }
    catch(err){
        res.status(500).json(err);
    }
}

export default projectStatus