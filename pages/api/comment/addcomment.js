import { executeQuery } from "../../../config/db";

export default async function handler(req, res) {
    console.log(req.body);

    try{
        let person=await executeQuery( " INSERT INTO `tbl_comment` ( `task_id`, `username`, `comment`, `creation_time`) VALUES (?,?,?,?) " , [ req.body.task_id, req.body.username, req.body.message, req.body.created_D ] );
        res.status(200).json(person);
        console.log(person)
    }
    catch(err){
        console.log(err)
    }
}