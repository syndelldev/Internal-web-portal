import nc from "next-connect";
import { executeQuery } from "../../../config/db";

const handler=nc();

async function updateProject(req,res){
    if(req.method == 'PUT')
    {
        try{
            console.log("person");
            console.log(req.body);
            var project = req.body.project_name;

            const projectName = [];
            for(var i=0; i<project.length; i++){
                projectName.push(project[i].value);
            }
            console.log(projectName);


            var addUserQuery = await executeQuery("Update `tbl_subtask` set `task_title` = ?, `project_name` = ?, `task_description` = ?, `task_language` = ?, `task_priority` = ?, `task_start` = ?, `task_deadline` = ? ,`task_status` = ?, `task_person`= ? where `task_id` = ?",
            [req.body.task_title, `${projectName}` , req.body.task_description , req.body.task_language , req.body.task_priority , req.body.task_start , req.body.task_deadline , req.body.task_status , `${req.body.task_person}` , req.body.task_id ] );

            res.status(200).json(addUserQuery);
            console.log(addUserQuery);
        }
        catch(err){
            console.log(err)
        }
    }
}

export default updateProject;