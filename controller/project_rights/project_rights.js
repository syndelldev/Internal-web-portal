import { executeQuery } from "../../config/db";

const Project = async (req,res) =>{
    console.log(req.cookies.Id);
    
    try{
        let person=await executeQuery(" SELECT * FROM `tbl_rights` INNER JOIN tbl_project_rights WHERE tbl_project_rights.user_id LIKE ? AND tbl_rights.module_id=1 AND tbl_rights.user_id=? ", [`%${req.cookies.Id}%`, req.cookies.Id] );
        res.status(200).json(person);
        console.log(person)
    }
    catch(err){
        //res.status(500).json(err);
        console.log(err)
    }
}

export { Project }