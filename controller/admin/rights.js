import { executeQuery } from "../../config/db";

const rights = async (req,res) =>{
    try{
        //SELECT * FROM `role` LEFT JOIN `tbl_rights` ON role.role_id=tbl_rights.role_id;
        let rightsData=await executeQuery(" SELECT * FROM `tbl_user`  ", [] );
        res.send(rightsData);
    }
    catch(err){
        res.status(500).json(err);
    }
}

const modules = async (req,res) =>{
    try{
        let rightsData=await executeQuery(" SELECT * FROM `tbl_module`  ", [] );
        res.send(rightsData);
    }
    catch(err){
        res.status(500).json(err);
    }
}

const ModuleById = async (req,res) => {
    let id = req.query.id;
    console.log(id)
    console.log(req.body)

    if(req.body.moduleid==1)
    {
        try{
            //let rightsId=await executeQuery(` SELECT * FROM tbl_user INNER JOIN tbl_project INNER JOIN tbl_module WHERE tbl_module.module_id=? AND tbl_user.id=${id} `, [req.body.moduleid] );
            let rightsId=await executeQuery(` SELECT * FROM tbl_project LEFT JOIN tbl_project_rights ON tbl_project_rights.project_id=tbl_project.project_id INNER JOIN tbl_user WHERE tbl_user.id=${id} `, [req.body.moduleid] );
            res.status(200).json(rightsId);
            //console.log(rightsId)
        }
        catch(err){
            res.status(500).json(err);
        }
    }
    else if(req.body.moduleid==2)
    {
        try{
            let rightsId=await executeQuery(` SELECT * FROM tbl_module INNER JOIN tbl_subtask INNER JOIN tbl_user WHERE tbl_module.module_id=? AND tbl_user.id=${id} `, [req.body.moduleid] );
            res.status(200).json(rightsId);
            //console.log(rightsId)
        }
        catch(err){
            res.status(500).json(err);
        }
    }
}

const ProjectById = async (req,res) =>{
    console.log(req.body)

    var check_condition = await executeQuery(" SELECT * FROM `tbl_rights` WHERE user_id=? AND project_id=? AND module_id=?  ", [req.body.userid,req.body.projectid, req.body.moduleid] );
    
    //console.log(check_condition)

    if(check_condition != "" )
    {
        console.log("data exist")
        res.send(check_condition);
    }
    else
    {
        //console.log("data does not exist")
        try{
            let project = await executeQuery("INSERT INTO `tbl_rights` ( `user_id`, `project_id`, `module_id`,`view_rights`, `edit_rights` ) VALUES (?,?,?,0,1)", [req.body.userid, req.body.projectid, req.body.moduleid])
            res.status(200).json(project);
            console.log(project);
        }
        catch(err){
            console.log(err)
        }
    }
    
}

export { rights,modules,ModuleById,ProjectById }