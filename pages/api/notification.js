import nc from "next-connect";
import { executeQuery } from "../../config/db";
const handler=nc();

async function getNotification(req,res){
    if(req.method == 'POST'){
        try{
            console.log(req.body)
            // let data = await executeQuery(" SELECT * FROM `tbl_project` WHERE project_id=? ", [req.body.projectId] );
            // console.log(data)
            // res.send(data);
        }
        catch(err){
            console.log(err)
        }
    }
}

export default getNotification;