import { executeQuery } from "../../../config/db";

export default async function handler(req, res) {
    // console.log(req.body)

    try{
        let person=await executeQuery( " SELECT * FROM `tbl_task_time` INNER JOIN tbl_subtask ON tbl_task_time.task_id=tbl_subtask.task_id ", [] );
        res.status(200).json(person);
    }
    catch(err){
        console.log(err)
    }
}