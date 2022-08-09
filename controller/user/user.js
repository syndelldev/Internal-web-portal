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

const userCreateTask = async (req,res) =>{
    console.log(req.body);
    let task_name = req.body.task_name;
    let task_description = req.body.task_description;
    let task_time = req.body.task_time;
    try{
        let createTaskData=await executeQuery( `INSERT INTO tbl_user_task (task_name, task_description, task_time) VALUES (?,?,?)`, 
            [task_name,task_description,task_time] );
        res.status(200).json(createTaskData);
    }
    catch(err){
        res.status(500).json(err);
    }
}

export { userTask,getUserTaskById,userCreateTask };