import { executeQuery } from "../../config/db";

const rights = async (req,res) =>{
    try{
        //SELECT * FROM `role` LEFT JOIN `tbl_rights` ON role.role_id=tbl_rights.role_id;
        let rightsData=await executeQuery(" SELECT tbl_user.id, tbl_user.username,tbl_rights.role_id,tbl_rights.user_list,tbl_rights.add_user,tbl_rights.edit_user,tbl_rights.delete_user,admin_pages.page_id,admin_pages.page_name FROM tbl_user INNER JOIN tbl_rights ON tbl_user.role_id=tbl_rights.role_id INNER JOIN admin_pages ON admin_pages.page_id=tbl_rights.page_id ", [] );
        res.send(rightsData);
    }
    catch(err){
        res.status(500).json(err);
    }
}

const rightsById = async (req,res) => {
    let id = req.query.id;
    try{
        let rightsId=await executeQuery(` SELECT tbl_user.id, tbl_user.username,tbl_rights.role_id,tbl_rights.user_list,tbl_rights.add_user,tbl_rights.edit_user,tbl_rights.delete_user,admin_pages.page_id,admin_pages.page_name FROM tbl_user INNER JOIN tbl_rights ON tbl_user.role_id=tbl_rights.role_id INNER JOIN admin_pages ON admin_pages.page_id=tbl_rights.page_id WHERE tbl_user.id=${id} `, [] );
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

    try{
        let UpdataUser = await executeQuery(" UPDATE tbl_rights SET ? WHERE id = ? ", [req.body, id])
        res.status(200).json(UpdataUser);
        console.log(UpdataUser)
    }
    catch(err){
        console.log(err)
    }
}

export { rights,rightsById,UpdateUserRights }