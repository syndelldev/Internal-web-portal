import { executeQuery } from "../../../config/db";

export default async function handler(req, res) {
    console.log(req.body)

    try{
        let person=await executeQuery( " INSERT INTO `tbl_task_time`( `task_id`, `user_id`, `username`, `estimate_time`, `spent_time`) VALUES (?,?,?,?,?) " , [req.body.task_id, req.body.user_id, req.body.username, req.body.estimate, req.body.spent] );
        res.status(200).json(person);
    }
    catch(err){
        console.log(err)
    }
}