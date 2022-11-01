import nc from "next-connect";
import { executeQuery } from "../../../config/db";

const handler=nc();

async function dateRange(req,res){
    if(req.method == 'POST')
    {
        try{
            console.log(req.body);
 
            var addUserQuery = await executeQuery("SELECT * FROM `tbl_subtask` WHERE (`task_start` BETWEEN ? and ? or `task_deadline` BETWEEN ? and ? or ? BETWEEN `task_start` and `task_deadline` or ? BETWEEN `task_start` and `task_deadline`) and `task_delete`='no' ORDER BY FIELD(`task_priority`,'high','medium','low')",
            [ req.body.dateStart, req.body.dateEnd, req.body.dateStart, req.body.dateEnd, req.body.dateStart, req.body.dateEnd] );

            res.status(200).json(addUserQuery);
            console.log(addUserQuery);
        }
        catch(err){
            console.log(err);
        }
    }
}

export default dateRange;