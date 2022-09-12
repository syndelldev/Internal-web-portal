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
    // console.log(req.body)

    var check_condition = await executeQuery(" SELECT * FROM `tbl_rights` INNER JOIN tbl_project_rights WHERE tbl_project_rights.user_id=? AND tbl_rights.project_id=? AND tbl_rights.module_id=? AND tbl_rights.user_id=?  ", [req.body.userid, req.body.projectid, req.body.moduleid, req.body.userid] );
    // console.log(check_condition)

    if(check_condition != "" )
    {
        console.log("data exist")
        // res.send(check_condition);

        let data = await executeQuery(" SELECT * FROM `tbl_rights` WHERE user_id=? AND project_id=? ", [req.body.userid, req.body.projectid])
        console.log(data)

        if(data != "" )
        {
            console.log("project_id and user_id already availble ")
            console.log(req.body)
            var update_checkbox = await executeQuery(" UPDATE tbl_rights SET view_rights=? WHERE project_id = ? AND user_id=? ",[ req.body.checkbox_value, req.body.projectid, req.body.userid])
            res.status(200).json(update_checkbox);
            
            console.log(update_checkbox)
        }
    }
    else
    {
        console.log("data does not exist") 
        
        let data = await executeQuery(" SELECT * FROM `tbl_rights` WHERE user_id=? AND project_id=? ", [req.body.userid, req.body.projectid])
        console.log(data)
        
        if(data == "" )
        {
            try{
                let project = await executeQuery("INSERT INTO `tbl_rights` ( `user_id`, `project_id`, `module_id`,`view_rights`, `edit_rights` ) VALUES (?,?,?,0,0)", [req.body.userid, req.body.projectid, req.body.moduleid])
                res.status(200).json(project);
                console.log(project);
            }
            catch(err){
                console.log(err)
            }
        }
        // if(data != "" )
        // {
        //     console.log("project_id and user_id already availble ")
        //     var update_checkbox = await executeQuery(" SELECT * FROM `tbl_rights` WHERE user_id=? AND project_id=? ", [req.body.userid, req.body.projectid])
        //     var update_checkbox = await executeQuery(" UPDATE tbl_rights SET view_rights=1 WHERE project_id = ? AND user_id=? ",[req.body.userid, req.body.projectid])
        //     console.log(update_checkbox)
        // }
        // else
        // {
        //     console.log("null")
        //     try{
        //         let project = await executeQuery("INSERT INTO `tbl_rights` ( `user_id`, `project_id`, `module_id`,`view_rights`, `edit_rights` ) VALUES (?,?,?,0,0)", [req.body.userid, req.body.projectid, req.body.moduleid])
        //         res.status(200).json(project);
        //         // console.log(project);
        //     }
        //     catch(err){
        //         console.log(err)
        //     }
        // }
    }
    
}

const update_checkbox = async (req,res) =>{
    console.log(req.body)
}
export { rights,modules,ModuleById,ProjectById,update_checkbox }