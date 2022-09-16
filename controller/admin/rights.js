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
    console.log(req.body)

    
    try{
        // let rightsId=await executeQuery(` SELECT * FROM tbl_project_rights RIGHT JOIN tbl_rights ON tbl_project_rights.project_id=tbl_rights.project_id INNER JOIN tbl_project ON tbl_project.project_id=tbl_rights.project_id WHERE tbl_rights.user_id=${id} `, [req.body.userid] );/*WHERE tbl_rights.user_id=${id}*/
        let rightsId=await executeQuery(" SELECT * FROM tbl_project_rights RIGHT JOIN tbl_rights ON tbl_project_rights.project_id=tbl_rights.project_id INNER JOIN tbl_project ON tbl_project.project_id=tbl_rights.project_id WHERE tbl_project_rights.user_id LIKE ? AND tbl_rights.user_id=?", [`%${req.body.userid}%`,req.body.userid] );
        res.status(200).json(rightsId);
        //console.log(rightsId)
    }
    catch(err){
        res.status(500).json(err);
    }
}

const ProjectById = async (req,res) =>{
    // console.log(req.body)

    // var check_condition = await executeQuery(" SELECT * FROM `tbl_rights` INNER JOIN tbl_project_rights WHERE tbl_project_rights.user_id=? AND tbl_rights.project_id=? AND tbl_rights.module_id=? AND tbl_rights.user_id=?  ", [req.body.userid, req.body.projectid, req.body.moduleid, req.body.userid] );
    // var check_condition = await executeQuery(" SELECT * FROM `tbl_rights` INNER JOIN tbl_project_rights WHERE tbl_project_rights.user_id LIKE ? AND tbl_rights.project_id=? AND tbl_rights.module_id=? AND tbl_rights.user_id=? ", [`%${req.body.userid}%`, req.body.projectid, req.body.moduleid, req.body.userid] );
    var check_condition = await executeQuery(" SELECT * FROM `tbl_rights` WHERE user_id=? AND module_id=? AND project_id=? ", [req.body.userid, req.body.moduleid, req.body.projectid] );

    console.log(check_condition)

    if(check_condition != "" )
    {
        console.log("data exist")
        // res.send(check_condition);

        console.log(req.body)

            // let data = await executeQuery(" SELECT * FROM `tbl_rights` WHERE user_id=? AND project_id=? ", [req.body.userid, req.body.projectid])
            let data = await executeQuery(" UPDATE `tbl_rights` SET  view_rights=?,edit_rights=?  WHERE `user_id`=? AND `project_id`=? ", [req.body.view, req.body.edit, req.body.userid, req.body.projectid])
            console.log(data)
            // // res.send(data); 

    }
    else
    {
        console.log("data does not exist") 
        
        let data = await executeQuery(" SELECT * FROM `tbl_rights` WHERE user_id=? AND project_id=? ", [req.body.userid, req.body.projectid])
        // console.log(data)
        
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
    }
    
}




const update_checkbox = async (req,res) =>{
    console.log(req.body)

    // let data2 = await executeQuery(" SELECT * FROM `tbl_rights` WHERE user_id=? AND project_id=? ", [req.body.userid, req.body.projectid])
    // console.log(data2)
}

export { rights,modules,ModuleById,ProjectById,update_checkbox }