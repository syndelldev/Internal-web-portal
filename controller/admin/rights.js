import { executeQuery } from "../../config/db";

const rights = async (req,res) =>{
    try{
        let rightsData=await executeQuery(" SELECT * FROM `role` ", [] );
        res.send(rightsData);
    }
    catch(err){
        res.status(500).json(err);
    }
}

const rightsById = async (req,res) => {
    let id = req.query.id;
    console.log(id)
    try{
        //SELECT * FROM role LEFT JOIN tbl_rights ON role.role_id=tbl_rights.role_id INNER JOIN admin_pages WHERE tbl_rights.role_id
        //SELECT * FROM tbl_rights  WHERE role_id=${id}
        let rightsId=await executeQuery(` SELECT * FROM tbl_rights  WHERE role_id=${id} `, [] );
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
            let UpdataUser = await executeQuery(` UPDATE tbl_rights SET user_list=?  WHERE id=${id} `, [req.body.checkvalue, id])
            res.status(200).json(UpdataUser);
            console.log(UpdataUser)
        }
        catch(err){
            console.log(err)
        }
    }

    else if(req.body.addlist_checkvalue == 1 || req.body.addlist_checkvalue == 0 ){
        try{
            let UpdateAddList = await executeQuery(` UPDATE tbl_rights SET add_user=?  WHERE id=${id} `, [req.body.addlist_checkvalue, id])
            res.status(200).json(UpdateAddList);
            console.log(UpdateAddList)
        }
        catch(err){
            console.log(err)
        }
    }

    else if(req.body.edit_checkvalue == 1 || req.body.edit_checkvalue == 0 ){
        try{
            let EditList = await executeQuery(` UPDATE tbl_rights SET edit_user=?  WHERE id=${id} `, [req.body.edit_checkvalue, id])
            res.status(200).json(EditList);
            console.log(EditList)
        }
        catch(err){
            console.log(err)
        }
    }

    else if(req.body.delete_checkvalue == 1 || req.body.delete_checkvalue == 0 ){
        try{
            let DeleteList = await executeQuery(` UPDATE tbl_rights SET delete_user=?  WHERE id=${id} `, [req.body.delete_checkvalue, id])
            res.status(200).json(DeleteList);
            console.log(DeleteList)
        }
        catch(err){
            console.log(err)
        }
    }

    
}

export { rights,rightsById,UpdateUserRights }