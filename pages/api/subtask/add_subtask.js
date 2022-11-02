import nc from "next-connect";
import { executeQuery } from "../../../config/db";
const handler=nc();

async function addSubtask(req,res){
    if(req.method == 'POST')
    {
        try{
            console.log(req.body);

            var project = req.body.project_name;
            const projectName = [];
            for(var i=0; i<project.length; i++){
                projectName.push(project[i].value);
            }
            // console.log(projectName);

            var members = req.body.task_person;
            // console.log(members);

            const allSelectedUser = [];
            for(var i=0; i<members.length; i++){
                allSelectedUser.push(members[i].value);
            }
            // console.log(allSelectedUser);

            const userid = [];
                
            for(var i=0; i<members.length; i++){
                var addUserQuery =  await executeQuery("SELECT id FROM `tbl_user` where username =? ",[`${members[i].value}`])
                // console.log(addUserQuery[0].id)
                var memberId = addUserQuery[0].id
                userid.push(memberId);
                //console.log(userid);
            }
            // console.log(`${userid}`);

            var addUserQuery = await executeQuery("create table IF NOT EXISTS `tbl_subtask` ( `task_id` int AUTO_INCREMENT PRIMARY KEY , `project_name` varchar(255), `task_title` varchar(255), `task_description` text, `task_language` varchar(255), `task_priority` varchar(255), `task_person` text , `task_status` varchar(255) , `task_start` varchar(255) , `task_deadline` varchar(255) ,  `task_delete` varchar(255) , `task_createdBy` varchar(255), `task_created_date` timestamp  )");
            var addUserQuery = await executeQuery("INSERT INTO `tbl_subtask` ( `project_name`, `task_title`, `task_description` , `task_language`, `task_priority`, `task_person`, `task_status`, `task_start` , `task_deadline`, `task_delete` , `task_createdBy` ) VALUES (?,?,?,?,?,?,?,?,?,?,?)", 
            [ `${projectName}` , req.body.task_title, req.body.task_description ,  req.body.task_language, req.body.task_priority , `${allSelectedUser}` , "Task to do" , req.body.task_start , req.body.task_deadline , "no" , req.body.task_createdBy ] );

            res.status(200).json(addUserQuery);
            // console.log(addUserQuery.warningCount);
        }
        catch(err){
            console.log(err);
        }
    }
}

export default addSubtask;