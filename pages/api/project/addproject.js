import nc from "next-connect";
import { executeQuery } from "../../../config/db";
const handler=nc();

async function addProject(req,res){
    if(req.method == 'POST')
    {
        try{
            console.log(req.body.project_start);
            console.log(req.body);
            console.log("data");
            console.log("data");
            console.log(req.body.project_person);
            var members = req.body.project_person;
            console.log(members);

            const allSelectedUser = [];
            for(var i=0; i<members.length; i++){
            allSelectedUser.push(members[i].value);
            }
            console.log(allSelectedUser);

            var addUserQuery = await executeQuery("create table IF NOT EXISTS `tbl_project` (`project_id` int AUTO_INCREMENT PRIMARY KEY, `project_title` varchar(255), `project_description` text, `project_language` varchar(255),`project_department` varchar(255), `project_priority` varchar(255), `project_person` text , `project_created_date` timestamp , `project_status` varchar(255) , `project_start` varchar(255) , `project_deadline` varchar(255) , `project_comment` text , `project_delete` varchar(255)  )");
            var addUserQuery = await executeQuery("INSERT INTO `tbl_project` ( `project_title`, `project_description`, `project_language` , `project_department`, `project_comment`, `project_priority`, `project_start`, `project_deadline` , `project_person`, `project_status` , `project_delete` ) VALUES (?,?,?,?,?,?,?,?,?,?,?)", 
            [req.body.project_title, req.body.project_description, req.body.project_language ,  req.body.project_department, req.body.project_comment , req.body.project_priority , req.body.project_start , req.body.project_deadline , `${allSelectedUser}` , req.body.project_status , "no" ] );
            var addUserQuery = await executeQuery("INSERT INTO `tbl_project_rights` ( `module_id`, `view`, `edit` ) VALUES (1,0,1)", [])
            
            res.status(200).json(addUserQuery);
            console.log(addUserQuery);
        }
        catch(err){
            console.log(err);
        }
    }
}

export default addProject;