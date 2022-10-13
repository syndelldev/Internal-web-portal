import nc from "next-connect";
import { executeQuery } from "../../config/db";
const handler=nc();

async function getNotification(req,res){
    if(req.method == 'POST'){
        try{
            console.log(req.body)

            var inserted_project =  await executeQuery("SELECT * FROM `tbl_project` WHERE project_id=?", [req.body.ProjectId])  
            console.log(inserted_project) 

            res.send(inserted_project);
        }
        catch(err){
            console.log(err)
        }
    }
}

export default getNotification;
