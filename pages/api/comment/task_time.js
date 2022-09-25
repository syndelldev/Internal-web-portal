import { executeQuery } from "../../../config/db";

export default async function handler(req, res) {
    console.log(req.body)

    try{
        let person=await executeQuery( " SELECT * FROM `tbl_task_time` where `task_id`=? ", [req.body.task_id] );
        res.status(200).json(person);

        // if(person != "")
        // {
        //     console.log("exist")
        //     try{
        //         let person=await executeQuery( " UPDATE `tbl_task_time` SET `username`=?,`estimate_time`=?,`spent_time`=? WHERE  `task_id`=?" , [req.body.task_id, req.body.username, req.body.estimate, req.body.spent] );
        //         res.status(200).json(person);
        //     }
        //     catch(err){
        //         console.log(err)
        //     }
        // }
        // else{
        //     console.log("not exist")
        //     try{
        //         let person=await executeQuery( " INSERT INTO `tbl_task_time`( `task_id`, `username`, `estimate_time`, `spent_time`) VALUES (?,?,?,?) " , [req.body.task_id, req.body.username, req.body.estimate, req.body.spent] );
        //         res.status(200).json(person);
        //     }
        //     catch(err){
        //         console.log(err)
        //     }
        // }
        
    }
    catch(err){
        console.log(err)
    }
}