import { executeQuery } from "../../config/db";

const TaskModule = async (req,res) =>{
    try{
        //SELECT * FROM `role` LEFT JOIN `tbl_rights` ON role.role_id=tbl_rights.role_id;
        let TaskData=await executeQuery(" SELECT * FROM `role`  ", [] );
        res.send(TaskData);
    }
    catch(err){
        res.status(500).json(err);
    }
}

const TaskModuleById = async (req,res) => {
    let id = req.query.id;

    try{
        let TaskId=await executeQuery(` SELECT * FROM tbl_rights  WHERE page_id='Tasks' AND tbl_rights.role_id=${id} `, [] );
        res.status(200).json(TaskId);
    }
    catch(err){
        res.status(500).json(err);
    }
}

export { TaskModule, TaskModuleById }