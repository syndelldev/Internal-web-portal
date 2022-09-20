import { executeQuery } from "../../config/db";


const getRightList = async (req,res) =>{
    console.log(req.body)
    try{
        let userData=await executeQuery(" SELECT * FROM `tbl_rights` WHERE user_id=? ", [req.body.userid] );
        res.send(userData);
    }
    catch(err){
        // res.status(500).json(err);
        console.log(err)
    }
}

export { getRightList }