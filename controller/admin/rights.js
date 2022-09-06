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
    //console.log(id)
    console.log(req.body)

    if(req.body.moduleid==1)
    {
        try{
            //let rightsId=await executeQuery(` SELECT * FROM tbl_user INNER JOIN tbl_project INNER JOIN tbl_module WHERE tbl_module.module_id=? AND tbl_user.id=${id} `, [req.body.moduleid] );
            let rightsId=await executeQuery(` SELECT * FROM tbl_module INNER JOIN tbl_rights INNER JOIN tbl_project INNER JOIN tbl_user WHERE tbl_rights.module_id=? AND tbl_module.module_id=? AND tbl_user.id=${id} `, [req.body.moduleid, req.body.moduleid] );
            res.status(200).json(rightsId);
            console.log(rightsId)
        }
        catch(err){
            res.status(500).json(err);
        }
    }
    else if(req.body.moduleid==2)
    {
        try{
            let rightsId=await executeQuery(` SELECT * FROM tbl_module INNER JOIN tbl_rights INNER JOIN tbl_subtask INNER JOIN tbl_user WHERE tbl_rights.module_id=? AND tbl_module.module_id=? AND tbl_user.id=${id} `, [req.body.moduleid, req.body.moduleid] );
            res.status(200).json(rightsId);
            //console.log(rightsId)
        }
        catch(err){
            res.status(500).json(err);
        }
    }
}


/*const rightsById = async (req,res) => {
    let id = req.query.id;
    // console.log(req.body)
    //SELECT * FROM role LEFT JOIN tbl_rights ON role.role_id=tbl_rights.role_id  WHERE tbl_rights.role_id
    try{
        let rightsId=await executeQuery(` SELECT * FROM tbl_rights  WHERE page_id='Projects' AND tbl_rights.role_id=${id} `, [] );
        res.status(200).json(rightsId);
    }
    catch(err){
        res.status(500).json(err);
    }
}

const UpdateUserRights = async (req,res) =>{
    let id = req.query.id;
    console.log(id)
    console.log(req.body)

    
        if( req.body.checkvalue == 1 || req.body.checkvalue == 0 ){
            try{
                //UPDATE tbl_rights SET user_list=?  WHERE role_id=? AND page_id='Projects'
                let UpdataUser = await executeQuery(` UPDATE tbl_rights SET user_list=?  WHERE role_id=? AND page_id='Projects' `, [req.body.checkvalue, id])
                res.status(200).json(UpdataUser);
                console.log(UpdataUser)
            }
            catch(err){
                console.log(err)
            }
        }

        else if( req.body.addlist_checkvalue == 1 || req.body.addlist_checkvalue == 0 ){
            try{
                let UpdateAddList = await executeQuery(` UPDATE tbl_rights SET add_user=?  WHERE role_id=? AND page_id='Projects' `, [req.body.addlist_checkvalue, id])
                res.status(200).json(UpdateAddList);
                console.log(UpdateAddList)
            }
            catch(err){
                console.log(err)
            }
        }

        else if(req.body.edit_checkvalue == 1 || req.body.edit_checkvalue == 0 ){
            try{
                let EditList = await executeQuery(` UPDATE tbl_rights SET edit_user=?  WHERE role_id=? AND page_id='Projects' `, [req.body.edit_checkvalue, id])
                res.status(200).json(EditList);
                console.log(EditList)
            }
            catch(err){
                console.log(err)
            }
        }

        else if(req.body.delete_checkvalue == 1 || req.body.delete_checkvalue == 0 ){
            try{
                let DeleteList = await executeQuery(` UPDATE tbl_rights SET delete_user=?  WHERE role_id=? AND page_id='Projects' `, [req.body.delete_checkvalue, id])
                res.status(200).json(DeleteList);
                console.log(DeleteList)
            }
            catch(err){
                console.log(err)
            }
        }
}*/

export { rights,modules,ModuleById }