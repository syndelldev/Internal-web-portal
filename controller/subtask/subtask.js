import { executeQuery } from "../../config/db";

const SubTaskList = async (req,res) =>{
    try{
        let subtask=await executeQuery(" SELECT * FROM `tbl_subtask` ", [] );
        res.send(subtask);
    }
    catch(err){
        res.status(500).json(err);
    }
}

export { SubTaskList }