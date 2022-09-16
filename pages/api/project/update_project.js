import nc from "next-connect";
import { executeQuery } from "../../../config/db";

const handler=nc();

async function updateProject(req,res){
    if(req.method == 'PUT')
    {
        try{
            // console.log(req.body.project_title);
            // console.log(req.body.project_id);
            console.log("person");
            // console.log(req.body.project_person);
            // console.log(req.body);

            // const allMember = [];
            // for(var i=0; i<=req.body.project_person.length; i++){
            //     allMember.push(req.body.project_person[i].value);
            // }
            // console.log(allMember);



            var addUserQuery = await executeQuery("Update `tbl_project` set `project_title` = ?, `project_description` = ?, `project_language` = ?, `project_comment` = ?, `project_priority` = ?, `project_start` = ?, `project_deadline` = ? , `project_person`= ? where `project_id` = ?",
            [req.body.project_title, req.body.project_description, req.body.project_language , req.body.project_comment , req.body.project_priority , req.body.project_start , req.body.project_deadline , `${req.body.project_person}` , req.body.project_id ] );


            res.status(200).json(addUserQuery);
            // console.log(addUserQuery);
        }
        catch(err){
            console.log(err)
        }
    }
}

export default updateProject;