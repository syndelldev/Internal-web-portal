import { executeQuery } from "../../../config/db";

export default async function handler(req, res) {
    console.log(req.body)

    if(req.method === 'PUT')
    {
        try{
            let person=await executeQuery( " UPDATE `tbl_task_time` SET `username`=?,`estimate_time`=?,`spent_time`=? WHERE  `task_id`=?" , [ req.body.username, req.body.estimate, req.body.spent, req.body.task_id] );
            res.status(200).json(person);
            console.log(person)
        }
        catch(err){
            console.log(err)
        }
    }
    
}