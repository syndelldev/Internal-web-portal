import nc from "next-connect";
import { executeQuery } from "../../../config/db";
const handler=nc();

async function addProject(req,res){
    if(req.method == 'POST')
    {
        try{
            console.log(req.body.project_start);
            console.log(req.body.project_deadline);

            var addUserQuery = await executeQuery("create table IF NOT EXISTS `tbl_project` (`project_id` int AUTO_INCREMENT PRIMARY KEY, `project_title` varchar(255), `project_description` text, `project_language` varchar(255), `project_comment` text, `project_priority` varchar(255), `project_person` text , `project_created_date` timestamp , `project_status` varchar(255) , `project_start` varchar(255) , `project_deadline` varchar(255) )");
            var addUserQuery = await executeQuery("INSERT INTO `tbl_project` ( `project_title`, `project_description`, `project_language`, `project_comment`, `project_priority`, `project_start`, `project_deadline` , `project_person`, `project_status`) VALUES (?,?,?,?,?,?,?,?,?)", 
            [req.body.project_title, req.body.project_description, req.body.project_language , req.body.project_comment , req.body.project_priority , req.body.project_start , req.body.project_deadline , `${req.body.project_person}` , "active" ] );
        
            res.status(200).json(addUserQuery);
            console.log(addUserQuery);
        }
        catch(err){
            console.log(err)
        }
    }
}

export default addProject;