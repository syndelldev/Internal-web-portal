//import pool from "../../config/db";
import { executeQuery } from "../../config/db";

const getAllProject = async (req,res) =>{
    try{
        let projectData=await executeQuery(" SELECT * FROM `tbl_project` ORDER BY FIELD(`project_priority`,'high','medium','low')", [] );
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

const projectDepartment = async (req,res) => {
    let project_department = req.query.department;
    console.log(req.query.department);
    console.log(req.query);

    try{
        let projectDepartment = await executeQuery("Select * from `tbl_project` WHERE `tbl_project`.`project_department` = ?", [project_department] )
        res.status(200).json(projectDepartment);
    }
    catch(err){
        res.status(500).json(err);
    }
}

const projectLanguage = async (req,res) => {
    let project_language = req.query.language;
    console.log(req.query.language);

    try{
        let projectLanguage = await executeQuery("Select * from `tbl_project` WHERE `tbl_project`.`project_language` = ?", [project_language] )
        res.status(200).json(projectLanguage);
    }
    catch(err){
        res.status(500).json(err);
    }
}

const projectStatus = async (req,res) => {
    let project_status = req.query.language;
    console.log(req.query.language);

    try{
        let projectStatus1 = await executeQuery("SELECT * FROM `tbl_project` WHERE project_status='Running' ");
        // let projectStatus2 = await executeQuery("SELECT * FROM `tbl_project` WHERE project_status='On hold' ");
        // let projectStatus3 = await executeQuery("SELECT * FROM `tbl_project` WHERE project_status='Completed' ");
        // let projectStatus = await executeQuery("Select COUNT(`project_id`)as 'project_total' ,`project_status`,`project_deadline` from `tbl_project` group by `project_status`; ");
        res.status(200).json(projectStatus);
    }
    catch(err){
        res.status(500).json(err);
    }
}

const deleteProject = async (req,res) => {
    let id = req.query.project_id;
    console.log(req.query.project_id);

    try{
        let delProject = await executeQuery("UPDATE `tbl_project` SET `project_delete` = 'yes' WHERE `tbl_project`.`project_id` = ?", [req.query.project_id] )
        res.status(200).json(delProject);
    }
    catch(err){
        res.status(500).json(err);
    }
}
export { getAllProject, getProjectById, deleteProject, projectLanguage, projectDepartment , projectStatus }