import { executeQuery } from "../../config/db";

const Project = async (req,res) =>{
    console.log(req.cookies.Id);
    
    try{
        let person=await executeQuery(" SELECT * FROM `tbl_rights` WHERE user_id=? ", [ req.cookies.Id ] );
        res.status(200).json(person);
        console.log(person)
    }
    catch(err){
        //res.status(500).json(err);
        console.log(err)
    }
}

export { Project }