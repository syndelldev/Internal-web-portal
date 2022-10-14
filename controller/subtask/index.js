//import pool from "../../config/db";
import { executeQuery } from "../../config/db";

const getAllTask = async (req,res) =>{
    try{
        let taskData=await executeQuery(" SELECT * FROM `tbl_subtask` where `task_delete`='no' ORDER BY FIELD(`task_priority`,'high','medium','low')");
        res.send(taskData);
    }
    catch(err){
        res.status(500).json(err);
    }
}

const getTaskById = async (req,res) => {
    let id = req.query.subtask_id;
    console.log(req.query);
    console.log(req.query);

    try{
        let taskById=await executeQuery(` SELECT * FROM tbl_subtask where task_id= ?`, [req.query.subtask_id] );
        res.status(200).json(taskById);
    }
    catch(err){
        res.status(500).json(err);
    }
}

const taskDepartment = async (req,res) => {
    let task_department = req.query.department;
    console.log(req.query.department);
    console.log(req.query);

    try{
        let taskDepartment = await executeQuery("Select * from `tbl_subtask` WHERE `tbl_subtask`.`task_department` = ?", [task_department] )
        res.status(200).json(taskDepartment);
    }
    catch(err){
        res.status(500).json(err);
    }
}

const taskLanguage = async (req,res) => {
    let task_language = req.query.language;
    console.log(req.query.language);

    try{
        let taskLanguage = await executeQuery("Select * from `tbl_subtask` WHERE `tbl_subtask`.`task_language` = ?", [task_language] )
        res.status(200).json(taskLanguage);
    }
    catch(err){
        res.status(500).json(err);
    }
}

const deleteTask = async (req,res) => {
    console.log(req.query);
    let id = req.query.task_id;

    try{
        let deltask = await executeQuery("UPDATE `tbl_subtask` SET `task_delete` = 'yes' WHERE `tbl_subtask`.`task_id` = ?", [id] )
        res.status(200).json(deltask);
    }
    catch(err){
        res.status(500).json(err);
    }
}
export { getAllTask, getTaskById, deleteTask, taskLanguage, taskDepartment }