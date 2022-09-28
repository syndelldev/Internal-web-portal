import { executeQuery } from "../../../config/db";

export default async function handler(req, res) {
    console.log(req.body)

    try{
        let person=await executeQuery( " SELECT * FROM `tbl_task_time` where `task_id`=? ", [req.body.task_id] );
        res.status(200).json(person);
    }
    catch(err){
        console.log(err)
    }
}