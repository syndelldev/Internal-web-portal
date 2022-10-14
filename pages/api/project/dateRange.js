import nc from "next-connect";
import { executeQuery } from "../../../config/db";

const handler=nc();

async function dateRange(req,res){
    if(req.method == 'POST')
    {
        try{
            console.log(req.body);
 
            var addUserQuery = await executeQuery("SELECT * FROM `tbl_project` WHERE `project_start` BETWEEN ? and ? or `project_deadline` BETWEEN ? and ? or ? BETWEEN `project_start` and `project_deadline`  or ? BETWEEN `project_start` and `project_deadline` and `project_delete`='no' ORDER BY FIELD(`project_priority`,'high','medium','low')",
            [ req.body.dateStart, req.body.dateEnd, req.body.dateStart, req.body.dateEnd, req.body.dateStart, req.body.dateEnd ] );

            res.status(200).json(addUserQuery);
            console.log(addUserQuery);
        }
        catch(err){
            console.log(err);
        }
    }
}

export default dateRange;