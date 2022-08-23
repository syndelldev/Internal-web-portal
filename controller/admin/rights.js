import { executeQuery } from "../../config/db";

const rights = async (req,res) =>{
    try{
        //SELECT * FROM `role` LEFT JOIN `tbl_rights` ON role.role_id=tbl_rights.role_id;
        let rightsData=await executeQuery(" SELECT * FROM `role` LEFT JOIN `tbl_rights` ON role.role_id=tbl_rights.role_id ", [] );
        res.send(rightsData);
    }
    catch(err){
        res.status(500).json(err);
    }
}

const rightsById = async (req,res) => {
    let id = req.query.id;
    try{
        let rightsId=await executeQuery(` SELECT * FROM role LEFT JOIN tbl_rights ON role.role_id=tbl_rights.role_id where id= ${id}`, [] );
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