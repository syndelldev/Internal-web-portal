import nc from "next-connect";
import { executeQuery } from "../../../config/db";

const handler=nc();

async function updateProject(req,res){
    if(req.method == 'PUT')
    {
        try{
            console.log("person");
            console.log(req.body);

            var addUserQuery = await executeQuery("Update `tbl_subtask` set `task_status` = ? where `task_id` = ?",
            [ req.body.task_status, req.body.task_id ] );

            res.status(200).json(addUserQuery);
            console.log(addUserQuery);
        }
        catch(err){
            console.log(err)
        }
    }
}

export default updateProject;