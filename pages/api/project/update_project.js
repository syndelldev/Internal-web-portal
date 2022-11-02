import nc from "next-connect";
import { executeQuery } from "../../../config/db";

const handler=nc();

async function updateProject(req,res){
    if(req.method == 'PUT')
    {
        try{
            // console.log(req.body.project_title);
            console.log(req.body);
 
            // console.log(req.body.project_person);
            // console.log(req.body);
           
            var members = req.body.project_person;
            var addUserQuery = await executeQuery("Update `tbl_project` set `project_title` = ?, `project_description` = ?, `project_department`=?, `project_language` = ?, `project_priority` = ?, `project_start` = ?, `project_deadline` = ? , `project_person`= ?, `project_status`=? where `project_id` = ?",
            [req.body.project_title, req.body.project_description, req.body.project_department, req.body.project_language , req.body.project_priority , req.body.project_start , req.body.project_deadline , `${members}` , req.body.project_status, req.body.project_id ] );

            var rightslist = await executeQuery("SELECT * FROM `tbl_rights` WHERE project_id=?", [req.body.project_id])
            var rightslist = await executeQuery("DELETE FROM `tbl_rights` WHERE project_id=?", [req.body.project_id])
            // console.log(rightslist)

            // var rightslist = await executeQuery("UPDATE `tbl_rights` SET user_id=?,project_id=?,view_rights=1,edit_rights=1 WHERE project_id=?", [req.body.project_id])
            for(var i=0; i<members.length; i++){
                var userId =  await executeQuery("SELECT id FROM `tbl_user` where username =? ",[`${members[i]}`])
                var memberId = userId[0].id
                // console.log(memberId);

                var rightsQuery = await executeQuery("INSERT INTO `tbl_rights` ( `user_id`,`project_id`,`module_id`,`view_rights`, `edit_rights` ) VALUES (?,?,1,1,1)", [ memberId,  req.body.project_id ]);    
                // console.log(rightsQuery)
            }
            

            // var addUserQuery =  await executeQuery(" UPDATE `tbl_project_rights` SET `user_id`=? WHERE `project_id` = ? ",[`${userid}`, req.body.project_id])
            // console.log(addUserQuery);


            res.status(200).json(addUserQuery);
            // console.log(addUserQuery);
        }
        catch(err){
            console.log(err)
        }
    }
}

export default updateProject;