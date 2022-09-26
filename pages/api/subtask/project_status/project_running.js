import nc from "next-connect";
import { executeQuery } from "../../../../config/db";
const handler=nc();


async function projectStatus(req,res) {
    
    console.log(req.cookies);

    try{
        let projectStatus = await executeQuery("SELECT * FROM `tbl_project` WHERE project_status='running'  AND project_person LIKE ? ", [`%${req.cookies.name}%`]);
        res.status(200).json(projectStatus);
        console.log(projectStatus)
    }
    catch(err){
        res.status(500).json(err);
    }
}

export default projectStatus