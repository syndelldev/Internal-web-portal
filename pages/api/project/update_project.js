import nc from "next-connect";
import { executeQuery } from "../../../config/db";

const handler=nc();

async function updateProject(req,res){
    if(req.method == 'PUT')
    {
        try{
            // console.log(req.body.project_title);
            // console.log(req.body.project_id);
 
            // console.log(req.body.project_person);
            // console.log(req.body);

           
            var members = req.body.project_person;
            console.log(members)
            
            // const allSelectedUser = [];
            // for(var i=0; i<req.body.project_person.length; i++){
            //     allSelectedUser.push(req.body.project_person[i].value);
            //     console.log(allSelectedUser);
            // }
            
 

            var addUserQuery = await executeQuery("Update `tbl_project` set `project_title` = ?, `project_description` = ?, `project_language` = ?, `project_comment` = ?, `project_priority` = ?, `project_start` = ?, `project_deadline` = ? , `project_person`= ? where `project_id` = ?",
            [req.body.project_title, req.body.project_description, req.body.project_language , req.body.project_comment , req.body.project_priority , req.body.project_start , req.body.project_deadline , `${members}` , req.body.project_id ] );

            const userid = [];
            for(var i=0; i<members.length; i++){
                var addUserQuery =  await executeQuery("SELECT id FROM `tbl_user` where username =? ",[`${members[i]}`])
                var memberId = addUserQuery[0].id
                userid.push(memberId);
                // console.log(userid);
            }
            console.log([`${userid}`]);

            var addUserQuery =  await executeQuery(" UPDATE `tbl_project_rights` SET `user_id`=? WHERE `project_id` = ? ",[`${userid}`, req.body.project_id])
            console.log(addUserQuery);


            res.status(200).json(addUserQuery);
            // console.log(addUserQuery);
        }
        catch(err){
            console.log(err)
        }
    }
}

export default updateProject;