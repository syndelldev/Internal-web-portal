import { executeQuery } from "../../config/db";

const rights = async (req,res) =>{
    try{
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
    // console.log(id)
    // console.log(req.body)
    
    try{
        let rightsId=await executeQuery(` SELECT * FROM tbl_rights LEFT JOIN tbl_project ON tbl_project.project_id=tbl_rights.project_id WHERE tbl_rights.user_id=?`, [req.body.userid] );
        res.status(200).json(rightsId);
        // console.log(rightsId)
    }
    catch(err){
        res.status(500).json(err);
    }
}

const ProjectById = async (req,res) =>{
    // console.log(req.body)

    var check_condition = await executeQuery(" SELECT * FROM `tbl_rights` WHERE user_id=? AND module_id=? AND project_id=? ", [req.body.userid, req.body.moduleid, req.body.projectid] );
    console.log(check_condition)

    if(req.body.view==0 || req.body.view==1)
    {
        console.log("Update view_rights")
        let data = await executeQuery(" UPDATE `tbl_rights` SET  view_rights=?  WHERE `user_id`=? AND `project_id`=? ", [req.body.view, req.body.userid, req.body.projectid])
        console.log(data)
    }
    else if(req.body.edit==0 || req.body.edit==1)
    {
        console.log("Update edit_rights")
        if(req.body.edit==1)
        {
            let data = await executeQuery(" UPDATE `tbl_rights` SET  view_rights=1  WHERE `user_id`=? AND `project_id`=? ", [ req.body.userid, req.body.projectid])
            console.log(data) 
        }
        let data = await executeQuery(" UPDATE `tbl_rights` SET  edit_rights=?  WHERE `user_id`=? AND `project_id`=? ", [req.body.edit, req.body.userid, req.body.projectid])
        console.log(data)
    }
    
}

export { rights,modules,ModuleById,ProjectById }