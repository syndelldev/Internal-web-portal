import { executeQuery } from "../../../config/db";

export default async function handler(req, res) {
    // const { message } = req.body;
    console.log(req.body)

    try{
        let person=await executeQuery( " INSERT INTO `tbl_comment` ( `project_id`, `username`,`comment`,`estimate_time`, `spent_time` ) VALUES (?,?,?,?,?) " , [req.body.project_id,req.body.username,req.body.message,req.body.estimate,req.body.spent] );
        res.status(200).json(person);
        console.log(person)
    }
    catch(err){
        console.log(err)
    }
}