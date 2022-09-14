import { executeQuery } from "../../config/db";

const rights_list = async (req,res) =>{
    console.log(req.body)
    try{
        let rightsData=await executeQuery(` SELECT * FROM tbl_rights WHERE user_id=?`, [req.body.user] );
        res.send(rightsData);
        //console.log(rightsData)
    }
    catch(err){
        res.status(500).json(err);
    }
}

export { rights_list }