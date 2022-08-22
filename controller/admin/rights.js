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

export { rights }