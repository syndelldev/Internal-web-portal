import { executeQuery } from "../../config/db";

export default async function handler(req, res){

    console.log(req.cookies)
    try{
        let userData=await executeQuery(" SELECT * FROM `tbl_user` WHERE id=? ", [req.cookies.Id] );
        res.send(userData);
        // console.log(userData)
    }
    catch(err){
        res.status(500).json(err);
    }
}

