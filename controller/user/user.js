import { executeQuery } from "../../config/db";

const userTask = async (req,res) =>{
    try{
        let userTaskData=await executeQuery(" SELECT * FROM tbl_user_task ", [] );
        res.send(userTaskData);
    }
    catch(err){
        res.status(500).json(err);
    }
}

const getUserTaskById = async (req,res) =>{
    let id = req.query.id;
    try{
        let userTaskById=await executeQuery( `SELECT * FROM tbl_user_task where id= ${id}`, [] )
        res.status(200).json(userTaskById);
    }
    catch(err){
        res.status(500).json(err);
    }
}



export { userTask,getUserTaskById };