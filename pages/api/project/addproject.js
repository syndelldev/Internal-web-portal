import nc from "next-connect";
import { executeQuery } from "../../../config/db";
const handler=nc();

async function addProject(req,res){
    if(req.method == 'POST')
    {
        try{
            // console.log(req.body.project_start);
            // console.log(req.body);
            // console.log("data");
            // console.log("data");
            var members = req.body.project_person;
            var addedBy = req.body.projectAdded_by;
            var name = addedBy['name'];

            const allSelectedUser = [];
            for(var i=0; i<members.length; i++){
            allSelectedUser.push(members[i].value);
            }
            console.log(allSelectedUser);





            var addUserQuery = await executeQuery("create table IF NOT EXISTS `tbl_project` (`project_id` int AUTO_INCREMENT PRIMARY KEY, `project_title` varchar(255), `project_description` text, `project_language` varchar(255),`project_department` varchar(255), `project_priority` varchar(255), `project_person` text , `project_created_date` timestamp , `project_status` varchar(255) , `project_start` varchar(255) , `project_deadline` varchar(255) ,`project_created_by` varchar(255) , `project_comment` text , `project_delete` varchar(255)  )");

            var addUserQuery = await executeQuery("INSERT INTO `tbl_project` ( `project_title`, `project_description`, `project_language` , `project_department`, `project_comment`, `project_priority`, `project_start`, `project_deadline` , `project_person`, `project_status` , `project_delete`  ) VALUES (?,?,?,?,?,?,?,?,?,?,?)", 
                [req.body.project_title, req.body.project_description, req.body.project_language ,  req.body.project_department, req.body.project_comment , req.body.project_priority , req.body.project_start , req.body.project_deadline , `${allSelectedUser}` , req.body.project_status , "no" ] );

                res.status(200).json(addUserQuery);
                console.log(addUserQuery.insertId);

                        // const userid = [];
                
                        for(var i=0; i<members.length; i++){
                            var userId =  await executeQuery("SELECT id FROM `tbl_user` where username =? ",[`${members[i].value}`])
                            // console.log(userId[0].id)
                            var memberId = userId[0].id
                            // userid.push(memberId);
                            console.log(memberId);
                            var rightsQuery = await executeQuery("INSERT INTO `tbl_rights` ( `user_id`,`project_id`,`module_id`,`view_rights`, `edit_rights` ) VALUES (?,?,1,1,1)", [ memberId,  addUserQuery.insertId ]);    
                            console.log(rightsQuery)
                        }
                        // console.log(memberId)

            
                

            // var addUserQuery = await executeQuery("INSERT INTO `tbl_project_rights` ( `module_id`,`user_id`, `view`, `edit` ) VALUES (1,?,0,1)", [ `${userid}` ]);
            
            // var addUserQuery =  await executeQuery("SELECT id FROM `tbl_user` where username =? ",[`${allSelectedUser}`])

            // var addUserQuery = await executeQuery("INSERT INTO `tbl_rights` ( `user_id`,`project_id`,`view_rights`, `edit_rights` ) VALUES (?,?,1,1)", [ req.body.project_person , addUserQuery.insertId ]);
            console.log(addUserQuery)
        }
        catch(err){
            console.log(err);
        }
    }
}

export default addProject;