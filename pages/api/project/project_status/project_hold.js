import nc from "next-connect";
import { executeQuery } from "../../../../config/db";
const handler=nc();


async function projectStatus(req,res) {
    
    console.log("sucess");

    try{
        let projectStatus = await executeQuery("SELECT * FROM `tbl_project` WHERE project_status='on hold' ");
        // let projectStatus2 = await executeQuery("SELECT * FROM `tbl_project` WHERE project_status='on hold' ");
        // let projectStatus3 = await executeQuery("SELECT * FROM `tbl_project` WHERE project_status='completed' ");
        res.status(200).json(projectStatus);
    }
    catch(err){
        res.status(500).json(err);
    }
}

export default projectStatus