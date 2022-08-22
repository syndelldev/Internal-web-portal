import { executeQuery } from "../../config/db";

const rights = async (req,res) =>{
    try{
        let rightsData=await executeQuery(" SELECT * FROM `tbl_rights` ", [] );
        res.send(rightsData);
    }
    catch(err){
        res.status(500).json(err);
    }
}

const rightsById = async (req,res) => {
    let id = req.query.id;
    try{
        let rightsId=await executeQuery(` SELECT * FROM tbl_rights where id= ${id}`, [] );
        res.status(200).json(rightsId);
    }
    catch(err){
        res.status(500).json(err);
    }
}

export { rights,rightsById }