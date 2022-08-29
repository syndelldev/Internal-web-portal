//import pool from "../../config/db";
import { executeQuery } from "../../config/db";

const getAllProject = async (req,res) =>{
    try{
        let projectData=await executeQuery(" SELECT * FROM `tbl_project` ", [] );
        res.send(projectData);
    }
    catch(err){
        res.status(500).json(err);
    }
}

const getProjectById = async (req,res) => {
    let id = req.query.project_id;
    console.log(req.query);
    console.log(req.query);

    try{
        // let projectById=await executeQuery(` SELECT * FROM tbl_project`);
        let projectById=await executeQuery(` SELECT * FROM tbl_project where project_id= ${id}`, [] );
        res.status(200).json(projectById);
    }
    catch(err){
        res.status(500).json(err);
    }
}

// const AddUser = async (req,res) =>{
//     let id = req.query.id;
//     try{
//         let createUser = await executeQuery(" INSERT INTO `tbl_project`( `username`, `password`, `mobile_no`, `department`, `position`, `status`, `role`, `creation_time`) VALUES (?,?,?,?,?,?,?,?) ")
//         res.status(200).json(createUser);
//     }
//     catch(err){
//         res.status(500).json(err);
//     }
// }

const deleteProject = async (req,res) => {
    let id = req.query.project_id;
    console.log(req.query.project_id);

    try{
        let delProject = await executeQuery("UPDATE `tbl_project` SET `project_status` = 'deactivate' WHERE `tbl_project`.`project_id` = ?", [req.query.project_id] )
        res.status(200).json(delProject);
    }
    catch(err){
        res.status(500).json(err);
    }
}
export { getAllProject,getProjectById,deleteProject }