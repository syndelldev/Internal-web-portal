import nc from "next-connect";
import { executeQuery } from "../../../../config/db";
const handler=nc();


async function projectStatus(req,res) {
    
    console.log(req.cookies);

    try{
        let projectStatus = await executeQuery("SELECT * FROM `tbl_project` WHERE project_status='On hold'  AND project_person LIKE ?  and `project_delete`='no' ORDER BY FIELD(`project_priority`,'high','medium','low')", [`%${req.cookies.name}%`]);
        res.status(200).json(projectStatus);
        // console.log(projectStatus)
    }
    catch(err){
        res.status(500).json(err);
    }
}

export default projectStatus